import React, { useState } from 'react';
import MagicBall from './components/MagicBall';
import IntroPage from './components/IntroPage';
import './App.css';

function App() {
  const [started, setStarted] = useState(false);

  return (
    <div className="App">
      {started ? <MagicBall /> : <IntroPage onStart={() => setStarted(true)} />}
    </div>
  );
}

export default App;
