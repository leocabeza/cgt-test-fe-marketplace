import { Link, useLocation } from 'react-router';

function cartItems() {
  return [];
}

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  const getNavLinkClass = (path: string) => {
    const baseClass =
      'text-neon-cyan-soft no-underline font-bold text-sm uppercase tracking-wide py-2 px-4 border border-transparent transition-all duration-300 relative overflow-hidden hover:text-neon-magenta-soft hover:border-neon-magenta-soft hover:bg-neon-magenta/10 hover:drop-shadow-[0_0_10px_currentColor]';
    return currentPath === path
      ? `${baseClass} text-neon-lime-soft border-neon-lime-soft bg-neon-lime/20 drop-shadow-[0_0_15px_currentColor] shadow-[0_0_10px_rgba(0,255,0,0.3)]`
      : baseClass;
  };

  return (
    <div className="from-dark-bg to-dark-surface text-text-soft flex min-h-screen flex-col overflow-x-hidden bg-gradient-to-br bg-fixed">
      <header className="from-dark-surface via-retro-purple to-dark-surface border-neon-cyan before:from-neon-magenta before:via-neon-cyan before:via-neon-lime before:via-neon-cyan before:to-neon-magenta before:animate-rainbow-slide relative border-b-3 bg-gradient-to-r px-8 py-4 shadow-[0_5px_15px_rgba(0,255,255,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] before:absolute before:top-0 before:right-0 before:left-0 before:h-0.5 before:bg-gradient-to-r">
        <h1 className="font-retro text-neon-cyan-soft animate-glow-pulse mb-4 text-center text-[clamp(1.2rem,3vw,2rem)] tracking-wide drop-shadow-[2px_2px_0px_#ff00ff,4px_4px_0px_#0a0a1a,0_0_20px_#00ffff]">
          90's SHOP
        </h1>
        <nav className="mt-4 flex justify-center">
          <ul className="border-neon-cyan m-0 flex list-none items-center gap-4 border bg-black/30 p-0 px-4 py-2 shadow-[0_0_15px_rgba(0,255,255,0.2),inset_0_0_15px_rgba(0,255,255,0.05)]">
            <li>
              <Link to="/" className={getNavLinkClass('/')}>
                Home
              </Link>
            </li>
            <span className="text-text-secondary mx-2 text-xl">|</span>
            <li>
              <Link to="/products" className={getNavLinkClass('/products')}>
                All Products
              </Link>
            </li>
            <span className="text-text-secondary mx-2 text-xl">|</span>
            <li>
              <Link to="/cart" className={getNavLinkClass('/cart')}>
                Cart ({cartItems().length})
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-[1200px] flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
