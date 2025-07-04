
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
