import React from 'react';
import { Castle, Flag } from 'lucide-react';
import { ZONES } from '../data/zones';
import { FLAG_TYPES } from '../data/flags';
import type { PlacedFlag, GameState, LevelConfig } from '../types';

interface MapViewProps {
  level: LevelConfig;
  placedFlags: PlacedFlag[];
  path: string[];
  animationStep: number;
  animationMessages: string[];
  currentMessage: string;
  gameState: GameState;
  onZoneClick: (zoneId: string) => void;
  onRemoveFlag: (zoneId: string) => void;
}

const MapView: React.FC<MapViewProps> = ({
  level,
  placedFlags,
  path,
  animationStep,
  animationMessages,
  currentMessage,
  gameState,
  onZoneClick,
  onRemoveFlag,
}) => {
  return (
    <div
      className="relative rounded-xl border-4 border-amber-900 overflow-hidden"
      style={{
        height: '600px',
        backgroundColor: '#f4e4c1',
        backgroundImage: `
          repeating-linear-gradient(0deg, rgba(0,0,0,.05) 0px, transparent 1px, transparent 2px, rgba(0,0,0,.05) 3px),
          repeating-linear-gradient(90deg, rgba(0,0,0,.05) 0px, transparent 1px, transparent 2px, rgba(0,0,0,.05) 3px)
        `,
        backgroundSize: '3px 3px',
        boxShadow: 'inset 0 0 50px rgba(139,69,19,0.1)',
      }}
    >
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {path.length > 1 &&
          path.map((zoneId, idx) => {
            if (idx === path.length - 1) return null;
            const z1 = ZONES.find((z) => z.id === zoneId);
            const z2 = ZONES.find((z) => z.id === path[idx + 1]);
            if (!z1 || !z2) return null;
            return (
              <g key={`path-${zoneId}-${idx}`}>
                <line x1={z1.x} y1={z1.y} x2={z2.x} y2={z2.y} stroke="#8b4513" strokeWidth="4" strokeDasharray="8,4" opacity="0.5" />
                <line x1={z1.x} y1={z1.y} x2={z2.x} y2={z2.y} stroke="#ffd700" strokeWidth="2" strokeDasharray="8,4" />
              </g>
            );
          })}

        {ZONES.map((zone) => {
          const hasFlag = placedFlags.some((p) => p.zoneId === zone.id);
          const isStart = zone.id === level.startZone;
          const isEnd = zone.id === level.endZone;

          let fillColor = '#d4af37';
          const strokeColor = '#8b4513';
          let opacity = 0.55;

          if (isStart) { fillColor = '#92400e'; opacity = 0.7; }
          else if (isEnd) { fillColor = '#166534'; opacity = 0.7; }
          else if (hasFlag) { fillColor = '#ffd700'; opacity = 0.85; }

          return (
            <g key={zone.id}>
              <path
                d={zone.path}
                fill={fillColor}
                stroke={strokeColor}
                strokeWidth={hasFlag ? 3 : 2}
                opacity={opacity}
                style={{
                  cursor: isStart || isEnd ? 'default' : 'pointer',
                  transition: 'all 0.25s ease',
                  filter: hasFlag ? 'drop-shadow(0 0 6px rgba(255,215,0,0.6))' : 'drop-shadow(1px 2px 2px rgba(0,0,0,0.2))',
                }}
                onClick={() => onZoneClick(zone.id)}
              />
              <text
                x={zone.x}
                y={zone.y - 14}
                textAnchor="middle"
                style={{ fontSize: '11px', fontWeight: 700, fill: '#3b1f0a', fontFamily: 'Cinzel, serif', pointerEvents: 'none', letterSpacing: '0.03em' }}
              >
                {zone.name}
              </text>
            </g>
          );
        })}
      </svg>

      {ZONES.map((zone) => {
        const isStart = zone.id === level.startZone;
        const isEnd = zone.id === level.endZone;
        const placed = placedFlags.find((p) => p.zoneId === zone.id);
        const flagDef = placed ? FLAG_TYPES.find((f) => f.id === placed.flagId) : null;
        const zoneIndex = path.indexOf(zone.id);
        const isActive = gameState === 'animating' && zoneIndex === animationStep;

        return (
          <div
            key={`marker-${zone.id}`}
            className="absolute"
            style={{ left: zone.x, top: zone.y, transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}
          >
            {isStart && (
              <div className="flex flex-col items-center" style={{ pointerEvents: 'none' }}>
                <Castle className="w-9 h-9 drop-shadow-lg" style={{ color: '#92400e' }} strokeWidth={2} />
                <span className="mt-1 px-2 py-0.5 rounded text-xs font-bold tracking-wider" style={{ background: '#92400e', color: '#fef3c7', fontFamily: 'Cinzel, serif' }}>
                  START
                </span>
              </div>
            )}
            {isEnd && (
              <div className="flex flex-col items-center" style={{ pointerEvents: 'none' }}>
                <Castle className="w-9 h-9 drop-shadow-lg" style={{ color: '#166534' }} strokeWidth={2} />
                <span className="mt-1 px-2 py-0.5 rounded text-xs font-bold tracking-wider" style={{ background: '#166534', color: '#d1fae5', fontFamily: 'Cinzel, serif' }}>
                  TARGET
                </span>
              </div>
            )}
            {!isStart && !isEnd && flagDef && (
              <div
                className="flex flex-col items-center"
                style={{ cursor: 'pointer', pointerEvents: 'auto', transition: 'transform 0.15s ease' }}
                onClick={(e) => { e.stopPropagation(); onRemoveFlag(zone.id); }}
                title="Click to remove flag"
              >
                <div style={{ animation: isActive ? 'pulseZone 0.8s infinite' : 'none' }}>
                  <Flag className="w-7 h-7 drop-shadow-md" style={{ color: flagDef.color }} fill={flagDef.color} strokeWidth={1.5} />
                </div>
                <span className="mt-0.5 px-2 py-0.5 rounded text-xs font-bold shadow border" style={{ background: flagDef.color, color: '#fff', borderColor: 'rgba(0,0,0,0.2)', fontFamily: 'Cinzel, serif', fontSize: '10px' }}>
                  {flagDef.symbol}
                </span>
              </div>
            )}
            {isActive && (
              <div className="absolute flex flex-col items-center" style={{ bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: 6 }}>
                <div className="px-3 py-2 rounded-lg font-mono font-bold text-sm shadow-xl border-2" style={{ background: '#1e3a5f', color: '#93c5fd', borderColor: '#2563eb', whiteSpace: 'nowrap', animation: 'fadeInUp 0.3s ease' }}>
                  {animationMessages[zoneIndex] ?? currentMessage}
                </div>
                <div style={{ width: 0, height: 0, borderLeft: '7px solid transparent', borderRight: '7px solid transparent', borderTop: '7px solid #1e3a5f' }} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MapView;