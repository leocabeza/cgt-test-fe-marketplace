import PageHeader from '@/components/PageHeader';
import { useCartStore } from '@/stores/cart';

export default function Page() {
  const { items, removeProduct, updateQuantity, getTotalPrice, clearCart } =
    useCartStore();

  if (items.length === 0) {
    return (
      <PageHeader
        title="Your Cart"
        subtitle="Are you ready to purchase these radical items?"
        variant="contained"
      >
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
      </PageHeader>
    );
  }

  return (
    <PageHeader
      title="Your Cart"
      subtitle="Are you ready to purchase these radical items?"
      variant="contained"
    >
      <div className="my-8">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-neon-lime/10 border-neon-lime text-text-soft my-4 rounded border p-6 shadow-[0_0_10px_rgba(0,255,0,0.2)]"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="h-20 w-full flex-shrink-0 md:h-24 md:w-24">
                <img
                  src={item.image}
                  alt={item.name}
                  className="border-neon-cyan/50 h-full w-full rounded border object-cover"
                />
              </div>

              <div className="flex-grow">
                <h3 className="text-neon-cyan-soft mb-1 text-lg font-bold md:mb-2">
                  {item.name}
                </h3>
                <p className="text-text-secondary mb-1 text-sm md:mb-2">
                  {item.description}
                </p>
                <p className="text-neon-lime-soft text-base font-black md:text-lg">
                  ${item.price.toFixed(2)} each
                </p>
              </div>

              <div className="flex min-w-[120px] flex-col items-center gap-2 md:items-end md:justify-center">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-dark-surface flex h-8 w-8 items-center justify-center rounded border font-bold transition-all duration-200"
                    type="button"
                  >
                    -
                  </button>
                  <span className="text-text-primary bg-dark-surface/50 min-w-[40px] rounded px-3 py-1 text-center font-bold">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-dark-surface flex h-8 w-8 items-center justify-center rounded border font-bold transition-all duration-200"
                    type="button"
                  >
                    +
                  </button>
                </div>

                <p className="text-neon-lime-soft text-center text-sm font-bold md:text-right">
                  Subtotal: ${(item.price * item.quantity).toFixed(2)}
                </p>

                <button
                  onClick={() => removeProduct(item.id)}
                  className="rounded border border-red-500 px-3 py-1 text-xs text-red-500 transition-all duration-200 hover:bg-red-500 hover:text-white"
                  type="button"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}

        <div className="bg-neon-cyan/10 border-neon-cyan mt-8 rounded border p-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="text-center md:text-left">
              <p className="text-neon-cyan-soft mb-2 text-2xl font-bold">
                Total: ${getTotalPrice().toFixed(2)}
              </p>
              <p className="text-text-secondary">
                {items.reduce((total, item) => total + item.quantity, 0)} items
                in cart
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={clearCart}
                className="font-orbitron border-2 border-red-500 px-6 py-3 font-bold tracking-wide text-red-500 uppercase transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-500 hover:text-white active:translate-y-0"
                type="button"
              >
                Clear Cart
              </button>
              <button
                className="font-orbitron border-neon-cyan bg-neon-gradient text-text-primary shadow-neon-cyan hover:from-retro-purple hover:to-neon-cyan hover:shadow-neon-cyan-intense active:shadow-neon-cyan cursor-pointer border-2 px-6 py-3 font-bold tracking-wide uppercase transition-all duration-300 hover:-translate-y-0.5 hover:bg-gradient-to-r active:translate-y-0"
                type="button"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <a
            href="/products"
            className="font-orbitron border-neon-lime text-neon-lime hover:bg-neon-lime hover:text-dark-surface inline-block border-2 px-6 py-3 font-bold tracking-wide uppercase transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    </PageHeader>
  );
}
