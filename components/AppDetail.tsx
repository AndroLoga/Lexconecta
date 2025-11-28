
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, MessageCircle, TrendingUp, Shield, Clock, RefreshCw } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { APPS, CONTENT } from '../constants';
import { Reveal } from './Reveal';

const AppDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = CONTENT[language];
  const app = APPS[language].find(a => a.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!app) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-slate-900 dark:text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">App Not Found</h2>
          <button onClick={() => navigate('/')} className="text-primary-600 hover:underline">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const handleBuy = () => {
    navigate(`/checkout/select?appId=${app.id}`);
  };

  const handleBack = () => {
      // Safe navigation: check if history exists, otherwise go home
      if (window.history.length > 2) {
        navigate(-1);
      } else {
        navigate('/');
      }
  };

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen pb-20 transition-colors duration-300">
      {/* Header Image with Back Button fixed */}
      <div className="relative h-[65vh] w-full">
        <img src={app.imageUrl} alt={app.title} className="w-full h-full object-cover" />
        {/* Gradient Overlay for better image visibility + text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent flex items-end justify-center pb-16 md:pb-24">
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
            <Reveal>
              <h1 className="text-4xl md:text-7xl lg:text-8xl font-black text-white mb-4 drop-shadow-xl leading-none uppercase tracking-tighter">
                {app.title}
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg md:text-2xl text-gray-200 font-bold max-w-3xl drop-shadow-lg leading-snug opacity-90">
                {app.shortDescription}
              </p>
            </Reveal>
          </div>
        </div>
        
        {/* Fixed Back Button with High Z-Index */}
        <button 
          onClick={handleBack}
          className="absolute top-24 left-4 md:left-8 z-50 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300 shadow-lg border border-white/20 group"
          aria-label="Volver"
        >
          <ArrowLeft size={28} className="group-hover:-translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-30">
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-slate-800">
          
          {/* Price & Action Bar */}
          <div className="bg-gray-50 dark:bg-slate-800/50 p-6 md:p-10 border-b border-gray-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
             <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">{t.appDetail.devFee}</span>
                <div className="flex items-end gap-3">
                   <span className="text-4xl font-extrabold text-gray-900 dark:text-white">L {app.price.toLocaleString()}</span>
                   <span className="text-xl text-gray-400 line-through mb-2">L {app.originalPrice.toLocaleString()}</span>
                   {app.originalPrice > app.price && (
                      <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold mb-2 animate-pulse">
                        {t.appDetail.save} {Math.round(((app.originalPrice - app.price) / app.originalPrice) * 100)}%
                      </span>
                   )}
                </div>
             </div>
             <div className="flex flex-col gap-2 w-full md:w-auto">
                <button 
                  onClick={handleBuy}
                  className="flex-1 md:flex-none bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-primary-500/30 transition-all transform hover:-translate-y-1"
                >
                  {t.appDetail.buyNow}
                </button>
                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 justify-center">
                   <RefreshCw size={12} />
                   <span>{t.appDetail.monthlySub}</span>
                </div>
             </div>
          </div>

          <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Description */}
            <div className="lg:col-span-2 space-y-8">
              <Reveal>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {t.appDetail.whyNeed}
                </h2>
                <div className="prose dark:prose-invert max-w-none text-lg text-gray-600 dark:text-gray-300 mt-4 leading-relaxed">
                  {app.fullDescription}
                </div>
              </Reveal>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                 <div className="bg-blue-50 dark:bg-slate-800 p-6 rounded-2xl">
                    <TrendingUp className="text-blue-600 w-8 h-8 mb-3" />
                    <h4 className="font-bold text-gray-900 dark:text-white">{t.benefits.salesTitle}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{t.benefits.salesDesc}</p>
                 </div>
                 <div className="bg-green-50 dark:bg-slate-800 p-6 rounded-2xl">
                    <Shield className="text-green-600 w-8 h-8 mb-3" />
                    <h4 className="font-bold text-gray-900 dark:text-white">{t.benefits.theftTitle}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{t.benefits.theftDesc}</p>
                 </div>
                 <div className="bg-purple-50 dark:bg-slate-800 p-6 rounded-2xl">
                    <Clock className="text-purple-600 w-8 h-8 mb-3" />
                    <h4 className="font-bold text-gray-900 dark:text-white">{t.benefits.timeTitle}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{t.benefits.timeDesc}</p>
                 </div>
              </div>

              <Reveal delay={0.2}>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-6">
                  {t.appDetail.includedFeatures}
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {app.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-3 bg-gray-50 dark:bg-slate-800 p-4 rounded-xl border border-gray-100 dark:border-slate-700">
                      <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full">
                        <CheckCircle className="text-green-600 dark:text-green-400 w-5 h-5" />
                      </div>
                      <span className="font-medium text-gray-800 dark:text-gray-200">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            {/* Sidebar / Gallery */}
            <div className="space-y-8">
               <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-gray-200 dark:border-slate-700">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <MessageCircle size={20} className="text-green-500" />
                    {t.appDetail.questions}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {t.appDetail.talkToExpert}
                  </p>
                  <a 
                    href="https://wa.me/50433113189"
                    target="_blank"
                    rel="noreferrer"
                    className="block w-full bg-white dark:bg-slate-700 text-center py-3 rounded-xl border border-gray-300 dark:border-slate-600 font-bold hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors"
                  >
                    {t.appDetail.chatWhatsapp}
                  </a>
               </div>

               <div>
                 <h3 className="font-bold text-gray-900 dark:text-white mb-4">{t.appDetail.gallery}</h3>
                 <div className="space-y-4">
                    {app.screenshots.length > 0 ? app.screenshots.map((shot, idx) => (
                      <div key={idx} className="group relative overflow-hidden rounded-xl shadow-md cursor-pointer">
                        <img src={shot} alt="App screen" className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                      </div>
                    )) : (
                      <div className="h-40 bg-gray-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-gray-400 text-sm p-4 text-center">
                        {t.appDetail.demoImages}
                      </div>
                    )}
                 </div>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AppDetail;
