import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import components
import Header from './components/Header';
import Home from './pages/Home';
import SmartMobilityGoals from './pages/SmartMobilityGoals';
import DataCatalogue from './pages/DataCatalogue';
import WebMap from './pages/WebMap';
import About from './pages/About';
import { generateMockData } from './data/mockData';

// Import all react material UI components
import { useState } from 'react';

// Set base path for deployment
const base = import.meta.env.PROD ? '/mobility-dash' : '/';

function App() {
  const [datasets] = useState(() => generateMockData(300));
  return (
    <Router basename={base}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/smart-mobility-goals" element={<SmartMobilityGoals />} />
        <Route path="/data-catalogue" element={<DataCatalogue datasets={datasets} />} />
        <Route path="/webmap" element={<WebMap />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;