"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { partners } from "@/lib/utils";

export default function Partners() {
  const t = useTranslations("partners");

  return (
    <section id="partners" className="bg-white w-full">
      {/* Imagen */}
      <div className="relative w-full h-[300px] md:h-[600px] overflow-hidden">
        <Image
          src="/images/Ecosistema.jpg"
          alt="Ecosystem"
          fill
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 flex items-center justify-center bg-black/10">
          <h2 className="section-title font-poppins font-semibold text-white">
            {t("title")}
          </h2>
        </div>
      </div>

      {/* Franja azul */}
      <div className="w-full bg-service-blue py-4">
        <p className="font-roboto max-sm:text-xs max-sm:px-6 max-w-4xl mx-auto text-blue-100 text-center font-semibold">
          {t("description")}
        </p>
      </div>

      {/* Logos */}
      <div className="bg-white flex flex-wrap justify-center gap-6 px-8 pb-16 pt-12">
        {partners.map((partner, index) => (
          <div key={index} className="relative w-16 h-16 sm:w-20 sm:h-20">
            <Image
              src={partner.logo}
              alt={partner.name}
              fill
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
