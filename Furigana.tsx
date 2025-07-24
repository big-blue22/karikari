import React from 'react';

// 小学校低学年が読めない可能性の高い漢字とその読み方のマッピング
const KANJI_TO_HIRAGANA: Record<string, string> = {
  // よく使われる難しい漢字
  '設定': 'せってい',
  '世界': 'せかい', 
  '時間': 'じかん',
  '天気': 'てんき',
  '移動': 'いどう',
  '座標': 'ざひょう',
  '確認': 'かくにん',
  '場所': 'ばしょ',
  '範囲': 'はんい',
  '指定': 'してい',
  '基準': 'きじゅん',
  '貼付': 'はりつけ',
  '切取': 'きりとり',
  '道具': 'どうぐ',
  '配列': 'はいれつ',
  '操作': 'そうさ',
  '基本': 'きほん',
  '覚': 'おぼ',
  '画像': 'がぞう',
  '拡大': 'かくだい',
  '表示': 'ひょうじ',
  '実際': 'じっさい',
  '差替': 'さしかえ',
  '一覧': 'いちらん',
  '神様': 'かみさま',
  '入力': 'にゅうりょく',
  '採掘': 'さいくつ',
  '遊方': 'あそびかた',
  '遊び方': 'あそびかた',
  '石炭': 'せきたん',
  '鉄鉱': 'てっこう',
  '金鉱': 'きんこう',
  '銅鉱': 'どうこう',
  '鉱石': 'こうせき',
  '宝箱': 'たからばこ',
  '発見': 'はっけん',
  '確率': 'かくりつ',
  '価値': 'かち',
  '経験': 'けいけん',
  '獲得': 'かくとく',
  '自動': 'じどう',
  '再生': 'さいせい',
  '効果': 'こうか',
  '保存': 'ほぞん',
  '特徴': 'とくちょう',
  '問題': 'もんだい',
  '正解': 'せいかい',
  '出題': 'しゅつだい',
  '選択': 'せんたく',
  '回答': 'かいとう',
  '結果': 'けっか',
  '博士': 'はかせ',
  'システム': 'システム',
  'エフェクト': 'エフェクト',
  'インベントリ': 'インベントリ',
  'レベルアップ': 'レベルアップ',
  'ブロック': 'ブロック',
  'クイズ': 'クイズ',
  '残念': 'ざんねん',
  '不正': 'ふせい',
  '肢': 'し',
};

// 個別の漢字も追加（単体でよく出現するもの）
const SINGLE_KANJI: Record<string, string> = {
  '朝': 'あさ',
  '晴': 'は',
  '石': 'いし', 
  '斧': 'おの',
  '変': 'か',
  '好': 'す',
  '立': 'た',
  '選': 'えら',
  '置': 'お',
  '部': 'ぶ',
  '貼': 'は',
  '切': 'き',
  '取': 'と',
  '先': 'せん',
  '生': 'せい',
  '種': 'しゅ',
  '類': 'るい',
  '低': 'てい',
  '高': 'たか',
  '完': 'かん',
  '了': 'りょう',
  '始': 'はじ',
  '終': 'お',
  '答': 'こた',
  '秒': 'びょう',
  '後': 'あと'
};

// すべてのマッピングを統合
const ALL_MAPPINGS = { ...KANJI_TO_HIRAGANA, ...SINGLE_KANJI };

interface FuriganaProps {
  children: string;
  className?: string;
}

const Furigana: React.FC<FuriganaProps> = ({ children, className }) => {
  // テキストを解析してrubyタグで囲む
  const processText = (text: string): React.ReactNode[] => {
    const result: React.ReactNode[] = [];
    let currentIndex = 0;
    
    // 長い熟語から順にチェック（より長いマッチを優先）
    const sortedKeys = Object.keys(ALL_MAPPINGS).sort((a, b) => b.length - a.length);
    
    while (currentIndex < text.length) {
      let matched = false;
      
      // マッピングされた漢字/熟語をチェック
      for (const kanji of sortedKeys) {
        if (text.substring(currentIndex, currentIndex + kanji.length) === kanji) {
          const hiragana = ALL_MAPPINGS[kanji];
          result.push(
            <ruby key={`${currentIndex}-${kanji}`}>
              {kanji}
              <rt style={{ fontSize: '0.5em', color: '#ffeb3b' }}>{hiragana}</rt>
            </ruby>
          );
          currentIndex += kanji.length;
          matched = true;
          break;
        }
      }
      
      if (!matched) {
        // マッチしなかった文字はそのまま追加
        const char = text[currentIndex];
        // 連続する非漢字文字をまとめる
        let nonKanjiText = char;
        currentIndex++;
        
        while (currentIndex < text.length) {
          const nextChar = text[currentIndex];
          // 次の文字がマッピングされた漢字の開始でない場合は続ける
          const isStartOfMappedKanji = sortedKeys.some(kanji => 
            text.substring(currentIndex, currentIndex + kanji.length) === kanji
          );
          
          if (isStartOfMappedKanji) {
            break;
          }
          
          nonKanjiText += nextChar;
          currentIndex++;
        }
        
        result.push(nonKanjiText);
      }
    }
    
    return result;
  };

  return (
    <span className={className}>
      {processText(children)}
    </span>
  );
};

export default Furigana;