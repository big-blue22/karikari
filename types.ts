export interface Command {
  category: string;
  command: string;
  description: string;
}

// 採掘システム用のタイプ定義
export interface MiningArea {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isRegenerated: boolean;
  lastMined: number | null;
}

export interface OreType {
  name: string;
  rarity: number; // 0-1の確率
  color: string;
  effect: string;
  value: number;
}

export interface MiningEffect {
  id: string;
  x: number;
  y: number;
  type: 'ore' | 'stone';
  ore?: OreType;
  timestamp: number;
}

export interface MiningState {
  isMinning: boolean;
  progress: number;
  targetArea: MiningArea | null;
  startTime: number | null;
}

export interface ExperienceState {
  currentXP: number;
  level: number;
  maxXP: number;
}

export interface LevelUpPopup {
  isVisible: boolean;
  newLevel: number;
  timestamp: number;
}
