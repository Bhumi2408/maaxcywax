"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { navLinks } from "./data";

function Logo() {
  return (
    <a href="#" className="site-logo" rel="home">
      <Image src="/logo.png" alt="Maaxcy International" width={704} height={734} priority />
    </a>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="site-header">
        <div className="header-row header-desktop">
          <div className="header-inner">
            <div className="header-col header-start">
              <Logo />
            </div>
            <div className="header-col header-middle">
              <nav className="header-menu" aria-label="Primary Menu">
                <ul>
                  {navLinks.map((link, i) => (
                    <li key={link.label} className={i === 0 ? "current" : undefined}>
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div className="header-col header-end">
              <a href="#contact" className="header-cta">
                Enquiry Now
              </a>
            </div>
          </div>
        </div>

        <div className="header-row header-mobile">
          <div className="header-inner">
            <div className="header-col header-start">
              <Logo />
            </div>
            <div className="header-col header-end">
              <button
                type="button"
                className="menu-trigger"
                aria-label="Menu"
                aria-expanded={open}
                onClick={() => setOpen(true)}
              >
                <svg width="18" height="18" viewBox="0 0 18 14" aria-hidden="true">
                  <rect y="0.00" width="18" height="1.7" rx="1" />
                  <rect y="6.15" width="18" height="1.7" rx="1" />
                  <rect y="12.3" width="18" height="1.7" rx="1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`offcanvas${open ? " is-open" : ""}`}
        aria-hidden={!open}
        inert={!open}
        onClick={() => setOpen(false)}
      >
        <div className="offcanvas-inner" onClick={(e) => e.stopPropagation()}>
          <div className="offcanvas-actions">
            <button type="button" className="offcanvas-close" aria-label="Close drawer" onClick={() => setOpen(false)}>
              <svg width="12" height="12" viewBox="0 0 15 15" aria-hidden="true">
                <path d="M1 15a1 1 0 01-.71-.29 1 1 0 010-1.41l5.8-5.8-5.8-5.8A1 1 0 011.7.29l5.8 5.8 5.8-5.8a1 1 0 011.41 1.41l-5.8 5.8 5.8 5.8a1 1 0 01-1.41 1.41l-5.8-5.8-5.8 5.8A1 1 0 011 15z" />
              </svg>
            </button>
          </div>
          <nav className="mobile-menu">
            <ul>
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} onClick={() => setOpen(false)}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
