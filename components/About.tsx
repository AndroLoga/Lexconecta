import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CONTENT } from '../constants';
import { Target, Eye, Award } from 'lucide-react';
import { Reveal } from './Reveal';

const About: React.FC = () => {
  const { language } = useLanguage();
  const t = CONTENT[language];

  return (
    <section className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal width="100%">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary-600 font-semibold tracking-wider uppercase text-sm">
              {language === 'es' ? 'Nuestra Esencia' : 'Our Essence'}
            </span>
            <h2 className="mt-2 text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
              {t.about.title}
            </h2>
            <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              {t.about.description}
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          <Reveal delay={0.2} width="100%">
            <div className="bg-slate-50 dark:bg-slate-900 p-10 rounded-3xl h-full border border-gray-100 dark:border-slate-800 hover:shadow-2xl transition-all duration-500 group">
              <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/50 rounded-2xl flex items-center justify-center text-primary-600 dark:text-primary-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                <Target size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t.about.missionTitle}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                {t.about.mission}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.4} width="100%">
            <div className="bg-slate-50 dark:bg-slate-900 p-10 rounded-3xl h-full border border-gray-100 dark:border-slate-800 hover:shadow-2xl transition-all duration-500 group">
              <div className="w-14 h-14 bg-secondary-100 dark:bg-secondary-900/50 rounded-2xl flex items-center justify-center text-secondary-600 dark:text-secondary-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                <Eye size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t.about.visionTitle}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                {t.about.vision}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default About;