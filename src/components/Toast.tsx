import type { Toast as ToastType } from '@/stores/toast';
import { useEffect, useState } from 'react';

interface ToastProps {
  toast: ToastType;
  onRemove: (id: string) => void;
}

const Toast = ({ toast, onRemove }: ToastProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsAnimating(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!toast.isVisible) {
      setIsAnimating(false);
    }
  }, [toast.isVisible]);

  const getToastStyles = () => {
    const baseClass =
      'relative overflow-hidden border-2 px-3 py-2 sm:px-4 sm:py-3 shadow-lg transition-all duration-300 transform rounded-lg backdrop-blur-sm';

    switch (toast.type) {
      case 'success':
        return `${baseClass} bg-gradient-to-r from-dark-surface/95 to-dark-surface/90 border-neon-lime text-neon-lime-soft shadow-[0_0_20px_rgba(0,255,0,0.6)] before:absolute before:top-0 before:left-0 before:h-full before:w-1 before:bg-neon-lime before:shadow-[0_0_10px_currentColor]`;
      case 'error':
        return `${baseClass} bg-gradient-to-r from-dark-surface/95 to-dark-surface/90 border-neon-magenta text-neon-magenta-soft shadow-[0_0_20px_rgba(255,0,255,0.6)] before:absolute before:top-0 before:left-0 before:h-full before:w-1 before:bg-neon-magenta before:shadow-[0_0_10px_currentColor]`;
      case 'warning':
        return `${baseClass} bg-gradient-to-r from-dark-surface/95 to-dark-surface/90 border-neon-cyan text-neon-cyan-soft shadow-[0_0_20px_rgba(0,255,255,0.6)] before:absolute before:top-0 before:left-0 before:h-full before:w-1 before:bg-neon-cyan before:shadow-[0_0_10px_currentColor]`;
      default:
        return `${baseClass} bg-gradient-to-r from-dark-surface/95 to-dark-surface/90 border-neon-cyan text-neon-cyan-soft shadow-[0_0_20px_rgba(0,255,255,0.6)] before:absolute before:top-0 before:left-0 before:h-full before:w-1 before:bg-neon-cyan before:shadow-[0_0_10px_currentColor]`;
    }
  };

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return '✓';
      case 'error':
        return '✗';
      case 'warning':
        return '⚠';
      default:
        return 'ℹ';
    }
  };

  return (
    <div
      className={`${getToastStyles()} ${
        isAnimating && toast.isVisible
          ? 'translate-x-0 opacity-100'
          : 'translate-x-full opacity-0'
      }`}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-center gap-2 sm:gap-3">
        <span className="font-orbitron flex-shrink-0 text-sm font-bold drop-shadow-[0_0_8px_currentColor] sm:text-lg">
          {getIcon()}
        </span>
        <p className="font-orbitron flex-1 text-xs font-medium tracking-wide break-words sm:text-sm">
          {toast.message}
        </p>
        <button
          onClick={() => onRemove(toast.id)}
          className="text-text-soft hover:text-neon-magenta-soft flex-shrink-0 text-lg transition-colors duration-200 hover:scale-110 hover:drop-shadow-[0_0_8px_currentColor]"
          aria-label="Close notification"
          type="button"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Toast;
