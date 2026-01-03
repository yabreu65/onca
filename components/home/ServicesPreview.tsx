'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Play } from 'lucide-react';
import { cn, serviceKeys, serviceIcons, getServiceSlug, type ServiceKey } from '@/lib/utils';
import { trackEvents } from '@/lib/analytics';

export default function ServicesPreview() {
  const t = useTranslations('services');
  const locale = useLocale();
  const [activeService, setActiveService] = useState<ServiceKey>('visits');

  const getLocalizedPath = (path: string) => {
    return locale === 'es' ? path : `/${locale}${path}`;
  };

  const handleServiceChange = (key: ServiceKey) => {
    setActiveService(key);
    trackEvents.serviceView(key);
  };

  return (
    <section id="servicios" className="w-full">
      {/* Top contact bar */}
      <div className="bg-gray-900 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-center gap-8 text-sm">
          <span>+54 11 333 3333</span>
          <span>mail@oncait.com.ar</span>
        </div>
      </div>

      {/* Blue header section */}
      <div className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 text-white py-12 overflow-hidden">
        {/* Background pattern - circuit board style */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.2) 0%, transparent 50%),
              linear-gradient(90deg, transparent 49.5%, rgba(59, 130, 246, 0.1) 49.5%, rgba(59, 130, 246, 0.1) 50.5%, transparent 50.5%),
              linear-gradient(0deg, transparent 49.5%, rgba(59, 130, 246, 0.1) 49.5%, rgba(59, 130, 246, 0.1) 50.5%, transparent 50.5%)
            `,
            backgroundSize: '100% 100%, 100% 100%, 40px 40px, 40px 40px'
          }} />
        </div>

        <div className="max-w-[90%] mx-auto px-4 relative z-10">
          {/* Logo */}
          <div className="flex mb-8">
            <div>
              <div className="w-12 h-12 bg-blue-800/50 rounded-lg flex items-center justify-center border border-blue-700/50">
                <svg className="w-8 h-8" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="4" y="4" width="32" height="32" rx="2" stroke="currentColor" strokeWidth="1.5" />
                  <rect x="8" y="8" width="10" height="10" fill="currentColor" opacity="0.6" />
                  <rect x="22" y="8" width="10" height="10" fill="currentColor" opacity="0.4" />
                  <rect x="8" y="22" width="10" height="10" fill="currentColor" opacity="0.4" />
                  <rect x="22" y="22" width="10" height="10" fill="currentColor" opacity="0.8" />
                </svg>
              </div>
            </div>

            <div className="text-center mb-10 max-w-4xl mx-auto">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">SERVICIOS</h2>
              <p className="text-base md:text-lg text-gray-200 leading-relaxed">
                <span className="text-white font-bold">Onca Mobile</span> es una solución móvil pensada para digitalizar y optimizar las operaciones
                diarias de tu empresa. Integrada a tu sistema central o ERP, o en forma autónoma, permite
                registrar transacciones y actividades clave justo cuando ocurren, desde cualquier dispositivo
                Android, con o sin conexión en el momento.
              </p>
            </div>
          </div>

          {/* Title and description */}


          {/* Services navigation */}

        </div>
      </div>
      <div className="py-5">
        <div className="flex flex-wrap justify-center gap-2 md:gap-12 text-sm">
          {serviceKeys.map((key) => (
            <Link
              key={key}
              href={getLocalizedPath(`/servicios/${getServiceSlug(key, locale as 'es' | 'en')}`)}
              onClick={() => handleServiceChange(key)}
              className={cn(
                'px-4 py-2 text-black font-semibold transition-all duration-200 whitespace-nowrap hover:text-orange-500',

              )}
            >
              <span className="mr-2">{serviceIcons[key]}</span>
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
            <div className="space-y-6 relative z-10" key={activeService}>
              {/* Orange panel with curve on right */}
              <div className="relative">
                <div
                  className="bg-gradient-to-br from-orange-500 to-orange-600 text-white pl-8 pr-16 py-10"
                  style={{
                    borderTopRightRadius: '120px',
                    borderBottomRightRadius: '120px'
                  }}
                >
                  <h3 className="text-lg font-bold mb-4 uppercase tracking-wide">
                    PRINCIPALES BENEFICIOS
                  </h3>
                  <ul className="space-y-2 text-sm leading-relaxed">
                    <li>Elimina tareas manuales y registros en papel</li>
                    <li>Reduce errores de carga y evita la duplicación de tareas</li>
                    <li>Información en tiempo real desde cualquier punto de operación</li>
                    <li>Mejora la eficiencia operativa y la toma de decisiones</li>
                  </ul>
                </div>
              </div>

              {/* White panel with curve on right */}
              <div className="relative">
                <div
                  className="bg-white text-gray-900 pl-8 pr-16 py-10"
                  style={{
                    borderTopRightRadius: '120px',
                    borderBottomRightRadius: '120px'
                  }}
                >
                  <h3 className="text-lg font-bold mb-4 uppercase tracking-wide">
                    PRINCIPALES CARACTERÍSTICAS
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-700">
                    App móvil para Android: teléfonos, tablets, colectoras de datos<br />
                    Captura de datos en tiempo real, en el momento y lugar del hecho<br />
                    Integración flexible con ERPs o uso autónomo<br />
                    Sincronización bidireccional online/offline<br />
                    Módulos configurables: pedidos, cobranzas, inventario, entregas, visitas y más
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - Phone mockup */}
            <div className="flex justify-center relative ">
              <div className="relative">
                {/* FPO Labels */}
                <div className="absolute top-20 right-48 text-7xl font-bold text-gray-400 opacity-30 select-none pointer-events-none z-20" style={{ letterSpacing: '0.1em' }}>
                  FPO
                </div>
                <div className="absolute bottom-20 -left-8 text-7xl font-bold text-gray-400 opacity-30 select-none pointer-events-none z-20" style={{ letterSpacing: '0.1em' }}>
                  FPO
                </div>

                {/* Phone mockup with rotation */}
                <div
                  className="relative z-10"
                  style={{
                    transform: 'perspective(1000px) rotateY(-8deg) rotateX(2deg)',
                    transformStyle: 'preserve-3d'
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
                            <span className="text-white text-xs font-bold">ERP</span>
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
                            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                        </div>

                        {/* Main content area */}
                        <div className="absolute top-40 left-6 right-6">
                          <div className="text-gray-700 text-xs mb-2">Usuario</div>
                          <div className="h-px bg-gray-300 mb-6" />

                          <div className="text-gray-700 text-xs mb-2">Contraseña</div>
                          <div className="h-px bg-gray-300 mb-4" />

                          {/* Orange play button */}
                          <div className="flex justify-center my-8">
                            <button
                              onClick={() => trackEvents.videoPlay(activeService)}
                              className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                            >
                              <Play size={28} className="text-white ml-1" fill="white" />
                            </button>
                          </div>

                          {/* Chart placeholder */}
                          <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
                            <div className="h-24 bg-gradient-to-r from-blue-100 to-blue-50 rounded relative overflow-hidden">
                              <svg className="w-full h-full" viewBox="0 0 200 80">
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
