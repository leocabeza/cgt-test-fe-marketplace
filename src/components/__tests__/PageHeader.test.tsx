import { render, screen } from '@testing-library/react';
import PageHeader from '../PageHeader';

describe('PageHeader', () => {
  it('renders with title only', () => {
    render(<PageHeader title="Test Title" />);

    expect(
      screen.getByRole('heading', { name: 'Test Title' })
    ).toBeInTheDocument();
  });

  it('renders with title and subtitle', () => {
    render(<PageHeader title="Test Title" subtitle="Test Subtitle" />);

    expect(
      screen.getByRole('heading', { name: 'Test Title' })
    ).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  it('renders children when provided', () => {
    render(
      <PageHeader title="Test Title">
        <div data-testid="child-content">Child Content</div>
      </PageHeader>
    );

    expect(
      screen.getByRole('heading', { name: 'Test Title' })
    ).toBeInTheDocument();
    expect(screen.getByTestId('child-content')).toBeInTheDocument();
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  it('renders with hero variant', () => {
    render(<PageHeader title="Hero Title" variant="hero" />);

    const title = screen.getByRole('heading', { name: 'Hero Title' });
    expect(title).toBeInTheDocument();
  });

  it('renders with contained variant', () => {
    render(<PageHeader title="Contained Title" variant="contained" />);

    const title = screen.getByRole('heading', { name: 'Contained Title' });
    expect(title).toBeInTheDocument();
  });

  it('renders with standard variant (default)', () => {
    render(<PageHeader title="Standard Title" />);

    const title = screen.getByRole('heading', { name: 'Standard Title' });
    expect(title).toBeInTheDocument();
  });

  it('renders subtitle with hero variant', () => {
    render(
      <PageHeader title="Hero Title" subtitle="Hero Subtitle" variant="hero" />
    );

    const title = screen.getByRole('heading', { name: 'Hero Title' });
    expect(title).toBeInTheDocument();
    expect(screen.getByText('Hero Subtitle')).toBeInTheDocument();
  });

  it('renders subtitle with non-hero variants', () => {
    render(
      <PageHeader
        title="Standard Title"
        subtitle="Standard Subtitle"
        variant="standard"
      />
    );

    const title = screen.getByRole('heading', { name: 'Standard Title' });
    expect(title).toBeInTheDocument();
    expect(screen.getByText('Standard Subtitle')).toBeInTheDocument();
  });

  it('does not render subtitle when not provided', () => {
    render(<PageHeader title="Title Only" />);

    expect(
      screen.getByRole('heading', { name: 'Title Only' })
    ).toBeInTheDocument();
    expect(screen.queryByText(/subtitle/i)).not.toBeInTheDocument();
  });
});
