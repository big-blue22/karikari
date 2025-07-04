import React from 'react';
import { Tab } from './App';
import TabButton from './TabButton';

interface HeaderProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  return (
    <header className="text-white p-4 rounded-lg minecraft-panel">
      <div className="flex items-center gap-2 sm:gap-4">
        {/* ロゴ */}
        <div className="flex-shrink-0">
          <a href="https://picsum.photos/seed/minecraftlogo/600" target="_blank" rel="noopener noreferrer" aria-label="ロゴを拡大表示">
            <img 
              src="https://picsum.photos/seed/minecraftlogo/120" 
              alt="ロゴプレースホルダー"
              className="w-16 h-16 sm:w-24 sm:h-24 rounded-lg border-4 border-yellow-500/70 shadow-lg shadow-yellow-500/20 transition-transform duration-200 hover:scale-105"
            />
          </a>
        </div>

        <div className="text-center flex-grow">
          <h1 className="text-xl sm:text-4xl md:text-5xl font-bold tracking-wider text-shadow-minecraft">
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
      </nav>
      <style>{`
        .text-shadow-minecraft {
          text-shadow: 2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 
                       0 0 8px #ffff00, 0 0 16px #ffff00, 0 0 24px #ff6600;
        }
      `}</style>
    </header>
  );
};

export default Header;