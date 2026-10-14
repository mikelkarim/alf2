import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { href: '#systeme', label: 'Le système' },
  { href: '#laboratoire', label: 'Laboratoire' },
  { href: '#croissance', label: 'Croissance' },
  { href: '#fractale', label: 'Fractale' },
  { href: '#projet', label: 'Projet' },
  { href: '#contact', label: 'Contact' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled || open ? 'bg-ink-950/85 backdrop-blur-md border-b border-gold-500/10' : ''}`}>
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#top" className="flex items-baseline gap-3 group" onClick={() => setOpen(false)}>
          <span className="font-arabic text-3xl text-gold-400 group-hover:text-gold-300 transition-colors">يا ألف</span>
          <span className="font-display text-xl tracking-[0.3em] text-stone-100">YAALF</span>
        </a>
        <ul className="hidden lg:flex items-center gap-8 text-sm text-stone-300">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-gold-300 transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gold-400 hover:after:w-full after:transition-all">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <button className="lg:hidden text-stone-200" onClick={() => setOpen(o => !o)} aria-label="Menu" aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <ul className="lg:hidden px-6 pb-6 space-y-4 text-lg font-display">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)} className="block text-stone-200 hover:text-gold-300">{l.label}</a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
