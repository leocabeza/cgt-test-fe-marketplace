import PageHeader from '@/components/PageHeader';
import ProductCard from '@/components/ProductCard';
import { useData } from 'vike-react/useData';
import type { Product } from '@/types';

const FeaturedProducts = ({ products }: { products: Product[] }) => {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] lg:gap-8">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          buttonText="Check it out"
        />
      ))}
    </div>
  );
};

export default function Page() {
  const { featuredProducts } = useData<{ featuredProducts: Product[] }>();

  return (
    <PageHeader
      title="Welcome to the Future!"
      subtitle="Step into our radical marketplace where the future meets the past!"
      variant="hero"
    >
      <FeaturedProducts products={featuredProducts} />
    </PageHeader>
  );
}
