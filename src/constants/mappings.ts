export const LETTERS = ['A', 'L', 'F', 'M', 'Y'] as const;
export type Letter = (typeof LETTERS)[number];

export const letterMappings = {
  'A': 'A L F',
  'L': 'L A M',
  'F': 'F A',
  'M': 'M Y M',
  'Y': 'Y A'
} as const;

export const letterColors = {
  'A': 'bg-emerald-400',
  'L': 'bg-rose-400',
  'F': 'bg-amber-400',
  'M': 'bg-violet-400',
  'Y': 'bg-sky-400'
} as const;

// Mêmes teintes que letterColors (Tailwind 400), pour canvas et SVG.
export const letterHex: Record<Letter, string> = {
  A: '#34d399',
  L: '#fb7185',
  F: '#fbbf24',
  M: '#a78bfa',
  Y: '#38bdf8',
};

export const arabicMappings = {
  'A': 'ا',
  'L': 'ل',
  'F': 'ف',
  'M': 'م',
  'Y': 'ي'
} as const;

export const letterNames: Record<Letter, { name: string; arabicName: string }> = {
  A: { name: 'Alif', arabicName: 'ألف' },
  L: { name: 'Lām', arabicName: 'لام' },
  F: { name: 'Fā’', arabicName: 'فاء' },
  M: { name: 'Mīm', arabicName: 'ميم' },
  Y: { name: 'Yā’', arabicName: 'ياء' },
};
