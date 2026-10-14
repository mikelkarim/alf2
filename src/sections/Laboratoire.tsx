import { useMemo, useState } from 'react';
import { Controls } from '../components/Controls';
import { PatternCard } from '../components/PatternCard';
import { SectionTitle } from '../components/Reveal';
import { generateAllPatterns } from '../utils/patternGenerator';

// Au-delà de 7 lignes (Gen 6 = 441 lettres), le rendu DOM devient trop lourd : la fractale prend le relais.
const MAX_ITERATIONS = 7;

export function Laboratoire() {
  const [iterations, setIterations] = useState(5);
  const [baseScale, setBaseScale] = useState(1);
  const [individualScales, setIndividualScales] = useState<Record<number, number>>({});
  const [seed, setSeed] = useState(0);

  const patterns = useMemo(() => generateAllPatterns(iterations), [iterations]);

  const handleRegenerate = () => {
    setIndividualScales({});
    setSeed(s => s + 1);
  };

  return (
    <section id="laboratoire" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionTitle kicker="02 — Laboratoire" title="Faites pousser les lettres" arabic="مختبر الحروف">
          Ajoutez des générations, zoomez sur chaque ligne. Les fils pointillés relient les lettres
          identiques qui se suivent : c’est là que le motif se répète.
        </SectionTitle>

        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-5 md:p-8 shadow-2xl border border-gold-500/20">
          <div className="space-y-6" key={seed}>
            {patterns.map((pattern, index) => (
              <PatternCard
                key={index}
                pattern={pattern}
                index={index}
                scale={baseScale * (individualScales[index] ?? 1)}
                onScaleChange={newScale => setIndividualScales(prev => ({ ...prev, [index]: newScale / baseScale }))}
              />
            ))}
          </div>
        </div>

        <Controls
          iterations={iterations}
          maxIterations={MAX_ITERATIONS}
          scale={baseScale}
          onIterationChange={setIterations}
          onScaleChange={setBaseScale}
          onRegenerate={handleRegenerate}
        />
      </div>
    </section>
  );
}
