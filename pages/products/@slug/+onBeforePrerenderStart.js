import { getProducts } from '@/services/products';

export default async function onBeforePrerenderStart() {
  const products = await getProducts();

  // Generate URLs for all product pages using slugs
  const productUrls = products.map((product) => `/products/${product.slug}`);

  return productUrls;
}
