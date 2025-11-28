import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { PRICING, CONTENT, GUARANTEES } from '../constants';
import { Check, Star, Mail, HardDrive } from 'lucide-react';
import { Reveal } from './Reveal';
import { PricingPlan, GlobalContent } from '../types';

// Strict Prop Interface
interface PricingCardProps {
  plan: PricingPlan;
  t: GlobalContent;
}

// CountUp Hook with Cleanup to prevent memory leaks
const useCountUp = (end: number, duration: number = 2000, start: boolean = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    
    let startTime: number;
    let frameId: number;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = time - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      setCount(Math.floor(end * percentage));

      if (progress < duration) {
        frameId = requestAnimationFrame(animate);
      }
    };
    
    frameId = requestAnimationFrame(animate);

    // Cleanup function
    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [end, duration, start]);

  return count;
};

const PricingCard: React.FC<PricingCardProps> = ({ plan, t }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if(entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.2 });
    if(ref.current) observer.observe(ref.current);
    return () => { if(ref.current) observer.unobserve(ref.current); }
  }, []);

  const animatedPrice = useCountUp(plan.priceValue, 2000, isVisible);

  return (
    <div 
      ref={ref}
      className={`relative flex flex-col h-full bg-white dark:bg-slate-900 rounded-3xl transition-all duration-300 ${
        plan.isRecommended 
          ? 'border-2 border-primary-500 shadow-2xl scale-105 z-10' 
          : 'border border-gray-200 dark:border-slate-800 shadow-xl hover:shadow-2xl'
      }`}
    >
      {plan.isRecommended && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide flex items-center gap-2 shadow-lg shadow-indigo-500/30">
            <Star size={14} fill="currentColor" /> {t.common.recommended}
          </span>
        </div>
      )}
      
      <div className="p-8 flex-grow">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-4 tracking-tight">{plan.name}</h3>
        
        {plan.priceValue > 0 ? (
          <div className="flex justify-center items-baseline my-8">
            <span className="text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              {plan.priceCurrency} {animatedPrice}
            </span>
            <span className="ml-1 text-xl text-gray-500 dark:text-gray-400">/{t.pricing.perMonth}</span>
          </div>
        ) : (
          <div className="flex justify-center items-center my-8 h-[60px]">
            <span className="text-3xl font-bold text-gray-800 dark:text-gray-200 tracking-wide">
              {plan.usdPrice}
            </span>
          </div>
        )}
        
        {plan.priceValue > 0 && (
          <div className="flex justify-center mb-6">
            <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-bold px-3 py-1 rounded-md border border-emerald-200 dark:border-emerald-800">
              {plan.usdPrice}
            </span>
          </div>
        )}

        <div className="border-t border-gray-100 dark:border-slate-800 pt-6">
          <ul className="space-y-4">
            {plan.features.map((feature: string, idx: number) => (
              <li key={idx} className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mt-0.5">
                  <Check className="h-3 w-3 text-primary-600 dark:text-primary-400" />
                </div>
                <p className="ml-3 text-sm text-gray-600 dark:text-gray-300 font-medium">{feature}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="p-8 pt-0 mt-auto">
        <button 
          onClick={() => navigate(`/checkout/select?planId=${plan.id}`)}
          className={`w-full block text-center px-6 py-4 text-base font-bold rounded-xl transition-all duration-300 transform shadow-lg ${
            plan.isRecommended 
              ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 text-white hover:shadow-indigo-500/40 hover:scale-105' 
              : 'bg-white dark:bg-slate-800 text-gray-900 dark:text-white border-2 border-gray-100 dark:border-slate-700 hover:border-primary-500 hover:text-primary-600 hover:shadow-xl hover:scale-105'
          }`}
        >
          {plan.cta}
        </button>
      </div>
    </div>
  );
};

const Pricing: React.FC = () => {
  const { language } = useLanguage();
  const t = CONTENT[language];
  const plans = PRICING[language];
  const guarantees = GUARANTEES[language];

  return (
    <section id="pricing" className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal width="100%">
          <div className="text-center mb-12">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">{t.nav.pricing}</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              {t.pricing.title}
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 mx-auto">
              {t.pricing.subtitle}
            </p>
          </div>
        </Reveal>

        {/* Global Rule explanation */}
        <Reveal width="100%">
          <div className="bg-blue-50 dark:bg-slate-900 border border-blue-100 dark:border-slate-800 rounded-xl p-6 max-w-4xl mx-auto mb-16 text-center shadow-md relative overflow-hidden">
             <div className="absolute top-0 left-0 w-2 h-full bg-blue-500"></div>
             <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-sm md:text-base text-blue-900 dark:text-blue-200">
                <span className="font-bold flex items-center gap-2 text-lg"><Mail size={20} className="text-blue-600" /> {t.pricing.emailBanner}</span>
                <span className="hidden md:inline text-blue-300">|</span>
                <span className="font-bold flex items-center gap-2 text-lg"><HardDrive size={20} className="text-blue-600" /> {t.pricing.storage}</span>
             </div>
             <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 font-medium">
               * {t.pricing.expansionNote}
             </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-stretch mb-24">
          {plans.map((plan, idx) => (
            <Reveal key={plan.id} delay={idx * 0.2} width="100%">
              <PricingCard plan={plan} t={t} />
            </Reveal>
          ))}
        </div>

        {/* Guarantees Section */}
        <Reveal width="100%">
           <div className="mb-12 text-center">
             <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{t.pricing.guaranteesTitle}</h3>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {guarantees.map((g, idx) => (
                <div key={idx} className="group bg-gray-50 dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                   <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                      {g.icon}
                   </div>
                   <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{g.title}</h4>
                   <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{g.desc}</p>
                </div>
              ))}
           </div>
        </Reveal>

      </div>
    </section>
  );
};

export default Pricing;