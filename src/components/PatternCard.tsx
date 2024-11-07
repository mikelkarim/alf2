import React, { memo, useRef, useEffect, useState } from 'react';
import { ZoomIn, ZoomOut } from 'lucide-react';
import { PatternCardProps } from '../types/types';
import { letterColors, arabicMappings } from '../constants/mappings';

export const PatternCard = memo(function PatternCard({ pattern, index, scale, onScaleChange }: PatternCardProps) {
  const MIN_SCALE = 0.2;
  const MAX_SCALE = 2;
  const SCALE_STEP = 0.1;
  const MIN_DOT_SIZE = 6;
  const BASE_DOT_SIZE = 16;
  const dotSize = Math.max(MIN_DOT_SIZE, BASE_DOT_SIZE * scale);
  const letters = pattern.split(' ');
  const containerRef = useRef<HTMLDivElement>(null);
  const [dotPositions, setDotPositions] = useState<Array<{ x: number; y: number; color: string }>>([]);

  const handleScaleDecrease = () => {
    onScaleChange(Math.max(MIN_SCALE, scale - SCALE_STEP));
  };

  const handleScaleIncrease = () => {
    onScaleChange(Math.min(MAX_SCALE, scale + SCALE_STEP));
  };

  const getTextColorClass = (bgColorClass: string) => {
    return bgColorClass.replace('bg-', 'text-');
  };

  useEffect(() => {
    const updateDotPositions = () => {
      const dots = containerRef.current?.querySelectorAll('.dot');
      if (!dots) return;

      const positions: Array<{ x: number; y: number; color: string }> = [];
      dots.forEach((dot) => {
        const rect = dot.getBoundingClientRect();
        const containerRect = containerRef.current!.getBoundingClientRect();
        positions.push({
          x: rect.left - containerRect.left + dotSize / 2,
          y: rect.top - containerRect.top + dotSize / 2,
          color: dot.getAttribute('data-color') || '',
        });
      });
      setDotPositions(positions);
    };

    updateDotPositions();
    window.addEventListener('resize', updateDotPositions);
    return () => window.removeEventListener('resize', updateDotPositions);
  }, [pattern, scale, dotSize]);

  const generateSinePath = (start: { x: number; y: number }, end: { x: number; y: number }) => {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const amplitude = Math.min(20, distance * 0.2);
    const controlPoint1 = {
      x: start.x + dx * 0.25,
      y: start.y + dy * 0.25 - amplitude,
    };
    const controlPoint2 = {
      x: start.x + dx * 0.75,
      y: start.y + dy * 0.75 + amplitude,
    };
    return `M ${start.x} ${start.y} C ${controlPoint1.x} ${controlPoint1.y}, ${controlPoint2.x} ${controlPoint2.y}, ${end.x} ${end.y}`;
  };

  return (
    <div 
      className="pattern-card transform transition-all duration-500"
      style={{ 
        animationDelay: `${index * 0.1}s`,
        animationFillMode: 'forwards'
      }}
    >
      <div className="relative bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-xl p-4 backdrop-blur-md border border-amber-500/30 group">
        <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="flex flex-col gap-3 relative z-10">
          <div className="flex items-center justify-between">
            <span className="text-amber-200/60 text-sm font-mono">#{index + 1}</span>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-amber-500/10 rounded-lg px-3 py-1">
                <button
                  onClick={handleScaleDecrease}
                  disabled={scale <= MIN_SCALE}
                  className="text-amber-200/60 hover:text-amber-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Decrease scale"
                >
                  <ZoomOut size={16} />
                </button>
                <span className="text-amber-200/60 text-xs font-mono">{scale.toFixed(1)}x</span>
                <button
                  onClick={handleScaleIncrease}
                  disabled={scale >= MAX_SCALE}
                  className="text-amber-200/60 hover:text-amber-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Increase scale"
                >
                  <ZoomIn size={16} />
                </button>
              </div>
            </div>
          </div>
          <div className="w-full relative" ref={containerRef}>
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {dotPositions.map((dot, i) => {
                if (i === 0) return null;
                const prevDot = dotPositions[i - 1];
                if (prevDot.color !== dot.color) return null;
                
                const colorClass = dot.color.replace('bg-', 'stroke-');
                return (
                  <path
                    key={i}
                    d={generateSinePath(prevDot, dot)}
                    className={`${colorClass} fill-none opacity-30`}
                    strokeWidth="1.5"
                    strokeDasharray="4 6"
                    strokeLinecap="round"
                  />
                );
              })}
            </svg>
            <div className="flex flex-wrap gap-6">
              {letters.map((letter, i) => {
                const colorClass = letterColors[letter as keyof typeof letterColors];
                const textColorClass = getTextColorClass(colorClass);
                return (
                  <div key={i} className="flex items-center gap-4">
                    <span className={`${textColorClass} text-xl font-bold`}>
                      {letter}
                    </span>
                    <span className={`${textColorClass} text-2xl font-arabic`}>
                      {arabicMappings[letter as keyof typeof arabicMappings]}
                    </span>
                    <div 
                      className={`dot shrink-0 rounded-full ${colorClass} 
                        shadow-lg shadow-black/20 transform transition-all duration-300
                        hover:scale-125 hover:shadow-xl hover:rotate-180
                        animate-fade-in cursor-pointer`}
                      style={{ 
                        animationDelay: `${i * 0.05}s`,
                        width: `${dotSize}px`,
                        height: `${dotSize}px`,
                        minWidth: `${dotSize}px`,
                        minHeight: `${dotSize}px`
                      }}
                      data-color={colorClass}
                      title={letter}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});