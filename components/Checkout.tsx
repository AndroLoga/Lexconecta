import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { PRICING, APPS, CONTENT, COUNTRIES, EXCHANGE_RATE } from '../constants';
import { ChevronLeft, ChevronRight, Check, Wallet, CreditCard, Receipt, ShieldCheck, RefreshCw, AlertCircle, Info } from 'lucide-react';
import { PricingPlan, AppProduct, GlobalContent } from '../types';

// CountUp Hook for Animations (supports Integers and Floats)
const useCountUp = (end: number, duration: number = 2000, isFloat: boolean = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let frameId: number;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = time - startTime;
      const percentage = 1 - Math.pow(1 - (Math.min(progress / duration, 1)), 4);
      
      const current = end * percentage;
      setCount(isFloat ? current : Math.floor(current));

      if (progress < duration) {
        frameId = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    
    setCount(0);
    if (end > 0) {
      frameId = requestAnimationFrame(animate);
    }

    return () => {
      if(frameId) cancelAnimationFrame(frameId);
    }
  }, [end, duration, isFloat]);

  return count;
};

// Sub-component for Plan Row
const PlanSelectionItem: React.FC<{ 
  plan: PricingPlan; 
  isSelected: boolean; 
  onSelect: (plan: PricingPlan) => void;
  t: GlobalContent; 
  exchangeRate: number;
}> = ({ plan, isSelected, onSelect, t, exchangeRate }) => {
  const animatedPrice = useCountUp(plan.priceValue);
  const calculatedUsd = plan.priceValue / exchangeRate;
  const animatedUsd = useCountUp(calculatedUsd, 2000, true);

  return (
    <div 
      onClick={() => onSelect(plan)}
      className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex flex-col sm:flex-row justify-between items-center gap-4 group ${
        isSelected 
          ? 'border-gray-900 bg-gray-50 dark:border-white dark:bg-slate-800 shadow-md transform scale-[1.01]' 
          : 'border-gray-100 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600 hover:shadow-sm'
      }`}
    >
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${isSelected ? 'border-gray-900 dark:border-white' : 'border-gray-300 dark:border-slate-500'}`}>
          {isSelected && <div className="w-3 h-3 bg-gray-900 dark:bg-white rounded-full" />}
        </div>
        <div>
          <h3 className="font-bold text-xl text-gray-900 dark:text-white">{plan.name}</h3>
          <ul className="mt-2 space-y-1">
            {plan.features.slice(0, 2).map((f, i) => (
              <li key={i} className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <Check size={14} className="text-green-500"/> {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="text-right flex flex-col items-end min-w-[120px]">
          {plan.priceValue > 0 ? (
            <>
              {/* Standard text color to match main pricing */}
              <div className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                {plan.priceCurrency} {animatedPrice.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">/{t.pricing.perMonth}</div>
              <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                ${animatedUsd.toFixed(2)} USD
              </span>
            </>
          ) : (
            <div className="text-lg font-bold text-gray-600 dark:text-gray-300">{plan.usdPrice}</div>
          )}
      </div>
    </div>
  );
};

const Checkout: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { language } = useLanguage();
  const t = CONTENT[language];
  const navigate = useNavigate();

  // State
  const [step, setStep] = useState(1);
  const [selectedApp, setSelectedApp] = useState<AppProduct | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'bank' | 'paypal'>('bank');
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<string[]>([]);

  // Form State with Persistence
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: COUNTRIES[0],
    phone: '',
    business: ''
  });

  useEffect(() => {
    const savedData = localStorage.getItem('checkoutFormData');
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData));
      } catch (e) {
        console.error("Failed to load form data");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('checkoutFormData', JSON.stringify(formData));
  }, [formData]);

  const totalLempiras = (selectedApp?.price || 0) + (selectedPlan?.priceValue || 0);
  const totalUSD = totalLempiras / EXCHANGE_RATE;
  
  const animatedTotalL = useCountUp(totalLempiras);
  const animatedTotalUSD = useCountUp(totalUSD, 2000, true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const appId = searchParams.get('appId');
    const planId = searchParams.get('planId');

    if (appId) {
      const app = APPS[language].find(a => a.id === appId);
      if (app) setSelectedApp(app);
    }
    
    if (planId) {
      const plan = PRICING[language].find(p => p.id === planId);
      if (plan) {
         setSelectedPlan(plan);
         if (!appId) setStep(1); 
         if (appId) setStep(3);
      }
    } else if (appId) {
        setStep(2);
    }
  }, [searchParams, language]);

  const handleAppSelect = (app: AppProduct) => {
    setSelectedApp(app);
    setStep(2);
    window.scrollTo(0, 0);
  };

  const handlePlanSelect = (plan: PricingPlan) => {
    setSelectedPlan(plan);
    setStep(3);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate('/');
    }
  };

  const validateStep3 = (): boolean => {
    const errors: string[] = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      errors.push(language === 'es' ? 'El correo electrónico no es válido.' : 'Invalid email address.');
    }
    if (!formData.phone || formData.phone.length < 8) {
      errors.push(language === 'es' ? 'El teléfono debe tener al menos 8 dígitos.' : 'Phone number must be at least 8 digits.');
    }
    if (!formData.name.trim()) errors.push(language === 'es' ? 'El nombre es obligatorio.' : 'Name is required.');
    if (!formData.business.trim()) errors.push(language === 'es' ? 'El nombre del negocio es obligatorio.' : 'Business name is required.');

    setFormErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep3()) {
      setStep(4);
      window.scrollTo(0, 0);
    }
  };

  const handleFinalize = async () => {
    setLoading(true);

    // If PayPal was selected and amount > 0, open new tab
    const total = (selectedApp?.price || 0) + (selectedPlan?.priceValue || 0);
    if (paymentMethod === 'paypal' && total > 0 && selectedPlan?.priceValue !== 0) {
        window.open(`https://www.paypal.com/paypalme/hubandro/${total}`, '_blank');
    }

    // Simulate server delay for order creation
    setTimeout(() => {
      setLoading(false);
      setShowSuccess(true);
      localStorage.removeItem('checkoutFormData');
    }, 2000);
  };

  if (showSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 max-w-lg w-full text-center shadow-2xl animate-slide-up relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
          <div className="mx-auto w-24 h-24 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-6">
            <Check size={48} className="text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{t.checkout.successTitle}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            {t.checkout.successMsg}
          </p>
          <button 
            onClick={() => navigate('/')}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-6 rounded-xl transition-all"
          >
            {t.checkout.backHome}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-gray-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Modern Stepper */}
        <div className="flex justify-center mb-16">
          <div className="flex items-center w-full max-w-3xl">
             {[1, 2, 3, 4].map((s, idx) => (
               <React.Fragment key={s}>
                 <div className="flex flex-col items-center relative z-10">
                   <div 
                     className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-500 shadow-md ${
                       step >= s 
                         ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 scale-110' 
                         : 'bg-white dark:bg-slate-800 text-gray-400 border-2 border-gray-200 dark:border-slate-700'
                     }`}
                   >
                     {step > s ? <Check size={20} /> : s}
                   </div>
                   <span className={`absolute -bottom-8 text-xs font-bold uppercase tracking-wider hidden sm:block whitespace-nowrap ${step >= s ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>
                      {s === 1 ? t.checkout.step1 : s === 2 ? t.checkout.step2 : s === 3 ? t.checkout.step3 : t.checkout.step4}
                   </span>
                 </div>
                 {idx < 3 && (
                   <div className="flex-1 h-1 mx-4 rounded-full bg-gray-200 dark:bg-slate-800 overflow-hidden relative">
                      <div className={`absolute left-0 top-0 h-full bg-gray-900 dark:bg-white transition-all duration-500`} style={{ width: step > s ? '100%' : '0%' }}></div>
                   </div>
                 )}
               </React.Fragment>
             ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Main Content Area */}
          <div className="flex-1 w-full">
             <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg border border-gray-100 dark:border-slate-800 overflow-hidden min-h-[500px]">
                {/* Header */}
                <div className="bg-gray-50 dark:bg-slate-800/50 p-6 md:p-8 border-b border-gray-100 dark:border-slate-800 flex items-center gap-4">
                  <button onClick={handleBack} className="p-2 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-full transition-colors">
                    <ChevronLeft size={24} className="text-gray-600 dark:text-gray-300"/>
                  </button>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {step === 1 && t.checkout.step1}
                    {step === 2 && t.checkout.step2}
                    {step === 3 && t.checkout.step3}
                    {step === 4 && t.checkout.step4}
                  </h1>
                </div>

                <div className="p-6 md:p-10">
                  {/* Step 1: Select App */}
                  {step === 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {APPS[language].map((app) => (
                        <div 
                          key={app.id} 
                          onClick={() => handleAppSelect(app)}
                          className={`cursor-pointer border rounded-2xl overflow-hidden transition-all duration-300 group ${selectedApp?.id === app.id ? 'border-gray-900 dark:border-white ring-2 ring-gray-200 dark:ring-slate-700' : 'border-gray-200 dark:border-slate-700 hover:border-gray-400'}`}
                        >
                          <div className="h-48 overflow-hidden relative">
                            <img 
                              src={app.imageUrl} 
                              alt={app.title} 
                              loading="lazy"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                            />
                            <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm text-gray-900 dark:text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                              {t.common.offer}: L {app.price.toLocaleString()}
                            </div>
                          </div>
                          <div className="p-5 bg-white dark:bg-slate-800">
                            <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">{app.title}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{app.shortDescription}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Step 2: Select Plan */}
                  {step === 2 && (
                    <div className="space-y-4">
                      {PRICING[language].map((plan) => (
                        <PlanSelectionItem 
                          key={plan.id}
                          plan={plan}
                          isSelected={selectedPlan?.id === plan.id}
                          onSelect={handlePlanSelect}
                          t={t}
                          exchangeRate={EXCHANGE_RATE}
                        />
                      ))}
                    </div>
                  )}

                  {/* Step 3: Info Form */}
                  {step === 3 && (
                    <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
                      
                      {/* Error Messages */}
                      {formErrors.length > 0 && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-xl flex items-start gap-3">
                           <AlertCircle size={20} className="text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                           <ul className="text-sm text-red-600 dark:text-red-400 list-disc pl-4 space-y-1">
                             {formErrors.map((err, idx) => <li key={idx}>{err}</li>)}
                           </ul>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">{t.contact.name} <span className="text-red-500">*</span></label>
                          <input 
                            required 
                            type="text" 
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full p-3.5 rounded-xl border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-primary-500 transition-all" 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">{t.contact.email} <span className="text-red-500">*</span></label>
                          <input 
                            required 
                            type="email" 
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full p-3.5 rounded-xl border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-primary-500 transition-all" 
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">{t.contact.country} <span className="text-red-500">*</span></label>
                          <select 
                             required
                             className="w-full p-3.5 rounded-xl border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-primary-500 transition-all"
                             onChange={(e) => {
                               const c = COUNTRIES.find(c => c.code === e.target.value);
                               if(c) setFormData({...formData, country: c});
                             }}
                             value={formData.country.code}
                          >
                             {COUNTRIES.map(c => <option key={c.name} value={c.code}>{c.flag} {c.name} ({c.code})</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">{t.contact.phone} <span className="text-red-500">*</span></label>
                          <div className="flex">
                             <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-gray-300 dark:border-slate-600 bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 font-medium">
                               {formData.country.code}
                             </span>
                             <input 
                                required 
                                type="tel" 
                                inputMode="numeric"
                                value={formData.phone}
                                onChange={(e) => {
                                  const val = e.target.value.replace(/[^0-9]/g, '');
                                  setFormData({...formData, phone: val})
                                }}
                                className="flex-1 p-3.5 rounded-r-xl border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-primary-500 transition-all" 
                             />
                          </div>
                        </div>
                      </div>

                      <div>
                          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">{t.checkout.businessLabel} <span className="text-red-500">*</span></label>
                          <input 
                            required
                            type="text" 
                            value={formData.business}
                            onChange={(e) => setFormData({...formData, business: e.target.value})}
                            className="w-full p-3.5 rounded-xl border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-primary-500 transition-all" 
                          />
                      </div>

                      <button type="submit" className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-transform hover:-translate-y-1 flex justify-center items-center gap-2 mt-4">
                         {t.checkout.goToPayment} <ChevronRight size={20} />
                      </button>
                    </form>
                  )}

                  {/* Step 4: Payment / Quotation */}
                  {step === 4 && (
                    <div className="space-y-8">
                      <div className="grid grid-cols-2 gap-4">
                        <button 
                          onClick={() => setPaymentMethod('bank')}
                          className={`p-6 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all duration-300 ${
                            paymentMethod === 'bank' 
                              ? 'border-primary-500 bg-primary-50 dark:bg-slate-800 shadow-md transform scale-[1.02]' 
                              : 'border-gray-200 dark:border-slate-700 hover:border-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800'
                          }`}
                        >
                          <Wallet size={36} className={paymentMethod === 'bank' ? 'text-primary-600' : 'text-gray-400'} />
                          <span className={`font-bold ${paymentMethod === 'bank' ? 'text-primary-700 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                            {t.checkout.bankTransfer}
                          </span>
                        </button>
                        <button 
                          onClick={() => setPaymentMethod('paypal')}
                          className={`p-6 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all duration-300 ${
                            paymentMethod === 'paypal' 
                              ? 'border-blue-500 bg-blue-50 dark:bg-slate-800 shadow-md transform scale-[1.02]' 
                              : 'border-gray-200 dark:border-slate-700 hover:border-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800'
                          }`}
                        >
                          <CreditCard size={36} className={paymentMethod === 'paypal' ? 'text-blue-600' : 'text-gray-400'} />
                          <span className={`font-bold ${paymentMethod === 'paypal' ? 'text-blue-700 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                            PayPal
                          </span>
                        </button>
                      </div>

                      {paymentMethod === 'bank' && (
                        <div className="bg-gray-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-gray-200 dark:border-slate-700 animate-fade-in space-y-4">
                           <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm">
                             <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-2">BAC Credomatic</h4>
                             <div className="flex flex-col gap-1 text-sm text-gray-600 dark:text-gray-300">
                               <p><span className="font-medium text-gray-500">{t.bank.account}:</span> 728349211</p>
                               <p><span className="font-medium text-gray-500">{t.bank.beneficiary}:</span> Lexconecta S. de R.L.</p>
                             </div>
                           </div>
                           <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm">
                             <h4 className="font-bold text-[#AD131F] dark:text-red-500 text-lg mb-2">Banco Atlántida</h4>
                             <div className="flex flex-col gap-1 text-sm text-gray-600 dark:text-gray-300">
                               <p><span className="font-medium text-gray-500">{t.bank.account}:</span> 1200034582</p>
                               <p><span className="font-medium text-gray-500">{t.bank.beneficiary}:</span> Lexconecta S. de R.L.</p>
                             </div>
                           </div>
                           <p className="text-xs text-gray-400 mt-2 text-center italic">* {t.checkout.sendReceipt}</p>
                        </div>
                      )}

                      {paymentMethod === 'paypal' && (
                        <div className="space-y-5 animate-fade-in">
                           {/* Enterprise Plan Warning */}
                           {selectedPlan?.priceValue === 0 ? (
                               <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-xl border border-blue-200 dark:border-blue-800 flex gap-4 text-sm">
                                  <Info className="flex-shrink-0 text-blue-600 dark:text-blue-400 mt-0.5" size={24} />
                                  <p className="text-blue-800 dark:text-blue-200 leading-relaxed">
                                    {language === 'es' 
                                      ? `Estás pagando únicamente la Inversión de Desarrollo (L ${selectedApp?.price.toLocaleString()}). El Plan Empresarial se cotiza por separado.` 
                                      : `You are paying only for the Development Fee (L ${selectedApp?.price.toLocaleString()}). The Enterprise Plan is quoted separately.`}
                                  </p>
                                </div>
                           ) : null}

                           <div className="bg-[#003087] hover:bg-[#00256b] p-6 rounded-2xl text-white text-center cursor-pointer transition-all shadow-lg transform hover:-translate-y-1" onClick={handleFinalize}>
                              <span className="font-bold italic text-3xl">PayPal</span>
                              <p className="text-sm opacity-90 mt-2 font-medium tracking-wide">{t.checkout.paySecurely}</p>
                           </div>
                           <div className="flex items-start gap-3 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-slate-800/50 p-4 rounded-xl border border-gray-100 dark:border-slate-700">
                             <RefreshCw size={18} className="mt-0.5 flex-shrink-0" />
                             <p>{t.checkout.paypalNote}</p>
                           </div>
                        </div>
                      )}

                      <button 
                         onClick={handleFinalize}
                         disabled={loading}
                         className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-5 px-6 rounded-xl shadow-lg transition-transform hover:-translate-y-1 flex justify-center items-center gap-3 text-lg"
                      >
                         {loading ? t.checkout.processing : (
                           <>
                             <ShieldCheck size={24} /> {paymentMethod === 'paypal' ? t.checkout.continuePaypal : t.checkout.submit}
                           </>
                         )}
                      </button>
                    </div>
                  )}
                </div>
             </div>
          </div>

          {/* Sidebar Summary - Proforma Invoice Style */}
          {selectedApp && (
            <div className="lg:w-[400px] flex-shrink-0">
               <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl sticky top-24 border border-gray-100 dark:border-slate-800 overflow-hidden">
                  
                  {/* Header */}
                  <div className="bg-slate-900 p-6 flex items-center justify-between text-white border-b border-slate-800">
                      <div className="flex items-center gap-3">
                        <Receipt size={22} className="text-white" />
                        <h3 className="font-bold text-lg tracking-wide">{t.checkout.orderSummary}</h3>
                      </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8">
                    
                    {/* App Detail */}
                    <div className="flex gap-5 mb-8 pb-8 border-b border-gray-100 dark:border-slate-800">
                       <div className="w-20 h-20 rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-700 flex-shrink-0 shadow-sm">
                          <img 
                            src={selectedApp.imageUrl} 
                            alt={selectedApp.title} 
                            loading="lazy"
                            className="w-full h-full object-cover" 
                          />
                       </div>
                       <div>
                          <h4 className="font-bold text-xl text-gray-900 dark:text-white leading-tight mb-1">{selectedApp.title}</h4>
                          <span className="text-xs text-primary-700 dark:text-primary-300 font-bold bg-primary-50 dark:bg-primary-900/30 px-2 py-1 rounded-md inline-block uppercase tracking-wider">
                             {t.checkout.software}
                          </span>
                       </div>
                    </div>

                    {/* Invoice Lines */}
                    <div className="space-y-3 text-sm mb-8">
                       
                       {/* Base Price */}
                       <div className="flex justify-between items-center text-gray-500 dark:text-gray-400">
                          <span>{t.checkout.devSetup}</span>
                          <span className="line-through">L {selectedApp.originalPrice.toLocaleString()}</span>
                       </div>

                       {/* Discount */}
                       <div className="flex justify-between items-center text-green-600 dark:text-green-400 font-medium bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded-lg -mx-3">
                          <span>{t.checkout.offerDiscount}</span>
                          <span>- L {(selectedApp.originalPrice - selectedApp.price).toLocaleString()}</span>
                       </div>

                       {/* Dev Subtotal */}
                       <div className="flex justify-between items-center font-bold text-gray-900 dark:text-white pt-2">
                          <span>{t.checkout.subtotalDev}</span>
                          <span>L {selectedApp.price.toLocaleString()}</span>
                       </div>

                       <div className="border-t border-dashed border-gray-200 dark:border-slate-700 my-4"></div>

                       {/* Plan Fee */}
                       {selectedPlan && selectedPlan.priceValue > 0 && (
                          <div className="flex justify-between items-start">
                             <div className="flex flex-col">
                                <span className="text-gray-900 dark:text-white font-medium">{t.checkout.payMonth}</span>
                                <span className="text-xs text-gray-500">{selectedPlan.name}</span>
                             </div>
                             <span className="font-bold text-gray-900 dark:text-white">L {selectedPlan.priceValue.toLocaleString()}</span>
                          </div>
                       )}
                       {/* Enterprise Quote Logic */}
                       {selectedPlan && selectedPlan.priceValue === 0 && (
                          <div className="flex justify-between items-start">
                             <div className="flex flex-col">
                                <span className="text-gray-900 dark:text-white font-medium">{t.checkout.payMonth}</span>
                                <span className="text-xs text-gray-500">{selectedPlan.name}</span>
                             </div>
                             <span className="font-bold text-blue-600 dark:text-blue-400">{selectedPlan.usdPrice}</span>
                          </div>
                       )}
                    </div>

                    {/* Grand Total */}
                    <div className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-5 border border-gray-200 dark:border-slate-700">
                       <div className="flex justify-between items-end">
                          <span className="text-gray-500 dark:text-gray-400 text-sm font-bold uppercase tracking-wide mb-1">{t.checkout.totalNow}</span>
                          <div className="text-right flex flex-col items-end">
                             {selectedPlan?.priceValue === 0 ? (
                               <>
                                <span className="text-2xl font-black text-gray-900 dark:text-white">L {selectedApp.price.toLocaleString()}</span>
                                <span className="text-xs text-gray-500 mt-1 font-medium">+ Plan ({selectedPlan.usdPrice})</span>
                               </>
                             ) : (
                               <>
                                 <div className="text-3xl font-black text-gray-900 dark:text-white leading-none">
                                   L {animatedTotalL.toLocaleString()}
                                 </div>
                                 <div className="mt-2">
                                   <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold px-2 py-1 rounded-md border border-emerald-200 dark:border-emerald-800">
                                      ${animatedTotalUSD.toFixed(2)} USD
                                   </span>
                                 </div>
                               </>
                             )}
                          </div>
                       </div>
                    </div>

                    <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
                       <ShieldCheck size={14} />
                       <p>{t.checkout.securePayment}</p>
                    </div>

                  </div>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;