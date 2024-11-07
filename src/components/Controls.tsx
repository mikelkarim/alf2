import React, { memo } from 'react';
import { RefreshCw, Minus, Plus, ZoomIn, ZoomOut } from 'lucide-react';
import { ControlsProps } from '../types/types';

export const Controls = memo(function Controls({ 
  iterations, 
  onIterationChange, 
  onRegenerate,
  scale,
  onScaleChange 
}: ControlsProps) {
  const MIN_SCALE = 0.2;
  const MAX_SCALE = 2;
  const SCALE_STEP = 0.1;

  const handleScaleDecrease = () => {
    onScaleChange(Math.max(MIN_SCALE, scale - SCALE_STEP));
  };

  const handleScaleIncrease = () => {
    onScaleChange(Math.min(MAX_SCALE, scale + SCALE_STEP));
  };

  return (
    <div className="mt-8 text-center space-y-4">
      <div className="flex items-center justify-center gap-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onIterationChange(Math.max(1, iterations - 1))}
            className="p-3 bg-amber-500/20 hover:bg-amber-500/30 text-amber-100 rounded-lg border border-amber-500/30 transition-all duration-300 hover:scale-105 active:scale-95"
            aria-label="Decrease iterations"
          >
            <Minus size={20} />
          </button>
          <span className="text-amber-100 min-w-[120px] font-mono">
            Itérations: {iterations}
          </span>
          <button
            onClick={() => onIterationChange(iterations + 1)}
            className="p-3 bg-amber-500/20 hover:bg-amber-500/30 text-amber-100 rounded-lg border border-amber-500/30 transition-all duration-300 hover:scale-105 active:scale-95"
            aria-label="Increase iterations"
          >
            <Plus size={20} />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleScaleDecrease}
            disabled={scale <= MIN_SCALE}
            className="p-3 bg-amber-500/20 hover:bg-amber-500/30 text-amber-100 rounded-lg border border-amber-500/30 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Zoom out"
          >
            <ZoomOut size={20} />
          </button>
          <span className="text-amber-100 min-w-[120px] font-mono">
            Échelle base: {scale.toFixed(1)}x
          </span>
          <button
            onClick={handleScaleIncrease}
            disabled={scale >= MAX_SCALE}
            className="p-3 bg-amber-500/20 hover:bg-amber-500/30 text-amber-100 rounded-lg border border-amber-500/30 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Zoom in"
          >
            <ZoomIn size={20} />
          </button>
        </div>
      </div>
      
      <button
        onClick={onRegenerate}
        className="px-6 py-3 bg-amber-500/20 hover:bg-amber-500/30 text-amber-100 rounded-lg border border-amber-500/30 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 mx-auto group"
      >
        <RefreshCw size={20} className="group-hover:rotate-180 transition-transform duration-500" />
        Régénérer
      </button>
    </div>
  );
});