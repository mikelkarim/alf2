import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Controls } from './components/Controls';
import { PatternCard } from './components/PatternCard';
import { generateAllPatterns } from './utils/patternGenerator';

function App() {
  const [patterns, setPatterns] = useState<string[]>([]);
  const [iterations, setIterations] = useState(6);
  const [baseScale, setBaseScale] = useState(1);
  const [individualScales, setIndividualScales] = useState<number[]>([]);

  useEffect(() => {
    const newPatterns = generateAllPatterns(iterations);
    setPatterns(newPatterns);
    setIndividualScales(new Array(newPatterns.length).fill(1));
  }, [iterations]);

  const handleRegenerate = () => {
    const newPatterns = generateAllPatterns(iterations);
    setPatterns(newPatterns);
    setIndividualScales(new Array(newPatterns.length).fill(1));
  };

  const handleIndividualScaleChange = (index: number, newScale: number) => {
    setIndividualScales(prev => {
      const updated = [...prev];
      updated[index] = newScale;
      return updated;
    });
  };

  const getPatternScale = (index: number) => {
    return baseScale * (individualScales[index] || 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-orange-800 to-red-900 flex flex-col items-center justify-center p-8">
      <div className="max-w-6xl w-full">
        <Header />

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-amber-500/20">
          <div className="space-y-6">
            {patterns.map((pattern, index) => (
              <PatternCard 
                key={index}
                pattern={pattern}
                index={index}
                scale={getPatternScale(index)}
                onScaleChange={(newScale) => handleIndividualScaleChange(index, newScale)}
              />
            ))}
          </div>
        </div>

        <Controls 
          iterations={iterations}
          scale={baseScale}
          onIterationChange={setIterations}
          onScaleChange={setBaseScale}
          onRegenerate={handleRegenerate}
        />
      </div>
    </div>
  );
}

export default App;