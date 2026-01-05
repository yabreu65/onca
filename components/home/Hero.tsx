'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn, heroSlides } from '@/lib/utils';
import { trackEvents } from '@/lib/analytics';

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length), []);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  const goToSlide = (index: number) => { setCurrentSlide(index); setIsAutoPlaying(false); setTimeout(() => setIsAutoPlaying(true), 10000); };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, nextSlide]);

  return (
    <section className="relative h-[85vh] min-h-[600px] overflow-hidden bg-gray-900">
      {heroSlides.map((slide, index) => (
        <div key={slide.id} className={cn('absolute inset-0 transition-opacity duration-1000', index === currentSlide ? 'opacity-100' : 'opacity-0')}>
          <Image
            src={slide.image}
            alt={slide.client}
            fill
            className="object-cover"
            priority={index === 0}
            quality={90}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
        </div>
      ))}

      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 flex items-center">
        <div className="max-w-2xl">
          <h1 className="text-white mb-6 animate-fade-in">
            <span className="block text-5xl md:text-6xl lg:text-7xl font-montserrat font-black leading-[1.1]">{t('line1')}</span>
            <span className="block text-5xl md:text-6xl lg:text-7xl font-montserrat font-black leading-[1.1]">{t('line2')}</span>
            <span className="block text-5xl md:text-6xl lg:text-7xl font-montserrat font-black leading-[1.1]">{t('line3')}</span>
          </h1>
          <p className="text-white/90 text-xl md:text-2xl font-medium mb-8 tracking-wide animate-fade-in animate-delay-200">{t('subtitle')}</p>
          <Link href={`/${locale}/servicios`} className="btn-primary text-lg inline-flex items-center gap-2 animate-fade-in animate-delay-300" onClick={() => trackEvents.ctaClick('Hero CTA')}>
            {t('cta')}<ChevronRight size={20} />
          </Link>
        </div>

        <div className="absolute right-8 bottom-32 hidden lg:block animate-fade-in animate-delay-400">
          <div className="bg-white/10 backdrop-blur-md rounded-xl px-6 py-4 text-white text-right border border-white/20">
            <p className="text-xl font-semibold">{heroSlides[currentSlide].client}</p>
            <p className="text-white/80 text-sm">({heroSlides[currentSlide].service})</p>
          </div>
        </div>
      </div>

      <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hidden md:flex" aria-label="Previous"><ChevronLeft size={24} /></button>
      <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hidden md:flex" aria-label="Next"><ChevronRight size={24} /></button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {heroSlides.map((_, index) => (
          <button key={index} onClick={() => goToSlide(index)} className={cn('h-3 rounded-full transition-all duration-300', index === currentSlide ? 'bg-onca-orange w-10' : 'bg-white/50 w-3 hover:bg-white/80')} aria-label={`Slide ${index + 1}`} />
        ))}
      </div>
    </section>
  );
}
