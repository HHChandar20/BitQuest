import { useState, useEffect, useCallback } from 'react';
import type { GameState, PlacedFlag } from '../types';
import { LEVELS } from '../data/levels';
import { FLAG_TYPES } from '../data/flags';

export function useGameState() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [placedFlags, setPlacedFlags] = useState<PlacedFlag[]>([]);
  const [selectedFlag, setSelectedFlag] = useState<string | null>(null);
  const [gameState, setGameState] = useState<GameState>('playing');
  const [currentMessage, setCurrentMessage] = useState('');
  const [path, setPath] = useState<string[]>([]);
  const [animationStep, setAnimationStep] = useState(0);
  const [animationMessages, setAnimationMessages] = useState<string[]>([]);

  const level = LEVELS[currentLevel];

  useEffect(() => {
    setCurrentMessage(level.startMessage);
    setPath([level.startZone]);
  }, [currentLevel, level.startMessage, level.startZone]);

  const handleZoneClick = useCallback(
    (zoneId: string) => {
      if (zoneId === level.startZone || zoneId === level.endZone) return;
      if (!selectedFlag) return;
      if (placedFlags.some((p) => p.zoneId === zoneId)) return;
      if (placedFlags.length >= level.maxFlags) return;

      setPlacedFlags((prev) => [...prev, { zoneId, flagId: selectedFlag }]);
      setSelectedFlag(null);
    },
    [level, selectedFlag, placedFlags]
  );

  const handleFlagSelect = useCallback((flagId: string) => {
    setSelectedFlag((prev) => (prev === flagId ? null : flagId));
  }, []);

  const removeFlagFromZone = useCallback((zoneId: string) => {
    setPlacedFlags((prev) => prev.filter((p) => p.zoneId !== zoneId));
  }, []);

  const simulateDelivery = useCallback(() => {
    setGameState('animating');

    let message = level.startMessage;
    const visitedZones = [
      level.startZone,
      ...placedFlags.map((p) => p.zoneId),
      level.endZone,
    ];
    const messages = [message];

    placedFlags.forEach((p) => {
      const flag = FLAG_TYPES.find((f) => f.id === p.flagId);
      if (flag) message = flag.operation(message);
      messages.push(message);
    });

    setAnimationMessages(messages);
    setPath(visitedZones);

    let currentIndex = 0;
    let startTime: number | null = null;
    const SEGMENT_DURATION = 1200;

    const animateStep = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / SEGMENT_DURATION, 1);

      setAnimationStep(currentIndex);

      if (progress < 1) {
        requestAnimationFrame(animateStep);
      } else {
        currentIndex++;
        if (currentIndex < visitedZones.length - 1) {
          startTime = null;
          requestAnimationFrame(animateStep);
        } else {
          setCurrentMessage(message);
          setGameState(message === level.targetMessage ? 'won' : 'failed');
        }
      }
    };

    requestAnimationFrame(animateStep);
  }, [level, placedFlags]);

  const resetLevel = useCallback(() => {
    setPlacedFlags([]);
    setSelectedFlag(null);
    setGameState('playing');
    setCurrentMessage(level.startMessage);
    setPath([level.startZone]);
    setAnimationStep(0);
  }, [level]);

  const nextLevel = useCallback(() => {
    if (currentLevel < LEVELS.length - 1) {
      setCurrentLevel((prev) => prev + 1);
      setPlacedFlags([]);
      setSelectedFlag(null);
      setGameState('playing');
      setAnimationStep(0);
    }
  }, [currentLevel]);

  return {
    level,
    currentLevel,
    placedFlags,
    selectedFlag,
    gameState,
    currentMessage,
    path,
    animationStep,
    animationMessages,
    totalLevels: LEVELS.length,
    handleZoneClick,
    handleFlagSelect,
    removeFlagFromZone,
    simulateDelivery,
    resetLevel,
    nextLevel,
  };
}