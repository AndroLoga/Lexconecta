import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Menu, X, Sun, Moon, Globe, Facebook, Instagram, MessageCircle, Cookie } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { CONTENT, APPS } from '../constants';

// Custom SVG Logo Component
const Logo: React.FC<{ className?: string, colorClass?: string }> = ({ className = "", colorClass = "text-current" }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <div className={`relative w-10 h-10 md:w-12 md:h-12 ${colorClass}`}>
       <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
         <rect x="5" y="5" width="28" height="28" rx="6" stroke="currentColor" strokeWidth="5" />
         <rect x="17" y="17" width="28" height="28" rx="6" stroke="currentColor" strokeWidth="5" />
       </svg>
    </div>
    <span className={`font-sans text-xl md:text-2xl font-bold tracking-tight ${colorClass}`}>Lexconecta</span>
  </div>
);

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showCookies, setShowCookies] = useState(false);
  
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const t = CONTENT[language];
  const apps = APPS[language];
  const location = useLocation();
  const navigate = useNavigate();

  // Handle SEO Titles and Scroll Reset
  useEffect(() => {
    let pageTitle = "Lexconecta"; // Título unificado como solicitado anteriormente
    document.title = pageTitle;

    // Handle Hash Scrolling for SPA Behavior
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  // Scroll Throttling for Performance
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cookie Logic
  useEffect(() => {
    const accepted = localStorage.getItem('cookiesAccepted');
    if (!accepted) {
      setTimeout(() => setShowCookies(true), 2000);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setShowCookies(false);
  };

  // SPA Navigation Handler
  const handleNavClick = (sectionId: string) => {
    setIsMenuOpen(false);
    
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        if (sectionId === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const element = document.getElementById(sectionId);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      if (sectionId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navLinkClasses = `px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${scrolled ? 'text-gray-700 dark:text-gray-200 hover:text-primary-600' : 'text-white/90 hover:text-white'}`;
  const mobileLinkClasses = "block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-800 cursor-pointer";

  return (
    <div className="min-h-screen flex flex-col font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-md py-2' 
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div onClick={() => handleNavClick('home')} className="flex-shrink-0 cursor-pointer flex items-center">
              <Logo colorClass={scrolled ? 'text-gray-900 dark:text-white' : 'text-white'} />
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <button onClick={() => handleNavClick('home')} className={navLinkClasses}>{t.nav.home}</button>
                <button onClick={() => handleNavClick('catalog')} className={navLinkClasses}>{t.nav.apps}</button>
                <button onClick={() => handleNavClick('features')} className={navLinkClasses}>{t.nav.features}</button>
                <button onClick={() => handleNavClick('pricing')} className={navLinkClasses}>{t.nav.pricing}</button>
                <button onClick={() => handleNavClick('contact')} className={navLinkClasses}>{t.nav.contact}</button>
              </div>
            </div>

            {/* Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <button 
                onClick={toggleLanguage} 
                aria-label="Change Language"
                className={`p-2 rounded-full transition-colors flex items-center gap-1 text-sm font-bold ${scrolled ? 'hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-200' : 'text-white hover:bg-white/10'}`}
              >
                <Globe size={18} />
                {language.toUpperCase()}
              </button>
              <button 
                onClick={toggleTheme} 
                aria-label="Toggle Theme"
                className={`p-2 rounded-full transition-colors ${scrolled ? 'hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-200' : 'text-white hover:bg-white/10'}`}
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
            </div>

            {/* Mobile Button */}
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Open Menu"
                className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none ${scrolled ? 'text-gray-700 dark:text-gray-200' : 'text-white'}`}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Backdrop */}
        {isMenuOpen && (
          <>
            <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsMenuOpen(false)}></div>
            <div className="md:hidden bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 shadow-xl absolute w-full z-50 animate-slide-up">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <button onClick={() => handleNavClick('home')} className={mobileLinkClasses}>{t.nav.home}</button>
                <button onClick={() => handleNavClick('catalog')} className={mobileLinkClasses}>{t.nav.apps}</button>
                <button onClick={() => handleNavClick('features')} className={mobileLinkClasses}>{t.nav.features}</button>
                <button onClick={() => handleNavClick('pricing')} className={mobileLinkClasses}>{t.nav.pricing}</button>
                <button onClick={() => handleNavClick('contact')} className={mobileLinkClasses}>{t.nav.contact}</button>
              </div>
              <div className="pt-4 pb-4 border-t border-gray-200 dark:border-slate-800 flex justify-around">
                 <button onClick={toggleLanguage} aria-label="Change Language" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-white">
                  <Globe size={18} /> {language.toUpperCase()}
                </button>
                <button onClick={toggleTheme} aria-label="Toggle Theme" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-white">
                  {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />} {theme === 'light' ? 'Dark' : 'Light'}
                </button>
              </div>
            </div>
          </>
        )}
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-950 border-t border-gray-200 dark:border-slate-800 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="mb-4">
                <Logo colorClass="text-gray-900 dark:text-white" />
              </div>
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {t.footer.text}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-6 text-gray-900 dark:text-white">{t.nav.apps}</h3>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                {apps.map((app) => (
                  <li key={app.id}>
                    <button 
                      onClick={() => {
                        navigate(`/app/${app.id}`);
                        window.scrollTo(0,0);
                      }}
                      className="hover:text-primary-600 cursor-pointer text-left block"
                    >
                      {app.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-6 text-gray-900 dark:text-white">{t.footer.legalTitle}</h3>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <li><Link to="/privacy" className="hover:text-primary-600">{t.legal.privacy}</Link></li>
                <li><Link to="/terms" className="hover:text-primary-600">{t.legal.terms}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-6 text-gray-900 dark:text-white">{t.footer.socialTitle}</h3>
              <div className="flex space-x-6">
                <a href="#" aria-label="Facebook" className="text-[#1877F2] hover:opacity-80 transition-colors transform hover:scale-110"><Facebook size={24} /></a>
                <a href="#" aria-label="Instagram" className="text-[#E1306C] hover:opacity-80 transition-colors transform hover:scale-110"><Instagram size={24} /></a>
                <a href="#" aria-label="TikTok" className="text-black dark:text-white hover:opacity-80 transition-colors transform hover:scale-110">
                   <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-slate-800 pt-8 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Lexconecta. All rights reserved. Tegucigalpa, Honduras.
          </div>
        </div>
      </footer>

      {/* Cookie Banner */}
      {showCookies && (
        <div className="fixed bottom-6 left-6 z-[60] bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-2xl border border-gray-100 dark:border-slate-700 max-w-[calc(100%-3rem)] sm:max-w-sm animate-slide-up flex flex-col gap-4">
          <div className="flex items-center gap-3">
             <div className="bg-primary-100 dark:bg-primary-900/30 p-2 rounded-lg text-primary-600 dark:text-primary-400 flex-shrink-0">
                <Cookie size={24} />
             </div>
             <p className="text-sm text-gray-600 dark:text-gray-300">
                {t.common.cookieMsg}
             </p>
          </div>
          <button 
            onClick={acceptCookies}
            className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            {t.common.accept}
          </button>
        </div>
      )}

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/50433113189" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={32} fill="white" />
      </a>
    </div>
  );
};

export default Layout;