import PageHeader from '@/components/PageHeader';

function cartItems() {
  return [];
}

export default function Page() {
  return (
    <PageHeader
      title="Your Cart"
      subtitle="Are you ready to purchase these radical items?"
      variant="contained"
    >
      <ul className="my-8 list-none p-0">
        {cartItems().map((cartItem, index) => (
          <li
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={index}
            className="bg-neon-lime/10 border-neon-lime text-text-soft my-4 border p-4 shadow-[0_0_10px_rgba(0,255,0,0.2)]"
          >
            {cartItem}
          </li>
        ))}
      </ul>
      {cartItems().length === 0 && (
        <div className="py-8 text-center">
          <p className="text-text-secondary mb-4 text-xl">
            Your cart is empty, dude!
          </p>
          <a
            href="/"
            className="font-orbitron border-neon-cyan bg-neon-gradient text-text-primary shadow-neon-cyan hover:from-retro-purple hover:to-neon-cyan hover:shadow-neon-cyan-intense active:shadow-neon-cyan cursor-pointer border-2 px-6 py-3 font-bold tracking-wide uppercase transition-all duration-300 hover:-translate-y-0.5 hover:bg-gradient-to-r active:translate-y-0"
          >
            Start shopping
          </a>
        </div>
      )}
    </PageHeader>
  );
}
