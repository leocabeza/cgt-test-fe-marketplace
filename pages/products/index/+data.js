import { getProducts } from '@/services/products';

export default async function data() {
  const products = await getProducts();

  return {
    products,
    title: "All Products - 90's Marketplace",
    description:
      'Browse our complete collection of retro products, vintage tech, 90s gaming consoles, and nostalgic collectibles from the radical era.',
  };
}
