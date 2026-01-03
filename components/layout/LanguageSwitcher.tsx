'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { trackEvents } from '@/lib/analytics';
import { cn } from '@/lib/utils';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    if (newLocale === locale) return;
    trackEvents.languageChange(newLocale);
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPathname);
  };

  return (
    <div className="flex items-center gap-1 text-sm font-medium">
      <button onClick={() => switchLocale('es')} className={cn('px-2 py-1 rounded transition-colors', locale === 'es' ? 'text-onca-orange bg-onca-orange/10' : 'text-gray-500 hover:text-gray-700')}>ES</button>
      <span className="text-gray-300">|</span>
      <button onClick={() => switchLocale('en')} className={cn('px-2 py-1 rounded transition-colors', locale === 'en' ? 'text-onca-orange bg-onca-orange/10' : 'text-gray-500 hover:text-gray-700')}>EN</button>
    </div>
  );
}
