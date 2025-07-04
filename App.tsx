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
            #616161 65%, #616161 98%,
            #424242 98%
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
      
      {/* 本格的なMinecraft風草ブロック格子模様 */}
      <div 
        style={{
          position: 'fixed',
          top: '25%', // 青い空の部分（上部25%）を除外
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          background: `
            /* Minecraftスタイルの立体的なブロック境界線 */
            repeating-linear-gradient(
              to right,
              transparent 0px,
              transparent 15px,
              rgba(255, 255, 255, 0.3) 15px, /* 上部ハイライト */
              rgba(255, 255, 255, 0.3) 16px,
              rgba(76, 114, 79, 0.6) 16px, /* より落ち着いたメインの境界線 */
              rgba(76, 114, 79, 0.6) 17px,
              rgba(0, 0, 0, 0.25) 17px, /* 下部シャドウ */
              rgba(0, 0, 0, 0.25) 18px,
              transparent 18px,
              transparent 32px
            ),
            repeating-linear-gradient(
              to bottom,
              transparent 0px,
              transparent 15px,
              rgba(255, 255, 255, 0.3) 15px, /* 左部ハイライト */
              rgba(255, 255, 255, 0.3) 16px,
              rgba(76, 114, 79, 0.6) 16px, /* より落ち着いたメインの境界線 */
              rgba(76, 114, 79, 0.6) 17px,
              rgba(0, 0, 0, 0.25) 17px, /* 右部シャドウ */
              rgba(0, 0, 0, 0.25) 18px,
              transparent 18px,
              transparent 32px
            ),
            /* 各ブロック内の草テクスチャパターン */
            repeating-linear-gradient(
              45deg,
              transparent 0px,
              transparent 2px,
              rgba(88, 129, 87, 0.2) 2px,
              rgba(88, 129, 87, 0.2) 3px,
              transparent 3px,
              transparent 6px,
              rgba(102, 141, 96, 0.18) 6px,
              rgba(102, 141, 96, 0.18) 7px,
              transparent 7px,
              transparent 10px
            ),
            repeating-linear-gradient(
              -45deg,
              transparent 0px,
              transparent 3px,
              rgba(118, 155, 108, 0.15) 3px,
              rgba(118, 155, 108, 0.15) 4px,
              transparent 4px,
              transparent 8px,
              rgba(104, 145, 100, 0.12) 8px,
              rgba(104, 145, 100, 0.12) 9px,
              transparent 9px,
              transparent 12px
            ),
            /* Minecraft風のピクセル状草ドット（より自然な色） */
            radial-gradient(circle at 4px 4px, rgba(94, 135, 89, 0.8) 1px, transparent 1px),
            radial-gradient(circle at 12px 8px, rgba(108, 147, 101, 0.7) 0.8px, transparent 0.8px),
            radial-gradient(circle at 20px 12px, rgba(122, 159, 116, 0.8) 1px, transparent 1px),
            radial-gradient(circle at 8px 16px, rgba(86, 131, 85, 0.7) 0.8px, transparent 0.8px),
            radial-gradient(circle at 24px 20px, rgba(100, 143, 97, 0.8) 1px, transparent 1px),
            radial-gradient(circle at 16px 24px, rgba(114, 151, 109, 0.7) 0.8px, transparent 0.8px),
            radial-gradient(circle at 28px 28px, rgba(92, 137, 91, 0.8) 1px, transparent 1px),
            /* ブロック内の細かいノイズテクスチャ */
            repeating-linear-gradient(
              0deg,
              rgba(70, 108, 74, 0.08) 0px,
              rgba(70, 108, 74, 0.08) 1px,
              transparent 1px,
              transparent 4px
            ),
            repeating-linear-gradient(
              90deg,
              rgba(82, 120, 86, 0.06) 0px,
              rgba(82, 120, 86, 0.06) 1px,
              transparent 1px,
              transparent 3px
            )
          `,
          backgroundSize: '32px 32px, 32px 32px, 10px 10px, 12px 12px, 32px 32px, 32px 32px, 32px 32px, 32px 32px, 32px 32px, 32px 32px, 32px 32px, 4px 4px, 3px 3px',
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
            /* 本格的なMinecraft風土ブロックテクスチャ */
            radial-gradient(circle at 20% 30%, rgba(139, 69, 19, 0.6) 2px, transparent 2px),
            radial-gradient(circle at 80% 20%, rgba(160, 82, 45, 0.5) 1.5px, transparent 1.5px),
            radial-gradient(circle at 40% 70%, rgba(101, 67, 33, 0.4) 1px, transparent 1px),
            radial-gradient(circle at 70% 60%, rgba(139, 69, 19, 0.3) 0.8px, transparent 0.8px),
            radial-gradient(circle at 10% 80%, rgba(160, 82, 45, 0.35) 1.2px, transparent 1.2px),
            radial-gradient(circle at 90% 90%, rgba(101, 67, 33, 0.25) 0.5px, transparent 0.5px),
            
            /* 本格的なMinecraft風石ブロックテクスチャ */
            radial-gradient(circle at 25% 25%, rgba(105, 105, 105, 0.7) 1.8px, transparent 1.8px),
            radial-gradient(circle at 75% 75%, rgba(169, 169, 169, 0.6) 2.2px, transparent 2.2px),
            radial-gradient(circle at 50% 10%, rgba(128, 128, 128, 0.4) 1px, transparent 1px),
            radial-gradient(circle at 15% 60%, rgba(105, 105, 105, 0.3) 0.8px, transparent 0.8px),
            radial-gradient(circle at 85% 40%, rgba(169, 169, 169, 0.35) 1.5px, transparent 1.5px),
            radial-gradient(circle at 60% 85%, rgba(128, 128, 128, 0.25) 0.6px, transparent 0.6px),
            
            /* Minecraft風のピクセル状境界線 */
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 15px,
              rgba(255, 255, 255, 0.2) 15px, /* ハイライト */
              rgba(255, 255, 255, 0.2) 16px,
              rgba(0, 0, 0, 0.4) 16px, /* メイン境界線 */
              rgba(0, 0, 0, 0.4) 17px,
              rgba(0, 0, 0, 0.6) 17px, /* シャドウ */
              rgba(0, 0, 0, 0.6) 18px,
              transparent 18px,
              transparent 32px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 15px,
              rgba(255, 255, 255, 0.2) 15px, /* ハイライト */
              rgba(255, 255, 255, 0.2) 16px,
              rgba(0, 0, 0, 0.4) 16px, /* メイン境界線 */
              rgba(0, 0, 0, 0.4) 17px,
              rgba(0, 0, 0, 0.6) 17px, /* シャドウ */
              rgba(0, 0, 0, 0.6) 18px,
              transparent 18px,
              transparent 32px
            ),
            
            /* ブロック内のMinecraft風ノイズパターン */
            repeating-linear-gradient(
              45deg,
              rgba(0, 0, 0, 0.05) 0px,
              rgba(0, 0, 0, 0.05) 1px,
              transparent 1px,
              transparent 3px
            ),
            repeating-linear-gradient(
              -45deg,
              rgba(255, 255, 255, 0.03) 0px,
              rgba(255, 255, 255, 0.03) 1px,
              transparent 1px,
              transparent 4px
            )
          `,
          backgroundSize: '64px 64px, 48px 48px, 32px 32px, 56px 56px, 40px 40px, 24px 24px, 72px 72px, 60px 60px, 36px 36px, 44px 44px, 52px 52px, 28px 28px, 32px 32px, 32px 32px, 3px 3px, 4px 4px'
        }}
      />
      
      {/* 16x16ピクセルの細かいMinecraft風グリッド */}
      <div 
        style={{
          position: 'fixed',
          top: '25%',
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0.5,
          background: `
            /* 16x16ピクセルの細かいグリッド（Minecraftのピクセル表現） */
            repeating-linear-gradient(
              to right,
              transparent 0px,
              transparent 15px,
              rgba(0, 0, 0, 0.05) 15px,
              rgba(0, 0, 0, 0.05) 16px
            ),
            repeating-linear-gradient(
              to bottom,
              transparent 0px,
              transparent 15px,
              rgba(0, 0, 0, 0.05) 15px,
              rgba(0, 0, 0, 0.05) 16px
            )
          `,
          backgroundSize: '16px 16px, 16px 16px',
          pointerEvents: 'none'
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