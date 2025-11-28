import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CONTENT, FEATURE_ICONS } from '../constants';
import { Reveal } from './Reveal';

const Features: React.FC = () => {
  const { language } = useLanguage();
  const t = CONTENT[language];

  return (
    <section id="features" className="py-24 bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal width="100%">
          <div className="text-center mb-20">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">{t.nav.features}</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              {t.features.title}
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 mx-auto">
              {t.features.subtitle}
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.features.items.map((feature, idx) => (
            <Reveal key={idx} delay={idx * 0.1} width="100%">
              <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-slate-700 h-full">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center text-white mb-6 shadow-lg shadow-primary-500/30">
                  {FEATURE_ICONS[idx]?.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
