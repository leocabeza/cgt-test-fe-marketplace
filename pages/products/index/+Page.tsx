import PageHeader from '@/components/PageHeader';
import ProductCard from '@/components/ProductCard';
import { useData } from 'vike-react/useData';
import type { Product } from '@/types';

const ProductList = ({ products }: { products: Product[] }) => {
  return (
    <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-8">
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
