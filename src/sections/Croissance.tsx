import { useMemo } from 'react';
import { LETTERS, arabicMappings, letterHex } from '../constants/mappings';
import { Reveal, SectionTitle } from '../components/Reveal';
import { generationCounts, growthRatio, total } from '../utils/patternGenerator';

const GENERATIONS = 12;
const fmt = new Intl.NumberFormat('fr-FR');

export function Croissance() {
  const counts = useMemo(() => generationCounts(GENERATIONS), []);
  const ratio = useMemo(() => growthRatio(), []);
  const maxLog = Math.log10(total(counts[GENERATIONS - 1]));

  return (
    <section id="croissance" className="relative py-32 px-6 bg-ink-900">
      <div className="max-w-7xl mx-auto">
        <SectionTitle kicker="03 — Croissance" title="Une constante cachée" arabic="φ">
          À chaque génération, le texte est multiplié par un nombre qui converge vers une constante :
          la valeur propre dominante de la matrice des règles.
        </SectionTitle>

        <div className="grid lg:grid-cols-3 gap-6 mb-16">
          <Reveal className="rounded-3xl border border-gold-500/30 bg-gradient-to-br from-gold-500/15 to-transparent p-8">
            <p className="text-xs uppercase tracking-widest text-gold-400">Ratio de croissance</p>
            <p className="font-display text-6xl text-stone-50 mt-3">φ<sub className="text-2xl">ALF</sub></p>
            <p className="font-mono text-3xl text-gold-300 mt-2">{ratio.toFixed(6)}</p>
          </Reveal>
          <Reveal delay={100} className="rounded-3xl border border-white/10 bg-ink-950/60 p-8">
            <p className="text-xs uppercase tracking-widest text-stone-500">Symétrie</p>
            <p className="font-display text-5xl text-stone-50 mt-3">
              <span style={{ color: letterHex.L }}>L</span> = <span style={{ color: letterHex.F }}>F</span>
            </p>
            <p className="text-stone-400 mt-4">À chaque génération, Lām et Fā’ apparaissent exactement le même nombre de fois.</p>
          </Reveal>
          <Reveal delay={200} className="rounded-3xl border border-white/10 bg-ink-950/60 p-8">
            <p className="text-xs uppercase tracking-widest text-stone-500">Génération {GENERATIONS - 1}</p>
            <p className="font-mono text-5xl text-stone-50 mt-3">{fmt.format(total(counts[GENERATIONS - 1]))}</p>
            <p className="text-stone-400 mt-4">lettres, nées d’un seul Alif.</p>
          </Reveal>
        </div>

        <Reveal className="rounded-3xl border border-white/10 bg-ink-950/60 p-6 md:p-8 overflow-x-auto">
          <table className="w-full text-sm md:text-base min-w-[640px]">
            <thead>
              <tr className="text-left text-stone-500 text-xs uppercase tracking-widest">
                <th className="pb-4 font-normal">Gen</th>
                <th className="pb-4 font-normal">Total</th>
                {LETTERS.map(l => (
                  <th key={l} className="pb-4 font-normal text-right">
                    <span className="font-arabic text-lg normal-case" style={{ color: letterHex[l] }}>{arabicMappings[l]}</span> {l}
                  </th>
                ))}
                <th className="pb-4 font-normal w-1/4 pl-6">Échelle log</th>
              </tr>
            </thead>
            <tbody className="font-mono">
              {counts.map((c, g) => {
                const t = total(c);
                return (
                  <tr key={g} className="border-t border-white/5 hover:bg-white/5">
                    <td className="py-3 text-stone-500">{g}</td>
                    <td className="py-3 text-stone-100">{fmt.format(t)}</td>
                    {LETTERS.map(l => (
                      <td key={l} className="py-3 text-right text-stone-300">{fmt.format(c[l])}</td>
                    ))}
                    <td className="py-3 pl-6">
                      <div className="h-2 rounded-full overflow-hidden flex bg-white/5" style={{ width: `${Math.max(2, (Math.log10(t) / maxLog) * 100)}%` }}>
                        {LETTERS.map(l => (
                          <div key={l} style={{ width: `${(c[l] / t) * 100}%`, background: letterHex[l] }} />
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
}
