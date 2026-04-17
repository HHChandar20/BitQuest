import React from 'react';
import { Flag } from 'lucide-react';
import { FLAG_TYPES } from '../data/flags';
import type { LevelConfig, GameState } from '../types';

interface FlagPanelProps {
  level: LevelConfig;
  placedCount: number;
  selectedFlag: string | null;
  gameState: GameState;
  onFlagSelect: (flagId: string) => void;
}

const FlagPanel: React.FC<FlagPanelProps> = ({
  level,
  placedCount,
  selectedFlag,
  gameState,
  onFlagSelect,
}) => {
  const available = FLAG_TYPES.filter((f) => level.availableFlags.includes(f.id));
  const isDisabled = gameState === 'animating';

  return (
    <div className="parchment ornate-border rounded-lg p-4">
      <h3
        className="text-xl font-bold medieval-text mb-1"
        style={{ color: '#4a2511' }}
      >
        Flag Arsenal
      </h3>
      <p className="text-xs mb-3 medieval-text" style={{ color: '#6d4c41' }}>
        Placed:{' '}
        <span className="font-bold">
          {placedCount}/{level.maxFlags}
        </span>
        {' '}— click a flag, then click a province
      </p>

      <div className="space-y-1.5">
        {available.map((flag) => {
          const isSelected = selectedFlag === flag.id;
          return (
            <button
              key={flag.id}
              onClick={() => onFlagSelect(flag.id)}
              disabled={isDisabled}
              className={`w-full flex items-center gap-2.5 p-2.5 rounded-lg border-2 transition-all medieval-text text-left ${
                isDisabled ? 'opacity-40 cursor-not-allowed' : 'hover:brightness-105'
              }`}
              style={{
                background: isSelected ? flag.color : '#f9f0dc',
                color: isSelected ? '#fff' : '#4a2511',
                borderColor: flag.color,
                boxShadow: isSelected ? `0 3px 10px ${flag.color}60` : 'none',
                transform: isSelected ? 'scale(1.02)' : 'scale(1)',
              }}
            >
              <Flag
                className="w-4 h-4 flex-shrink-0"
                style={{ color: isSelected ? '#fff' : flag.color }}
                fill={isSelected ? '#fff' : flag.color}
                strokeWidth={1.5}
              />
              <div className="flex-1 min-w-0">
                <div className="font-bold text-xs truncate">{flag.name}</div>
                <div className="font-mono text-xs opacity-70">{flag.symbol}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FlagPanel;