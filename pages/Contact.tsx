
import React, { useState } from 'react';
import Newsletter from '../components/Newsletter';
import SmartImage from '../components/SmartImage';

const WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/awEtgBZulTXZetlFqo8c/webhook-trigger/2d4be777-7175-45ed-b91c-991b1e7eb36c';

const Contact: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          subject,
          message,
        }),
      });

      setSubmitted(true);
      setFirstName('');
      setLastName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err) {
      console.error('Webhook error:', err);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
                <input type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)} className="border-b border-gray-300 py-2 focus:border-black outline-none transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-gray-400">Last Name <span className="lowercase font-light">(required)</span></label>
                <input type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)} className="border-b border-gray-300 py-2 focus:border-black outline-none transition-colors" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest text-gray-400">Email Address <span className="lowercase font-light">(required)</span></label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="border-b border-gray-300 py-2 focus:border-black outline-none transition-colors" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest text-gray-400">Subject <span className="lowercase font-light">(required)</span></label>
              <input type="text" required value={subject} onChange={(e) => setSubject(e.target.value)} className="border-b border-gray-300 py-2 focus:border-black outline-none transition-colors" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest text-gray-400">Message <span className="lowercase font-light">(required)</span></label>
              <textarea rows={4} required value={message} onChange={(e) => setMessage(e.target.value)} className="border-b border-gray-300 py-2 focus:border-black outline-none transition-colors resize-none font-light" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-12 py-3 border border-black uppercase text-xs tracking-[0.2em] hover:bg-black hover:text-white transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Submit'}
            </button>

            {submitted && (
              <p className="text-green-700 text-sm italic mt-4">Thank you for your message! I'll get back to you soon.</p>
            )}
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
