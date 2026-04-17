import React from 'react';
import { Scroll } from 'lucide-react';

import '../styles/game.css';
import { useGameState } from '../hooks/useGameState';
import MapView from './MapView';
import FlagPanel from './FlagPanel';
import FlagInfo from './FlagInfo';
import ActionPanel from './ActionPanel';
import MessageBar from './MessageBar';

const Game: React.FC = () => {
  const {
    level,
    currentLevel,
    placedFlags,
    selectedFlag,
    gameState,
    currentMessage,
    path,
    animationStep,
    animationMessages,
    totalLevels,
    handleZoneClick,
    handleFlagSelect,
    removeFlagFromZone,
    simulateDelivery,
    resetLevel,
    nextLevel,
  } = useGameState();

  return (
    <div
      className="w-full min-h-screen p-4 overflow-auto"
      style={{
        background:
          'linear-gradient(135deg, #3e2723 0%, #5d4037 50%, #4e342e 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto space-y-5">

        {/* Header */}
        <div className="parchment ornate-border rounded-xl px-8 py-5 relative">
          <div
            className="absolute -top-5 left-10 w-10 h-10 rounded-full flex items-center justify-center shadow-xl"
            style={{ background: 'radial-gradient(circle, #dc2626, #991b1b)' }}
          >
            <Scroll className="w-5 h-5 text-white" />
          </div>
          <h1
            className="text-4xl font-bold text-center medieval-text tracking-wide"
            style={{ color: '#3b1a08' }}
          >
            Bitquest
          </h1>
          <p
            className="text-center mt-1 text-sm medieval-text tracking-widest"
            style={{ color: '#7c4a1e' }}
          >
            A Journey Through the Lands of Netherlands
          </p>
        </div>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">

          {/* Map panel — 3 columns */}
          <div className="lg:col-span-3 parchment ornate-border rounded-xl p-5 space-y-4">
            <div className="flex flex-wrap justify-between items-start gap-3">
              <h2
                className="text-2xl font-bold medieval-text"
                style={{ color: '#3b1a08' }}
              >
                Quest Map — Level {level.level}
              </h2>
              <MessageBar
                startMessage={level.startMessage}
                targetMessage={level.targetMessage}
                currentMessage={currentMessage}
                gameState={gameState}
              />
            </div>

            <MapView
              level={level}
              placedFlags={placedFlags}
              path={path}
              animationStep={animationStep}
              animationMessages={animationMessages}
              currentMessage={currentMessage}
              gameState={gameState}
              onZoneClick={handleZoneClick}
              onRemoveFlag={removeFlagFromZone}
            />
          </div>

          {/* Side panel — 1 column */}
          <div className="space-y-4">
            <FlagPanel
              level={level}
              placedCount={placedFlags.length}
              selectedFlag={selectedFlag}
              gameState={gameState}
              onFlagSelect={handleFlagSelect}
            />

            <FlagInfo selectedFlagId={selectedFlag} />

            <ActionPanel
              level={level}
              currentLevel={currentLevel}
              totalLevels={totalLevels}
              gameState={gameState}
              currentMessage={currentMessage}
              placedCount={placedFlags.length}
              animationStep={animationStep}
              pathLength={path.length}
              onDeliver={simulateDelivery}
              onReset={resetLevel}
              onNext={nextLevel}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;