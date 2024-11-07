import { letterMappings } from '../constants/mappings';

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