
import React from 'react';
import Newsletter from '../components/Newsletter';
import SmartImage from '../components/SmartImage';

const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message. We will get back to you soon.');
  };

  return (
    <div className="animate-fadeIn max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <div className="flex justify-between items-end mb-8">
            <h2 className="serif text-4xl italic">Contact</h2>
            <div className="flex gap-4 text-xl">
              <a 
                href="https://www.facebook.com/abdulwahid.bahaduri1/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-black transition-colors" 
                title="Facebook"
              >
                <span className="text-base font-bold">f</span>
              </a>
              <a 
                href="https://www.instagram.com/nangialaibahadery1992/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-black transition-colors" 
                title="Instagram"
              >
                <span className="text-lg">○</span>
              </a>
              <a 
                href="mailto:contact@bahaderyart.com" 
                className="hover:text-black transition-colors" 
                title="Email"
              >
                <span>✉</span>
              </a>
            </div>
          </div>
          
          <p className="text-gray-600 mb-12 italic font-light">
            You can contact me if you're interested in an original artwork, commissions, inquiries or just to say hi.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-gray-400">First Name <span className="lowercase font-light">(required)</span></label>
                <input type="text" required className="border-b border-gray-300 py-2 focus:border-black outline-none transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-gray-400">Last Name <span className="lowercase font-light">(required)</span></label>
                <input type="text" required className="border-b border-gray-300 py-2 focus:border-black outline-none transition-colors" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest text-gray-400">Email Address <span className="lowercase font-light">(required)</span></label>
              <input type="email" required className="border-b border-gray-300 py-2 focus:border-black outline-none transition-colors" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest text-gray-400">Subject <span className="lowercase font-light">(required)</span></label>
              <input type="text" required className="border-b border-gray-300 py-2 focus:border-black outline-none transition-colors" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest text-gray-400">Message <span className="lowercase font-light">(required)</span></label>
              <textarea rows={4} required className="border-b border-gray-300 py-2 focus:border-black outline-none transition-colors resize-none font-light" />
            </div>

            <button type="submit" className="px-12 py-3 border border-black uppercase text-xs tracking-[0.2em] hover:bg-black hover:text-white transition-all font-medium">
              Submit
            </button>
          </form>
        </div>

        <div className="space-y-12">
          <SmartImage 
            id="site-contact-feature"
            fallbackUrl="art-indoor-03.jpg" 
            alt="Artwork detail" 
            className="w-full shadow-lg" 
          />
          <div className="bg-gray-100 p-12">
            <Newsletter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
