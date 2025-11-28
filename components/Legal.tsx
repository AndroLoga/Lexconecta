import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CONTENT, LEGAL_CONTENT } from '../constants';

type LegalType = 'privacy' | 'terms';

const Legal: React.FC<{ type: LegalType }> = ({ type }) => {
  const { language } = useLanguage();
  const t = CONTENT[language];
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type]);

  const title = type === 'privacy' ? t.legal.privacy : t.legal.terms;
  const content = type === 'privacy' ? LEGAL_CONTENT[language].privacy : LEGAL_CONTENT[language].terms;

  return (
    <div className="pt-24 pb-20 bg-gray-50 dark:bg-slate-900 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100 dark:border-slate-700">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 border-b pb-4 border-gray-200 dark:border-slate-700">
            {title}
          </h1>
          <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 whitespace-pre-wrap leading-relaxed font-light">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Legal;