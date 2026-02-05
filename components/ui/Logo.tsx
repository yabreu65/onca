import { cn } from '@/lib/utils';
import Image from "next/image";

interface LogoProps {
  variant?: 'default' | 'white';
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ variant = 'default', size = 'md' }: LogoProps) {
  const sizes = { sm: { icon: 'w-64 h-64', text: 'text-lg' }, md: { icon: 'w-full h-auto', text: 'text-2xl' }, lg: { icon: 'w-64 h-64', text: 'text-3xl' } };

  return (
    <div className="max-[400px]:pl-2 lg:pl-8  flex items-center gap-3 xl:w-full lg:w-[80%] md:w-[60%] w-[40%]">
      <div className={cn('w-full  flex items-center justify-start', sizes[size].icon)}>
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={350}
          height={160}
          className="pointer-events-none"
        />
      </div>
      
    </div>
  );
}
