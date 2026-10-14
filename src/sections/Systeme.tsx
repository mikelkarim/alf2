import { LETTERS, arabicMappings, letterHex, letterMappings, letterNames } from '../constants/mappings';
import { Reveal, SectionTitle } from '../components/Reveal';

export function Systeme() {
  return (
    <section id="systeme" className="relative py-32 px-6 bg-ink-900">
      <div className="max-w-7xl mx-auto">
        <SectionTitle kicker="01 — Le système" title="Cinq lettres, cinq règles" arabic="خمسة أحرف">
          Chaque lettre se réécrit en un mot. On part de <span className="text-gold-300">A</span> (ا),
          on applique les règles à toutes les lettres en même temps, et l’on recommence.
          C’est un système de réécriture — la même mécanique que les L-systèmes qui décrivent la croissance des plantes.
        </SectionTitle>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {LETTERS.map((l, i) => (
            <Reveal key={l} delay={i * 100}>
              <article className="group h-full rounded-3xl border border-white/10 bg-ink-950/60 p-7 hover:border-white/25 transition-all hover:-translate-y-1">
                <div className="flex items-start justify-between">
                  <span className="font-arabic text-7xl leading-none" style={{ color: letterHex[l] }}>{arabicMappings[l]}</span>
                  <span className="w-4 h-4 rounded-full mt-2 shadow-lg" style={{ background: letterHex[l], boxShadow: `0 0 24px ${letterHex[l]}` }} />
                </div>
                <h3 className="mt-6 font-display text-2xl text-stone-50">{letterNames[l].name}</h3>
                <p className="font-arabic text-stone-400">{letterNames[l].arabicName}</p>
                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-xs uppercase tracking-widest text-stone-500 mb-2">Règle</p>
                  <p className="font-mono text-lg text-stone-200">
                    {l} <span className="text-stone-500">→</span> {letterMappings[l]}
                  </p>
                  <p className="font-arabic text-2xl mt-1" dir="rtl" style={{ color: letterHex[l] }}>
                    {letterMappings[l].split(' ').map(c => arabicMappings[c as keyof typeof arabicMappings]).join('')}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 rounded-3xl border border-gold-500/20 bg-gradient-to-r from-gold-500/10 to-transparent p-8 md:p-10">
          <p className="text-xs uppercase tracking-widest text-gold-400 mb-4">Les premières générations</p>
          <ol className="space-y-3 font-mono text-stone-300 text-sm md:text-base">
            <li><span className="text-stone-500 mr-4">Gen 0</span>A</li>
            <li><span className="text-stone-500 mr-4">Gen 1</span>A L F</li>
            <li><span className="text-stone-500 mr-4">Gen 2</span>A L F · L A M · F A</li>
            <li className="break-words"><span className="text-stone-500 mr-4">Gen 3</span>A L F · L A M · F A · L A M · A L F · M Y M · F A · A L F</li>
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
