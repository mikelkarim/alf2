import { letterMappings, LETTERS, Letter } from '../constants/mappings';

export const generateNextPattern = (previousPattern: string): string => {
  const letters = previousPattern.split(' ');
  const newPattern = letters.map(letter => {
    return letterMappings[letter as keyof typeof letterMappings] || letter;
  }).join(' ');
  return newPattern;
};

export const generateAllPatterns = (iterations: number): string[] => {
  const results: string[] = ['A'];
  let currentPattern = 'A';

  for (let i = 0; i < iterations - 1; i++) {
    currentPattern = generateNextPattern(currentPattern);
    results.push(currentPattern);
  }

  return results;
};

export type Counts = Record<Letter, number>;

const rules: Record<Letter, Letter[]> = Object.fromEntries(
  LETTERS.map(l => [l, letterMappings[l].split(' ') as Letter[]])
) as Record<Letter, Letter[]>;

/** Comptage par lettre de chaque génération, sans construire les chaînes (rapide même pour Gen 30). */
export const generationCounts = (generations: number): Counts[] => {
  let current: Counts = { A: 1, L: 0, F: 0, M: 0, Y: 0 };
  const out: Counts[] = [current];
  for (let g = 1; g < generations; g++) {
    const next: Counts = { A: 0, L: 0, F: 0, M: 0, Y: 0 };
    for (const l of LETTERS) for (const child of rules[l]) next[child] += current[l];
    out.push(next);
    current = next;
  }
  return out;
};

export const total = (c: Counts) => LETTERS.reduce((s, l) => s + c[l], 0);

/** Ratio de croissance limite (valeur propre dominante), obtenu par itération. ≈ 2.690284 */
export const growthRatio = (): number => {
  const counts = generationCounts(60);
  return total(counts[59]) / total(counts[58]);
};

/** Suite de lettres d'une génération (tableau, pour le dessin). */
export const generationLetters = (gen: number): Letter[] => {
  let seq: Letter[] = ['A'];
  for (let g = 0; g < gen; g++) seq = seq.flatMap(l => rules[l]);
  return seq;
};
