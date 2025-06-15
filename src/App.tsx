import { Link } from 'react-router';

function App() {
  return (
    <div className="from-retro-purple/10 to-neon-cyan/10 border-neon-cyan animate-fade-in before:from-neon-cyan before:via-neon-magenta before:via-neon-lime before:to-neon-cyan before:animate-border-glow relative my-8 overflow-hidden border-2 bg-gradient-to-br px-4 py-12 text-center before:absolute before:-top-0.5 before:-right-0.5 before:-bottom-0.5 before:-left-0.5 before:-z-10 before:bg-gradient-to-r before:bg-[length:300%_300%]">
      <h2 className="text-neon-lime-soft animate-glow-pulse mb-4 text-[clamp(1.5rem,4vw,2.5rem)] font-black">
        Welcome to the Future!
      </h2>
      <p className="text-text-soft mb-6 text-lg">
        Step into our radical marketplace where the future meets the past!
      </p>
      <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">
        <div className="from-dark-surface to-retro-purple/20 border-neon-cyan shadow-retro-glow before:via-neon-cyan/10 relative my-4 overflow-hidden border-2 bg-gradient-to-br p-6 before:absolute before:top-0 before:-left-full before:h-full before:w-full before:bg-gradient-to-r before:from-transparent before:to-transparent before:transition-all before:duration-600 hover:before:left-full">
          <h3 className="text-neon-cyan-soft mb-4 text-center text-xl font-bold">
            Product A
          </h3>
          <p className="text-text-soft mb-4 text-center">
            You are probably interested in this awesome product!
          </p>
          <div className="text-center">
            <Link
              to="/products/a"
              className="font-orbitron border-neon-cyan bg-neon-gradient text-text-soft shadow-neon-cyan hover:from-retro-purple hover:to-neon-cyan-soft hover:shadow-neon-cyan-intense active:shadow-neon-cyan cursor-pointer border-2 px-6 py-3 font-bold tracking-wide uppercase transition-all duration-300 hover:-translate-y-0.5 hover:bg-gradient-to-r active:translate-y-0"
            >
              Check it out
            </Link>
          </div>
        </div>
        <div className="from-dark-surface to-retro-purple/20 border-neon-cyan shadow-retro-glow before:via-neon-cyan/10 relative my-4 overflow-hidden border-2 bg-gradient-to-br p-6 before:absolute before:top-0 before:-left-full before:h-full before:w-full before:bg-gradient-to-r before:from-transparent before:to-transparent before:transition-all before:duration-600 hover:before:left-full">
          <h3 className="text-neon-magenta-soft mb-4 text-center text-xl font-bold">
            Product B
          </h3>
          <p className="text-text-soft mb-4 text-center">
            Check out our newest and most radical product!
          </p>
          <div className="text-center">
            <Link
              to="/products/b"
              className="font-orbitron border-neon-cyan bg-neon-gradient text-text-soft shadow-neon-cyan hover:from-retro-purple hover:to-neon-cyan-soft hover:shadow-neon-cyan-intense active:shadow-neon-cyan cursor-pointer border-2 px-6 py-3 font-bold tracking-wide uppercase transition-all duration-300 hover:-translate-y-0.5 hover:bg-gradient-to-r active:translate-y-0"
            >
              Explore now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
