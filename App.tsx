import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import Layout from './components/Layout';
import Hero from './components/Hero';
import AppCatalog from './components/AppCatalog';
import Pricing from './components/Pricing';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import About from './components/About';
import AppDetail from './components/AppDetail';
import Checkout from './components/Checkout';
import Legal from './components/Legal';

// Home Page Component assembling all sections
const Home: React.FC = () => (
  <>
    <Hero />
    <About />
    <AppCatalog />
    <Features />
    <Pricing />
    <Testimonials />
    <Contact />
  </>
);

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <HashRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/app/:id" element={<AppDetail />} />
              <Route path="/checkout/select" element={<Checkout />} />
              <Route path="/checkout/:planId" element={<Checkout />} />
              <Route path="/privacy" element={<Legal type="privacy" />} />
              <Route path="/terms" element={<Legal type="terms" />} />
            </Routes>
          </Layout>
        </HashRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;