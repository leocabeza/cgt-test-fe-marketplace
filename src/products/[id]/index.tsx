import { useParams } from 'react-router';
import pictureA from '../../assets/a.jpg';
import pictureB from '../../assets/b.jpg';

const ProductDetail = () => {
  const { productId } = useParams();

  const products = {
    a: {
      name: 'Product A',
      price: '$10.00 USD',
      image: pictureA,
      alt: 'Product A',
    },
    b: {
      name: 'Product B',
      price: '$30.00 USD',
      image: pictureB,
      alt: 'Product B',
    },
  };

  const product = products[productId as keyof typeof products];

  if (!product) {
    return (
      <div className="from-dark-surface to-retro-purple/20 border-neon-magenta shadow-neon-magenta animate-fade-in relative mx-auto my-8 max-w-[800px] border-3 bg-gradient-to-br p-8">
        <h1 className="font-retro text-neon-magenta-soft mb-4 text-center text-[clamp(1.2rem,3vw,1.8rem)] drop-shadow-[0_0_20px_currentColor]">
          Product Not Found
        </h1>
        <p className="text-text-secondary text-center">
          The product you're looking for doesn't exist, dude!
        </p>
      </div>
    );
  }

  return (
    <div className="from-dark-surface to-retro-purple/20 border-neon-magenta shadow-neon-magenta animate-fade-in relative mx-auto my-8 max-w-[800px] border-3 bg-gradient-to-br p-8">
      <h1 className="font-retro text-neon-magenta-soft mb-4 text-center text-[clamp(1.2rem,3vw,1.8rem)] drop-shadow-[0_0_20px_currentColor]">
        {product.name}
      </h1>
      <p className="text-neon-lime-soft mb-8 text-center text-2xl font-black drop-shadow-[0_0_15px_currentColor]">
        Price: {product.price}
      </p>

      <div className="mb-6 text-center">
        <button
          className="font-orbitron border-neon-cyan bg-neon-gradient text-text-primary shadow-neon-cyan hover:from-retro-purple hover:to-neon-cyan hover:shadow-neon-cyan-intense active:shadow-neon-cyan cursor-pointer border-2 px-6 py-3 font-bold tracking-wide uppercase transition-all duration-300 hover:-translate-y-0.5 hover:bg-gradient-to-r active:translate-y-0"
          onClick={() => console.warn('Not implemented!')}
          type="button"
        >
          Add to cart
        </button>
      </div>

      <div className="text-center">
        <img
          src={product.image}
          alt={product.alt}
          className="border-neon-cyan mx-auto my-8 block h-auto w-full max-w-[500px] border-3 shadow-[0_0_20px_rgba(0,255,255,0.4),inset_0_0_20px_rgba(0,255,255,0.1)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(0,255,255,0.6),inset_0_0_40px_rgba(0,255,255,0.2)]"
        />
      </div>
    </div>
  );
};

export default ProductDetail;
