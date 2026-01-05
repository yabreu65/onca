'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '@/lib/utils';

export default function Testimonials() {
  const t = useTranslations('testimonials');
  const locale = useLocale() as 'es' | 'en';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const maxIndex = Math.max(1, testimonials.length - 2);

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
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 py-8">
        <div className="max-w-7xl mx-auto px-4 flex items-center">
          {/* Logo */}
          <div className="mr-auto">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center border border-white/30">
              <svg className="w-8 h-8 text-white" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="32" height="32" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <rect x="8" y="8" width="10" height="10" fill="currentColor" opacity="0.6" />
                <rect x="22" y="8" width="10" height="10" fill="currentColor" opacity="0.4" />
                <rect x="8" y="22" width="10" height="10" fill="currentColor" opacity="0.4" />
                <rect x="22" y="22" width="10" height="10" fill="currentColor" opacity="0.8" />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center flex-1">
            {t('title')}
          </h2>

          <div className="ml-auto w-12" />
        </div>
      </div>

      {/* Carousel */}
      <div className="bg-gray-100 py-16 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative px-16 overflow-hidden">
            {/* Carousel container with sliding animation */}
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.slice(0, maxIndex + 2).map((item, index) => (
                <div key={index} className="w-full flex-shrink-0 px-2">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.slice(index, index + 3).map((card, cardIndex) => (
                      <div key={cardIndex} className="flex">
                        <div className="bg-white rounded-lg overflow-hidden shadow-lg h-full flex flex-col w-full">
                          {/* Image */}
                          <div className="h-64 relative overflow-hidden">
                            <Image
                              src={card.image}
                              alt={card.name}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                          </div>

                          {/* Content */}
                          <div className="p-6 flex-1 flex flex-col">
                            <h3 className="font-bold text-gray-900 text-lg uppercase mb-1">
                              {card.company}
                            </h3>
                            <p className="text-gray-700 font-medium text-sm mb-4">
                              {card.name}
                              {'role' in card && card.role && (
                                <span className="block text-xs text-gray-500 mt-1">{card.role}</span>
                              )}
                            </p>
                            <p className="text-gray-600 text-sm leading-relaxed flex-1">
                              "{card.quote[locale]}"
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
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-blue-600 text-white p-4 rounded-lg shadow-xl hover:bg-blue-700 transition-colors z-10"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={32} />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-blue-600 text-white p-4 rounded-lg shadow-xl hover:bg-blue-700 transition-colors z-10"
              aria-label="Next testimonial"
            >
              <ChevronRight size={32} />
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
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-orange-500' : 'bg-gray-300'
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
