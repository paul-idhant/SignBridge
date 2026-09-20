#!/usr/bin/env bash
#
# SignBridge — advertisement video preparation
# --------------------------------------------
# Converts any video you already have (MOV, AVI, MKV, WebM, MP4, even a
# mislabelled .txt) into the web-optimised MP4 the site ships, then
# generates the poster frame and the README thumbnail from a real frame
# of that video.
#
#   ./scripts/prepare-video.sh "/path/to/Signbridge advertisement.mov"
#
# Outputs
#   public/media/signbridge-ad.mp4          <- the film (site + repo)
#   public/media/signbridge-ad-poster.jpg   <- <video poster="...">
#   docs/assets/signbridge-ad-thumb.jpg     <- README click-to-play card
#
# Nothing is installed globally. ffmpeg is taken from PATH if present,
# otherwise from the static build that ships with the `imageio-ffmpeg`
# Python package (pip install --user imageio-ffmpeg).

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

MEDIA_DIR="public/media"
DOCS_DIR="docs/assets"
OUT_VIDEO="$MEDIA_DIR/signbridge-ad.mp4"
OUT_POSTER="$MEDIA_DIR/signbridge-ad-poster.jpg"
OUT_THUMB="$DOCS_DIR/signbridge-ad-thumb.jpg"

MAX_WIDTH="${MAX_WIDTH:-1920}"   # downscale anything wider than this
CRF="${CRF:-21}"                 # quality (lower = better/bigger); 21 is visually near-lossless
PRESET="${PRESET:-slow}"

# ── 1. input ──────────────────────────────────────────────────────────
INPUT="${1:-}"
if [[ -z "$INPUT" ]]; then
  echo "usage: ./scripts/prepare-video.sh <input-video> [output-name]" >&2
  echo "       e.g. ./scripts/prepare-video.sh '/home/user/uploads/Signbridge advertisement.txt'" >&2
  exit 1
fi
if [[ ! -f "$INPUT" ]]; then
  echo "error: input file not found: $INPUT" >&2
  exit 1
fi

# Optional second arg overrides the output filename (without directory).
if [[ -n "${2:-}" ]]; then
  OUT_VIDEO="$MEDIA_DIR/$2"
  OUT_POSTER="$MEDIA_DIR/${2%.*}-poster.jpg"
  OUT_THUMB="$DOCS_DIR/${2%.*}-thumb.jpg"
fi

# ── 2. locate ffmpeg ──────────────────────────────────────────────────
if command -v ffmpeg >/dev/null 2>&1; then
  FF="$(command -v ffmpeg)"
elif FF="$(python3 -c 'import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())' 2>/dev/null)" && [[ -n "$FF" && -x "$FF" ]]; then
  :
else
  echo "error: ffmpeg not found." >&2
  echo "       install it with either:" >&2
  echo "         sudo apt-get install -y ffmpeg" >&2
  echo "         python3 -m pip install --user imageio-ffmpeg" >&2
  exit 1
fi

probe() { "$FF" -hide_banner -i "$1" 2>&1 | grep -oE "$2" | head -1 || true; }

echo "SignBridge video prep"
echo "  ffmpeg : $FF"
echo "  input  : $INPUT"
echo "  size   : $(du -h "$INPUT" | cut -f1)"
DURATION="$(probe "$INPUT" 'Duration: [0-9:.]+' | sed 's/Duration: //' || echo 'unknown')"
SRC_VIDEO="$(probe "$INPUT" 'Video: [a-zA-Z0-9_]+' | sed 's/Video: //' || echo 'unknown')"
SRC_RES="$(probe "$INPUT" '[0-9]{3,5}x[0-9]{3,5}' || echo 'unknown')"
HAS_AUDIO="$(probe "$INPUT" 'Audio: [a-zA-Z0-9_]+' || true)"
echo "  length : ${DURATION:-unknown}   codec: ${SRC_VIDEO:-unknown}   ${SRC_RES:-unknown}"
echo "  audio  : ${HAS_AUDIO:-none detected}"

mkdir -p "$MEDIA_DIR" "$DOCS_DIR"

# ── 3. transcode to a portable, streamable MP4 ────────────────────────
# H.264 High + yuv420p plays in every modern browser and on GitHub's own
# blob viewer. +faststart moves the moov atom to the front so the film
# begins playing before it finishes downloading.
AUDIO_ARGS=(-c:a aac -b:a 128k -ac 2)
[[ -z "$HAS_AUDIO" ]] && AUDIO_ARGS=(-an)

# Cap the frame rate at 30 only when the source is higher — the fps filter
# cannot read the input rate as an expression, so decide it up front.
SRC_FPS="$(probe "$INPUT" '[0-9]+(\.[0-9]+)? fps' | grep -oE '^[0-9]+(\.[0-9]+)?' || true)"
VF="scale='min(${MAX_WIDTH},iw)':-2:flags=lanczos,format=yuv420p"
if [[ -n "$SRC_FPS" ]] && python3 -c "import sys;sys.exit(0 if float('$SRC_FPS')>30.5 else 1)"; then
  VF="scale='min(${MAX_WIDTH},iw)':-2:flags=lanczos,fps=30,format=yuv420p"
  echo "  fps    : ${SRC_FPS} → capped at 30"
fi

echo "  → transcoding to $OUT_VIDEO"
"$FF" -hide_banner -loglevel error -stats -y -i "$INPUT" \
  -vf "$VF" \
  -c:v libx264 -preset "$PRESET" -crf "$CRF" -profile:v high -level:v 4.1 \
  -pix_fmt yuv420p \
  "${AUDIO_ARGS[@]}" \
  -movflags +faststart \
  "$OUT_VIDEO"

if [[ ! -s "$OUT_VIDEO" ]]; then
  echo "error: transcode produced no output." >&2
  exit 1
fi

# ── 4. poster frame from the real video ───────────────────────────────
FRAME_TMP="$(mktemp --suffix=.jpg)"
trap 'rm -f "$FRAME_TMP"' EXIT

# Grab a frame a tenth of the way in — usually past any fade-in, still
# representative. Falls back to the first frame for very short clips.
SECONDS_IN="$(python3 - "$DURATION" <<'PY'
import sys
raw = sys.argv[1].strip()
try:
    h, m, s = raw.split(":")
    total = int(h) * 3600 + int(m) * 60 + float(s)
    print(f"{max(0.1, min(total * 0.1, total - 0.2)):.3f}")
except Exception:
    print("0.5")
PY
)"
"$FF" -hide_banner -loglevel error -y -ss "$SECONDS_IN" -i "$OUT_VIDEO" -frames:v 1 -q:v 2 "$FRAME_TMP" \
  || "$FF" -hide_banner -loglevel error -y -i "$OUT_VIDEO" -frames:v 1 -q:v 2 "$FRAME_TMP"

# ── 5. branded poster + README thumbnail ──────────────────────────────
echo "  → composing poster + README thumbnail"
python3 scripts/make_poster.py "$FRAME_TMP" --poster "$OUT_POSTER" --thumb "$OUT_THUMB"

# ── 6. report ─────────────────────────────────────────────────────────
OUT_SIZE_MB=$(python3 -c "import os;print(f'{os.path.getsize(\"$OUT_VIDEO\")/1048576:.1f}')")
echo
echo "done."
echo "  video  : $OUT_VIDEO  (${OUT_SIZE_MB} MB)"
echo "  poster : $OUT_POSTER"
echo "  thumb  : $OUT_THUMB"
echo "  on site: /${OUT_VIDEO#public/}"
python3 - "$OUT_SIZE_MB" <<'PY'
import sys
mb = float(sys.argv[1])
if mb > 100:
    print("\nWARNING: over GitHub's hard 100 MB per-file limit — the push will be")
    print("         rejected. Host it on YouTube/Vercel Blob and point the README")
    print("         at that URL instead.")
elif mb > 50:
    print("\nNOTE: over GitHub's 50 MB warning threshold. Consider Git LFS, or")
    print("      raise CRF (e.g. CRF=26 ./scripts/prepare-video.sh ...) to shrink it.")
PY
