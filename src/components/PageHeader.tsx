import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  variant?: 'hero' | 'standard' | 'contained';
  children?: ReactNode;
}
export default function PageHeader({
  title,
  subtitle,
  variant = 'standard',
  children,
}: PageHeaderProps) {
  const getTitleClasses = () => {
    const baseClasses =
      'font-retro text-center drop-shadow-[0_0_20px_currentColor]';

    switch (variant) {
      case 'hero':
        return `${baseClasses} text-neon-lime-soft animate-glow-pulse mb-4 text-[clamp(1.5rem,4vw,2.5rem)] font-black`;
      case 'contained':
        return `${baseClasses} text-neon-lime-soft mb-8 text-2xl`;
      default:
        return `${baseClasses} text-neon-cyan-soft mb-8 text-[clamp(1.2rem,3vw,1.8rem)]`;
    }
  };

  const getSubtitleClasses = () => {
    return variant === 'hero'
      ? 'text-text-soft mb-6 text-lg text-center'
      : 'text-text-soft mb-4 text-center text-lg';
  };

  const getContainerClasses = () => {
    switch (variant) {
      case 'hero':
        return 'from-retro-purple/10 to-neon-cyan/10 border-neon-cyan animate-fade-in before:from-neon-cyan before:via-neon-magenta before:via-neon-lime before:to-neon-cyan before:animate-border-glow relative my-8 overflow-hidden border-2 bg-gradient-to-br px-4 py-12 text-center before:absolute before:-top-0.5 before:-right-0.5 before:-bottom-0.5 before:-left-0.5 before:-z-10 before:bg-gradient-to-r before:bg-[length:300%_300%]';
      case 'contained':
        return 'from-dark-surface to-neon-lime/10 border-neon-lime shadow-neon-lime animate-fade-in mx-auto my-8 max-w-[600px] border-3 bg-gradient-to-br p-8';
      default:
        return 'animate-fade-in';
    }
  };

  return (
    <div className={getContainerClasses()}>
      <h1 className={getTitleClasses()}>{title}</h1>
      {subtitle && <p className={getSubtitleClasses()}>{subtitle}</p>}
      {children}
    </div>
  );
}
