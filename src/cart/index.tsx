import { Link } from 'react-router';

function cartItems() {
  return [];
}

const Cart = () => {
  return (
    <div className="from-dark-surface to-neon-lime/10 border-neon-lime shadow-neon-lime animate-fade-in mx-auto my-8 max-w-[600px] border-3 bg-gradient-to-br p-8">
      <h1 className="font-retro text-neon-lime-soft mb-8 text-center text-2xl drop-shadow-[0_0_20px_currentColor]">
        Your Cart
      </h1>
      <p className="text-text-soft mb-4 text-center text-lg">
        Are you ready to purchase these radical items?
      </p>
      <ul className="my-8 list-none p-0">
        {cartItems().map((cartItem, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <li
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
          <Link
            to="/"
            className="font-orbitron border-neon-cyan bg-neon-gradient text-text-primary shadow-neon-cyan hover:from-retro-purple hover:to-neon-cyan hover:shadow-neon-cyan-intense active:shadow-neon-cyan cursor-pointer border-2 px-6 py-3 font-bold tracking-wide uppercase transition-all duration-300 hover:-translate-y-0.5 hover:bg-gradient-to-r active:translate-y-0"
          >
            Start shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
