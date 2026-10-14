import { arabicMappings, LETTERS, letterHex } from '../constants/mappings';

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-stone-500">
        <div className="flex items-baseline gap-3">
          <span className="font-arabic text-2xl text-gold-400">يا ألف</span>
          <span className="font-display tracking-[0.3em] text-stone-300">YAALF</span>
        </div>
        <div className="flex gap-3 font-arabic text-2xl" dir="rtl">
          {LETTERS.map(l => <span key={l} style={{ color: letterHex[l] }}>{arabicMappings[l]}</span>)}
        </div>
        <p>© {new Date().getFullYear()} YAALF — Laboratoire des Lettres</p>
      </div>
    </footer>
  );
}
