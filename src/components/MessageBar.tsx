import React from 'react';
import type { GameState } from '../types';

interface MessageBarProps {
  startMessage: string;
  targetMessage: string;
  currentMessage: string;
  gameState: GameState;
}

const MessageBar: React.FC<MessageBarProps> = ({
  startMessage,
  targetMessage,
  currentMessage,
  gameState,
}) => {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      <div
        className="px-4 py-2 rounded-lg font-mono font-bold border-2 text-sm tracking-widest"
        style={{ background: '#451a03', color: '#fde68a', borderColor: '#1c0a00' }}
      >
        Start: {startMessage}
      </div>
      <div
        className="px-4 py-2 rounded-lg font-mono font-bold border-2 text-sm tracking-widest"
        style={{ background: '#052e16', color: '#bbf7d0', borderColor: '#021a0b' }}
      >
        Target: {targetMessage}
      </div>
      <div
        className={`px-4 py-2 rounded-lg font-mono font-bold border-2 text-sm tracking-widest transition-all ${
          gameState === 'animating' ? 'animate-pulse' : ''
        }`}
        style={{ background: '#1e3a5f', color: '#93c5fd', borderColor: '#0c2340' }}
      >
        Now: {currentMessage}
      </div>
    </div>
  );
};

export default MessageBar;