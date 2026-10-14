import { ReactNode, useEffect, useRef, useState } from 'react';

export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function SectionTitle({ kicker, title, arabic, children }: { kicker: string; title: string; arabic?: string; children?: ReactNode }) {
  return (
    <Reveal className="max-w-3xl mb-14">
      <p className="text-gold-400 uppercase tracking-[0.35em] text-xs mb-4">{kicker}</p>
      <h2 className="font-display text-4xl md:text-6xl text-stone-50 leading-tight">
        {title} {arabic && <span className="font-arabic text-gold-400/80 ml-2">{arabic}</span>}
      </h2>
      {children && <div className="mt-6 text-stone-400 text-lg leading-relaxed">{children}</div>}
    </Reveal>
  );
}
