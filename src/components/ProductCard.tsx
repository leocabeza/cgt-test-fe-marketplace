import { useCartStore } from '@/stores/cart';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  imageHeight?: 'short' | 'tall';
  buttonText?: string;
  titleSize?: 'medium' | 'large';
  priceSize?: 'medium' | 'large';
  showAddToCart?: boolean;
}

const ProductCard = ({
  product,
  imageHeight = 'tall',
  buttonText = 'View Details',
  titleSize = 'large',
  priceSize = 'large',
  showAddToCart = true,
}: ProductCardProps) => {
  const addProduct = useCartStore((state) => state.addProduct);
  const imageHeightClass = imageHeight === 'short' ? 'h-32' : 'h-64';
  const titleSizeClass = titleSize === 'medium' ? 'text-xl' : 'text-2xl';
  const priceSizeClass = priceSize === 'medium' ? 'text-lg' : 'text-xl';
  const marginBottom = titleSize === 'medium' ? 'mb-4' : 'mb-4';
  const priceMarginBottom = priceSize === 'medium' ? 'mb-2' : 'mb-4';

  return (
    <div className="from-dark-surface to-retro-purple/20 border-neon-cyan shadow-retro-glow before:via-neon-cyan/10 relative my-4 flex h-full flex-col overflow-hidden border-2 bg-gradient-to-br p-6 before:absolute before:top-0 before:-left-full before:h-full before:w-full before:bg-gradient-to-r before:from-transparent before:to-transparent before:transition-all before:duration-600 hover:before:left-full">
      <picture>
        <source srcSet={product.image} type="image/avif" />
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className={`mb-4 ${imageHeightClass} w-full rounded object-cover`}
        />
      </picture>
      <div className="flex flex-grow flex-col">
        <h3
          className={`text-neon-cyan-soft ${marginBottom} text-center ${titleSizeClass} flex min-h-[3.5rem] items-center justify-center font-bold`}
        >
          {product.name}
        </h3>
        <p
          className={`text-neon-lime-soft ${priceMarginBottom} text-center ${priceSizeClass} font-black drop-shadow-[0_0_15px_currentColor]`}
        >
          ${product.price}
        </p>
        <p
          className={`text-text-soft ${titleSize === 'medium' ? 'mb-4' : 'mb-6'} flex-grow text-center`}
        >
          {product.description}
        </p>
      </div>
      <div
        className={`${titleSize === 'medium' ? '' : 'mb-4'} mt-auto text-center`}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href={`/products/${product.slug}`}
            className="font-orbitron border-neon-cyan bg-neon-gradient text-text-primary shadow-neon-cyan hover:from-retro-purple hover:to-neon-cyan hover:shadow-neon-cyan-intense active:shadow-neon-cyan cursor-pointer border-2 px-4 py-2 text-sm font-bold tracking-wide uppercase transition-all duration-300 hover:-translate-y-0.5 hover:bg-gradient-to-r active:translate-y-0"
          >
            {buttonText}
          </a>
          {showAddToCart && (
            <button
              onClick={() => addProduct(product)}
              className="font-orbitron border-neon-lime text-neon-lime hover:bg-neon-lime hover:text-dark-surface cursor-pointer border-2 px-4 py-2 text-sm font-bold tracking-wide uppercase transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
              type="button"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
