import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import App from './+Page';

// Mock vike-react/useData
vi.mock('vike-react/useData', () => ({
  useData: () => ({
    featuredProducts: [
      {
        id: 1,
        name: 'Alien 3D Replica',
        price: 99,
        image: '/src/assets/alien-3d-replica.webp',
      },
      {
        id: 2,
        name: 'Astronaut Suit',
        price: 149,
        image: '/src/assets/astronaut-suit.webp',
      },
      {
        id: 3,
        name: 'Retro Cassette Compilation',
        price: 29,
        image: '/src/assets/cassete-compilation-top-songs.webp',
      },
    ],
  }),
}));

describe('Home Page', () => {
  it('renders without crashing', () => {
    render(<App />);
  });

  it('renders the main heading', () => {
    render(<App />);

    expect(screen.getByText('Welcome to the Future!')).toBeInTheDocument();
  });

  it('renders featured products', () => {
    render(<App />);

    expect(screen.getByText('Alien 3D Replica')).toBeInTheDocument();
    expect(screen.getByText('Astronaut Suit')).toBeInTheDocument();
    expect(screen.getByText('Retro Cassette Compilation')).toBeInTheDocument();
    expect(screen.getAllByText('Check it out')).toHaveLength(3);
  });
});
