import { ArrowDown } from 'lucide-react';
import { LETTERS, arabicMappings, letterHex } from '../constants/mappings';
import { generationLetters } from '../utils/patternGenerator';

// Phyllotaxie de la génération 5 (163 lettres) en fond.
const seq = generationLetters(5);
const GOLDEN = Math.PI * (3 - Math.sqrt(5));

export function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex items-center overflow-hidden grain">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#3a2512_0%,_#0b0907_65%)]" />
      <svg viewBox="-200 -200 400 400" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[140vmin] h-[140vmin] opacity-50 animate-spin-slow" aria-hidden>
        {seq.map((l, i) => {
          const r = 14 * Math.sqrt(i + 1);
          const a = i * GOLDEN;
          return <circle key={i} cx={r * Math.cos(a)} cy={r * Math.sin(a)} r={2.2 + i / 90} fill={letterHex[l]} opacity={0.85 - i / 260} />;
        })}
      </svg>

      <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-20 w-full">
        <p className="text-gold-400 uppercase tracking-[0.4em] text-xs mb-8 animate-fade-in">Laboratoire des Lettres</p>
        <h1 className="font-display text-6xl sm:text-8xl md:text-9xl text-stone-50 leading-[0.9] animate-fade-in">
          YAALF
          <span className="block font-arabic text-5xl sm:text-7xl md:text-8xl text-gold-400 mt-4">يا ألف</span>
        </h1>
        <p className="mt-10 max-w-xl text-lg md:text-xl text-stone-300 leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s', opacity: 0 }}>
          Une seule lettre, <em className="font-display text-gold-300 text-2xl">Alif</em>, et cinq règles.
          De génération en génération, les lettres s’engendrent et dessinent une fractale vivante.
        </p>

        <div className="mt-12 flex flex-wrap gap-3">
          {LETTERS.map((l, i) => (
            <div key={l} className="animate-float flex items-center gap-3 rounded-full border border-white/10 bg-white/5 backdrop-blur px-4 py-2" style={{ animationDelay: `${i * 0.6}s` }}>
              <span className="w-3 h-3 rounded-full" style={{ background: letterHex[l] }} />
              <span className="font-arabic text-2xl" style={{ color: letterHex[l] }}>{arabicMappings[l]}</span>
              <span className="text-stone-400 text-sm font-mono">{l}</span>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap gap-4">
          <a href="#laboratoire" className="px-7 py-4 rounded-full bg-gold-500 text-ink-950 font-medium hover:bg-gold-300 transition-colors">
            Entrer dans le laboratoire
          </a>
          <a href="#systeme" className="px-7 py-4 rounded-full border border-gold-500/40 text-gold-300 hover:bg-gold-500/10 transition-colors">
            Comprendre le système
          </a>
        </div>
      </div>

      <a href="#systeme" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-stone-500 hover:text-gold-300 animate-bounce" aria-label="Défiler">
        <ArrowDown />
      </a>
    </section>
  );
}
