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
        className="relative text-white overflow-hidden"
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
          <div className="flex">
            <div className="pt-8">
              <Image
                src="/images/logo-page.svg"
                alt="Logo"
                width={120}
                height={120}
                className="pointer-events-none w-72 lg:w-16"
              />
            </div>

            <div className="text-center pt-6 max-w-4xl mx-auto">
              <h2 className="text-5xl md:text-6xl font-poppins font-bold mb-6 tracking-tight">
                SERVICIOS
              </h2>
              <p className="font-roboto text-lg md:text-2xl text-gray-200 leading-relaxed text-left">
                <span className="text-white font-roboto font-bold">
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
        <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-2 md:gap-6 text-sm md:text-md">
          {serviceKeys.map((key) => (
            <Link
              key={key}
              href={getLocalizedPath(
                `/servicios/${getServiceSlug(key)}`
              )}
              onClick={() => handleServiceChange(key)}
              className={cn(
                "font-roboto px-4 py-2 text-black font-normal transition-all duration-200 text-center md:whitespace-nowrap hover:text-orange-500"
              )}
            >
              {/*<span className="mr-2">{serviceIcons[key]}</span>*/}
              {t(`tabs.${key}`)}
            </Link>
          ))}
        </div>
      </div>

      {/* Black content section */}
      <div className="bg-black text-white py-16 relative overflow-hidden">
        <div className="max-w-9xl mx-auto">
          <div className="grid lg:grid-cols-2  items-center">
            {/* Left side - Curved panels */}
            <div className="space-y-6 relative z-10 w-[90%]" key={activeService}>
              {/* Orange panel with curve on right */}
              <div className="relative">
                <div
                  className="bg-[#EA5B0C] text-white pl-20 pr-16 py-3"
                  style={{
                    borderTopRightRadius: "120px",
                    borderBottomRightRadius: "120px",
                  }}
                >
                  <h3 className="text-xl font-roboto font-bold mb-1 uppercase tracking-wide">
                    PRINCIPALES BENEFICIOS
                  </h3>
                  <ul className="md:space-y-1 font-roboto text-lg leading-1">
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
                <div
                  className="bg-white text-gray-900 pl-20 pr-16 py-3"
                  style={{
                    borderTopRightRadius: "120px",
                    borderBottomRightRadius: "120px",
                  }}
                >
                  <h3 className="text-xl font-roboto font-bold uppercase tracking-wide">
                    PRINCIPALES CARACTERÍSTICAS
                  </h3>
                  <p className="font-roboto text-lg text-gray-700">
                    App móvil para Android: teléfonos, tablets, colectoras de
                    datos
                    <br />
                    Captura de datos en tiempo real, en el momento y lugar del
                    hecho
                    <br />
                    Integración flexible con ERPs o uso autónomo
                    <br />
                    Sincronización bidireccional online/offline
                    <br />
                    Módulos configurables: pedidos, cobranzas, inventario,
                    entregas, visitas y más
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - Phone mockup */}
            <div className="flex justify-center relative max-lg:pt-12 ">
              <div className="relative">
                {/* FPO Labels */}
                <div
                  className="absolute top-20 right-48 text-7xl font-bold text-gray-400 opacity-30 select-none pointer-events-none z-20"
                  style={{ letterSpacing: "0.1em" }}
                >
                  FPO
                </div>
                <div
                  className="absolute bottom-20 -left-8 text-7xl font-bold text-gray-400 opacity-30 select-none pointer-events-none z-20"
                  style={{ letterSpacing: "0.1em" }}
                >
                  FPO
                </div>

                {/* Phone mockup with rotation */}
                <div
                  className="relative z-10"
                  style={{
                    transform:
                      "perspective(1000px) rotateY(-8deg) rotateX(2deg)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="w-80 h-[650px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-[3.5rem] p-4 shadow-2xl border-[6px] border-orange-500">
                    <div className="w-full h-full bg-white rounded-[3rem] overflow-hidden relative shadow-inner">
                      {/* Phone notch */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-7 bg-gray-900 rounded-b-3xl z-20" />

                      {/* Phone screen content */}
                      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-gray-50 relative">
                        {/* Top bar with logo and icons */}
                        <div className="absolute top-8 left-0 right-0 px-6 flex justify-between items-center">
                          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              ERP
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <div className="w-6 h-6 rounded-full bg-gray-300" />
                            <div className="w-6 h-6 rounded-full bg-gray-300" />
                            <div className="w-6 h-6 rounded-full bg-gray-300" />
                          </div>
                        </div>

                        {/* Blue circle icon */}
                        <div className="absolute top-24 right-6">
                          <div className="w-12 h-12 rounded-full border-2 border-blue-400 flex items-center justify-center">
                            <svg
                              className="w-6 h-6 text-blue-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </div>
                        </div>

                        {/* Main content area */}
                        <div className="absolute top-40 left-6 right-6">
                          <div className="text-gray-700 text-xs mb-2">
                            Usuario
                          </div>
                          <div className="h-px bg-gray-300 mb-6" />

                          <div className="text-gray-700 text-xs mb-2">
                            Contraseña
                          </div>
                          <div className="h-px bg-gray-300 mb-4" />

                          {/* Orange play button */}
                          <div className="flex justify-center my-8">
                            <button
                              onClick={() =>
                                trackEvents.videoPlay(activeService)
                              }
                              className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                            >
                              <Play
                                size={28}
                                className="text-white ml-1"
                                fill="white"
                              />
                            </button>
                          </div>

                          {/* Chart placeholder */}
                          <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
                            <div className="h-24 bg-gradient-to-r from-blue-100 to-blue-50 rounded relative overflow-hidden">
                              <svg
                                className="w-full h-full"
                                viewBox="0 0 200 80"
                              >
                                <polyline
                                  points="0,60 40,45 80,50 120,30 160,35 200,20"
                                  fill="none"
                                  stroke="#3B82F6"
                                  strokeWidth="2"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>

                        {/* Bottom section */}
                        <div className="absolute bottom-6 left-6 right-6">
                          <div className="bg-blue-600 text-white text-center py-3 rounded-lg font-semibold text-sm">
                            Ingresar FPO
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
