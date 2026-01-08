"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/lib/utils";

export default function Testimonials() {
  const t = useTranslations("testimonials");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar móvil
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1100);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Items por página según dispositivo
  const itemsPerPage = isMobile ? 1 : 3;
  const maxIndex = Math.ceil(testimonials.length / itemsPerPage);

  // Auto-play carousel every 5 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % maxIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, maxIndex]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + maxIndex) % maxIndex);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % maxIndex);
  };

  return (
    <section id="casos-de-exito" className="relative overflow-hidden">
      {/* Orange header */}
      <div className="bg-onca-orange py-8">
        <div className="max-w-7xl mx-auto px-8 flex items-center">
          {/* Logo */}
          <div className="">
            <Image
              src="/images/logo-page.svg"
              alt="Logo"
              width={120}
              height={120}
              className="pointer-events-none  w-16"
            />
          </div>

          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center flex-1">
            {t("title")}
          </h2>

          <div className="ml-auto w-12" />
        </div>
      </div>

      {/* Carousel */}
      <div className="bg-gray-100 py-16 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative px-4 md:px-16 overflow-hidden">
            {/* Carousel container with sliding animation */}
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {Array.from({ length: maxIndex }).map((_, pageIndex) => (
                <div key={pageIndex} className="w-full flex-shrink-0 px-2">
                  <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-3'} gap-6`}>
                    {testimonials
                      .slice(
                        pageIndex * itemsPerPage,
                        pageIndex * itemsPerPage + itemsPerPage
                      )
                      .map((card, cardIndex) => (
                        <div key={cardIndex} className="flex pb-6">
                          <div className="rounded-2xl shadow-lg h-full flex flex-col w-full relative overflow-visible">
                            {/* Image */}
                            <div className="h-[400px] sm:h-[600px]  xl:h-[500px] relative overflow-hidden rounded-2xl">
                              <Image
                                src={card.image}
                                alt={card.name}
                                fill
                                className="object-cover object-top"
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              />
                            </div>
                            {/* Content */}
                            <div className="w-[85%] md:w-[70%] absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-service-light opacity-70 rounded-2xl p-5 shadow-lg">
                              <h3 className="font-bold text-poppins text-gray-900 text-md uppercase mb-0">
                                {card.company}
                              </h3>
                              <p className="text-poppins text-sm text-gray-900 font-bold mb-3">
                                {card.name}
                                {"role" in card && card.role && (
                                  <span className="block text-[10px] text-gray-500 mt-0.5">
                                    {card.role}
                                  </span>
                                )}
                              </p>
                              <p className="text-gray-600 text-[12px] font-bold leading-relaxed italic">
                                "
                                {card.quote.replace(
                                  /^"?ONCA Mobile\s*/i,
                                  ""
                                )}
                                "
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2 md:p-4 rounded-lg shadow-xl hover:bg-blue-700 transition-colors z-10 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} className="md:w-8 md:h-8" />
            </button>

            <button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex - 1}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2 md:p-4 rounded-lg shadow-xl hover:bg-blue-700 transition-colors z-10 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} className="md:w-8 md:h-8" />
            </button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(index);
                }}
                className={`w-3 h-3 rounded-full transition-colors ${index === currentIndex ? "bg-onca-orange" : "bg-gray-300"
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