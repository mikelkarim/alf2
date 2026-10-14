import { useEffect, useRef, useState } from 'react';
import { Download, Play } from 'lucide-react';
import { LETTERS, arabicMappings, letterHex } from '../constants/mappings';
import { SectionTitle } from '../components/Reveal';
import { generationLetters } from '../utils/patternGenerator';

type Mode = 'spirale' | 'tissage' | 'rosace';
const modes: { id: Mode; label: string }[] = [
  { id: 'spirale', label: 'Spirale d’or' },
  { id: 'rosace', label: 'Rosace' },
  { id: 'tissage', label: 'Tissage' },
];
const GOLDEN = Math.PI * (3 - Math.sqrt(5));
const SIZE = 900;

function position(mode: Mode, i: number, n: number): { x: number; y: number; r: number } {
  const c = SIZE / 2;
  if (mode === 'spirale') {
    const rad = (SIZE * 0.46) * Math.sqrt((i + 0.5) / n);
    const a = i * GOLDEN;
    return { x: c + rad * Math.cos(a), y: c + rad * Math.sin(a), r: Math.max(1.2, (SIZE * 0.46 * 0.75) / Math.sqrt(n)) };
  }
  if (mode === 'rosace') {
    const t = i / n;
    const a = t * Math.PI * 2 * 5;
    const rad = SIZE * 0.44 * (0.25 + 0.75 * Math.abs(Math.sin(a * 1.2 + t * 6)));
    return { x: c + rad * Math.cos(a + t * 3), y: c + rad * Math.sin(a + t * 3), r: Math.max(1, 220 / Math.sqrt(n)) };
  }
  const cols = Math.ceil(Math.sqrt(n));
  const cell = (SIZE * 0.9) / cols;
  const row = Math.floor(i / cols);
  // Lecture boustrophédon, comme un tissage.
  const col = row % 2 === 0 ? i % cols : cols - 1 - (i % cols);
  return { x: SIZE * 0.05 + cell * (col + 0.5), y: SIZE * 0.05 + cell * (row + 0.5), r: cell * 0.38 };
}

export function Fractale() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gen, setGen] = useState(6);
  const [mode, setMode] = useState<Mode>('spirale');
  const [run, setRun] = useState(0);
  const seqLength = generationLetters(gen).length;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = SIZE * dpr;
    canvas.height = SIZE * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const seq = generationLetters(gen);
    const n = seq.length;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const perFrame = reduced ? n : Math.max(1, Math.ceil(n / 120));
    let i = 0;
    let frame = 0;

    ctx.fillStyle = '#0b0907';
    ctx.fillRect(0, 0, SIZE, SIZE);

    const draw = () => {
      const end = Math.min(n, i + perFrame);
      for (; i < end; i++) {
        const p = position(mode, i, n);
        ctx.beginPath();
        ctx.fillStyle = letterHex[seq[i]];
        ctx.globalAlpha = 0.9;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (i < n) frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [gen, mode, run]);

  const download = () => {
    const url = canvasRef.current?.toDataURL('image/png');
    if (!url) return;
    const a = document.createElement('a');
    a.href = url;
    a.download = `yaalf-gen${gen}-${mode}.png`;
    a.click();
  };

  return (
    <section id="fractale" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionTitle kicker="04 — Fractale" title="La lettre devient image" arabic="كسورية">
          Chaque point est une lettre, dans l’ordre exact de la séquence. Choisissez une génération
          et une forme : la structure du texte apparaît.
        </SectionTitle>

        <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
          <div className="rounded-3xl overflow-hidden border border-white/10 bg-ink-950 aspect-square">
            <canvas ref={canvasRef} className="w-full h-full" role="img" aria-label={`Fractale YAALF, génération ${gen}, ${seqLength} lettres`} />
          </div>

          <div className="space-y-8 lg:sticky lg:top-28">
            <div>
              <label htmlFor="gen" className="flex justify-between text-sm text-stone-400 mb-3">
                <span>Génération</span>
                <span className="font-mono text-gold-300">{gen} · {new Intl.NumberFormat('fr-FR').format(seqLength)} lettres</span>
              </label>
              <input id="gen" type="range" min={1} max={9} value={gen} onChange={e => setGen(Number(e.target.value))} className="w-full accent-amber-400" />
            </div>

            <div>
              <p className="text-sm text-stone-400 mb-3">Forme</p>
              <div className="grid grid-cols-3 gap-2">
                {modes.map(m => (
                  <button
                    key={m.id}
                    onClick={() => setMode(m.id)}
                    className={`px-3 py-2 rounded-xl text-sm border transition-colors ${mode === m.id ? 'bg-gold-500 text-ink-950 border-gold-500' : 'border-white/15 text-stone-300 hover:border-gold-500/50'}`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setRun(r => r + 1)} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gold-500/40 text-gold-300 hover:bg-gold-500/10">
                <Play size={18} /> Rejouer
              </button>
              <button onClick={download} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gold-500 text-ink-950 hover:bg-gold-300">
                <Download size={18} /> PNG
              </button>
            </div>

            <ul className="space-y-2 pt-6 border-t border-white/10">
              {LETTERS.map(l => (
                <li key={l} className="flex items-center gap-3 text-sm text-stone-400">
                  <span className="w-3 h-3 rounded-full" style={{ background: letterHex[l] }} />
                  <span className="font-arabic text-xl" style={{ color: letterHex[l] }}>{arabicMappings[l]}</span>
                  <span className="font-mono">{l}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
