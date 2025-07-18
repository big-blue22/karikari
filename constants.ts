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
    name: 'エメラルド',
    rarity: 0.01, // 1%
    color: '#50C878',
    effect: '🟢',
    value: 100,
  },
  {
    name: 'ダイヤモンド',
    rarity: 0.04, // 3% (cumulative: 1% + 3% = 4%)
    color: '#00BFFF',
    effect: '💎',
    value: 50,
  },
  {
    name: 'ラピスラズリ',
    rarity: 0.09, // 5% (cumulative: 4% + 5% = 9%)
    color: '#4169E1',
    effect: '🔷',
    value: 25,
  },
  {
    name: '金鉱石',
    rarity: 0.14, // 5% (cumulative: 9% + 5% = 14%)
    color: '#FFD700',
    effect: '✨',
    value: 20,
  },
  {
    name: 'レッドストーン',
    rarity: 0.22, // 8% (cumulative: 14% + 8% = 22%)
    color: '#DC143C',
    effect: '🔴',
    value: 15,
  },
  {
    name: '鉄鉱石',
    rarity: 0.34, // 12% (cumulative: 22% + 12% = 34%)
    color: '#D2B48C',
    effect: '⚒️',
    value: 10,
  },
  {
    name: '石炭',
    rarity: 0.49, // 15% (cumulative: 34% + 15% = 49%)
    color: '#2C2C2C',
    effect: '⚫',
    value: 8,
  },
  {
    name: '銅鉱石',
    rarity: 0.64, // 15% (cumulative: 49% + 15% = 64%)
    color: '#B87333',
    effect: '🟤',
    value: 5,
  },
  {
    name: '石',
    rarity: 0.90, // 26% (cumulative: 64% + 26% = 90%)
    color: '#696969',
    effect: '🗿',
    value: 1,
  },
  {
    name: '宝箱',
    rarity: 1.00, // 10% (cumulative: 90% + 10% = 100%)
    color: '#DAA520',
    effect: '📦',
    value: 0, // Special case - XP depends on quiz result
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

// クイズ問題一覧（コマンド一覧から）
export const QUIZ_QUESTIONS = [
  {
    question: "時間を朝に変えるコマンドは？",
    options: ["/time set 0", "/weather clear", "/tp @p 0 0 0", "//wand"],
    correctAnswer: 0,
    command: "/time set 0"
  },
  {
    question: "天気を晴れにするコマンドは？",
    options: ["/time set 0", "/weather clear", "//copy", "//paste"],
    correctAnswer: 1,
    command: "/weather clear"
  },
  {
    question: "テレポートするコマンドは？",
    options: ["//set stone", "/tp @p 0 0 0", "/weather clear", "//cut"],
    correctAnswer: 1,
    command: "/tp @p 0 0 0"
  },
  {
    question: "World Editの道具を出すコマンドは？",
    options: ["//wand", "//copy", "//paste", "//set stone"],
    correctAnswer: 0,
    command: "//wand"
  },
  {
    question: "選んだ範囲に石を置くコマンドは？",
    options: ["//copy", "//paste", "//set stone", "//cut"],
    correctAnswer: 2,
    command: "//set stone"
  },
  {
    question: "選んだ範囲をコピーするコマンドは？",
    options: ["//copy", "//paste", "//cut", "//wand"],
    correctAnswer: 0,
    command: "//copy"
  },
  {
    question: "コピーしたものを貼り付けるコマンドは？",
    options: ["//cut", "//copy", "//paste", "//set stone"],
    correctAnswer: 2,
    command: "//paste"
  },
  {
    question: "選んだ範囲をカット（切り取り）するコマンドは？",
    options: ["//copy", "//cut", "//paste", "//wand"],
    correctAnswer: 1,
    command: "//cut"
  }
];
