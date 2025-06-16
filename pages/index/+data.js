import { getFeaturedProducts } from '@/services/products';

export default async function data() {
  const featuredProducts = await getFeaturedProducts();

  return {
    featuredProducts,
    title: "90's Marketplace - Retro Products & Collectibles",
    description:
      'Step into our radical marketplace where the future meets the past! Discover vintage tech, retro games, and collectibles from the 90s era.',
  };
}
