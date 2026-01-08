import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { partners } from '@/lib/utils';

export default function PartnersPage() {
  const t = useTranslations('partners');

  return (
    <div className="min-h-screen">
      <section className="relative py-32">
        <Image src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80" alt="Partners" fill className="object-cover" />
        <div className="absolute inset-0 bg-service-blue/90" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="section-title text-white mb-4">{t('title')}</h1>
          <p className="text-blue-100 text-lg max-w-3xl mx-auto">{t('description')}</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {partners.map((partner, index) => (
              <div key={index} className="relative h-24 flex items-center justify-center transition-all duration-300 hover:scale-105">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain p-4"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
