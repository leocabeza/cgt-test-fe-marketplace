import alienReplica from '@/assets/alien-3d-replica.webp';
import astronautSuit from '@/assets/astronaut-suit.webp';
import cassetteCompilationImage from '@/assets/cassete-compilation-top-songs.webp';
import cassettePlayerImage from '@/assets/cassete-player.webp';
import nintendo64Image from '@/assets/nintendo-64-console.webp';
import oldCameraImage from '@/assets/old-camera.webp';
import sonyWalkmanImage from '@/assets/sony-walkman.webp';
import tradingCardsImage from '@/assets/trading-cards.webp';
import windows95LicenseImage from '@/assets/windows-95-license.webp';
import windowsPcImage from '@/assets/windows-pc.webp';
import type { Product } from '@/types';

const mockProducts: Product[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    name: 'Alien 3D Replica',
    slug: 'alien-3d-replica',
    price: 25.99,
    description:
      'Detailed 3D alien replica figure, perfect for sci-fi enthusiasts and collectors.',
    image: alienReplica,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    name: 'Astronaut Suit',
    slug: 'astronaut-suit',
    price: 45.99,
    description:
      'Authentic astronaut suit replica with realistic details and space-age materials.',
    image: astronautSuit,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    name: 'Retro Cassette Compilation',
    slug: 'retro-cassette-compilation',
    price: 15.99,
    description:
      'Classic compilation tape featuring the greatest hits from the golden era of music.',
    image: cassetteCompilationImage,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440004',
    name: 'Vintage Cassette Player',
    slug: 'vintage-cassette-player',
    price: 89.99,
    description:
      'Fully functional retro cassette player with authentic sound quality.',
    image: cassettePlayerImage,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440005',
    name: 'Nintendo 64 Console',
    slug: 'nintendo-64-console',
    price: 149.99,
    description:
      'Classic gaming console in working condition, relive the 90s gaming experience.',
    image: nintendo64Image,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440006',
    name: 'Vintage Film Camera',
    slug: 'vintage-film-camera',
    price: 199.99,
    description:
      'Beautiful vintage camera perfect for film photography enthusiasts.',
    image: oldCameraImage,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440007',
    name: 'Sony Walkman',
    slug: 'sony-walkman',
    price: 79.99,
    description:
      'Iconic portable music player that defined a generation of music lovers.',
    image: sonyWalkmanImage,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440008',
    name: 'Trading Card Collection',
    slug: 'trading-card-collection',
    price: 35.99,
    description: 'Rare collection of vintage trading cards in mint condition.',
    image: tradingCardsImage,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440009',
    name: 'Windows 95 License',
    slug: 'windows-95-license',
    price: 29.99,
    description:
      'Original Windows 95 software license, a piece of computing history.',
    image: windows95LicenseImage,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440010',
    name: 'Retro Windows PC',
    slug: 'retro-windows-pc',
    price: 299.99,
    description:
      'Complete vintage PC setup, perfect for retro computing and nostalgia.',
    image: windowsPcImage,
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
