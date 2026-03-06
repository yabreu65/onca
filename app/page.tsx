import Hero from '@/components/home/Hero';
import ServicesPreview from '@/components/home/ServicesPreview';
import Testimonials from '@/components/home/Testimonials';
import Partners from '@/components/home/Partners';
import ContactCTA from '@/components/home/ContactCTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <Testimonials />
      <Partners />
      <ContactCTA />
    </>
  );
}
