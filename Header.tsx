import React from 'react';
import { Tab } from './App';
import TabButton from './TabButton';

interface HeaderProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  return (
    <header 
      className="text-white p-4 rounded-lg"
      style={{
        background: 'linear-gradient(135deg, rgba(47, 79, 79, 0.95) 0%, rgba(72, 61, 139, 0.9) 50%, rgba(47, 79, 79, 0.95) 100%)',
        border: '6px solid #2F4F4F',
        boxShadow: `
          inset 4px 4px 0 rgba(255,255,255,0.3),
          inset -4px -4px 0 rgba(0,0,0,0.5),
          0 12px 32px rgba(0,0,0,0.7)
        `,
        backdropFilter: 'blur(10px)'
      }}
    >
      <div className="flex items-center gap-2 sm:gap-4 relative">
        {/* ロゴ - 左側に固定 */}
        <div className="flex-shrink-0">
          <a href="https://picsum.photos/seed/minecraftlogo/600" target="_blank" rel="noopener noreferrer" aria-label="ロゴを拡大表示">
            <img 
              src="https://picsum.photos/seed/minecraftlogo/120" 
              alt="ロゴプレースホルダー"
              className="w-16 h-16 sm:w-24 sm:h-24 rounded-lg transition-transform duration-200 hover:scale-105"
              style={{
                border: '4px solid #FFD700',
                boxShadow: '0 4px 12px rgba(255, 215, 0, 0.3)'
              }}
            />
          </a>
        </div>

        {/* タイトル - 画面の完全な中央に配置 */}
        <div 
          className="absolute left-1/2 transform -translate-x-1/2 text-center"
          style={{ width: 'calc(100% - 8rem)' }} // ロゴ分のスペースを考慮
        >
          <h1 
            className="text-xl sm:text-4xl md:text-5xl font-bold tracking-wider"
            style={{
              textShadow: '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 0 0 8px #ffff00, 0 0 16px #ffff00',
              color: '#FFD700'
            }}
          >
            マイクラ<br className="sm:hidden" /> コマンドの書
          </h1>
          <p className="mt-2 text-xs sm:text-base text-yellow-400 font-bold">
            キーボードとコマンドをマスターして、キミもマイクラ博士だ！
          </p>
        </div>

        {/* 右側のスペーサー（バランス調整用） */}
        <div className="flex-shrink-0 w-16 sm:w-24"></div>
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
      </nav>
    </header>
  );
};

export default Header;