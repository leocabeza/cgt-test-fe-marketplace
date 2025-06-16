import type { Product } from '@/components/ProductCard';
import { useCartStore } from '@/stores/cart';
import { useData } from 'vike-react/useData';

export default function Page() {
  const { product } = useData<{ product: Product }>();
  const addProduct = useCartStore((state) => state.addProduct);

  if (!product) {
    return (
      <div className="from-dark-surface to-retro-purple/20 border-neon-magenta shadow-neon-magenta animate-fade-in relative mx-auto my-8 max-w-[800px] border-3 bg-gradient-to-br p-8">
        <h1 className="font-retro text-neon-magenta-soft mb-4 text-center text-[clamp(1.2rem,3vw,1.8rem)] drop-shadow-[0_0_20px_currentColor]">
          Product Not Found
        </h1>
        <p className="text-text-secondary mb-8 text-center">
          The product you're looking for doesn't exist, dude!
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="/products"
            className="font-orbitron border-neon-cyan bg-neon-gradient text-text-soft shadow-neon-cyan hover:from-retro-purple hover:to-neon-cyan-soft hover:shadow-neon-cyan-intense active:shadow-neon-cyan cursor-pointer border-2 px-6 py-3 font-bold tracking-wide uppercase transition-all duration-300 hover:-translate-y-0.5 hover:bg-gradient-to-r active:translate-y-0"
          >
            Browse Products
          </a>
          <a
            href="/"
            className="font-orbitron border-neon-lime text-neon-lime hover:bg-neon-lime hover:text-dark-surface cursor-pointer border-2 px-6 py-3 font-bold tracking-wide uppercase transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="from-dark-surface to-retro-purple/20 border-neon-magenta shadow-neon-magenta animate-fade-in relative mx-auto my-8 max-w-[800px] border-3 bg-gradient-to-br p-8">
      <h1 className="font-retro text-neon-magenta-soft mb-4 text-center text-[clamp(1.2rem,3vw,1.8rem)] drop-shadow-[0_0_20px_currentColor]">
        {product.name}
      </h1>
      <p className="text-neon-lime-soft mb-8 text-center text-2xl font-black drop-shadow-[0_0_15px_currentColor]">
        Price: ${product.price}
      </p>

      <div className="mb-6 text-center">
        <button
          className="font-orbitron border-neon-cyan bg-neon-gradient text-text-primary shadow-neon-cyan hover:from-retro-purple hover:to-neon-cyan hover:shadow-neon-cyan-intense active:shadow-neon-cyan cursor-pointer border-2 px-6 py-3 font-bold tracking-wide uppercase transition-all duration-300 hover:-translate-y-0.5 hover:bg-gradient-to-r active:translate-y-0"
          onClick={() => addProduct(product)}
          type="button"
        >
          Add to cart
        </button>
      </div>

      <div className="text-center">
        <img
          src={product.image}
          alt={product.name}
          className="border-neon-cyan mx-auto my-8 block h-64 w-full max-w-[500px] rounded border-3 object-cover shadow-[0_0_20px_rgba(0,255,255,0.4),inset_0_0_20px_rgba(0,255,255,0.1)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(0,255,255,0.6),inset_0_0_40px_rgba(0,255,255,0.2)]"
        />
      </div>

      <div className="mt-8">
        <p className="text-text-soft text-center text-lg">
          {product.description}
        </p>
      </div>
    </div>
  );
}
