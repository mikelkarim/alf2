export interface PatternMapping {
  [key: string]: string;
}

export interface PatternCardProps {
  pattern: string;
  index: number;
  scale: number;
  onScaleChange: (scale: number) => void;
}

export interface ControlsProps {
  iterations: number;
  scale: number;
  onIterationChange: (value: number) => void;
  onScaleChange: (value: number) => void;
  onRegenerate: () => void;
}