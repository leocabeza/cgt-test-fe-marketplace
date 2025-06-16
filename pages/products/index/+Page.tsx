import { useData } from 'vike-react/useData';
import ProductCard from '@/components/ProductCard';
import PageHeader from '@/components/PageHeader';

const ProductList = ({ products }) => {
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
  const { products } = useData();

  return (
    <PageHeader title="All Products" variant="standard">
      <ProductList products={products} />
    </PageHeader>
  );
}
