import { Command } from './types';

export const COMMAND_CATEGORIES = {
  MOVEMENT: '移動のコマンド (いどうのコマンド)',
  WORLD: 'ワールド設定 (ワールドせってい)',
  WORLD_EDIT: 'World Edit コマンド',
};

export const MINECRAFT_COMMANDS: Command[] = [
  {
    category: COMMAND_CATEGORIES.WORLD,
    command: '/time set 0',
    description: '時間を朝に変えるコマンド。',
  },
  {
    category: COMMAND_CATEGORIES.WORLD,
    command: '/weather clear',
    description: '天気を晴れにするコマンド。',
  },
  {
    category: COMMAND_CATEGORIES.MOVEMENT,
    command: '/tp @p 0 0 0',
    description: 'テレポートするコマンド。F3キーで座標を確認して、好きな場所にワープ！',
  },
  {
    category: COMMAND_CATEGORIES.WORLD_EDIT,
    command: '//wand',
    description: 'World Editの道具（木の斧）を出すコマンド。',
  },
  {
    category: COMMAND_CATEGORIES.WORLD_EDIT,
    command: '//set stone',
    description: '選んだ範囲に指定したブロックを置くコマンド。「stone」の部分を変えてみよう。',
  },
  {
    category: COMMAND_CATEGORIES.WORLD_EDIT,
    command: '//copy',
    description: '選んだ範囲をコピーするコマンド。立った場所がコピーの基準点になる。',
  },
  {
    category: COMMAND_CATEGORIES.WORLD_EDIT,
    command: '//cut',
    description: '選んだ範囲をカット（切り取り）するコマンド。',
  },
  {
    category: COMMAND_CATEGORIES.WORLD_EDIT,
    command: '//paste',
    description: 'コピーやカットしたものを貼り付ける（ペースト）コマンド。',
  },
];

// 採掘システムの定数
export const MINING_CONFIG = {
  MINING_TIME: 2000, // 採掘にかかる時間（ミリ秒）
  REGENERATION_TIME: 5000, // 石の再生時間（ミリ秒）
  BLOCK_SIZE: 32, // ブロックのサイズ（ピクセル）
  STONE_AREA_TOP: 62.5, // 石エリアの開始位置（vh）
  STONE_AREA_HEIGHT: 18.75, // 石エリアの高さ（vh）
};

export const ORE_TYPES = [
  {
    name: '石炭',
    rarity: 0.15,
    color: '#2C2C2C',
    effect: '💎',
    value: 1,
  },
  {
    name: '鉄鉱石',
    rarity: 0.08,
    color: '#D2B48C',
    effect: '⚒️',
    value: 3,
  },
  {
    name: '金鉱石',
    rarity: 0.05,
    color: '#FFD700',
    effect: '✨',
    value: 5,
  },
  {
    name: 'ダイヤモンド',
    rarity: 0.02,
    color: '#00BFFF',
    effect: '💎',
    value: 10,
  },
  {
    name: 'エメラルド',
    rarity: 0.01,
    color: '#50C878',
    effect: '🟢',
    value: 15,
  },
];

// 経験値システムの定数
export const EXPERIENCE_CONFIG = {
  BASE_XP_PER_LEVEL: 100, // レベル1に必要な基本XP
  XP_GROWTH_RATE: 1.5, // レベルごとのXP増加率
  MAX_LEVEL: 50, // 最大レベル
  XP_NOTIFICATION_DURATION: 2000, // XP獲得通知の表示時間（ミリ秒）
  LEVEL_UP_POPUP_DURATION: 5000, // レベルアップポップアップの自動閉じ時間（ミリ秒）
};
