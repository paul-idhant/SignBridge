import { FOOTER_LINKS } from "../lib/constants";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-bg">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <a href="#home" aria-label="SignBridge — back to top">
              <Logo size={30} />
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Bridging Communication. Breaking Barriers.
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer">
            <h2 className="font-mono text-xs font-medium uppercase tracking-[0.24em] text-muted">
              Navigation
            </h2>
            <ul className="mt-5 space-y-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted transition-colors duration-200 hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Project */}
          <div>
            <h2 className="font-mono text-xs font-medium uppercase tracking-[0.24em] text-muted">
              The project
            </h2>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              An assistive communication prototype built with MediaPipe hand
              tracking and browser-native speech technologies.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              <p className="inline-flex items-center gap-2 rounded border border-line bg-surface px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-warning" />
                Status · Prototype build
              </p>
              <p className="inline-flex items-center gap-2 rounded border border-line bg-surface px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
                Company · <span className="text-ink">IFNOVA</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-line pt-7 sm:flex-row sm:items-center">
          <p className="text-sm text-muted">
            © {year} <span className="font-medium text-ink">IFNOVA</span>
            <span aria-hidden="true" className="mx-1.5 text-accent">·</span>
            SignBridge
          </p>
          <p className="text-sm text-muted">
            Designed and built by{" "}
            <span className="font-medium text-ink">Idhant</span>
            <span aria-hidden="true" className="mx-1.5 text-accent">·</span>
            <span className="font-medium text-ink">Felina</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
