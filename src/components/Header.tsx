import React from 'react';
import { Moon, Stars } from 'lucide-react';
import { letterColors, arabicMappings } from '../constants/mappings';

export function Header() {
  const getTextColorClass = (bgColorClass: string) => {
    return bgColorClass.replace('bg-', 'text-');
  };

  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center gap-4 mb-6">
        <Moon className="text-amber-300 h-8 w-8" />
        <Stars className="text-amber-300 h-12 w-12" />
        <Moon className="text-amber-300 h-8 w-8 transform rotate-180" />
      </div>
      <h1 className="text-4xl font-bold text-amber-100 mb-4">
        Motifs de Points Colorés
      </h1>
      <div className="flex justify-center gap-8 mt-6">
        {['A', 'L', 'F', 'M', 'Y'].map((letter, i) => (
          <div key={i} className="flex items-center gap-4">
            <span 
              className={`${getTextColorClass(letterColors[letter as keyof typeof letterColors])} font-bold text-xl`}
            >
              {letter}
            </span>
            <span 
              className={`${getTextColorClass(letterColors[letter as keyof typeof letterColors])} text-2xl font-arabic`}
            >
              {arabicMappings[letter as keyof typeof arabicMappings]}
            </span>
            <div 
              className={`w-4 h-4 rounded-full ${letterColors[letter as keyof typeof letterColors]}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}