import type { Metadata } from 'next';
import { Montserrat, Open_Sans } from 'next/font/google';
import '../globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import Analytics from '@/components/layout/Analytics';

const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat', display: 'swap' });
const openSans = Open_Sans({ subsets: ['latin'], variable: '--font-opensans', display: 'swap' });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages();
  const t = messages.metadata as { title: string; description: string };
  return {
    title: { default: t.title, template: '%s | ONCA IT' },
    description: t.description,
    keywords: ['ERP móvil', 'gestión empresarial', 'app Android empresas', 'software logístico'],
    openGraph: { type: 'website', locale: locale === 'es' ? 'es_AR' : 'en_US', url: 'https://oncait.com.ar', siteName: 'ONCA IT', title: t.title, description: t.description, images: [{ url: '/og-image.jpg', width: 1200, height: 630 }] },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${montserrat.variable} ${openSans.variable}`}>
      <head><Analytics /></head>
      <body className="font-opensans antialiased">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
