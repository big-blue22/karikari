import React, { useState, useCallback } from 'react';
import Header from './Header';
import KeyboardLayout from './KeyboardLayout';
import { CommandList } from './CommandList';
import MiningSystem from './MiningSystem';
import { MINECRAFT_COMMANDS, COMMAND_CATEGORIES } from './constants';
import Furigana from './Furigana';

export enum Tab {
  Keyboard = 'keyboard',
  Commands = 'commands',
  Mining = 'mining',
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
      {/* 草ブロックレイヤー */}
      <div className="grass-layer" style={{
        position: 'fixed',
        top: '25vh',
        left: 0,
        right: 0,
        height: '18.75vh',
        zIndex: -3,
        backgroundImage: `
          repeating-linear-gradient(
            0deg,
            rgba(34, 139, 34, 0.7) 0px,
            rgba(34, 139, 34, 0.7) 2px,
            transparent 2px,
            transparent 32px
          ),
          repeating-linear-gradient(
            90deg,
            rgba(34, 139, 34, 0.7) 0px,
            rgba(34, 139, 34, 0.7) 2px,
            transparent 2px,
            transparent 32px
          )`,
        backgroundSize: '32px 32px, 32px 32px'
      }} />
      
      {/* 土ブロックレイヤー */}
      <div className="dirt-layer" style={{
        position: 'fixed',
        top: '43.75vh',
        left: 0,
        right: 0,
        height: '18.75vh',
        zIndex: -4,
        backgroundImage: `
          repeating-linear-gradient(
            0deg,
            rgba(139, 115, 85, 0.8) 0px,
            rgba(139, 115, 85, 0.8) 2px,
            transparent 2px,
            transparent 32px
          ),
          repeating-linear-gradient(
            90deg,
            rgba(139, 115, 85, 0.8) 0px,
            rgba(139, 115, 85, 0.8) 2px,
            transparent 2px,
            transparent 32px
          ),
          repeating-linear-gradient(
            60deg,
            rgba(160, 82, 45, 0.3),
            rgba(160, 82, 45, 0.3) 1px,
            transparent 1px,
            transparent 8px
          )`,
        backgroundSize: '32px 32px, 32px 32px, 16px 16px'
      }} />
      
      {/* 石ブロックレイヤー */}
      <div className="stone-layer" style={{
        position: 'fixed',
        top: '62.5vh',
        left: 0,
        right: 0,
        height: '18.75vh',
        zIndex: -5,
        backgroundImage: `
          repeating-linear-gradient(
            0deg,
            rgba(105, 105, 105, 0.9) 0px,
            rgba(105, 105, 105, 0.9) 2px,
            transparent 2px,
            transparent 32px
          ),
          repeating-linear-gradient(
            90deg,
            rgba(105, 105, 105, 0.9) 0px,
            rgba(105, 105, 105, 0.9) 2px,
            transparent 2px,
            transparent 32px
          ),
          repeating-linear-gradient(
            45deg,
            rgba(169, 169, 169, 0.5),
            rgba(169, 169, 169, 0.5) 1px,
            transparent 1px,
            transparent 8px
          )`,
        backgroundSize: '32px 32px, 32px 32px, 16px 16px'
      }} />
      
      {/* 深い石ブロックレイヤー */}
      <div className="deep-stone-layer" style={{
        position: 'fixed',
        top: '81.25vh',
        left: 0,
        right: 0,
        height: '18.75vh',
        zIndex: -6,
        backgroundImage: `
          repeating-linear-gradient(
            0deg,
            rgba(47, 47, 47, 0.9) 0px,
            rgba(47, 47, 47, 0.9) 2px,
            transparent 2px,
            transparent 32px
          ),
          repeating-linear-gradient(
            90deg,
            rgba(47, 47, 47, 0.9) 0px,
            rgba(47, 47, 47, 0.9) 2px,
            transparent 2px,
            transparent 32px
          ),
          repeating-linear-gradient(
            135deg,
            rgba(85, 85, 85, 0.4),
            rgba(85, 85, 85, 0.4) 1px,
            transparent 1px,
            transparent 6px
          )`,
        backgroundSize: '32px 32px, 32px 32px, 12px 12px'
      }} />
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
      
      {/* 地上の動物たち - 緑の草ブロック部分に配置 */}
      <div 
        style={{
          position: 'fixed',
          top: '25%',
          left: 0,
          right: 0,
          height: '20%', // 草ブロック部分
          zIndex: 3,
          pointerEvents: 'none',
          overflow: 'hidden'
        }}
      >
        {/* 牛 - 左側 */}
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '8%',
            animation: 'animalWalk1 60s linear infinite',
            filter: 'drop-shadow(3px 3px 6px rgba(0,0,0,0.4))'
          }}
        >
          <div style={{ position: 'relative', width: '48px', height: '32px' }}>
            {/* 牛の体 */}
            <div style={{
              position: 'absolute',
              left: '8px',
              bottom: '8px',
              width: '32px',
              height: '16px',
              background: 'linear-gradient(45deg, #FFFFFF 0%, #F5F5F5 50%, #E8E8E8 100%)',
              border: '2px solid #000000',
              borderRadius: '2px'
            }} />
            {/* 牛の頭 */}
            <div style={{
              position: 'absolute',
              left: '32px',
              bottom: '12px',
              width: '16px',
              height: '16px',
              background: 'linear-gradient(45deg, #FFFFFF 0%, #F0F0F0 50%, #E0E0E0 100%)',
              border: '2px solid #000000',
              borderRadius: '2px'
            }} />
            {/* 牛の脚 */}
            <div style={{
              position: 'absolute',
              left: '12px',
              bottom: '0px',
              width: '4px',
              height: '8px',
              background: '#8B4513',
              border: '1px solid #000000'
            }} />
            <div style={{
              position: 'absolute',
              left: '20px',
              bottom: '0px',
              width: '4px',
              height: '8px',
              background: '#8B4513',
              border: '1px solid #000000'
            }} />
            <div style={{
              position: 'absolute',
              left: '28px',
              bottom: '0px',
              width: '4px',
              height: '8px',
              background: '#8B4513',
              border: '1px solid #000000'
            }} />
            <div style={{
              position: 'absolute',
              left: '36px',
              bottom: '0px',
              width: '4px',
              height: '8px',
              background: '#8B4513',
              border: '1px solid #000000'
            }} />
            {/* 牛の模様 */}
            <div style={{
              position: 'absolute',
              left: '15px',
              bottom: '15px',
              width: '8px',
              height: '6px',
              background: '#000000',
              borderRadius: '50%'
            }} />
            <div style={{
              position: 'absolute',
              left: '25px',
              bottom: '18px',
              width: '6px',
              height: '4px',
              background: '#000000',
              borderRadius: '50%'
            }} />
          </div>
        </div>

        {/* 豚 - 中央左 */}
        <div
          style={{
            position: 'absolute',
            bottom: '15px',
            left: '25%',
            animation: 'animalWalk2 45s linear infinite',
            filter: 'drop-shadow(3px 3px 6px rgba(0,0,0,0.4))'
          }}
        >
          <div style={{ position: 'relative', width: '40px', height: '28px' }}>
            {/* 豚の体 */}
            <div style={{
              position: 'absolute',
              left: '6px',
              bottom: '8px',
              width: '28px',
              height: '14px',
              background: 'linear-gradient(45deg, #FFB6C1 0%, #FFA0B4 50%, #FF8FA3 100%)',
              border: '2px solid #000000',
              borderRadius: '2px'
            }} />
            {/* 豚の頭 */}
            <div style={{
              position: 'absolute',
              left: '28px',
              bottom: '10px',
              width: '12px',
              height: '12px',
              background: 'linear-gradient(45deg, #FFB6C1 0%, #FFA0B4 50%, #FF8FA3 100%)',
              border: '2px solid #000000',
              borderRadius: '2px'
            }} />
            {/* 豚の脚 */}
            <div style={{
              position: 'absolute',
              left: '10px',
              bottom: '0px',
              width: '4px',
              height: '8px',
              background: '#FFB6C1',
              border: '1px solid #000000'
            }} />
            <div style={{
              position: 'absolute',
              left: '18px',
              bottom: '0px',
              width: '4px',
              height: '8px',
              background: '#FFB6C1',
              border: '1px solid #000000'
            }} />
            <div style={{
              position: 'absolute',
              left: '26px',
              bottom: '0px',
              width: '4px',
              height: '8px',
              background: '#FFB6C1',
              border: '1px solid #000000'
            }} />
            <div style={{
              position: 'absolute',
              left: '32px',
              bottom: '0px',
              width: '4px',
              height: '8px',
              background: '#FFB6C1',
              border: '1px solid #000000'
            }} />
            {/* 豚の鼻 */}
            <div style={{
              position: 'absolute',
              left: '36px',
              bottom: '13px',
              width: '4px',
              height: '3px',
              background: '#8B4513',
              border: '1px solid #000000'
            }} />
          </div>
        </div>

        {/* 羊 - 中央右 */}
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '55%',
            animation: 'animalWalk3 55s linear infinite',
            filter: 'drop-shadow(3px 3px 6px rgba(0,0,0,0.4))'
          }}
        >
          <div style={{ position: 'relative', width: '44px', height: '30px' }}>
            {/* 羊の毛（体） */}
            <div style={{
              position: 'absolute',
              left: '8px',
              bottom: '8px',
              width: '28px',
              height: '16px',
              background: 'linear-gradient(45deg, #FFFAF0 0%, #F8F8FF 50%, #F0F8FF 100%)',
              border: '2px solid #000000',
              borderRadius: '4px'
            }} />
            {/* 羊の頭 */}
            <div style={{
              position: 'absolute',
              left: '30px',
              bottom: '12px',
              width: '14px',
              height: '14px',
              background: 'linear-gradient(45deg, #000000 0%, #333333 50%, #1a1a1a 100%)',
              border: '2px solid #000000',
              borderRadius: '2px'
            }} />
            {/* 羊の脚 */}
            <div style={{
              position: 'absolute',
              left: '12px',
              bottom: '0px',
              width: '4px',
              height: '8px',
              background: '#000000',
              border: '1px solid #333333'
            }} />
            <div style={{
              position: 'absolute',
              left: '20px',
              bottom: '0px',
              width: '4px',
              height: '8px',
              background: '#000000',
              border: '1px solid #333333'
            }} />
            <div style={{
              position: 'absolute',
              left: '28px',
              bottom: '0px',
              width: '4px',
              height: '8px',
              background: '#000000',
              border: '1px solid #333333'
            }} />
            <div style={{
              position: 'absolute',
              left: '36px',
              bottom: '0px',
              width: '4px',
              height: '8px',
              background: '#000000',
              border: '1px solid #333333'
            }} />
            {/* 羊の毛のテクスチャ */}
            <div style={{
              position: 'absolute',
              left: '12px',
              bottom: '18px',
              width: '4px',
              height: '4px',
              background: '#E6E6FA',
              borderRadius: '50%'
            }} />
            <div style={{
              position: 'absolute',
              left: '20px',
              bottom: '20px',
              width: '4px',
              height: '4px',
              background: '#E6E6FA',
              borderRadius: '50%'
            }} />
            <div style={{
              position: 'absolute',
              left: '28px',
              bottom: '18px',
              width: '4px',
              height: '4px',
              background: '#E6E6FA',
              borderRadius: '50%'
            }} />
          </div>
        </div>

        {/* 鶏 - 右側 */}
        <div
          style={{
            position: 'absolute',
            bottom: '18px',
            left: '78%',
            animation: 'animalWalk4 35s linear infinite',
            filter: 'drop-shadow(3px 3px 6px rgba(0,0,0,0.4))'
          }}
        >
          <div style={{ position: 'relative', width: '24px', height: '28px' }}>
            {/* 鶏の体 */}
            <div style={{
              position: 'absolute',
              left: '4px',
              bottom: '8px',
              width: '16px',
              height: '12px',
              background: 'linear-gradient(45deg, #FFFFFF 0%, #F5F5DC 50%, #F0E68C 100%)',
              border: '2px solid #000000',
              borderRadius: '2px'
            }} />
            {/* 鶏の頭 */}
            <div style={{
              position: 'absolute',
              left: '6px',
              bottom: '16px',
              width: '12px',
              height: '10px',
              background: 'linear-gradient(45deg, #FFFFFF 0%, #F5F5DC 50%, #F0E68C 100%)',
              border: '2px solid #000000',
              borderRadius: '2px'
            }} />
            {/* 鶏の脚 */}
            <div style={{
              position: 'absolute',
              left: '8px',
              bottom: '0px',
              width: '3px',
              height: '8px',
              background: '#FFD700',
              border: '1px solid #000000'
            }} />
            <div style={{
              position: 'absolute',
              left: '13px',
              bottom: '0px',
              width: '3px',
              height: '8px',
              background: '#FFD700',
              border: '1px solid #000000'
            }} />
            {/* 鶏のくちばし */}
            <div style={{
              position: 'absolute',
              left: '16px',
              bottom: '19px',
              width: '4px',
              height: '2px',
              background: '#FFA500',
              border: '1px solid #000000'
            }} />
            {/* 鶏のとさか */}
            <div style={{
              position: 'absolute',
              left: '9px',
              bottom: '24px',
              width: '6px',
              height: '4px',
              background: '#DC143C',
              border: '1px solid #000000',
              borderRadius: '2px 2px 0 0'
            }} />
            {/* 鶏の翼 */}
            <div style={{
              position: 'absolute',
              left: '2px',
              bottom: '12px',
              width: '8px',
              height: '6px',
              background: 'linear-gradient(45deg, #F5F5DC 0%, #DDD 100%)',
              border: '1px solid #000000',
              borderRadius: '4px 0 0 2px'
            }} />
          </div>
        </div>

        {/* 追加の小さな動物 - うさぎ */}
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '40%',
            animation: 'animalHop 25s linear infinite',
            filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.4))'
          }}
        >
          <div style={{ position: 'relative', width: '20px', height: '24px' }}>
            {/* うさぎの体 */}
            <div style={{
              position: 'absolute',
              left: '4px',
              bottom: '6px',
              width: '12px',
              height: '8px',
              background: 'linear-gradient(45deg, #F5DEB3 0%, #DEB887 50%, #D2B48C 100%)',
              border: '2px solid #000000',
              borderRadius: '2px'
            }} />
            {/* うさぎの頭 */}
            <div style={{
              position: 'absolute',
              left: '6px',
              bottom: '12px',
              width: '8px',
              height: '8px',
              background: 'linear-gradient(45deg, #F5DEB3 0%, #DEB887 50%, #D2B48C 100%)',
              border: '2px solid #000000',
              borderRadius: '2px'
            }} />
            {/* うさぎの耳 */}
            <div style={{
              position: 'absolute',
              left: '7px',
              bottom: '18px',
              width: '2px',
              height: '6px',
              background: '#F5DEB3',
              border: '1px solid #000000',
              borderRadius: '1px 1px 0 0'
            }} />
            <div style={{
              position: 'absolute',
              left: '11px',
              bottom: '18px',
              width: '2px',
              height: '6px',
              background: '#F5DEB3',
              border: '1px solid #000000',
              borderRadius: '1px 1px 0 0'
            }} />
            {/* うさぎの脚 */}
            <div style={{
              position: 'absolute',
              left: '6px',
              bottom: '0px',
              width: '3px',
              height: '6px',
              background: '#F5DEB3',
              border: '1px solid #000000'
            }} />
            <div style={{
              position: 'absolute',
              left: '11px',
              bottom: '0px',
              width: '3px',
              height: '6px',
              background: '#F5DEB3',
              border: '1px solid #000000'
            }} />
          </div>
        </div>
      </div>
      

      
      {/* 土・石ブロックテクスチャのレイヤー（草の部分も除く） */}
      <div 
        style={{
          position: 'fixed',
          top: '43.75vh', // 草の部分（25%から43.75%）も除外し、土の部分から開始
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
            radial-gradient(circle at 60% 85%, rgba(128, 128, 128, 0.25) 0.6px, transparent 0.6px)
          `,
          backgroundSize: '64px 64px, 48px 48px, 32px 32px, 56px 56px, 40px 40px, 24px 24px, 72px 72px, 60px 60px, 36px 36px, 44px 44px, 52px 52px, 28px 28px'
        }}
      />
      

      
      <div className="max-w-7xl mx-auto" style={{ position: 'relative', zIndex: 10 }}>
        <Header activeTab={activeTab} onTabChange={handleTabChange} />
        
        <main 
          className="mt-12 p-4 sm:p-6 md:p-8 rounded-lg"
          style={{
            background: 'linear-gradient(135deg, rgba(47, 79, 79, 0.3) 0%, rgba(72, 61, 139, 0.25) 50%, rgba(47, 79, 79, 0.3) 100%)',
            border: '6px solid rgba(47, 79, 79, 0.4)',
            boxShadow: `
              inset 4px 4px 0 rgba(255,255,255,0.15),
              inset -4px -4px 0 rgba(0,0,0,0.25),
              0 12px 32px rgba(0,0,0,0.3)
            `,
            backdropFilter: 'blur(8px)'
          }}
        >
          {activeTab === Tab.Keyboard && <KeyboardLayout />}
          {activeTab === Tab.Commands && <CommandList commands={MINECRAFT_COMMANDS} categories={COMMAND_CATEGORIES} />}
          {activeTab === Tab.Mining && (
            <div className="text-center p-8 text-white">
              {/* ヒント吹き出し - マイニングタイトルの直上に表示 */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: '8px'
                }}
              >
                <div
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.95), rgba(255, 165, 0, 0.9))',
                    border: '3px solid #FFD700',
                    borderRadius: '16px',
                    padding: '12px 20px',
                    color: '#8B4513',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.3)',
                    animation: 'tooltipBounce 2s ease-in-out infinite',
                    position: 'relative',
                    maxWidth: '300px',
                    textShadow: '1px 1px 2px rgba(139, 69, 19, 0.3)'
                  }}
                >
                  💡 レベル3で特別メッセージ！隠された秘密を発見しよう ✨
                  {/* 吹き出しの三角形 */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '-12px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 0,
                      height: 0,
                      borderLeft: '12px solid transparent',
                      borderRight: '12px solid transparent',
                      borderTop: '12px solid #FFD700'
                    }}
                  />
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-6" style={{ 
                color: '#FFD700',
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
              }}>
                ⛏️ <Furigana>マインクラフト風採掘システム</Furigana> ⛏️
              </h2>
              <div className="max-w-2xl mx-auto space-y-4">
                <div className="bg-black/50 p-4 rounded-lg border-2 border-gray-500">
                  <h3 className="text-xl font-bold mb-2 text-yellow-300">🎯 <Furigana>遊び方</Furigana></h3>
                  <p className="mb-2"><Furigana>ねずみ色の石エリア（画面下部）を</Furigana><strong className="text-red-300"><Furigana>左クリック長押</Furigana></strong><Furigana>で採掘できます！</Furigana></p>
                  <p className="text-sm text-blue-300"><Furigana>左クリックを長押しすると採掘が始まり、掘り終わると石が再生します。</Furigana></p>
                </div>
                
                <div className="bg-black/50 p-4 rounded-lg border-2 border-gray-500">
                  <h3 className="text-xl font-bold mb-2 text-yellow-300">💎 <Furigana>鉱石の種類</Furigana></h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                    <div>🟢 <Furigana>エメラルド</Furigana> (1%) - 100XP</div>
                    <div>💎 <Furigana>ダイヤモンド</Furigana> (3%) - 50XP</div>
                    <div>🔷 <Furigana>ラピスラズリ</Furigana> (5%) - 25XP</div>
                    <div>✨ <Furigana>金鉱石</Furigana> (5%) - 20XP</div>
                    <div>🔴 <Furigana>レッドストーン</Furigana> (8%) - 15XP</div>
                    <div>⚒️ <Furigana>鉄鉱石</Furigana> (12%) - 10XP</div>
                    <div>⚫ <Furigana>石炭</Furigana> (15%) - 8XP</div>
                    <div>🟤 <Furigana>銅鉱石</Furigana> (15%) - 5XP</div>
                    <div>🗿 <Furigana>石</Furigana> (26%) - 1XP</div>
                    <div>📦 <Furigana>宝箱</Furigana> (10%) - <Furigana>クイズ</Furigana>100XP</div>
                  </div>
                </div>
                
                <div className="bg-black/50 p-4 rounded-lg border-2 border-gray-500">
                  <h3 className="text-xl font-bold mb-2 text-yellow-300">★<Furigana>このゲームの目標</Furigana></h3>
                  <ul className="text-sm space-y-1 text-left">
                    <li>• <Furigana>たくさん採掘して、経験値をためよう!</Furigana></li>
                    <li><Furigana>経験値がいっぱいになるとレベルアップ!</Furigana></li>
                    <li>• <Furigana>そして... レベル5に到達した者だけが読める、秘密のメッセージが隠されているぞ!</Furigana></li>
                  </ul>
                </div>
                
                <div className="bg-purple-900/50 p-3 rounded-lg border-2 border-purple-400 relative">
                  <div className="absolute -top-2 left-4 bg-purple-400 text-purple-900 px-2 py-1 rounded text-xs font-bold">
                    💡 ヒント
                  </div>
                  <p className="text-sm text-purple-200 mt-2">
                    <Furigana>特定のレベルに到達すると、特別なおめでとうメッセージが表示されます！隠された秘密を見つけよう...</Furigana> ✨
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>
        
        <footer className="text-center mt-8 text-white drop-shadow-lg">
          <p className="text-lg font-bold bg-black/50 inline-block px-4 py-2 rounded-lg border-2 border-yellow-400/50">
2025 <Furigana>マイクラ</Furigana>. <Furigana>たのしくあそんで、たくさん学ぼう！</Furigana>
          </p>
        </footer>
      </div>
      
      {/* 採掘システム - 採掘タブが選択されたときのみ有効 */}
      {activeTab === Tab.Mining && <MiningSystem />}
      
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
        
        @keyframes animalWalk1 {
          0% { transform: translateX(-60px); }
          100% { transform: translateX(calc(100vw + 60px)); }
        }
        @keyframes animalWalk2 {
          0% { transform: translateX(-50px); }
          100% { transform: translateX(calc(100vw + 50px)); }
        }
        @keyframes animalWalk3 {
          0% { transform: translateX(-55px); }
          100% { transform: translateX(calc(100vw + 55px)); }
        }
        @keyframes animalWalk4 {
          0% { transform: translateX(-30px); }
          100% { transform: translateX(calc(100vw + 30px)); }
        }
        @keyframes animalHop {
          0% { transform: translateX(-25px) translateY(0px); }
          25% { transform: translateX(25vw) translateY(-5px); }
          50% { transform: translateX(50vw) translateY(0px); }
          75% { transform: translateX(75vw) translateY(-3px); }
          100% { transform: translateX(calc(100vw + 25px)) translateY(0px); }
        }
        
        @keyframes tooltipBounce {
          0%, 100% { 
            transform: translateY(0px) scale(1);
          }
          50% { 
            transform: translateY(-5px) scale(1.02);
          }
        }
      `}</style>
    </div>
  );
};

export default App;