import React from 'react';
import './App.css';
import './theme.css';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import WhyNexar from './components/WhyNexar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <HeroSection />
      <WhyNexar />
    </div>
  );
}

export default App;
