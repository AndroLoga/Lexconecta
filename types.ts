
export type Language = 'es' | 'en';

export interface AppFeature {
  name: string;
  description: string;
}

export interface AppProduct {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  imageUrl: string;
  screenshots: string[];
  price: number;
  originalPrice: number;
}

export interface PricingPlan {
  id: string;
  name: string;
  priceValue: number; // Numeric for animation
  priceCurrency: string;
  usdPrice: string;
  features: string[];
  isRecommended?: boolean;
  cta: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export interface CountryCode {
  name: string;
  code: string;
  flag: string;
}

export interface Guarantee {
  icon: any;
  title: string;
  desc: string;
}

export interface GlobalContent {
  common: {
    offer: string;
    viewDetails: string;
    viewApp: string;
    recommended: string;
    cookieMsg: string;
    accept: string;
  };
  nav: {
    home: string;
    apps: string;
    features: string;
    pricing: string;
    contact: string;
  };
  hero: {
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  about: {
    title: string;
    description: string;
    missionTitle: string;
    mission: string;
    visionTitle: string;
    vision: string;
  };
  features: {
    title: string;
    subtitle: string;
    items: { title: string; desc: string }[];
  };
  pricing: {
    title: string;
    subtitle: string;
    perMonth: string;
    guaranteesTitle: string;
    emailBanner: string;
    storage: string;
    expansionNote: string;
  };
  testimonials: {
    title: string;
  };
  footer: {
    text: string;
    legalTitle: string;
    socialTitle: string;
  };
  contact: {
    title: string;
    subtitle: string;
    intro: string;
    agileTech: string;
    callUs: string;
    inquiries: string;
    name: string;
    email: string;
    phone: string;
    country: string;
    message: string;
    send: string;
    address: string;
    modalTitle: string;
    modalMsg: string;
    close: string;
  };
  checkout: {
    title: string;
    step1: string;
    step2: string;
    step3: string;
    step4: string;
    payDev: string;
    payMonth: string;
    totalNow: string;
    bankTransfer: string;
    paypal: string;
    submit: string;
    successTitle: string;
    successMsg: string;
    software: string;
    devSetup: string;
    offerDiscount: string;
    subtotalDev: string;
    securePayment: string;
    sendReceipt: string;
    paypalNote: string;
    businessLabel: string;
    goToPayment: string;
    orderSummary: string;
    processing: string;
    continuePaypal: string;
    backHome: string;
    paySecurely: string;
  };
  bank: {
    account: string;
    beneficiary: string;
  };
  legal: {
    privacy: string;
    terms: string;
  };
  appDetail: {
    whyNeed: string;
    devFee: string;
    save: string;
    buyNow: string;
    monthlySub: string;
    includedFeatures: string;
    questions: string;
    talkToExpert: string;
    chatWhatsapp: string;
    gallery: string;
    demoImages: string;
  };
  benefits: {
    salesTitle: string;
    salesDesc: string;
    theftTitle: string;
    theftDesc: string;
    timeTitle: string;
    timeDesc: string;
  };
}