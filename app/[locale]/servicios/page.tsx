import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { ArrowRight, Check } from 'lucide-react';
import { serviceKeys, serviceIcons } from '@/lib/utils';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });
  return { title: t('title'), description: t('description') };
}

export default function ServiciosPage() {
  const t = useTranslations('services');
  const locale = useLocale();

  return (
    <div className="min-h-screen">
      <section className="bg-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="section-title text-onca-orange mb-6">{t('title')}</h1>
          <p className="max-w-4xl mx-auto text-lg text-gray-300">{t('description')}</p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceKeys.map((key) => (
              <Link key={key} href={`/${locale}/servicios/${key}`} className="group bg-white rounded-2xl shadow-lg overflow-hidden card-hover">
                <div className="bg-gradient-to-br from-service-blue to-blue-800 p-6">
                  <div className="w-16 h-16 bg-onca-orange rounded-xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">{serviceIcons[key]}</div>
                  <h3 className="text-xl font-bold text-white">{t(`items.${key}.title`)}</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4 line-clamp-3">{t(`items.${key}.description`)}</p>
                  <ul className="space-y-2 mb-6">
                    {(t.raw(`items.${key}.benefits`) as string[]).slice(0, 3).map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-600"><Check size={16} className="text-onca-orange flex-shrink-0 mt-0.5" />{benefit}</li>
                    ))}
                  </ul>
                  <span className="inline-flex items-center gap-2 text-onca-orange font-semibold group-hover:gap-4 transition-all">
                    {t('viewMore')}<ArrowRight size={18} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
