import React, { useState } from 'react';
import { toast } from 'react-toastify';

const NewsLetterBox = () => {
  const [email, setEmail] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Thank you for subscribing! Your 20% discount code is WELCOME20");
    setEmail("");
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-neutral-900 text-white p-8 sm:p-14 my-16 text-center shadow-xl">
      <div className="relative z-10 max-w-xl mx-auto">
        <span className="inline-block px-3 py-1 bg-white/10 text-emerald-400 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
          Special Offer
        </span>
        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Subscribe & Get 20% Off Your First Order
        </h3>
        <p className="text-xs sm:text-sm text-gray-400 mt-2">
          Join our insider club for exclusive product drops, styling tips, and private seasonal promotions.
        </p>

        <form
          onSubmit={onSubmit}
          className="flex flex-col sm:flex-row items-center gap-2 max-w-md mx-auto mt-6 bg-white/10 p-1.5 rounded-2xl border border-white/10 backdrop-blur-xs"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 bg-transparent text-white placeholder-gray-400 text-sm outline-none"
            placeholder="Enter your email address"
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 bg-white text-black font-semibold text-xs rounded-xl hover:bg-gray-200 transition cursor-pointer active:scale-95 whitespace-nowrap"
          >
            SUBSCRIBE
          </button>
        </form>
        <p className="text-[11px] text-gray-500 mt-3">No spam, unsubscribe anytime.</p>
      </div>
    </div>
  );
};

export default NewsLetterBox;