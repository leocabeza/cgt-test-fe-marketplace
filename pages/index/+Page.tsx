import PageHeader from '@/components/PageHeader';
import ProductCard, { type Product } from '@/components/ProductCard';
import { useData } from 'vike-react/useData';

const FeaturedProducts = ({ products }: { products: Product[] }) => {
  return (
    <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          buttonText="Check it out"
          titleSize="medium"
          priceSize="medium"
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
