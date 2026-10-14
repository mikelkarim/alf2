import { FormEvent, useState } from 'react';
import { Send } from 'lucide-react';
import { SectionTitle } from '../components/Reveal';
import { CONTACT_EMAIL } from '../config';

export function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = `[YAALF] ${data.get('sujet')}`;
    const body = `${data.get('message')}\n\n— ${data.get('nom')} (${data.get('email')})`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const field = 'w-full bg-ink-950/60 border border-white/10 rounded-xl px-4 py-3 text-stone-100 placeholder:text-stone-600 focus:outline-none focus:border-gold-500/60 transition-colors';

  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12">
        <SectionTitle kicker="06 — Contact" title="Écrivons ensemble" arabic="تواصل">
          Exposition, édition, collaboration ou simple curiosité : envoyez un message.
        </SectionTitle>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <input name="nom" required placeholder="Nom" className={field} aria-label="Nom" />
            <input name="email" type="email" required placeholder="Email" className={field} aria-label="Email" />
          </div>
          <select name="sujet" className={field} aria-label="Sujet" defaultValue="Collaboration">
            <option>Collaboration</option>
            <option>Exposition</option>
            <option>Édition</option>
            <option>Presse</option>
            <option>Autre</option>
          </select>
          <textarea name="message" required rows={6} placeholder="Votre message" className={field} aria-label="Message" />
          <button type="submit" className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gold-500 text-ink-950 font-medium hover:bg-gold-300 transition-colors">
            <Send size={18} /> Envoyer
          </button>
          {sent && <p className="text-sm text-gold-300" role="status">Votre logiciel de messagerie s’ouvre avec le message prêt à partir.</p>}
        </form>
      </div>
    </section>
  );
}
