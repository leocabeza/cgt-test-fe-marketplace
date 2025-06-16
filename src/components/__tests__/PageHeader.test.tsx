import { render, screen } from '../../test-utils';
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

  it('applies correct classes for hero variant', () => {
    const { container } = render(
      <PageHeader title="Hero Title" variant="hero" />
    );

    const headerContainer = container.firstChild as HTMLElement;
    expect(headerContainer).toHaveClass('from-retro-purple/10');
    expect(headerContainer).toHaveClass('to-neon-cyan/10');
    expect(headerContainer).toHaveClass('border-neon-cyan');

    const title = screen.getByRole('heading', { name: 'Hero Title' });
    expect(title).toHaveClass('text-neon-lime-soft');
    expect(title).toHaveClass('animate-glow-pulse');
  });

  it('applies correct classes for contained variant', () => {
    const { container } = render(
      <PageHeader title="Contained Title" variant="contained" />
    );

    const headerContainer = container.firstChild as HTMLElement;
    expect(headerContainer).toHaveClass('from-dark-surface');
    expect(headerContainer).toHaveClass('to-neon-lime/10');
    expect(headerContainer).toHaveClass('border-neon-lime');

    const title = screen.getByRole('heading', { name: 'Contained Title' });
    expect(title).toHaveClass('text-neon-lime-soft');
    expect(title).toHaveClass('text-2xl');
  });

  it('applies correct classes for standard variant (default)', () => {
    const { container } = render(<PageHeader title="Standard Title" />);

    const headerContainer = container.firstChild as HTMLElement;
    expect(headerContainer).toHaveClass('animate-fade-in');

    const title = screen.getByRole('heading', { name: 'Standard Title' });
    expect(title).toHaveClass('text-neon-cyan-soft');
  });

  it('applies correct subtitle classes for hero variant', () => {
    render(
      <PageHeader title="Hero Title" subtitle="Hero Subtitle" variant="hero" />
    );

    const subtitle = screen.getByText('Hero Subtitle');
    expect(subtitle).toHaveClass('text-text-soft');
    expect(subtitle).toHaveClass('mb-6');
    expect(subtitle).toHaveClass('text-lg');
    expect(subtitle).toHaveClass('text-center');
  });

  it('applies correct subtitle classes for non-hero variants', () => {
    render(
      <PageHeader
        title="Standard Title"
        subtitle="Standard Subtitle"
        variant="standard"
      />
    );

    const subtitle = screen.getByText('Standard Subtitle');
    expect(subtitle).toHaveClass('text-text-soft');
    expect(subtitle).toHaveClass('mb-4');
    expect(subtitle).toHaveClass('text-center');
    expect(subtitle).toHaveClass('text-lg');
  });

  it('does not render subtitle when not provided', () => {
    render(<PageHeader title="Title Only" />);

    expect(
      screen.getByRole('heading', { name: 'Title Only' })
    ).toBeInTheDocument();
    expect(screen.queryByText(/subtitle/i)).not.toBeInTheDocument();
  });
});
