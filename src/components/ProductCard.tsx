import { useCartStore } from '@/stores/cart';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  buttonText?: string;
}

const ProductCard = ({
  product,
  buttonText = 'View Details',
}: ProductCardProps) => {
  const addProduct = useCartStore((state) => state.addProduct);

  return (
    <div className="from-dark-surface to-retro-purple/20 border-neon-cyan shadow-retro-glow before:via-neon-cyan/10 relative my-4 flex h-full flex-col overflow-hidden border-2 bg-gradient-to-br p-4 before:absolute before:top-0 before:-left-full before:h-full before:w-full before:bg-gradient-to-r before:from-transparent before:to-transparent before:transition-all before:duration-600 hover:before:left-full sm:p-6">
      <picture>
        <source srcSet={product.image} type="image/webp" />
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className="mb-4 h-48 w-full rounded object-cover sm:h-64"
        />
      </picture>
      <div className="flex flex-grow flex-col">
        <h2 className="text-neon-cyan-soft mb-4 flex min-h-[3.5rem] items-center justify-center text-center text-xl font-bold sm:text-2xl">
          {product.name}
        </h2>
        <p className="text-neon-lime-soft mb-4 text-center text-lg font-black drop-shadow-[0_0_15px_currentColor] sm:text-xl">
          ${product.price}
        </p>
        <p className="text-text-soft mb-6 flex-grow text-center">
          {product.description}
        </p>
      </div>
      <div className="mt-auto mb-4 text-center">
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href={`/products/${product.slug}`}
            className="font-orbitron border-neon-cyan bg-neon-gradient text-text-primary shadow-neon-cyan hover:from-retro-purple hover:to-neon-cyan hover:shadow-neon-cyan-intense active:shadow-neon-cyan cursor-pointer border-2 px-3 py-2 text-xs font-bold tracking-wide uppercase transition-all duration-300 hover:-translate-y-0.5 hover:bg-gradient-to-r active:translate-y-0 sm:px-4 sm:text-sm"
          >
            {buttonText}
          </a>
          <button
            onClick={() => addProduct(product)}
            className="font-orbitron border-neon-lime text-neon-lime hover:bg-neon-lime hover:text-dark-surface cursor-pointer border-2 px-3 py-2 text-xs font-bold tracking-wide uppercase transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 sm:px-4 sm:text-sm"
            type="button"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
