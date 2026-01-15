"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Play } from "lucide-react";
import {
  cn,
  serviceKeys,
  serviceIcons,
  getServiceSlug,
  type ServiceKey,
} from "@/lib/utils";
import { trackEvents } from "@/lib/analytics";

export default function ServicesPreview() {
  const t = useTranslations("services");
  const locale = useLocale();
  const [activeService, setActiveService] = useState<ServiceKey>("visits");

  const getLocalizedPath = (path: string) => {
    return locale === "es" ? path : `/${locale}${path}`;
  };

  const handleServiceChange = (key: ServiceKey) => {
    setActiveService(key);
    trackEvents.serviceView(key);
  };

  return (
    <section id="servicios" className="w-full">
      {/* Top contact bar */}
      <div className="bg-[#1D1D1B] text-white py-2 md:py-6">
        <div className="max-w-7xl mx-auto  font-roboto text-xs md:text-xl px-4 flex justify-center gap-8">
          <span>+54 11 333 3333</span>
          <span>mail@oncait.com.ar</span>
        </div>
      </div>

      {/* Blue header section */}
      <div
        className="relative text-white overflow-hidden py-4"
        style={{
          background:
            "linear-gradient(to top, #000 20%, #020305 60%, #03060a 80%, #1B3A57 100%)",
        }}
      >
        {/* Background image */}
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src="/images/Firefly digital blue electric background with digital info 16224.jpg"
            alt="Digital background"
            fill
            className="object-cover opacity-80"
            priority
            sizes="100vw"
          />
          {/* Overlay gradient to ensure text readability */}
          <div
            className="absolute inset-0 bg-black/20"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.99), rgba(0,0,0,0.7), rgba(0,0,0,0.1), transparent)",
            }}
          />
        </div>

        <div className="max-w-[94%] mx-auto  pb-6 relative z-10">
          {/* Logo */}
          <div className="relativeflex flex-col items-center">
            <Image
              src="/images/logo-page.svg"
              alt="Logo"
              width={120}
              height={120}
              className="absolute pointer-events-none w-12 sm:w-16"
            />

            <div className="flex flex-col justify-center items-center w-full mx-auto">
              <h2 className="text-4xl md:text-6xl font-poppins font-bold mb-6 tracking-tight">
                SERVICIOS
              </h2>
              <p
                className="w-[80%] lg:w-[70%] font-roboto text-lg md:text-2xl  text-white leading-relaxed text-left"
                style={{ textAlign: "justify" }}
              >
                <span className="text-white font-roboto font-extrabold">
                  Onca Mobile
                </span>{" "}
                es una solución móvil pensada para digitalizar y optimizar las
                operaciones diarias de tu empresa. Integrada a tu sistema
                central o ERP, o en forma autónoma, permite registrar
                transacciones y actividades clave justo cuando ocurren, desde
                cualquier dispositivo Android, con o sin conexión en el momento.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="py-5">
        <div className=" flex flex-wrap justify-center gap-6 text-sm md:text-md">
          {serviceKeys.map((key) => (
            <Link
              key={key}
              href={getLocalizedPath(`/servicios/${getServiceSlug(key)}`)}
              onClick={() => handleServiceChange(key)}
              className={cn(
                "font-roboto px-4 py-2 text-black font-normal transition-all duration-200 text-center md:whitespace-nowrap hover:text-onca-orange"
              )}
            >
              {/*<span className="mr-2">{serviceIcons[key]}</span>*/}
              {t(`tabs.${key}`)}
            </Link>
          ))}
        </div>
      </div>

      {/* Black content section */}
      <div className="bg-[#2C2F31] text-white py-16 relative overflow-hidden">
        <div className="max-[450px]:max-w-7xl max-w-9xl mx-auto">
          <div className="grid lg:grid-cols-2  items-center">
            {/* Left side - Curved panels */}
            <div
              className="space-y-6 relative z-10 w-[95%]"
              key={activeService}
            >
              {/* Orange panel with curve on right */}
              <div className="relative">
                <div className="bg-onca-orange text-white max-[400px]:pl-1 pl-6 lg:pl-20 pr-16 py-3 lg:py-8 max-[400px]:rounded-none rounded-tr-[120px] rounded-br-[120px]">
                  <h3 className="text-md lg:text-xl font-roboto font-bold mb-1 uppercase tracking-wide">
                    PRINCIPALES BENEFICIOS
                  </h3>
                  <ul className="max-sm:w-[350px] text-white font-semibold md:space-y-1 font-roboto text-sm lg:text-xl leading-1">
                    <li>Elimina tareas manuales y registros en papel</li>
                    <li>
                      Reduce errores de carga y evita la duplicación de tareas
                    </li>
                    <li>
                      Información en tiempo real desde cualquier punto de
                      operación
                    </li>
                    <li>
                      Mejora la eficiencia operativa y la toma de decisiones
                    </li>
                  </ul>
                </div>
              </div>

              {/* White panel with curve on right */}
              <div className="relative">
                <div className="bg-white text-black max-[400px]:pl-1 pl-6 lg:pl-20 pr-16 lg:py-8 max-[400px]:rounded-none rounded-tr-[120px] rounded-br-[120px]">
                  <h3 className="text-md lg:text-xl font-roboto font-bold uppercase ">
                    PRINCIPALES CARACTERÍSTICAS
                  </h3>
                  <ul className="w-full font-roboto font-medium list-none text-sm lg:text-xl text-black">
                    <li className="whitespace-nowrap">
                      App móvil para Android: teléfonos, tablets, colectoras de
                      datos
                    </li>
                    <li className="whitespace-nowrap">
                      Captura de datos en tiempo real, en el momento y lugar del
                      hecho
                    </li>
                    <li className="whitespace-nowrap">
                      Integración flexible con ERPs o uso autónomo
                    </li>
                    <li className="whitespace-nowrap">
                      Sincronización bidireccional online/offline
                    </li>
                    <li>
                      Módulos configurables: pedidos, cobranzas, inventario,
                      entregas, visitas y más
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right side - Phone mockup */}
            <div className="flex justify-center relative max-lg:pt-12 ">
              <video
                className="w-1/2 max-w-5xl rounded-2xl shadow-xl"
                src="/videos/ERPM-TomaDePedidos(incluyeLOGIN).mov"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
