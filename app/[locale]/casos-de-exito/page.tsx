import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Quote } from 'lucide-react';
import { testimonials } from '@/lib/utils';

export default function CasosDeExitoPage() {
  const t = useTranslations('testimonials');
  const locale = useLocale() as 'es' | 'en';

  return (
    <div className="min-h-screen">
      <section className="bg-onca-orange py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="section-title text-white mb-4">{t('title')}</h1>
          <p className="text-white/80 text-lg">{t('subtitle')}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
                <div className="md:w-1/3 h-48 md:h-auto relative">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="md:w-2/3 p-6">
                  <Quote size={32} className="text-onca-orange mb-4" />
                  <p className="text-gray-700 italic mb-6">"{item.quote[locale]}"</p>
                  <div>
                    <h3 className="font-bold text-gray-900">{item.company}</h3>
                    <p className="text-onca-orange">{item.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
