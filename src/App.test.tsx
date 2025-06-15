import { render, screen, fireEvent } from './test-utils';
import App from './App';

describe('App', () => {
  it('renders vite and react logos', () => {
    render(<App />);

    expect(screen.getByAltText('Vite logo')).toBeInTheDocument();
    expect(screen.getByAltText('React logo')).toBeInTheDocument();
  });

  it('renders the main heading', () => {
    render(<App />);

    expect(screen.getByText('Vite + React')).toBeInTheDocument();
  });

  it('renders count button and increments count', () => {
    render(<App />);

    const button = screen.getByRole('button', { name: /count is 0/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(
      screen.getByRole('button', { name: /count is 1/i })
    ).toBeInTheDocument();
  });
});
