import React from 'react';
import { Tab } from '../App';
import TabButton from './TabButton';

interface HeaderProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  return (
    <header className="text-white p-4 rounded-lg bg-slate-900/70 border-2 border-orange-400/30 shadow-2xl shadow-orange-400/10 backdrop-blur-md">
      <div className="flex items-center gap-2 sm:gap-4">
        {/* ロゴ */}
        <div className="flex-shrink-0">
          <a href="https://picsum.photos/seed/minecraftlogo/600" target="_blank" rel="noopener noreferrer" aria-label="ロゴを拡大表示">
            <img 
              src="https://picsum.photos/seed/minecraftlogo/120" 
              alt="ロゴプレースホルダー"
              className="w-16 h-16 sm:w-24 sm:h-24 rounded-lg border-2 border-orange-500/70 shadow-lg shadow-orange-500/20 transition-transform duration-200 hover:scale-105"
            />
          </a>
        </div>

        <div className="text-center flex-grow">
          <h1 className="text-xl sm:text-4xl md:text-5xl font-bold tracking-wider text-shadow-glow">
            マイクラ<br className="sm:hidden" /> コマンドの書
          </h1>
          <p className="mt-2 text-xs sm:text-base text-orange-400">
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
        .text-shadow-glow {
          text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #f97316, 0 0 20px #f97316, 0 0 25px #f97316, 0 0 30px #f97316, 0 0 35px #f97316;
        }
      `}</style>
    </header>
  );
};

export default Header;