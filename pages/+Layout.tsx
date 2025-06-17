import { useCartStore } from '@/stores/cart';
import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { usePageContext } from 'vike-react/usePageContext';
import '@/index.css';

export default function Layout({ children }: { children: ReactNode }) {
  const pageContext = usePageContext();
  const currentPath = pageContext.urlPathname;
  const items = useCartStore((state) => state.items);
  const [isHydrated, setIsHydrated] = useState(false);
  const [cartAnimation, setCartAnimation] = useState(false);
  const [prevItemCount, setPrevItemCount] = useState(0);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated && items.length > prevItemCount) {
      setCartAnimation(true);
      const timeoutId = setTimeout(() => setCartAnimation(false), 800);
      return () => clearTimeout(timeoutId);
    }
    setPrevItemCount(items.length);
  }, [items.length, isHydrated, prevItemCount]);

  const getNavLinkClass = (path: string) => {
    const baseClass =
      'text-neon-cyan-soft no-underline font-bold text-sm uppercase tracking-wide py-2 px-4 border border-transparent transition-all duration-300 relative overflow-hidden hover:text-neon-magenta-soft hover:border-neon-magenta-soft hover:bg-neon-magenta/10 hover:drop-shadow-[0_0_10px_currentColor]';
    const isActive =
      path === '/' ? currentPath === '/' : currentPath.startsWith(path);

    return isActive
      ? `${baseClass} text-neon-lime-soft border-neon-lime-soft bg-neon-lime/20 drop-shadow-[0_0_15px_currentColor] shadow-[0_0_10px_rgba(0,255,0,0.3)]`
      : baseClass;
  };

  return (
    <div className="from-dark-bg to-dark-surface text-text-soft flex min-h-screen flex-col overflow-x-hidden bg-gradient-to-br bg-fixed">
      <header className="from-dark-surface via-retro-purple to-dark-surface border-neon-cyan before:from-neon-magenta before:via-neon-cyan before:via-neon-lime before:via-neon-cyan before:to-neon-magenta before:animate-rainbow-slide relative border-b-3 bg-gradient-to-r px-4 py-3 shadow-[0_5px_15px_rgba(0,255,255,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] before:absolute before:top-0 before:right-0 before:left-0 before:h-0.5 before:bg-gradient-to-r sm:px-8 sm:py-4">
        <h1 className="font-retro text-neon-cyan-soft animate-glow-pulse mb-3 text-center text-[clamp(1rem,4vw,2rem)] tracking-wide drop-shadow-[2px_2px_0px_#ff00ff,4px_4px_0px_#0a0a1a,0_0_20px_#00ffff] sm:mb-4">
          90's SHOP
        </h1>
        <nav className="mt-2 flex justify-center sm:mt-4">
          <ul className="border-neon-cyan m-0 flex list-none flex-col items-center gap-2 border bg-black/30 p-0 px-3 py-2 shadow-[0_0_15px_rgba(0,255,255,0.2),inset_0_0_15px_rgba(0,255,255,0.05)] sm:flex-row sm:gap-4 sm:px-4">
            <li>
              <a href="/" className={getNavLinkClass('/')}>
                Home
              </a>
            </li>
            <li
              className="text-text-secondary hidden text-xl sm:mx-2 sm:block"
              aria-hidden="true"
            >
              |
            </li>
            <li>
              <a href="/products" className={getNavLinkClass('/products')}>
                All Products
              </a>
            </li>
            <li
              className="text-text-secondary hidden text-xl sm:mx-2 sm:block"
              aria-hidden="true"
            >
              |
            </li>
            <li>
              <a href="/cart" className={getNavLinkClass('/cart')}>
                Cart (
                <span
                  className={`inline-block ${cartAnimation ? 'text-neon-lime-soft scale-110 drop-shadow-[0_0_10px_currentColor]' : ''} transition-all duration-300`}
                >
                  {isHydrated ? items.length : 0}
                </span>
                )
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-[1200px] flex-1 p-4 sm:p-8">
        {children}
      </main>

      <footer className="from-dark-surface to-dark-bg border-neon-cyan text-text-soft border-t-3 bg-gradient-to-r px-4 py-4 text-center shadow-[0_-5px_15px_rgba(0,255,255,0.2)] sm:px-8 sm:py-6">
        <div className="font-orbitron space-y-2 text-sm">
          <p>Made by: Leonardo Cabeza</p>
          <p>2025</p>
          <p>
            Source:{' '}
            <a
              href="https://github.com/leocabeza/cgt-test-fe-marketplace/tree/feat/revamp-marketplace"
              className="text-neon-cyan-soft hover:text-neon-magenta-soft underline transition-colors duration-300 hover:drop-shadow-[0_0_8px_currentColor]"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
