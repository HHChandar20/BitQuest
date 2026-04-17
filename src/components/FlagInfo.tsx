import React from 'react';
import { Flag } from 'lucide-react';
import { FLAG_TYPES } from '../data/flags';

interface FlagInfoProps {
  selectedFlagId: string | null;
}

const FlagInfo: React.FC<FlagInfoProps> = ({ selectedFlagId }) => {
  const flag = selectedFlagId ? FLAG_TYPES.find((f) => f.id === selectedFlagId) : null;

  return (
    <div className="parchment ornate-border rounded-lg p-3">
      {flag ? (
        <div className="flex items-start gap-3">
          <Flag
            className="w-5 h-5 mt-0.5 flex-shrink-0"
            style={{ color: flag.color }}
            fill={flag.color}
            strokeWidth={1.5}
          />
          <div>
            <div
              className="font-bold text-sm medieval-text"
              style={{ color: '#4a2511' }}
            >
              {flag.name}
            </div>
            <div
              className="text-xs mt-0.5 medieval-text leading-relaxed"
              style={{ color: '#6d4c41' }}
            >
              {flag.description}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <Flag className="w-5 h-5" style={{ color: '#a0856a' }} strokeWidth={1.5} />
          <span className="text-sm medieval-text" style={{ color: '#a0856a' }}>
            Select a flag to see its effect.
          </span>
        </div>
      )}
    </div>
  );
};

export default FlagInfo;