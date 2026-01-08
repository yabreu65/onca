import { cn } from '@/lib/utils';
import Image from "next/image";

interface LogoProps {
  variant?: 'default' | 'white';
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ variant = 'default', size = 'md' }: LogoProps) {
  const sizes = { sm: { icon: 'w-64 h-64', text: 'text-lg' }, md: { icon: 'w-full h-auto', text: 'text-2xl' }, lg: { icon: 'w-64 h-64', text: 'text-3xl' } };

  return (
    <div className="w-[38%] md:w-[80%] flex items-center gap-3">
      <div className={cn('w-full flex items-center justify-start', sizes[size].icon)}>
        <Image
          src="/images/logo.svg"
          alt="Logo"
          width={230}
          height={160}
          className="pointer-events-none"
        />
      </div>
      
    </div>
  );
}
