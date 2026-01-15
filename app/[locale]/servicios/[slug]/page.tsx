import { notFound } from "next/navigation";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Play } from "lucide-react";
import {
  serviceKeys,
  serviceIcons,
  serviceSlugs,
  getServiceSlug,
  type ServiceKey,
  serviceVideos,
} from "@/lib/utils";

export function generateStaticParams() {
  // Generate params for all slugs (both Spanish and English)
  return Object.keys(serviceSlugs).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const resolvedParams = await params;
  const serviceKey = serviceSlugs[resolvedParams.slug];
  if (!serviceKey) return { title: "Not found" };
  const t = await getTranslations({
    locale: resolvedParams.locale,
    namespace: "services",
  });
  return {
    title: t(`items.${serviceKey}.title`),
    description: t(`items.${serviceKey}.description`),
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const serviceKey = serviceSlugs[slug] as ServiceKey;
  if (!serviceKey) notFound();

  const t = await getTranslations({ locale, namespace: "services" });
  const currentIndex = serviceKeys.indexOf(serviceKey);

  const getLocalizedPath = (path: string) => {
    return locale === "es" ? path : `/${locale}${path}`;
  };

  return (
    <div className="min-h-screen">
      {/* Services navigation */}
      <div className="bg-white py-5 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2 md:gap-8 text-sm relative">
            {serviceKeys.map((key) => (
              <Link
                key={key}
                href={getLocalizedPath(`/servicios/${getServiceSlug(key)}`)}
                className={`px-4 py-2 transition-all duration-200 whitespace-nowrap ${
                  key === serviceKey
                    ? "text-black font-bold relative"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                {t(`tabs.${key}`)}
                {key === serviceKey && (
                  <div className="absolute -bottom-5 left-0 right-0 hidden lg:block">
                    <div className="h-1.5 bg-onca-orange rounded-sm" />
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main content - Black background */}
      <div className="bg-[#2C2F31] text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left side - Service cards */}
            <div className="space-y-8">
              {/* Blue card with icon */}
              <div className="relative">
                <div className="bg-white rounded-3xl overflow-hidden">
                  {/* Orange icon badge at top */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-4xl shadow-xl border-4 border-white z-10">
                    {serviceIcons[serviceKey]}
                  </div>

                  {/* Blue top section - Title only */}
                  <div className="w-[98.5%] bg-[#035099] font-roboto pt-16 pb-6 px-8 rounded-t-3xl border-t-4 border-white mx-auto">
                    <h1 className="text-2xl md:text-3xl font-bold text-center text-white">
                      {t(`items.${serviceKey}.title`)}
                    </h1>
                  </div>

                  {/* White bottom section - Subtitle and description */}
                  <div className="bg-service-light font-roboto  p-8 pt-6">
                    <p className="text-gray-900 leading-relaxed mb-4 text-lg font-semibold">
                      {t(`items.${serviceKey}.subtitle`)}
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      {t(`items.${serviceKey}.description`)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Orange card with benefits */}
              <div className="bg-onca-orange rounded-3xl p-8 font-roboto ">
                <p className="text-white leading-relaxed text-base">
                  {t(`items.${serviceKey}.highlight`)}
                </p>
              </div>
            </div>

            {/* Right side - Phone mockup */}
            <div className="flex justify-center lg:justify-end relative">
              <div className="relative">
                {/* Phone mockup */}
                <div className="flex justify-center w-full relative z-10">
                  {serviceVideos[serviceKey] && (
                    <video
                      className="w-1/2 max-w-5xl rounded-2xl shadow-xl"
                      src={serviceVideos[serviceKey]}
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
