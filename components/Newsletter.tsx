
import React, { useState } from 'react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Subscribed with: ${email}`);
    setEmail('');
  };

  return (
    <div className="bg-gray-100 py-16 px-4 text-center mt-20">
      <h3 className="serif text-3xl mb-4">Subscribe</h3>
      <p className="text-gray-600 mb-8 max-w-xl mx-auto">
        Sign up with your email address to receive news, updates and get notified for new product release.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          required
          className="px-4 py-3 border border-gray-300 w-full max-w-sm focus:outline-none focus:border-black transition-colors"
        />
        <button
          type="submit"
          className="px-8 py-3 bg-white border border-black hover:bg-black hover:text-white transition-all uppercase text-sm tracking-widest"
        >
          Sign Up
        </button>
      </form>
      <p className="text-xs text-gray-400 mt-6 italic">
        We respect your privacy and want to show you those little <span className="underline cursor-pointer">golden seahorses</span>
      </p>
    </div>
  );
};

export default Newsletter;
