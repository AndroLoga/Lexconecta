

import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CONTENT, COUNTRIES } from '../constants';
import { Phone, Mail, Send, ChevronDown, Check, Zap } from 'lucide-react';
import { Reveal } from './Reveal';

const Contact: React.FC = () => {
  const { language } = useLanguage();
  const t = CONTENT[language];
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true);
    
    // Reset Form
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  return (
    <section id="contact" className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal width="100%">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl mt-2">
              {t.contact.title}
            </h2>
            <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">{t.contact.subtitle}</p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <Reveal width="100%">
            <div className="h-full flex flex-col">
              <div>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 leading-relaxed font-medium">
                  {t.contact.intro}
                </p>

                <div className="space-y-8 mb-12">
                  <div className="flex items-start group">
                    <div className="flex-shrink-0 w-12 h-12 bg-white dark:bg-slate-800 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <Zap className="h-6 w-6 text-primary-600" />
                    </div>
                    <div className="ml-6">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{t.contact.agileTech}</h4>
                      <p className="text-gray-500 dark:text-gray-400">{t.contact.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start group">
                    <div className="flex-shrink-0 w-12 h-12 bg-white dark:bg-slate-800 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <Phone className="h-6 w-6 text-primary-600" />
                    </div>
                    <div className="ml-6">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{t.contact.callUs}</h4>
                      <p className="text-gray-500 dark:text-gray-400">+504 3311 3189</p>
                    </div>
                  </div>

                  <div className="flex items-start group">
                    <div className="flex-shrink-0 w-12 h-12 bg-white dark:bg-slate-800 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <Mail className="h-6 w-6 text-primary-600" />
                    </div>
                    <div className="ml-6">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{t.contact.inquiries}</h4>
                      <p className="text-gray-500 dark:text-gray-400">info@lexconecta.hn</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal width="100%" delay={0.2}>
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 lg:p-12 shadow-2xl border border-gray-100 dark:border-slate-700">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t.contact.name} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="py-3 px-4 block w-full shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 dark:text-white rounded-lg transition-all"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t.contact.email} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="py-3 px-4 block w-full shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 dark:text-white rounded-lg transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t.contact.phone} <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm flex">
                    {/* Country Selector */}
                    <div className="relative">
                      <button
                        type="button"
                        className="inline-flex items-center justify-between w-24 sm:w-32 py-3 px-3 border border-r-0 border-gray-300 dark:border-slate-600 bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white rounded-l-lg hover:bg-gray-200 dark:hover:bg-slate-600 focus:outline-none"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      >
                        <span className="flex items-center gap-1">
                          <span className="text-xl">{selectedCountry.flag}</span>
                          <span className="text-sm font-medium ml-1">{selectedCountry.code}</span>
                        </span>
                        <ChevronDown size={14} />
                      </button>
                      
                      {isDropdownOpen && (
                        <div className="absolute z-10 mt-1 w-56 bg-white dark:bg-slate-800 shadow-lg rounded-md border border-gray-200 dark:border-slate-700 max-h-60 overflow-y-auto">
                          {COUNTRIES.map((country) => (
                            <button
                              key={country.name}
                              type="button"
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 text-left"
                              onClick={() => {
                                setSelectedCountry(country);
                                setIsDropdownOpen(false);
                              }}
                            >
                              <span className="mr-2 text-xl">{country.flag}</span>
                              <span className="font-medium w-12">{country.code}</span>
                              <span className="truncate">{country.name}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <input
                      type="text"
                      id="phone"
                      inputMode="numeric"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                      className="flex-1 py-3 px-4 block w-full focus:ring-2 focus:ring-primary-500 focus:border-primary-500 border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 dark:text-white rounded-r-lg"
                      placeholder="99999999"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t.contact.message} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="py-3 px-4 block w-full shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 dark:text-white rounded-lg transition-all"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-base font-bold text-white bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all transform hover:-translate-y-1"
                >
                  {t.contact.send} <Send size={20} className="ml-2" />
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
           <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 max-w-md w-full text-center shadow-2xl animate-slide-up relative">
              <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
              <div className="mx-auto w-20 h-20 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mb-6">
                 <Check size={40} className="text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t.contact.modalTitle.replace('{name}', name ? name.split(' ')[0] : 'Emprendedor')}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                 {t.contact.modalMsg}
              </p>
              <button 
                onClick={() => setShowModal(false)}
                className="w-full bg-primary-600 text-white py-3 rounded-xl font-bold hover:bg-primary-700 transition-colors"
              >
                {t.contact.close}
              </button>
           </div>
        </div>
      )}
    </section>
  );
};

export default Contact;
