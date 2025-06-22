import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import History from './pages/History';
import CharacterMode from './pages/CharacterMode';
import DailyFortune from './pages/DailyFortune';
import VoiceOracle from './pages/VoiceOracle';
import MysticPlanner from './pages/MysticPlanner';
import CommunityFeed from './pages/CommunityFeed';
import LivePulse from './pages/LivePulse';
import Customize from './pages/Customize';
import ShareReels from './pages/ShareReels';

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/history" element={<History />} />
            <Route path="/character" element={<CharacterMode />} />
            <Route path="/fortune" element={<DailyFortune />} />
            <Route path="/voice" element={<VoiceOracle />} />
            <Route path="/planner" element={<MysticPlanner />} />
            <Route path="/community" element={<CommunityFeed />} />
            <Route path="/pulse" element={<LivePulse />} />
            <Route path="/customize" element={<Customize />} />
            <Route path="/share" element={<ShareReels />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App;
