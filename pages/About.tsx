
import React from 'react';
import { PERSONAL_EXHIBITIONS, COLLECTIVE_EXHIBITIONS } from '../constants';
import Newsletter from '../components/Newsletter';
import SmartImage from '../components/SmartImage';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto animate-fadeIn px-4">
      <div className="mb-20">
        <SmartImage
          id="site-about-portrait"
          fallbackUrl="art-01.jpg"
          alt="Nangialai Bahadery Style"
          className="w-full grayscale hover:grayscale-0 transition-all duration-1000 shadow-xl"
        />
      </div>

      <div className="space-y-20">
        {/* Main Biography Section */}
        <section>
          <div className="flex flex-col md:flex-row gap-4 items-baseline mb-8">
            <h2 className="serif text-4xl italic">Biography</h2>
            <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold">Nangialai Bahadery</span>
          </div>

          <div className="space-y-6 text-gray-700 leading-relaxed font-light text-lg">
            <p>
              Nangialai Bahadery is an Afghan fine arts artist based in the United Arab Emirates and a UAE Golden Visa holder in the Creative and Cultural category. His artistic practice centers on landscape painting as a form of cultural memory, documentation, and resilience.
            </p>
            <p>
              Bahadery’s work explores land not only as geography, but as a living archive shaped by history, displacement, and collective experience. Through carefully composed paintings, he preserves narratives embedded in Afghan landscapes—spaces marked by continuity, loss, and endurance—translating them into a contemporary visual language that resonates internationally.
            </p>
            <p>
              He has participated in international exhibitions and art events in the UAE and abroad, including curator-led exhibitions such as <span className="italic">"Ramadan and More"</span> in Dubai, curated by Peter Gressman (artforumuae), and the <span className="italic">Global Canvas Art Festival (Season II)</span> in Dubai, a Guinness World Record–associated event. His practice also includes live painting performances and collaborative cultural projects.
            </p>
            <p>
              In addition to exhibitions, Bahadery has received multiple international certificates and recognitions, including from Delhi Collage of Art / International Art Carnival (India), International Action Art, and Collage International Artist Club, where he holds Gold Membership. He has been appointed Afghanistan Department Art Director by International Action Art, reflecting leadership and curatorial responsibility within international art networks.
            </p>
            <p>
              Beyond the studio, he has been recognized for cultural and humanitarian engagement in the UAE, including participation in the My Nationality Is Human – Human Expo for Volunteering & Innovation during the UAE Year of Community.
            </p>
            <p>
              Bahadery’s work is held and developed for private collections, institutional interest, and long-term cultural value, with a practice committed to quality, narrative depth, and sustained artistic growth.
            </p>
          </div>
        </section>

        {/* Professional Statement / Cover Letter Section */}
        <section className="bg-gray-50 p-10 sm:p-16 border-l-4 border-black">
          <h3 className="serif text-2xl mb-8 italic">Professional Statement</h3>
          <div className="space-y-6 text-gray-600 font-light leading-relaxed">
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">Statement for Collectors, Galleries & Institutions</p>
            <p>
              "My work focuses on land as a living archive—spaces that carry stories of belonging, resilience, and transformation. Through painting, I document landscapes not merely as visual subjects, but as witnesses to collective experience. Each body of work is developed with long-term cultural relevance in mind, suitable for private collections, curated exhibitions, and institutional engagement."
            </p>
            <p>
              "I am a UAE Golden Visa holder in the Creative and Cultural category, reflecting institutional recognition of my professional standing and contributions to the cultural sector. I welcome the opportunity to further discuss exhibitions, acquisitions, or investment in my current and future art projects."
            </p>
            <div className="pt-6 border-t border-gray-200 mt-8">
              <p className="serif italic text-black">Nangialai Bahadery</p>
              <p className="text-[10px] uppercase tracking-widest mt-1 text-gray-400">Afghan Fine Arts Artist | UAE Golden Visa Holder</p>
            </div>
          </div>
        </section>

        {/* Exhibitions and Awards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 pt-20 border-t border-gray-100">
          <section>
            <h3 className="font-bold uppercase tracking-[0.3em] text-[10px] mb-8 text-black">Selected Exhibitions</h3>
            <div className="space-y-10">
              <div>
                <h4 className="text-[9px] uppercase tracking-widest text-gray-400 mb-4">Personal & Curator-led</h4>
                <ul className="space-y-4">
                  {PERSONAL_EXHIBITIONS.map((ex, i) => (
                    <li key={i} className="text-sm text-gray-600 group">
                      <span className="text-black font-medium block mb-1">{ex.year}</span>
                      <p className="italic">{ex.title}</p>
                      <p className="text-xs text-gray-400 mt-1 uppercase tracking-tighter">{ex.location}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-[9px] uppercase tracking-widest text-gray-400 mb-4">Collective & Festivals</h4>
                <ul className="space-y-4">
                  {COLLECTIVE_EXHIBITIONS.map((ex, i) => (
                    <li key={i} className="text-sm text-gray-600 group">
                      <span className="text-black font-medium block mb-1">{ex.year}</span>
                      <p className="italic">{ex.title}</p>
                      <p className="text-xs text-gray-400 mt-1 uppercase tracking-tighter">{ex.location}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h3 className="font-bold uppercase tracking-[0.3em] text-[10px] mb-8 text-black">Certificates & Memberships</h3>
            <ul className="space-y-6">
              <li className="text-sm text-gray-600">
                <span className="text-black font-medium block mb-1">2024</span>
                Gold Membership — Collage International Artist Club
              </li>
              <li className="text-sm text-gray-600">
                <span className="text-black font-medium block mb-1">2024</span>
                Afghanistan Department Art Director — International Action Art
              </li>
              <li className="text-sm text-gray-600">
                <span className="text-black font-medium block mb-1">2024</span>
                Delhi Collage of Art / International Art Carnival — India
              </li>
              <li className="text-sm text-gray-600">
                <span className="text-black font-medium block mb-1">2023</span>
                Regional Heritage Prize — Kabul
              </li>
            </ul>

            <h3 className="font-bold uppercase tracking-[0.3em] text-[10px] mt-16 mb-8 text-black">In The Press</h3>
            <ul className="space-y-6">
              <li className="text-sm text-gray-600">
                <span className="text-black font-medium">THE GUARDIAN</span>
                <p className="italic mt-1">Art meets nature in Bahadery's paintings</p>
              </li>
              <li className="text-sm text-gray-600">
                <span className="text-black font-medium">VOGUE</span>
                <p className="italic mt-1">The intricate world of modern landscape art</p>
              </li>
              <li className="text-sm text-gray-600">
                <span className="text-black font-medium">ART QUARTER</span>
                <p className="italic mt-1">Feature profile on technical mastery</p>
              </li>
            </ul>
          </section>
        </div>
      </div>

      <div className="mt-32 py-24 border-y border-gray-100 italic text-2xl text-center text-gray-500 leading-relaxed px-10 serif">
        "The patience of a saint, the steady hand of a master-crafts person and the creativity of a remarkable artist. A fitting few lines to describe this incredibly self-taught talent."
        <div className="mt-8 text-[10px] uppercase tracking-[0.4em] text-gray-400">— Art Critics Journal</div>
      </div>

      <div className="flex flex-col items-center gap-6 mt-32 mb-20 border-t border-gray-50 pt-20">
        <div className="flex gap-12 text-[10px] tracking-[0.3em] uppercase font-bold text-gray-400">
          <a href="https://www.instagram.com/nangialaibahadery1992/" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">Instagram</a>
          <a href="https://www.facebook.com/abdulwahid.bahaduri1/" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">Facebook</a>
        </div>
        <button
          onClick={() => window.dispatchEvent(new CustomEvent('open-bahadery-admin'))}
          className="text-[9px] uppercase tracking-[0.4em] text-gray-300 hover:text-black transition-colors font-bold mt-2"
        >
          Dev Manager
        </button>
      </div>

      <Newsletter />
    </div>
  );
};

export default About;
