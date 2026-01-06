"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { partners } from "@/lib/utils";

export default function Partners() {
  const t = useTranslations("partners");

  return (
    <section id="partners" className="bg-white">
      <div className="w-full mx-auto">
        {/* Imagen como fondo que toma su tamaño real */}
        <div className="relative overflow-hidden">
          <Image
            src="/images/Ecosistema.jpg"
            alt="Ecosystem"
            width={1920}
            height={600}
            className="h-auto md:h-[600px]"
          />

          {/* Overlay con texto */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/10">
            <h2 className="section-title font-semibold font-poppins text-white mb-4">{t("title")}</h2>
          </div>
        </div>
        <div className="w-full bg-[#005094] py-4">
          <p className="font-poppins font-medium max-w-3xl mx-auto text-blue-100 text-sm text-center">
            {t("description")}
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-6 px-8 pb-16">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="px-6 py-4 bg-gray-50 rounded-xl hover:bg-onca-orange/10 hover:shadow-md transition-all cursor-default group"
            >
              <span className="text-gray-600 font-semibold group-hover:text-onca-orange transition-colors">
                {partner}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
