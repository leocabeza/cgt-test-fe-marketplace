import { Link } from 'react-router';

const Products = () => {
  return (
    <div className="animate-fade-in">
      <h1 className="font-retro text-neon-cyan-soft mb-8 text-center text-[clamp(1.2rem,3vw,1.8rem)] drop-shadow-[0_0_20px_currentColor]">
        All Products
      </h1>
      <div className="mx-auto grid max-w-[1000px] grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-8">
        <div className="from-dark-surface to-retro-purple/20 border-neon-cyan shadow-retro-glow before:via-neon-cyan/10 relative my-4 overflow-hidden border-2 bg-gradient-to-br p-6 before:absolute before:top-0 before:-left-full before:h-full before:w-full before:bg-gradient-to-r before:from-transparent before:to-transparent before:transition-all before:duration-600 hover:before:left-full">
          <h3 className="text-neon-cyan-soft mb-4 text-center text-2xl font-bold">
            Product A
          </h3>
          <p className="text-neon-lime-soft mb-4 text-center text-xl font-black drop-shadow-[0_0_15px_currentColor]">
            $10.00 USD
          </p>
          <p className="text-text-soft mb-6 text-center">
            An awesome product that you'll definitely want to check out!
          </p>
          <div className="mb-4 text-center">
            <Link
              to="/products/a"
              className="font-orbitron border-neon-cyan bg-neon-gradient text-text-primary shadow-neon-cyan hover:from-retro-purple hover:to-neon-cyan hover:shadow-neon-cyan-intense active:shadow-neon-cyan cursor-pointer border-2 px-6 py-3 font-bold tracking-wide uppercase transition-all duration-300 hover:-translate-y-0.5 hover:bg-gradient-to-r active:translate-y-0"
            >
              View Details
            </Link>
          </div>
        </div>
        <div className="from-dark-surface to-retro-purple/20 border-neon-cyan shadow-retro-glow before:via-neon-cyan/10 relative my-4 overflow-hidden border-2 bg-gradient-to-br p-6 before:absolute before:top-0 before:-left-full before:h-full before:w-full before:bg-gradient-to-r before:from-transparent before:to-transparent before:transition-all before:duration-600 hover:before:left-full">
          <h3 className="text-neon-magenta-soft mb-4 text-center text-2xl font-bold">
            Product B
          </h3>
          <p className="text-neon-lime-soft mb-4 text-center text-xl font-black drop-shadow-[0_0_15px_currentColor]">
            $30.00 USD
          </p>
          <p className="text-text-soft mb-6 text-center">
            Our newest and most radical product in the collection!
          </p>
          <div className="mb-4 text-center">
            <Link
              to="/products/b"
              className="font-orbitron border-neon-cyan bg-neon-gradient text-text-primary shadow-neon-cyan hover:from-retro-purple hover:to-neon-cyan hover:shadow-neon-cyan-intense active:shadow-neon-cyan cursor-pointer border-2 px-6 py-3 font-bold tracking-wide uppercase transition-all duration-300 hover:-translate-y-0.5 hover:bg-gradient-to-r active:translate-y-0"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
