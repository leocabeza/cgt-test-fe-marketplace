import PageHeader from '@/components/PageHeader';
import ProductCard from '@/components/ProductCard';
import { useData } from 'vike-react/useData';
import type { Product } from '@/types';

const ProductList = ({ products }: { products: Product[] }) => {
  return (
    <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] lg:gap-8">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          buttonText="View Details"
        />
      ))}
    </div>
  );
};

export default function Page() {
  const { products = [] } = useData<{ products: Product[] }>();

  return (
    <PageHeader title="All Products" variant="standard">
      <ProductList products={products} />
    </PageHeader>
  );
}
