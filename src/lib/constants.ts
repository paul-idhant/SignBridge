/**
 * SignBridge — site-wide constants.
 *
 * APP_URL points at the live SignBridge application.
 * Change this single value to wherever the app is deployed.
 */
export const APP_URL = "/app/app.html";

/**
 * Advertisement / demo film and its poster still.
 * Prepared by scripts/prepare-video.sh — drop any source video in and it
 * produces both files. The Watch section degrades gracefully until they exist.
 */
export const AD_VIDEO_SRC = "/media/signbridge-ad.mp4";
export const AD_VIDEO_POSTER = "/media/signbridge-ad-poster.jpg";

export const NAV_LINKS = [
  { label: "Watch", href: "#watch" },
  { label: "About", href: "#about" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Technology", href: "#technology" },
  { label: "Privacy", href: "#privacy" },
  { label: "Applications", href: "#applications" },
  { label: "Team", href: "#team" },
] as const;

export const FOOTER_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Technology", href: "#technology" },
  { label: "Applications", href: "#applications" },
  { label: "Try SignBridge", href: "#try" },
] as const;

/** IDs observed by the navbar scroll-spy, in document order. */
export const SECTION_IDS = [
  "home",
  "watch",
  "about",
  "how-it-works",
  "technology",
  "privacy",
  "applications",
  "status",
  "try",
  "team",
] as const;
