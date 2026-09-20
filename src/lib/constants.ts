/**
 * SignBridge — site-wide constants.
 *
 * APP_URL points at the live SignBridge application.
 * Change this single value to wherever the app is deployed.
 */
export const APP_URL = "/app/app.html";

export const NAV_LINKS = [
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
  "about",
  "how-it-works",
  "technology",
  "privacy",
  "applications",
  "status",
  "try",
  "team",
] as const;
