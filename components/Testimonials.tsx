import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { TESTIMONIALS, CONTENT } from '../constants';
import { Star, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const { language } = useLanguage();
  const t = CONTENT[language];
  const testimonials = TESTIMONIALS[language];

  return (
    <section className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            {t.testimonials.title}
          </h2>
        </div>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white dark:from-slate-950 z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white dark:from-slate-950 z-10"></div>
        
        <div className="flex animate-scroll hover:pause" style={{ width: "max-content" }}>
          {/* Double the array to create seamless loop */}
          {[...testimonials, ...testimonials].map((test, i) => (
            <div 
              key={`${test.id}-${i}`} 
              className="w-[350px] mx-4 bg-gray-50 dark:bg-slate-900 p-8 rounded-2xl border border-gray-100 dark:border-slate-800 relative flex-shrink-0"
            >
              <Quote className="absolute top-6 right-6 text-primary-200 dark:text-slate-700 w-10 h-10" />
              <div className="flex items-center space-x-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic mb-6 leading-relaxed relative z-10">
                "{test.content}"
              </p>
              <div className="flex items-center mt-auto">
                <img src={test.avatar} alt={test.name} className="h-12 w-12 rounded-full mr-4 object-cover ring-2 ring-primary-100 dark:ring-slate-700" />
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">{test.name}</h4>
                  <p className="text-xs text-primary-600 dark:text-primary-400">{test.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .hover\\:pause:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;