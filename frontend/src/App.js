import React from 'react';
import './App.css';
import './theme.css';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import WhyNexar from './components/WhyNexar';
import WhoIsItFor from './components/WhoIsItFor';
import EngineeredSection from './components/EngineeredSection';
import ContactSales from './components/ContactSales';

function App() {
  return (
    <div className="App">
      <Navbar />
      <HeroSection />
      <WhyNexar />
      <WhoIsItFor />
      <EngineeredSection />
      <ContactSales />
    </div>
  );
}

export default App;
