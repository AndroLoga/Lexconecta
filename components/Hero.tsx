
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CONTENT, HERO_IMAGES } from '../constants';
import { Reveal } from './Reveal';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const { language } = useLanguage();
  const t = CONTENT[language];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const scrollToCatalog = () => {
    const element = document.getElementById('catalog');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="home" className="relative h-screen min-h-[600px] flex items-center overflow-hidden bg-slate-900">
      {/* Dynamic Background Slider */}
      {HERO_IMAGES.map((img, index) => (
        <div 
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            className="w-full h-full object-cover"
            src={img}
            alt={`Slide ${index + 1}`}
          />
          <div className="absolute inset-0 bg-slate-900/70 mix-blend-multiply"></div>
        </div>
      ))}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 pt-20">
        <main className="mt-10 mx-auto max-w-4xl text-center">
          <Reveal width="100%">
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-2xl">
              <span className="block mb-2">{t.hero.title.split(' ').slice(0, 3).join(' ')}</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-200 drop-shadow-md">
                {t.hero.title.split(' ').slice(3).join(' ')}
              </span>
            </h1>
          </Reveal>
          
          <Reveal width="100%" delay={0.2}>
            <p className="mt-8 text-lg sm:text-xl text-gray-100 max-w-2xl mx-auto leading-relaxed drop-shadow-lg font-medium">
              {t.hero.subtitle}
            </p>
          </Reveal>
          
          <Reveal width="100%" delay={0.4}>
            <div className="mt-12 flex justify-center">
              <button
                onClick={scrollToCatalog}
                className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white transition-all duration-300 bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 rounded-full shadow-2xl hover:shadow-indigo-500/40 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 overflow-hidden"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 transition-transform duration-500 ease-out"></div>
                <span className="relative flex items-center gap-3">
                  {language === 'es' ? 'Ir al Catálogo' : 'Go to Catalog'}
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </button>
            </div>
          </Reveal>
        </main>
      </div>
      
      {/* Slider Indicators */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {HERO_IMAGES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentImageIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 shadow-md ${
              idx === currentImageIndex ? 'bg-white w-8' : 'bg-white/50 w-2 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
