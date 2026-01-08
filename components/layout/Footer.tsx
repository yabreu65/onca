'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Phone, Mail, Linkedin, Instagram } from 'lucide-react';
import { siteConfig, serviceKeys, getServiceSlug } from '@/lib/utils';
import Logo from '@/components/ui/Logo';

export default function Footer() {
  const t = useTranslations('footer');
  const tServices = useTranslations('services.tabs');
  const locale = useLocale();

  const getLocalizedPath = (path: string) => {
    return locale === 'es' ? path : `/${locale}${path}`;
  };

  return (
    <footer className="bg-gray-900 text-white font-roboto">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-wrap gap-8">
          <div className="w-full md:w-[calc(50%-1rem)] xl:w-[calc(25%-1.5rem)]">
            <Logo variant="white" />
            <p className="mt-4 text-gray-400 text-sm">{t('description')}</p>
          </div>
          <div className="w-full md:w-[calc(50%-1rem)] xl:w-[calc(25%-1.5rem)]">
            <h4 className="font-bold text-lg mb-4">{t('services')}</h4>
            <ul className="flex flex-col gap-2">
              {serviceKeys.map((key) => (<li key={key}><Link href={getLocalizedPath(`/servicios/${getServiceSlug(key)}`)} className="text-gray-400 hover:text-onca-orange transition-colors text-sm block">{tServices(key)}</Link></li>))}
            </ul>
          </div>
          <div className="w-full md:w-[calc(50%-1rem)] xl:w-[calc(25%-1.5rem)]">
            <h4 className="font-bold text-lg mb-4">{t('contact')}</h4>
            <ul className="space-y-3">
              <li><a href={`tel:${siteConfig.phone}`} className="flex items-center gap-2 text-gray-400 hover:text-onca-orange text-sm"><Phone size={16} />{siteConfig.phone}</a></li>
              <li><a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 text-gray-400 hover:text-onca-orange text-sm"><Mail size={16} />{siteConfig.email}</a></li>
            </ul>
          </div>
          <div className="w-full md:w-[calc(50%-1rem)] xl:w-[calc(25%-1.5rem)]">
            <h4 className="font-bold text-lg mb-4">{t('follow')}</h4>
            <div className="flex gap-3">
              <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-onca-orange transition-colors"><Linkedin size={20} /></a>
              <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-onca-orange transition-colors"><Instagram size={20} /></a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} ONCA IT. {t('rights')}</p>
          <div className="flex gap-6">
            <Link href={`/${locale}/privacidad`} className="hover:text-onca-orange">{t('privacy')}</Link>
            <Link href={`/${locale}/terminos`} className="hover:text-onca-orange">{t('terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
