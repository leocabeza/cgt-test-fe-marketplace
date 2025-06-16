import { getProductBySlug } from '@/services/products';

export default async function data(pageContext) {
  const slug = pageContext.routeParams.slug;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      product: null,
      title: "Product Not Found - 90's Marketplace",
      description:
        "The product you're looking for doesn't exist in our radical marketplace.",
    };
  }

  return {
    product,
    title: `${product.name} - $${product.price} | 90's Marketplace`,
    description: product.description,
  };
}
