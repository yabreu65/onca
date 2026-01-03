import { cn } from '@/lib/utils';

interface LogoProps {
  variant?: 'default' | 'white';
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ variant = 'default', size = 'md' }: LogoProps) {
  const sizes = { sm: { icon: 'w-8 h-8', text: 'text-lg' }, md: { icon: 'w-12 h-12', text: 'text-2xl' }, lg: { icon: 'w-16 h-16', text: 'text-3xl' } };

  return (
    <div className="flex items-center gap-3">
      <div className={cn('rounded-full bg-onca-orange flex items-center justify-center', sizes[size].icon)}>
        <svg viewBox="0 0 40 40" fill="none" className="w-2/3 h-2/3">
          <path d="M20 4C11.163 4 4 11.163 4 20s7.163 16 16 16 16-7.163 16-16S28.837 4 20 4zm0 28c-6.627 0-12-5.373-12-12S13.373 8 20 8s12 5.373 12 12-5.373 12-12 12z" fill="white" />
          <circle cx="14" cy="16" r="2" fill="white" />
          <circle cx="26" cy="16" r="2" fill="white" />
          <path d="M14 24s2.5 3 6 3 6-3 6-3" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <span className={cn('font-montserrat font-black tracking-tight', sizes[size].text, variant === 'white' ? 'text-white' : 'text-gray-900')}>
        ONCA<sup className="text-xs font-bold ml-0.5">IT</sup>
      </span>
    </div>
  );
}
