
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Artworks from './pages/Artworks';
import About from './pages/About';
import MakingOf from './pages/MakingOf';
import Contact from './pages/Contact';
import Store from './pages/Store';
import Indoor from './pages/Indoor';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/artworks" element={<Artworks />} />
          <Route path="/indoor" element={<Indoor />} />
          <Route path="/collaborations" element={<Artworks />} />
          <Route path="/making-of" element={<MakingOf />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/store" element={<Store />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
