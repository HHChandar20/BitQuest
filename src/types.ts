export interface Zone {
  id: string;
  name: string;
  x: number;
  y: number;
  path: string;
}

export interface FlagType {
  id: string;
  name: string;
  color: string;
  operation: (msg: string) => string;
  symbol: string;
  description: string;
}

export interface LevelConfig {
  level: number;
  startZone: string;
  endZone: string;
  startMessage: string;
  targetMessage: string;
  availableFlags: string[];
  maxFlags: number;
}

export interface PlacedFlag {
  zoneId: string;
  flagId: string;
}

export type GameState = 'playing' | 'won' | 'failed' | 'animating';