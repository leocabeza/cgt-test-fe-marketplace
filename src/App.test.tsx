import { render, screen } from './test-utils';
import App from './App';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
  });

  it('renders the main heading', () => {
    render(<App />);

    expect(screen.getByText('Welcome to the Future!')).toBeInTheDocument();
  });

  it('renders product sections', () => {
    render(<App />);

    expect(screen.getByText('Product A')).toBeInTheDocument();
    expect(screen.getByText('Product B')).toBeInTheDocument();
    expect(screen.getByText('Check it out')).toBeInTheDocument();
    expect(screen.getByText('Explore now')).toBeInTheDocument();
  });
});
