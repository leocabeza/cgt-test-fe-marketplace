import type { Product } from '@/types';

const mockProducts: Product[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    name: 'Alien 3D Replica',
    slug: 'alien-3d-replica',
    price: 25.99,
    description:
      'Detailed 3D alien replica figure, perfect for sci-fi enthusiasts and collectors.',
    image: '/mock-alien.avif',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    name: 'Astronaut Suit',
    slug: 'astronaut-suit',
    price: 45.99,
    description:
      'Authentic astronaut suit replica with realistic details and space-age materials.',
    image: '/mock-astronaut.avif',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    name: 'Retro Cassette Compilation',
    slug: 'retro-cassette-compilation',
    price: 15.99,
    description:
      'Classic compilation tape featuring the greatest hits from the golden era of music.',
    image: '/mock-cassette.avif',
  },
];

export const getProducts = async (): Promise<Product[]> => {
  return [...mockProducts];
};

export const getProduct = async (id: string): Promise<Product | null> => {
  return mockProducts.find((product) => product.id === id) || null;
};

export const getProductBySlug = async (
  slug: string
): Promise<Product | null> => {
  return mockProducts.find((product) => product.slug === slug) || null;
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  return mockProducts.slice(0, 3);
};
