'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Mail, ChevronDown } from 'lucide-react';
import { cn, siteConfig, serviceKeys, getServiceSlug } from '@/lib/utils';
import { trackEvents } from '@/lib/analytics';
import Logo from '@/components/ui/Logo';
import Image from "next/image";

export default function Header() {
  const t = useTranslations('nav');
  const tServices = useTranslations('services.tabs');
  const locale = useLocale();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileMenuOpen(false); setServicesOpen(false); }, [pathname]);

  const getLocalizedPath = (path: string) => {
    return locale === 'es' ? path : `/${locale}${path}`;
  };

  const navItems = [
    { label: t('home'), href: getLocalizedPath('/') },
    { label: t('services'), href: getLocalizedPath('/servicios'), hasDropdown: true },
    { label: t('cases'), href: getLocalizedPath('/casos-de-exito') },
    { label: t('partners'), href: getLocalizedPath('/partners') },
    { label: t('contact'), href: getLocalizedPath('/#contacto') },
  ];

  return (
    <>
      {/* Barra superior gris oscuro */}
      <div className="bg-[#1D1D1B] text-white py-4 md:block">
        <div className="text-xs md:text-xl font-roboto  px-4 flex justify-center gap-12 md:gap-32">
          <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-2 hover:text-onca-orange transition-colors">
            <Phone size={0} />{siteConfig.phone}
          </a>
          <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 hover:text-onca-orange transition-colors">
            <Mail size={0} />{siteConfig.email}
          </a>
        </div>
      </div>

      {/* Header principal con diagonal usando flexbox */}
      <header className={cn('sticky max-[400px]:px-0 px-6 xl:pl-12 top-0 z-50 transition-all duration-300', isScrolled ? 'shadow-lg' : '')}>
        {/* Fondo blanco base */}
        <div className="absolute inset-0 bg-white" />

        {/* Fondo naranja con forma diagonal usando SVG */}
        <div className="absolute inset-0 flex justify-end">
           <Image
                    src="/images/test2.svg"
                    alt="Ecosystem"
                    width={120}
                    height={120}
                     className="pointer-events-none w-[70%] lg:w-[80%]"
                  />
        </div>

        {/* Contenido del header con flexbox */}
        <div className=" xl:max-w-[95%]  py-0 md:py-6 relative">
          <div className="flex items-center justify-between h-20">
            {/* Logo - sobre fondo blanco */}
            <Link href={getLocalizedPath('/')} className="relative z-10 scale-90">
              <Logo />
            </Link>

            {/* Navegación desktop - sobre fondo naranja */}
            <nav className="hidden font-roboto font-normal text-2xl lg:flex items-center  relative z-10">
              {navItems.map((item) => (
                <div key={item.href} className="relative group px-4">
                  {item.hasDropdown ? (
                    <button
                      className="text-white hover:text-white/80 font-roboto text-2xl font-light transition-colors duration-200 flex items-center gap-1"
                      onMouseEnter={() => setServicesOpen(true)}
                      onMouseLeave={() => setServicesOpen(false)}
                    >
                      {item.label}
                      <ChevronDown size={16} className={cn('transition-transform', servicesOpen && 'rotate-180')} />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-white hover:text-white/80 font-roboto font-light text-md transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  )}

                  {/* Dropdown de servicios */}
                  {item.hasDropdown && (
                    <div
                      className={cn(
                        'absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border',
                        'opacity-0 invisible translate-y-2 transition-all duration-200',
                        'group-hover:opacity-100 group-hover:visible group-hover:translate-y-0'
                      )}
                      onMouseEnter={() => setServicesOpen(true)}
                      onMouseLeave={() => setServicesOpen(false)}
                    >
                      <div className="p-2">
                        {serviceKeys.map((key) => (
                          <Link
                            key={key}
                            href={getLocalizedPath(`/servicios/${getServiceSlug(key)}`)}
                            className="block px-4 py-3 rounded-lg hover:bg-onca-orange/10 text-gray-700 hover:text-onca-orange transition-colors"
                          >
                            {tServices(key)}
                          </Link>
                        ))}
                        <hr className="my-2" />
                        <Link
                          href={getLocalizedPath('/servicios')}
                          className="block px-4 py-3 rounded-lg hover:bg-onca-orange/10 text-onca-orange font-medium"
                        >
                          Ver todos →
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Botones derecha - sobre fondo naranja */}
            <div className="hidden lg:flex font-roboto lg:text-md xl:text-xl items-center gap-4 relative z-10">
              <Link
                href={getLocalizedPath('/#contacto')}
                className="btn-primary"
                onClick={() => trackEvents.ctaClick('Header CTA')}
              >
                {t('cta')}
              </Link>
            </div>

            {/* Botón menú móvil */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-onca-orange-dark text-white  relative z-10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        <div className={cn(
          'lg:hidden overflow-hidden transition-all duration-300 bg-white border-t relative z-10',
          mobileMenuOpen ? 'max-h-[80vh]' : 'max-h-0'
        )}>
          <nav className="flex flex-col p-4 gap-2">
            {navItems.map((item) => (
              <div key={item.href}>
                {item.hasDropdown ? (
                  <>
                    <button
                      className="w-full flex items-center justify-between py-3 px-4 rounded-lg hover:bg-gray-100 text-gray-700"
                      onClick={() => setServicesOpen(!servicesOpen)}
                    >
                      {item.label}
                      <ChevronDown size={20} className={cn('transition-transform', servicesOpen && 'rotate-180')} />
                    </button>
                    <div className={cn('overflow-hidden transition-all pl-4', servicesOpen ? 'max-h-96' : 'max-h-0')}>
                      {serviceKeys.map((key) => (
                        <Link
                          key={key}
                          href={getLocalizedPath(`/servicios/${getServiceSlug(key)}`)}
                          className="block py-2 px-4 text-gray-600 hover:text-onca-orange"
                          onClick={() => setMobileMenuOpen(false)}
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
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <hr className="my-2" />
            <Link
              href={getLocalizedPath('/#contacto')}
              className="btn-primary text-center mt-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('cta')}
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
