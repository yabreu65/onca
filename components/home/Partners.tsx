'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { partners } from '@/lib/utils';

export default function Partners() {
  const t = useTranslations('partners');

  return (
    <section id="partners" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden mb-16 py-20 px-8">
          <Image src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80" alt="Ecosystem" fill className="object-cover" />
          <div className="absolute inset-0 bg-service-blue/85" />
          <div className="relative z-10 text-center">
            <h2 className="section-title text-white mb-4">{t('title')}</h2>
            <p className="max-w-3xl mx-auto text-blue-100 text-lg">{t('description')}</p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-6">
          {partners.map((partner, index) => (
            <div key={index} className="px-6 py-4 bg-gray-50 rounded-xl hover:bg-onca-orange/10 hover:shadow-md transition-all cursor-default group">
              <span className="text-gray-600 font-semibold group-hover:text-onca-orange transition-colors">{partner}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
