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
            <h2
              className="section-title font-semibold font-poppins text-white mb-4"
              style={{ textShadow: '3px 3px 10px rgba(0, 0, 0, 0.9), -1px -1px 5px rgba(0, 0, 0, 0.7)' }}
            >
              {t("title")}
            </h2>
          </div>
        </div>
        <div className="w-full bg-[#005094] py-4">
          <p className="font-poppins  max-w-3xl mx-auto text-blue-100 text-[10px] md:text-[13px] text-center font-semibold">
            {t("description")}
          </p>
        </div>

        <div className="bg-orange-200 flex flex-wrap justify-center items-center gap-6 px-8 pb-16 pt-12">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="relative w-16 h-16 sm:w-20 sm:h-20  flex items-center justify-center transition-all duration-300 hover:scale-105"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
