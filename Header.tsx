import React from 'react';
import { Tab } from './App';
import TabButton from './TabButton';
import PdfPrintButton from './PdfPrintButton';

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
      {/* PDF Print Button - positioned at the top right */}
      <div className="flex justify-end mb-4">
        <PdfPrintButton className="z-10" />
      </div>

      <div className="relative">
        {/* ロゴ - 絶対配置で左側に固定 */}
        <div className="absolute left-0 top-0 flex items-center h-full">
          <img 
            src="https://picsum.photos/seed/minecraftlogo/120" 
            alt="ロゴプレースホルダー"
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
            マイクラ<br className="sm:hidden" /> コマンドの書
          </h1>
          <p className="mt-2 text-xs sm:text-base text-yellow-400 font-bold">
            キーボードとコマンドをマスターして、キミもマイクラ博士だ！
          </p>
        </div>
      </div>
      
      <nav className="mt-4 sm:mt-6 flex justify-center gap-2 sm:gap-4">
        <TabButton
          onClick={() => onTabChange(Tab.Keyboard)}
          isActive={activeTab === Tab.Keyboard}
        >
          キーボード (Keyboard)
        </TabButton>
        <TabButton
          onClick={() => onTabChange(Tab.Commands)}
          isActive={activeTab === Tab.Commands}
        >
          コマンド一覧 (Commands)
        </TabButton>
        <TabButton
          onClick={() => onTabChange(Tab.Mining)}
          isActive={activeTab === Tab.Mining}
        >
          採掘 (Mining)
        </TabButton>
      </nav>
    </header>
  );
};

export default Header;