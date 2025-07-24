import React from 'react';
import { Tab } from './App';
import TabButton from './TabButton';
import { generatePDF } from './pdfGenerator';
import Furigana from './Furigana';

interface HeaderProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  return (
    <header 
      className="text-white p-4 rounded-lg"
      style={{
        background: 'linear-gradient(135deg, rgba(47, 79, 79, 0.1) 0%, rgba(72, 61, 139, 0.08) 50%, rgba(47, 79, 79, 0.1) 100%)',
        border: '6px solid rgba(47, 79, 79, 0.15)',
        boxShadow: `
          inset 4px 4px 0 rgba(255,255,255,0.05),
          inset -4px -4px 0 rgba(0,0,0,0.1),
          0 8px 20px rgba(0,0,0,0.1)
        `,
        backdropFilter: 'blur(4px)'
      }}
    >
      <div className="relative">
        {/* ロゴ - 絶対配置で左側に固定 */}
        <div className="absolute left-0 top-0 flex items-center h-full">
          <img 
            src="./ifロゴ.png" 
            alt="ifロゴ"
            className="w-16 h-16 sm:w-24 sm:h-24 rounded-lg"
            style={{
              border: '4px solid #FFD700',
              boxShadow: '0 4px 12px rgba(255, 215, 0, 0.3)'
            }}
          />
        </div>

        {/* タイトル - 完全中央配置 */}
        <div className="text-center py-4">
          <h1 
            className="text-xl sm:text-4xl md:text-5xl font-bold tracking-wider"
            style={{
              textShadow: '1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 0 0 6px #ffff00, 0 0 12px #ffff00',
              color: '#FFD700'
            }}
          >
            <Furigana>マイクラ</Furigana><br className="sm:hidden" /> <Furigana>コマンドの書</Furigana>
          </h1>
          <p className="mt-2 text-xs sm:text-base text-yellow-400 font-bold">
            <Furigana>キーボードとコマンドをマスターして、キミもマイクラ博士だ！</Furigana>
          </p>
        </div>
      </div>
      
      <nav className="mt-4 sm:mt-6 flex justify-center gap-2 sm:gap-4">
        <TabButton
          onClick={() => onTabChange(Tab.Keyboard)}
          isActive={activeTab === Tab.Keyboard}
        >
          <Furigana>キーボード</Furigana> (Keyboard)
        </TabButton>
        <TabButton
          onClick={() => onTabChange(Tab.Commands)}
          isActive={activeTab === Tab.Commands}
        >
          <Furigana>コマンド一覧</Furigana> (Commands)
        </TabButton>
        <TabButton
          onClick={() => onTabChange(Tab.Mining)}
          isActive={activeTab === Tab.Mining}
        >
          <Furigana>採掘</Furigana> (Mining)
        </TabButton>
        <TabButton
          onClick={() => {
            // 現在のキーボード画像URLを取得
            const keyboardImage = './キーボード画像.jpg';
            generatePDF(keyboardImage);
          }}
          isActive={false}
          isActionButton={true}
        >
          <Furigana>PDF出力</Furigana>
        </TabButton>
      </nav>
    </header>
  );
};

export default Header;