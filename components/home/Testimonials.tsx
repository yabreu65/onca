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
    <section id="casos-de-exito" className="relative overflow-hidden">
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
      <div className="bg-gray-100 py-16 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative px-4 md:px-16 overflow-hidden">
            {/* Carousel Track */}
            <div
              ref={sliderRef}
              className="flex gap-4"
              style={{
                transform: `translateX(calc(-${currentIndex} * (100% + 16px) / ${itemsToShow}))`,
                transition: isTransitioning
                  ? "transform 0.5s ease-in-out"
                  : "none",
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {extendedTestimonials.map((card, index) => (
                <div
                  key={`${card.company}-${index}`}
                  className="flex-shrink-0 pb-6"
                  style={{
                    width: `calc(${100 / itemsToShow}% - ${
                      (16 * (itemsToShow - 1)) / itemsToShow
                    }px)`,
                  }} // Ajuste preciso del gap
                >
                  <div className="rounded-2xl shadow-lg h-full flex flex-col w-full relative overflow-visible">
                    {/* Image */}
                    <div className="h-[400px] sm:h-[600px] xl:h-[500px] relative overflow-hidden">
                      <Image
                        src={card.image}
                        alt={card.name}
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                    {/* Content */}
                    <div className="w-[85%] md:w-[95%] absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-service-light opacity-70 rounded-2xl p-5 shadow-lg">
                      <h3 className="font-extrabold text-poppins text-black text-md uppercase mb-0">
                        {card.company}
                      </h3>
                      <p className="text-poppins text-sm text-black font-bold mb-1">
                        {card.name}
                        {/*{"role" in card && card.role && (
                          <span className="block text-[10px] text-black mt-0.5">
                            {card.role}
                          </span>
                        )}*/}
                      </p>
                      <p
                        className="text-black text-[12px] font-bold leading-relaxed italic"
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
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() => {
                setIsAutoPlaying(false);
                handlePrev();
              }}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2 md:p-4 rounded-lg shadow-xl hover:bg-blue-700 transition-colors z-10"
            >
              <ChevronLeft size={24} className="md:w-8 md:h-8" />
            </button>

            <button
              onClick={() => {
                setIsAutoPlaying(false);
                handleNext();
              }}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2 md:p-4 rounded-lg shadow-xl hover:bg-blue-700 transition-colors z-10"
            >
              <ChevronRight size={24} className="md:w-8 md:h-8" />
            </button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setIsTransitioning(true);
                  setCurrentIndex(index);
                }}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentIndex % testimonials.length === index
                    ? "bg-onca-orange"
                    : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
