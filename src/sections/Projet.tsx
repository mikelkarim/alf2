import { BookOpen, Projector, Sigma } from 'lucide-react';
import { Reveal, SectionTitle } from '../components/Reveal';

const pillars = [
  {
    icon: Projector,
    title: 'Exposition immersive',
    arabic: 'معرض',
    text: 'Les générations projetées à l’échelle monumentale : le visiteur marche dans la fractale, chaque lettre devient lumière et couleur.',
  },
  {
    icon: BookOpen,
    title: 'Éditions',
    arabic: 'كتب',
    text: 'Livres et planches imprimées où la calligraphie arabe rencontre la croissance mathématique des séquences.',
  },
  {
    icon: Sigma,
    title: 'Recherche',
    arabic: 'بحث',
    text: 'Un système de réécriture ouvert : constante de croissance, symétries, motifs récurrents — tout est vérifiable et reproductible.',
  },
];

export function Projet() {
  return (
    <section id="projet" className="relative py-32 px-6 bg-ink-900 overflow-hidden">
      <div className="absolute -right-20 top-10 font-arabic text-[28rem] leading-none text-gold-500/5 select-none pointer-events-none" aria-hidden>ا</div>
      <div className="relative max-w-7xl mx-auto">
        <SectionTitle kicker="05 — Projet" title="Le Laboratoire des Lettres" arabic="مختبر">
          YAALF réunit l’art, l’écriture et les mathématiques autour d’une idée simple :
          la lettre n’est pas seulement un signe, c’est une graine.
        </SectionTitle>

        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 120}>
              <article className="h-full rounded-3xl border border-white/10 bg-ink-950/60 p-8 hover:border-gold-500/40 transition-colors">
                <p.icon className="text-gold-400" size={32} strokeWidth={1.5} />
                <h3 className="mt-8 font-display text-3xl text-stone-50">{p.title}</h3>
                <p className="font-arabic text-xl text-gold-400/70">{p.arabic}</p>
                <p className="mt-5 text-stone-400 leading-relaxed">{p.text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20 text-center">
          <blockquote className="font-display italic text-3xl md:text-5xl text-stone-200 max-w-4xl mx-auto leading-snug">
            « De l’Alif naît le mot, du mot naît le monde. »
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
