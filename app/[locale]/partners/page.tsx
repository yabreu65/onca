import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { partners } from '@/lib/utils';

export default function PartnersPage() {
  const t = useTranslations('partners');

  return (
    <div className="min-h-screen">
      <section className="relative py-32">
        <Image
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80"
          alt="Partners"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-service-blue/90" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="section-title text-white mb-4">{t('title')}</h1>
          <p className="text-blue-100 text-lg max-w-3xl mx-auto">{t('description')}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {partners.map((partner, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 flex items-center justify-center h-24 hover:bg-onca-orange/10 hover:shadow-lg transition-all cursor-default group">
                <span className="text-gray-700 font-semibold text-center group-hover:text-onca-orange transition-colors">{partner}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
