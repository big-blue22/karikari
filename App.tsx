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
            #7CB342 25%, #7CB342 45%,
            #8D6E63 45%, #8D6E63 65%,
            #616161 65%, #616161 85%,
            #424242 85%
          )`,
        backgroundAttachment: 'fixed',
        position: 'relative'
      }}
    >
      {/* 雲のレイヤー - 背景の青い部分のみ、パネルの後ろ */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '25%', // 青い空の部分に合わせて調整
          zIndex: 2, // パネルより前に表示してテスト
          pointerEvents: 'none',
          overflow: 'hidden'
        }}
      >
        {/* 雲1 - 見える位置に配置 */}
        <div
          style={{
            position: 'absolute',
            top: '20px', // 確実に見える位置
            left: '10%',
            animation: 'cloudMove1 50s linear infinite',
            filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))'
          }}
        >
          <div style={{
            position: 'relative',
            width: '140px',
            height: '70px'
          }}>
            <div style={{
              position: 'absolute',
              left: '15px',
              top: '25px',
              width: '70px',
              height: '50px',
              background: '#ffffff',
              border: '2px solid #e0e0e0'
            }} />
            <div style={{
              position: 'absolute',
              left: '50px',
              top: '10px',
              width: '80px',
              height: '60px',
              background: '#ffffff',
              border: '2px solid #e0e0e0'
            }} />
            <div style={{
              position: 'absolute',
              left: '90px',
              top: '30px',
              width: '60px',
              height: '45px',
              background: '#ffffff',
              border: '2px solid #e0e0e0'
            }} />
          </div>
        </div>

        {/* 雲2 - 見える位置に配置 */}
        <div
          style={{
            position: 'absolute',
            top: '40px', // 確実に見える位置
            left: '60%',
            animation: 'cloudMove2 40s linear infinite',
            filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))'
          }}
        >
          <div style={{
            position: 'relative',
            width: '110px',
            height: '60px'
          }}>
            <div style={{
              position: 'absolute',
              left: '10px',
              top: '20px',
              width: '60px',
              height: '45px',
              background: '#ffffff',
              border: '2px solid #e0e0e0'
            }} />
            <div style={{
              position: 'absolute',
              left: '40px',
              top: '5px',
              width: '70px',
              height: '55px',
              background: '#ffffff',
              border: '2px solid #e0e0e0'
            }} />
          </div>
        </div>

        {/* 雲3 - 見える位置に配置 */}
        <div
          style={{
            position: 'absolute',
            top: '10px', // 確実に見える位置
            left: '85%',
            animation: 'cloudMove3 35s linear infinite',
            filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))'
          }}
        >
          <div style={{
            position: 'relative',
            width: '90px',
            height: '50px'
          }}>
            <div style={{
              position: 'absolute',
              left: '10px',
              top: '15px',
              width: '50px',
              height: '35px',
              background: '#ffffff',
              border: '2px solid #e0e0e0'
            }} />
            <div style={{
              position: 'absolute',
              left: '35px',
              top: '5px',
              width: '55px',
              height: '40px',
              background: '#ffffff',
              border: '2px solid #e0e0e0'
            }} />
          </div>
        </div>
      </div>
      
      {/* より本格的な草ブロック格子模様 - マインクラフト風（青い空の部分を除く） */}
      <div 
        style={{
          position: 'fixed',
          top: '25%', // 青い空の部分（上部25%）を除外
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          background: `
            /* 32x32ピクセルの明確な草ブロック境界線 */
            repeating-linear-gradient(
              to right,
              transparent 0px,
              transparent 31px,
              #1B5E20 31px,
              #1B5E20 33px
            ),
            repeating-linear-gradient(
              to bottom,
              transparent 0px,
              transparent 31px,
              #1B5E20 31px,
              #1B5E20 33px
            ),
            /* 各ブロック内の立体的な影 */
            repeating-linear-gradient(
              to right,
              rgba(0, 0, 0, 0.1) 0px,
              rgba(0, 0, 0, 0.1) 2px,
              transparent 2px,
              transparent 30px,
              rgba(0, 0, 0, 0.1) 30px,
              rgba(0, 0, 0, 0.1) 32px
            ),
            repeating-linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0.1) 0px,
              rgba(0, 0, 0, 0.1) 2px,
              transparent 2px,
              transparent 30px,
              rgba(0, 0, 0, 0.1) 30px,
              rgba(0, 0, 0, 0.1) 32px
            ),
            /* 草のドット模様 */
            radial-gradient(circle at 8px 8px, #2E7D32 1px, transparent 1px),
            radial-gradient(circle at 24px 16px, #388E3C 1px, transparent 1px),
            radial-gradient(circle at 16px 24px, #43A047 1px, transparent 1px),
            radial-gradient(circle at 4px 20px, #4CAF50 1px, transparent 1px),
            radial-gradient(circle at 28px 4px, #66BB6A 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px, 32px 32px, 32px 32px, 32px 32px, 32px 32px, 32px 32px, 32px 32px, 32px 32px, 32px 32px',
          pointerEvents: 'none'
        }}
      />
      
      {/* 土・石ブロックテクスチャのレイヤー（青い空の部分を除く） */}
      <div 
        style={{
          position: 'fixed',
          top: '25%', // 青い空の部分（上部25%）を除外
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          background: `
            /* 土ブロックのテクスチャ */
            radial-gradient(circle at 25% 60%, rgba(139, 69, 19, 0.3) 3px, transparent 3px),
            radial-gradient(circle at 75% 40%, rgba(160, 82, 45, 0.25) 4px, transparent 4px),
            radial-gradient(circle at 50% 80%, rgba(101, 67, 33, 0.2) 2px, transparent 2px),
            /* 石ブロックのテクスチャ */
            radial-gradient(circle at 30% 30%, rgba(105, 105, 105, 0.4) 2px, transparent 2px),
            radial-gradient(circle at 70% 70%, rgba(169, 169, 169, 0.3) 3px, transparent 3px),
            radial-gradient(circle at 15% 85%, rgba(128, 128, 128, 0.25) 1px, transparent 1px),
            /* ブロック境界の影 */
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 30px,
              rgba(0, 0, 0, 0.1) 30px,
              rgba(0, 0, 0, 0.1) 32px,
              transparent 32px,
              transparent 34px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 30px,
              rgba(0, 0, 0, 0.1) 30px,
              rgba(0, 0, 0, 0.1) 32px,
              transparent 32px,
              transparent 34px
            )
          `,
          backgroundSize: '80px 80px, 120px 120px, 60px 60px, 40px 40px, 70px 70px, 30px 30px, 32px 32px, 32px 32px'
        }}
      />
      
      <div className="max-w-7xl mx-auto" style={{ position: 'relative', zIndex: 10 }}>
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
        @keyframes cloudMove1 {
          0% { transform: translateX(-160px); }
          100% { transform: translateX(calc(100vw + 160px)); }
        }
        @keyframes cloudMove2 {
          0% { transform: translateX(-130px); }
          100% { transform: translateX(calc(100vw + 130px)); }
        }
        @keyframes cloudMove3 {
          0% { transform: translateX(-100px); }
          100% { transform: translateX(calc(100vw + 100px)); }
        }
      `}</style>
    </div>
  );
};

export default App;