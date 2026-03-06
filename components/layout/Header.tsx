"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Mail, ChevronDown } from "lucide-react";
import Image from "next/image";

import { cn, siteConfig, serviceKeys, getServiceSlug } from "@/lib/utils";
import { trackEvents } from "@/lib/analytics";
import Logo from "@/components/ui/Logo";

/* =========================
   Hook: lock body scroll
   ========================= */
function useLockBodyScroll(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [active]);
}

/* =========================
   Hook: header bottom in viewport (MOST RELIABLE)
   - Measures getBoundingClientRect().bottom
   - Uses ResizeObserver + scroll/resize (rAF throttled)
   ========================= */
function useViewportBottom<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [bottom, setBottom] = useState(0);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;

    const update = () => {
      const r = el.getBoundingClientRect();
      // bottom relative to viewport top
      setBottom(Math.max(0, Math.round(r.bottom)));
    };

    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();

    const ro = new ResizeObserver(schedule);
    ro.observe(el);

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("load", schedule);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("load", schedule);
    };
  }, []);

  return { ref, bottom };
}

/* =========================
   Mobile Menu Drawer
   ========================= */
function MobileMenu({
  open,
  onClose,
  navItems,
  servicesOpen,
  setServicesOpen,
  tServices,
  t,
  getLocalizedPath,
  topOffset,
}: {
  open: boolean;
  onClose: () => void;
  navItems: { label: string; href: string; hasDropdown?: boolean }[];
  servicesOpen: boolean;
  setServicesOpen: (v: boolean) => void;
  tServices: (key: string) => string;
  t: (key: string) => string;
  getLocalizedPath: (path: string) => string;
  topOffset: number;
}) {
  useLockBodyScroll(open);

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed left-0 right-0 bottom-0 bg-black/40 backdrop-blur-md",
          "z-30 transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        style={{ top: topOffset }}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside
        className={cn(
          "fixed right-0 w-[85%] max-w-sm bg-white z-40",
          "transform transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full",
        )}
        style={{
          top: topOffset,
          height: `calc(100dvh - ${topOffset}px)`,
        }}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <span className="font-semibold text-gray-900">Menú</span>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100"
            aria-label="Cerrar menú"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex flex-col p-4 gap-2 overflow-y-auto">
          {navItems.map((item) => (
            <div key={item.href}>
              {item.hasDropdown ? (
                <>
                  <button
                    className="w-full flex items-center justify-between py-3 px-4 rounded-lg hover:bg-gray-100 text-gray-700"
                    onClick={() => setServicesOpen(!servicesOpen)}
                    aria-expanded={servicesOpen}
                  >
                    {item.label}
                    <ChevronDown
                      size={18}
                      className={cn(
                        "transition-transform",
                        servicesOpen && "rotate-180",
                      )}
                    />
                  </button>

                  <div
                    className={cn(
                      "overflow-hidden transition-all pl-4",
                      servicesOpen ? "max-h-96" : "max-h-0",
                    )}
                  >
                    {serviceKeys.map((key) => (
                      <Link
                        key={key}
                        href={getLocalizedPath(
                          `/servicios/${getServiceSlug(key)}`,
                        )}
                        className="block py-2 px-4 text-gray-600 hover:text-onca-orange"
                        onClick={onClose}
                      >
                        {tServices(key)}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  href={item.href}
                  className="block py-3 px-4 rounded-lg hover:bg-gray-100 text-gray-700"
                  onClick={onClose}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}

          <hr className="my-3" />

          <Link
            href={getLocalizedPath("/#contacto")}
            className="btn-primary text-center mt-2"
            onClick={onClose}
          >
            {t("cta")}
          </Link>
        </nav>
      </aside>
    </>
  );
}

/* =========================
   Header
   ========================= */
export default function Header() {
  const t = useTranslations("nav");
  const tServices = useTranslations("services.tabs");
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  // ✅ we measure the REAL bottom of the header (includes topbar effect when not sticky)
  const { ref: headerRef, bottom: headerBottomPx } =
    useViewportBottom<HTMLElement>();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  const getLocalizedPath = (path: string) => path;

  const navItems = useMemo(
    () => [
      { label: t("home"), href: getLocalizedPath("/") },
      {
        label: t("services"),
        href: getLocalizedPath("/servicios"),
        hasDropdown: true,
      },
      { label: t("cases"), href: getLocalizedPath("/#casos-de-exito") },
      { label: t("partners"), href: getLocalizedPath("/#partners") },
      { label: t("contact"), href: getLocalizedPath("/#contacto") },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname],
  );

  return (
    <>
      {/* Top bar (scrolls with the page) */}
      <div className="bg-[#1D1D1B] text-white py-4 md:block">
        <div className="text-xs md:text-xl font-roboto px-4 flex justify-center gap-12 md:gap-32">
          <a
            href={`tel:${siteConfig.phone}`}
            className="flex items-center gap-2 hover:text-onca-orange"
          >
            <Phone size={14} />
            {siteConfig.phone}
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="flex items-center gap-2 hover:text-onca-orange"
          >
            <Mail size={14} />
            {siteConfig.email}
          </a>
        </div>
      </div>

      {/* Sticky Header */}
      <header
        ref={headerRef}
        className={cn(
          "relative isolate top-0 z-[999] w-full bg-white/80 backdrop-blur-sm transition-all duration-300 px-6",
          isScrolled && "shadow-lg",
        )}
      >
        <div className="absolute inset-0 flex justify-end">
          <Image
            src="/images/test2.svg"
            alt="Background"
            width={120}
            height={120}
            className="pointer-events-none max-sm:w-[60%] w-[70%]"
          />
        </div>

        <div className="relative py-0 md:py-14">
          <div className="flex items-center justify-between h-20">
            <Link href={getLocalizedPath("/")} className="relative z-10">
              <Logo />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center relative z-10">
              {navItems.map((item) => (
                <div
                  key={item.href}
                  className="relative font-light xl:text-xl font-roboto group px-4"
                >
                  {item.hasDropdown ? (
                    <button className="text-white flex items-center gap-1">
                      {item.label}
                      <ChevronDown size={16} />
                    </button>
                  ) : (
                    <Link href={item.href} className="text-white">
                      {item.label}
                    </Link>
                  )}

                  {item.hasDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                      <div className="p-2">
                        {serviceKeys.map((key) => (
                          <Link
                            key={key}
                            href={getLocalizedPath(
                              `/servicios/${getServiceSlug(key)}`,
                            )}
                            className="block px-4 py-3 rounded-lg hover:bg-onca-orange/10"
                          >
                            {tServices(key)}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex relative z-10">
              <Link
                href={getLocalizedPath("/#contacto")}
                className="btn-primary"
                onClick={() => trackEvents.ctaClick("Header CTA")}
              >
                {t("cta")}
              </Link>
            </div>

            {/* Mobile button */}
            <button
              className="lg:hidden p-2 text-white relative z-10"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Abrir menú"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileMenu
        open={mobileMenuOpen}
        onClose={() => {
          setMobileMenuOpen(false);
          setServicesOpen(false);
        }}
        navItems={navItems}
        servicesOpen={servicesOpen}
        setServicesOpen={setServicesOpen}
        tServices={tServices}
        t={t}
        getLocalizedPath={getLocalizedPath}
        // ✅ THIS is the key: use actual viewport bottom of header
        topOffset={headerBottomPx}
      />
    </>
  );
}
