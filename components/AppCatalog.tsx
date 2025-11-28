import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { APPS, CONTENT, EXCHANGE_RATE } from '../constants';
import { ArrowRight, Tag } from 'lucide-react';

// Individual Unit Component - With Count Up Animation
const TimeUnit: React.FC<{ value: number, label: string, isSeconds?: boolean }> = ({ value, label, isSeconds }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const hasAnimated = useRef(false);

  // Sync with real-time updates after initial animation
  useEffect(() => {
    if (hasAnimated.current) {
      setDisplayValue(value);
    }
  }, [value]);

  // Initial Count Up Animation on mount
  useEffect(() => {
    const duration = 2000;
    const startTarget = value;
    let startTime: number;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = time - startTime;
      
      if (progress < duration) {
        const percentage = 1 - Math.pow(1 - (progress / duration), 3); // Ease out cubic
        setDisplayValue(Math.floor(startTarget * percentage));
        requestAnimationFrame(animate);
      } else {
        hasAnimated.current = true;
        setDisplayValue((prev) => hasAnimated.current ? prev : startTarget); 
      }
    };
    
    requestAnimationFrame(animate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

  return (
    <div className="flex flex-col items-center mx-2 md:mx-4 relative">
      {/* Santa Hat SVG - Custom Design - Smaller & Better Positioned */}
      {isSeconds && (
        <div className="absolute -top-12 -right-5 z-20 w-14 h-14 pointer-events-none transform rotate-[8deg]">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
              <path d="M 20 70 Q 15 10 55 10 C 80 10 95 40 95 55 L 80 75 Z" fill="#DC2626" />
              <circle cx="95" cy="55" r="14" fill="white" filter="url(#glow)" />
              <path d="M 10 68 Q 50 62 90 73 L 88 88 Q 48 78 8 85 Z" fill="white" />
              <defs>
                 <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                   <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
                   <feMerge>
                     <feMergeNode in="coloredBlur"/>
                     <feMergeNode in="SourceGraphic"/>
                   </feMerge>
                 </filter>
              </defs>
            </svg>
        </div>
      )}
      
      <div className={`bg-gradient-to-b from-red-600 to-red-800 border-2 border-yellow-400 rounded-lg p-3 md:p-4 w-16 md:w-20 shadow-xl text-center relative overflow-hidden ${isSeconds ? 'ring-2 ring-yellow-400 ring-offset-2' : ''}`}>
        <div className="absolute top-0 left-0 w-full h-1 bg-white/30"></div>
        <span className="text-2xl md:text-3xl font-extrabold text-white tabular-nums drop-shadow-md">
          {displayValue < 10 ? `0${displayValue}` : displayValue}
        </span>
      </div>
      <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-2 font-bold uppercase tracking-wide">
        {label}
      </span>
    </div>
  );
};

// Christmas Countdown Timer Component
const CountdownTimer: React.FC = () => {
  const { language } = useLanguage();
  
  const calculateTimeLeft = () => {
    const year = new Date().getFullYear();
    const difference = +new Date(`${year}-12-31T23:59:59`) - +new Date();
    
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-center flex-wrap mt-10 animate-fade-in pb-4">
      <TimeUnit value={timeLeft.days} label={language === 'es' ? 'Días' : 'Days'} />
      <div className="text-2xl md:text-4xl font-bold text-red-600 mt-2">:</div>
      <TimeUnit value={timeLeft.hours} label={language === 'es' ? 'Horas' : 'Hours'} />
      <div className="text-2xl md:text-4xl font-bold text-red-600 mt-2">:</div>
      <TimeUnit value={timeLeft.minutes} label="Min" />
      <div className="text-2xl md:text-4xl font-bold text-red-600 mt-2">:</div>
      <TimeUnit value={timeLeft.seconds} label="Seg" isSeconds />
    </div>
  );
};

const AppCatalog: React.FC = () => {
  const { language } = useLanguage();
  const t = CONTENT[language];
  const apps = APPS[language];
  const navigate = useNavigate();

  return (
    <section id="catalog" className="py-20 bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">{t.nav.apps}</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            {language === 'es' ? 'Ofertas Fin de Año' : 'End of Year Offers'}
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 mx-auto">
            {language === 'es' ? 'Precios de desarrollo reducidos por tiempo limitado.' : 'Reduced development prices for a limited time.'}
          </p>
          
          <CountdownTimer />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {apps.map((app) => (
            <div 
              key={app.id} 
              onClick={() => navigate(`/app/${app.id}`)}
              className="block bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group flex flex-col h-full"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <img 
                  src={app.imageUrl} 
                  alt={app.title} 
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Offer Tag */}
                <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                  <Tag size={12} /> {t.common.offer}
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <span className="text-white font-medium flex items-center gap-2">
                    {t.common.viewDetails} <ArrowRight size={16} />
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {app.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 text-sm">
                  {app.shortDescription}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {app.features.slice(0, 3).map((feat, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-100 dark:bg-slate-800 text-xs font-medium text-gray-600 dark:text-gray-300 rounded-full">
                      {feat}
                    </span>
                  ))}
                </div>

                <div className="mt-auto border-t border-gray-100 dark:border-slate-800 pt-4 flex justify-between items-center">
                   <div className="flex flex-col">
                     <span className="text-xs text-red-400 font-medium line-through decoration-red-500/50">L {app.originalPrice.toLocaleString()}</span>
                     <div className="flex items-center gap-2">
                       <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">L {app.price.toLocaleString()}</span>
                       <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                         ${(app.price / EXCHANGE_RATE).toFixed(2)}
                       </span>
                     </div>
                   </div>
                   <span className="text-sm font-semibold text-primary-600 hover:text-primary-700">
                      {t.common.viewApp} &rarr;
                   </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AppCatalog;