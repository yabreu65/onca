"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/lib/utils";

export default function Testimonials() {
  const t = useTranslations("testimonials");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(4);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Detectar móvil y ajustar items visibles
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const mobile = width < 1100;
      setIsMobile(mobile);
      setItemsToShow(mobile ? 1 : 4);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Clones para efecto infinito (siempre clonamos 4 para cubrir desktop)
  // [Originales, Clones]
  // Cuando llegamos al final de Originales (inicio de Clones), saltamos al inicio de Originales.
  const extendedTestimonials = [...testimonials, ...testimonials.slice(0, 4)];

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex]);

  const handleTransitionEnd = () => {
    // Si estamos en los clones (índice >= longitud original), saltamos al inicio sin transición
    if (currentIndex >= testimonials.length) {
      setIsTransitioning(false);
      setCurrentIndex(0);
      // Restaurar transición en el próximo ciclo de renderizado/interacción
      // En realidad, basta con dejarlo en false, y handleNext lo pondrá en true.
    }
  };

  const handlePrev = () => {
    setIsAutoPlaying(false);
    if (currentIndex === 0) {
      // Caso especial: salto al final (clones) sin transición y luego muevo atrás
      setIsTransitioning(false);
      setCurrentIndex(testimonials.length);

      // Forzar un reflow y luego animar hacia atrás
      setTimeout(() => {
        setIsTransitioning(true);
        setCurrentIndex(testimonials.length - 1);
      }, 50);
    } else {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    // Si ya estamos en el último clon, no avanzamos más (esperamos el reset)
    // Pero si el usuario hace click rápido, debemos manejarlo.
    if (currentIndex >= extendedTestimonials.length - itemsToShow) {
      // Reset instantáneo y avanzar
      setIsTransitioning(false);
      setCurrentIndex(0);
      setTimeout(() => {
        setIsTransitioning(true);
        setCurrentIndex(1);
      }, 50);
      return;
    }

    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <section
      id="casos-de-exito"
      className="bg-[#272727] relative overflow-hidden pb-4 lg:pb-12"
    >
      {/* Orange header */}
      <div className="bg-onca-orange py-6">
        <div className="max-w-9xl px-6 mx-auto flex items-center justify-center">
          {/* Logo */}
          <div className="">
            <Image
              src="/images/logo-page.svg"
              alt="Logo"
              width={120}
              height={120}
              className="pointer-events-none  w-12"
            />
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-6xl font-poppins  font-bold text-white text-center flex-1">
            {t("title")}
          </h2>

          <div className="ml-auto w-12" />
        </div>
      </div>

      {/* Carousel */}
      <div className="bg-gray-100 relative">
        <div className="w-full">
          <div className="relative overflow-hidden">
            {/* Carousel Track */}
            <div
              ref={sliderRef}
              className="flex"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / itemsToShow)
                }%)`,
                transition: isTransitioning
                  ? "transform 0.5s ease-in-out"
                  : "none",
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {extendedTestimonials.map((card, index) => (
                <div
                  key={`${card.company}-${index}`}
                  className="flex-shrink-0 relative"
                  style={{ width: `${100 / itemsToShow}%` }}
                >
                  <div className="h-[500px] relative w-full">
                    {/* Image */}
                    <Image
                      src={card.image}
                      alt={card.name}
                      fill
                      className="object-cover max-sm:object-[50%_40%] object-[50%_70%] "
                    />

                    {/* Content Overlay */}
                    <div className="absolute bottom-0 mx-2 bg-white/60 backdrop-blur-sm rounded-3xl rounded-b-none px-6 py-3 shadow-xl max-sm:h-[160px] h-[180px] flex flex-col">
                      <h3 className="font-black text-xl uppercase  font-roboto-condensed text-black">
                        {card.company}
                      </h3>
                      <p className="text-lg font-bold text-gray-900  font-roboto-condensed leading-tight">
                        {card.name}
                        {"role" in card && (
                          <span className="block text-sm font-normal mt-1">
                            {/* @ts-ignore */}
                            {card.role as string}
                          </span>
                        )}
                      </p>
                      <div className="text-gray-800 text-xs font-medium italic leading-relaxed font-roboto-condensed text-justify">
                        <span
                          dangerouslySetInnerHTML={{
                            __html: `"${card.quote.replace(
                              /^"?ONCA Mobile\s*/i,
                              ""
                            )}"`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() => {
                setIsAutoPlaying(false);
                handlePrev();
              }}
              className="hidden sm:block absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-md transition-colors z-20"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={32} />
            </button>

            <button
              onClick={() => {
                setIsAutoPlaying(false);
                handleNext();
              }}
              className="hidden sm:block absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-md transition-colors z-20"
              aria-label="Next testimonial"
            >
              <ChevronRight size={32} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
