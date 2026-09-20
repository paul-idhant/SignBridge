#!/usr/bin/env python3
"""
SignBridge — poster & README thumbnail composer.

Takes any source frame (a real video frame, or public/hero.jpg as a
stand-in) and produces the branded stills that SignBridge uses for:

  * the <video poster="..."> shown before the ad film plays (graded frame)
  * the clickable thumbnail in README.md (graded frame + play button +
    wordmark, because GitHub strips <video> tags from READMEs)

GitHub does not render <video> tags inside README.md, so the README uses
this thumbnail and links through to the file itself.

Usage
-----
    python3 scripts/make_poster.py SOURCE.jpg [--width 1280] [--no-badge]

Writes:
    public/media/signbridge-ad-poster.jpg   (video poster, native ratio)
    docs/assets/signbridge-ad-thumb.jpg     (README thumbnail, 16:9)

Only dependency: Pillow  ->  pip install pillow
"""

from __future__ import annotations

import argparse
import os
import sys

try:
    from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont
except ImportError:  # pragma: no cover
    sys.exit("Pillow is required:  python3 -m pip install --user pillow")

# ── Brand tokens (mirror src/index.css) ───────────────────────────────
BG = (5, 5, 5)
ACCENT = (0, 229, 255)
INK = (255, 255, 255)
MUTED = (179, 179, 179)

FONT_DIRS = [
    "/usr/share/fonts/truetype/dejavu",
    "/usr/share/fonts/dejavu",
    "/System/Library/Fonts",
    "C:/Windows/Fonts",
]
SANS_BOLD = ["DejaVuSans-Bold.ttf", "Arial Bold.ttf", "arialbd.ttf"]
MONO = ["DejaVuSansMono.ttf", "DejaVuSansMono-Bold.ttf", "cour.ttf"]


def find_font(names: list[str], size: int) -> ImageFont.FreeTypeFont:
    for directory in FONT_DIRS:
        for name in names:
            path = os.path.join(directory, name)
            if os.path.exists(path):
                return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def cover_crop(img: Image.Image, w: int, h: int) -> Image.Image:
    """Scale + centre-crop `img` so it exactly fills w×h."""
    scale = max(w / img.width, h / img.height)
    resized = img.resize((round(img.width * scale), round(img.height * scale)), Image.LANCZOS)
    left = (resized.width - w) // 2
    top = (resized.height - h) // 2
    return resized.crop((left, top, left + w, top + h))


def draw_tracked(draw: ImageDraw.ImageDraw, xy, text: str, font, fill, tracking: int) -> int:
    """Draw text with letter-spacing (Pillow has no native tracking)."""
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=font, fill=fill)
        x += draw.textlength(ch, font=font) + tracking
    return x


def vertical_gradient(w: int, h: int, bottom_alpha: int, top_alpha: int = 90) -> Image.Image:
    """Black overlay whose *alpha* ramps: soft at the top (kicker legibility),
    transparent through the middle, heavy at the bottom (title legibility)."""
    grad = Image.new("L", (1, h), 0)
    top_end = int(h * 0.26)
    bot_start = int(h * 0.52)
    for y in range(h):
        if y < top_end:                       # top scrim, fading out
            a = int(top_alpha * (1 - y / max(1, top_end)) ** 1.6)
        elif y < bot_start:                   # clear middle
            a = 0
        else:                                 # bottom scrim, easing in
            t = (y - bot_start) / max(1, h - bot_start)
            a = int(bottom_alpha * (t ** 1.35))
        grad.putpixel((0, y), a)
    layer = Image.new("RGBA", (w, h), (*BG, 0))
    layer.putalpha(grad.resize((w, h)))
    return layer


def play_button(size: int) -> Image.Image:
    """Cyan play glyph with a soft glow, on a transparent canvas."""
    pad = size // 3
    canvas = Image.new("RGBA", (size + pad * 2, size + pad * 2), (0, 0, 0, 0))
    d = ImageDraw.Draw(canvas)
    c = size // 2 + pad
    r = size // 2

    # glow — a few blurred translucent rings
    glow = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse([c - r, c - r, c + r, c + r], fill=(*ACCENT, 70))
    glow = glow.filter(ImageFilter.GaussianBlur(size // 7))
    canvas.alpha_composite(glow)

    # disc + ring
    d.ellipse([c - r, c - r, c + r, c + r], fill=(5, 5, 5, 165), outline=(*ACCENT, 235),
              width=max(2, size // 42))
    # triangle, optically centred (shifted right a touch)
    t = r * 0.44
    cx = c + r * 0.06
    d.polygon(
        [(cx - t * 0.62, c - t), (cx - t * 0.62, c + t), (cx + t, c)],
        fill=(*ACCENT, 255),
    )
    return canvas


def compose(src_path: str, out_path: str, width: int, mode: str = "card") -> None:
    """mode:
         "card"   branded click-to-play still  -> README thumbnail
         "poster" graded frame only            -> <video poster="...">
    """
    src = Image.open(src_path).convert("RGB")
    height = round(width * 9 / 16)
    img = cover_crop(src, width, height).convert("RGB")

    # cinematic grade: a gentle exposure pull keeps text legible without
    # crushing the frame
    img = ImageEnhance.Brightness(img).enhance(0.80)
    img = ImageEnhance.Contrast(img).enhance(1.05)

    if mode == "card":
        # scrims: soft black at top + bottom, transparent through the middle
        img = Image.alpha_composite(img.convert("RGBA"), vertical_gradient(width, height, 232))
    else:
        # poster keeps only a light bottom scrim so overlaid browser
        # controls stay readable
        img = Image.alpha_composite(img.convert("RGBA"), vertical_gradient(width, height, 150, top_alpha=0))

    # faint cyan horizon line — echoes the site's border-line treatment
    d = ImageDraw.Draw(img)
    d.rectangle([0, height - 3, width, height], fill=(*ACCENT, 110))

    if mode == "card":
        scale = width / 1280
        kicker = find_font(MONO, max(12, int(19 * scale)))
        title = find_font(SANS_BOLD, max(24, int(52 * scale)))
        sub = find_font(MONO, max(11, int(17 * scale)))

        margin = int(56 * scale)

        # top-left kicker
        draw_tracked(d, (margin, int(46 * scale)), "SIGNBRIDGE  ·  ASSISTIVE AI",
                     kicker, (*ACCENT, 255), int(4 * scale))

        # centred play glyph
        btn = play_button(int(132 * scale))
        img.alpha_composite(btn, ((width - btn.width) // 2, int(height * 0.36)))

        # bottom-left wordmark + subline
        d = ImageDraw.Draw(img)
        baseline = height - int(118 * scale)
        d.text((margin, baseline), "Watch the film", font=title, fill=(*INK, 255))
        draw_tracked(d, (margin, baseline + int(66 * scale)),
                     "SIGN  ⇄  SPEECH   ·   23 INDIAN LANGUAGES   ·   RUNS IN YOUR BROWSER",
                     sub, (*MUTED, 255), int(2 * scale))

    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    img.convert("RGB").save(out_path, "JPEG", quality=88, optimize=True, progressive=True)
    print(f"  wrote {out_path}  ({img.width}x{img.height}, {mode})")


def main() -> None:
    ap = argparse.ArgumentParser(description="Compose SignBridge video poster + README thumbnail")
    ap.add_argument("source", help="Source frame or image (jpg/png). Use a real video frame when available.")
    ap.add_argument("--width", type=int, default=1280, help="Output width in px (default 1280)")
    ap.add_argument("--poster", default="public/media/signbridge-ad-poster.jpg")
    ap.add_argument("--thumb", default="docs/assets/signbridge-ad-thumb.jpg")
    args = ap.parse_args()

    if not os.path.exists(args.source):
        sys.exit(f"source not found: {args.source}")

    print("SignBridge poster composer")
    compose(args.source, args.poster, args.width, mode="poster")
    compose(args.source, args.thumb, args.width, mode="card")


if __name__ == "__main__":
    main()
