import type {Metadata} from 'next';
import {Montserrat, Open_Sans, Poppins, Roboto_Condensed} from 'next/font/google';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getTranslations, setRequestLocale} from 'next-intl/server';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import Analytics from '@/components/layout/Analytics';

const montserrat = Montserrat({subsets: ['latin'], variable: '--font-montserrat', display: 'swap'});
const openSans = Open_Sans({subsets: ['latin'], variable: '--font-opensans', display: 'swap'});
const poppins = Poppins({weight: ['400', '600'], subsets: ['latin'], variable: '--font-poppins', display: 'swap'});
const robotoCondensed = Roboto_Condensed({weight: ['300', '400', '700'], subsets: ['latin'], variable: '--font-roboto-condensed', display: 'swap'});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({locale: 'es', namespace: 'metadata'});

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://oncait.com.ar'),
    title: {default: t('title'), template: '%s | ONCA IT'},
    description: t('description'),
    keywords: ['ERP móvil', 'gestión empresarial', 'app Android empresas', 'software logístico'],
    openGraph: {
      type: 'website',
      locale: 'es_AR',
      url: 'https://oncait.com.ar/',
      siteName: 'ONCA IT',
      title: t('title'),
      description: t('description'),
      images: [{url: '/og-image.jpg', width: 1200, height: 630}]
    },
    robots: {index: true, follow: true}
  };
}

export default async function RootLayout({children}: {children: React.ReactNode}) {
  setRequestLocale('es');
  const messages = await getMessages({locale: 'es'});

  return (
    <html lang="es" className={`${montserrat.variable} ${openSans.variable} ${poppins.variable} ${robotoCondensed.variable}`}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon_48x48.svg" sizes="48x48" />
        <link rel="icon" type="image/svg+xml" href="/favicon_96x96.svg" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon_144x144.svg" sizes="144x144" />
        <link rel="apple-touch-icon" href="/favicon_144x144.svg" />
      </head>
      <body className="font-opensans antialiased">
        <NextIntlClientProvider locale="es" messages={messages}>
          <Analytics />
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
