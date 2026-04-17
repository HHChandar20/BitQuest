import React from 'react';
import { RotateCcw, CheckCircle, XCircle } from 'lucide-react';
import type { GameState, LevelConfig } from '../types';

interface ActionPanelProps {
  level: LevelConfig;
  currentLevel: number;
  totalLevels: number;
  gameState: GameState;
  currentMessage: string;
  placedCount: number;
  animationStep: number;
  pathLength: number;
  onDeliver: () => void;
  onReset: () => void;
  onNext: () => void;
}

const ActionPanel: React.FC<ActionPanelProps> = ({
  level,
  currentLevel,
  totalLevels,
  gameState,
  currentMessage,
  placedCount,
  animationStep,
  pathLength,
  onDeliver,
  onReset,
  onNext,
}) => {
  const isAnimating = gameState === 'animating';

  return (
    <div className="space-y-3">
      {/* Deliver / Reset */}
      <div className="parchment ornate-border rounded-lg p-4 space-y-2.5">
        <button
          onClick={onDeliver}
          disabled={gameState !== 'playing' || placedCount === 0}
          className="w-full font-bold py-3 px-4 rounded-lg border-2 transition-all medieval-text shadow-md"
          style={{
            background:
              gameState !== 'playing' || placedCount === 0
                ? '#6b7280'
                : '#14532d',
            color: '#d1fae5',
            borderColor:
              gameState !== 'playing' || placedCount === 0 ? '#4b5563' : '#052e16',
            cursor:
              gameState !== 'playing' || placedCount === 0
                ? 'not-allowed'
                : 'pointer',
          }}
        >
          {isAnimating ? '🏇 Delivering…' : '🏇 Deliver Message'}
        </button>

        <button
          onClick={onReset}
          disabled={isAnimating}
          className={`w-full font-bold py-3 px-4 rounded-lg border-2 flex items-center justify-center gap-2 transition-all medieval-text shadow-md ${
            isAnimating ? 'opacity-40 cursor-not-allowed' : ''
          }`}
          style={{
            background: '#78350f',
            color: '#fef3c7',
            borderColor: '#451a03',
          }}
        >
          <RotateCcw className="w-4 h-4" />
          Reset Quest
        </button>
      </div>

      {/* Animating status */}
      {isAnimating && (
        <div className="parchment ornate-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ background: '#2563eb', animation: 'pulse 1s infinite' }}
            />
            <span
              className="font-bold medieval-text"
              style={{ color: '#1e40af' }}
            >
              Message in Transit
            </span>
          </div>
          <p className="text-xs medieval-text" style={{ color: '#4a2511' }}>
            Current:{' '}
            <span className="font-mono font-bold">{currentMessage}</span>
          </p>
          <p className="text-xs mt-1 medieval-text" style={{ color: '#6d4c41' }}>
            Zone {animationStep + 1} of {pathLength}
          </p>
        </div>
      )}

      {/* Result */}
      {gameState !== 'playing' && !isAnimating && (
        <div
          className="parchment ornate-border rounded-lg p-4"
          style={{
            backgroundColor: "#f4e4c1",
            backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,.05) 0px, transparent 1px, transparent 2px, rgba(0,0,0,.05) 3px), repeating-linear-gradient(90deg, rgba(0,0,0,.05) 0px, transparent 1px, transparent 2px, rgba(0,0,0,.05) 3px)",
            backgroundSize: "3px 3px",
            boxShadow: "inset 0 0 50px rgba(139,69,19,0.1)",
          }}
        >
          <div
            className="flex items-center gap-2 font-bold mb-2 medieval-text"
            style={{ color: gameState === 'won' ? '#14532d' : '#9f1239' }}
          >
            {gameState === 'won' ? (
              <>
                <CheckCircle className="w-6 h-6" />
                <span>Quest Complete!</span>
              </>
            ) : (
              <>
                <XCircle className="w-6 h-6" />
                <span>Quest Failed!</span>
              </>
            )}
          </div>
          <p className="text-xs medieval-text" style={{ color: '#4a2511' }}>
            {gameState === 'won'
              ? `Transformed ${level.startMessage} → ${level.targetMessage}`
              : `Got ${currentMessage}, needed ${level.targetMessage}`}
          </p>
          {gameState === 'won' && currentLevel < totalLevels - 1 && (
            <button
              onClick={onNext}
              className="mt-3 w-full font-bold py-2.5 px-4 rounded-lg border-2 transition-all medieval-text shadow-md"
              style={{
                background: '#78350f',
                color: '#fef3c7',
                borderColor: '#451a03',
              }}
            >
              Next Quest →
            </button>
          )}
          {gameState === 'won' && currentLevel === totalLevels - 1 && (
            <p
              className="mt-2 text-xs font-bold text-center medieval-text"
              style={{ color: '#14532d' }}
            >
              🏆 All quests completed!
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ActionPanel;