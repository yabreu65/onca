import { getTranslations } from 'next-intl/server';

export default async function TerminosPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'terms' });

  return (
    <div className="min-h-screen">
      <section className="bg-dark text-white py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="section-title text-onca-orange mb-4">{t('title')}</h1>
          <p className="text-gray-300">
            {t('lastUpdated', {
              date: new Date().toLocaleDateString(locale === 'es' ? 'es-AR' : 'en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }),
            })}
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-8">{t('intro')}</p>

            <div className="space-y-8">
              <div className="bg-gray-50 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('sections.services.title')}</h2>
                <p className="text-gray-700">{t('sections.services.content')}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('sections.intellectual.title')}</h2>
                <p className="text-gray-700">{t('sections.intellectual.content')}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('sections.liability.title')}</h2>
                <p className="text-gray-700">{t('sections.liability.content')}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('sections.modifications.title')}</h2>
                <p className="text-gray-700">{t('sections.modifications.content')}</p>
              </div>
            </div>

            <div className="mt-12 p-6 bg-onca-orange/10 border-l-4 border-onca-orange rounded-r-xl">
              <p className="text-gray-900 font-medium">
                {locale === 'es'
                  ? 'Al utilizar nuestros servicios, aceptás estos términos y condiciones en su totalidad.'
                  : 'By using our services, you accept these terms and conditions in full.'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
