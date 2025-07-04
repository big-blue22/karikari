import React, { useState, useCallback } from 'react';
import Header from './Header';
import KeyboardLayout from './KeyboardLayout';
import { CommandList } from './CommandList';
import { MINECRAFT_COMMANDS, COMMAND_CATEGORIES } from './constants';

export enum Tab {
  Keyboard = 'keyboard',
  Commands = 'commands',
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Keyboard);

  const handleTabChange = useCallback((tab: Tab) => {
    setActiveTab(tab);
  }, []);

  return (
    <div 
      className="min-h-screen p-4 sm:p-8"
      style={{
        background: `
          linear-gradient(to bottom, 
            #87CEEB 0%, #87CEEB 25%,
            #90EE90 25%, #90EE90 45%,
            #8B7355 45%, #8B7355 65%,
            #696969 65%, #696969 85%,
            #2F2F2F 85%
          )`,
        backgroundAttachment: 'fixed',
        position: 'relative'
      }}
    >
      {/* 雲のレイヤー */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -2,
          background: `
            radial-gradient(ellipse at 20% 15%, rgba(255,255,255,0.9) 30px, rgba(255,255,255,0.5) 50px, transparent 70px),
            radial-gradient(ellipse at 80% 10%, rgba(255,255,255,0.8) 40px, rgba(255,255,255,0.4) 60px, transparent 80px),
            radial-gradient(ellipse at 40% 20%, rgba(255,255,255,0.7) 25px, rgba(255,255,255,0.3) 45px, transparent 65px)
          `,
          animation: 'cloudMove 30s linear infinite'
        }}
      />
      
      {/* 草ブロックパターンのレイヤー */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -3,
          background: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 16px,
              rgba(34, 139, 34, 0.3) 16px,
              rgba(34, 139, 34, 0.3) 32px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 16px,
              rgba(34, 139, 34, 0.3) 16px,
              rgba(34, 139, 34, 0.3) 32px
            )
          `,
          backgroundSize: '32px 32px, 32px 32px'
        }}
      />
      
      {/* 太陽のレイヤー */}
      <div 
        style={{
          position: 'fixed',
          top: '10%',
          right: '15%',
          width: '80px',
          height: '80px',
          background: 'radial-gradient(circle, #FFD700 0%, #FFA500 50%, transparent 70%)',
          borderRadius: '50%',
          zIndex: -1,
          boxShadow: '0 0 50px rgba(255, 215, 0, 0.5)'
        }}
      />
      
      <div className="max-w-7xl mx-auto">
        <Header activeTab={activeTab} onTabChange={handleTabChange} />
        
        <main 
          className="mt-6 p-4 sm:p-6 md:p-8 rounded-lg"
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
          {activeTab === Tab.Keyboard && <KeyboardLayout />}
          {activeTab === Tab.Commands && <CommandList commands={MINECRAFT_COMMANDS} categories={COMMAND_CATEGORIES} />}
        </main>
        
        <footer className="text-center mt-8 text-white drop-shadow-lg">
          <p className="text-lg font-bold bg-black/50 inline-block px-4 py-2 rounded-lg border-2 border-yellow-400/50">
            &copy; 2024 マイクラ. たのしくあそんで、たくさん学ぼう！
          </p>
        </footer>
      </div>
      
      <style>{`
        @keyframes cloudMove {
          0% { transform: translateX(0); }
          100% { transform: translateX(100px); }
        }
      `}</style>
    </div>
  );
};

export default App;