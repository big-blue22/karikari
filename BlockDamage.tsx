import React, { useState, useEffect, useRef } from 'react';

interface BlockDamage {
  x: number;
  y: number;
  damage: number; // 0-100
  id: string;
}

interface DestroyedBlock {
  x: number;
  y: number;
  id: string;
}

interface BlockDamageSystemProps {
  children: React.ReactNode;
}

const BlockDamageSystem: React.FC<BlockDamageSystemProps> = ({ children }) => {
  const [damages, setDamages] = useState<BlockDamage[]>([]);
  const [destroyedBlocks, setDestroyedBlocks] = useState<DestroyedBlock[]>([]);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [hoveredBlock, setHoveredBlock] = useState<{x: number, y: number} | null>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const damageTimerRef = useRef<NodeJS.Timeout | null>(null);
  const currentDamageRef = useRef<string | null>(null);

  // ブロックサイズ（32pxのグリッド）
  const BLOCK_SIZE = 32;
  const DAMAGE_SPEED = 2; // ダメージ増加速度（毎フレーム）

  // 座標をブロックグリッドに変換（ピクセル完璧同期）
  const getBlockCoords = (x: number, y: number) => {
    // CanvasGridと同じピクセル完璧オフセット計算
    const pixelPerfectOffsetX = (windowSize.width % BLOCK_SIZE) / 2;
    
    // X軸オフセット調整
    const adjustedX = x - pixelPerfectOffsetX;
    
    // Y軸は草地開始（25vh）から計算
    const grassStart = (25 / 100) * windowSize.height;
    const grassStartOffset = grassStart % BLOCK_SIZE;
    const adjustedY = y - (grassStart - grassStartOffset);
    
    return {
      blockX: Math.floor(adjustedX / BLOCK_SIZE),
      blockY: Math.floor(adjustedY / BLOCK_SIZE)
    };
  };

  // ブロック描画位置を計算（ピクセル完璧同期）
  const getBlockPosition = (blockX: number, blockY: number) => {
    const pixelPerfectOffsetX = (windowSize.width % BLOCK_SIZE) / 2;
    const grassStart = (25 / 100) * windowSize.height;
    const grassStartOffset = grassStart % BLOCK_SIZE;
    
    return {
      x: blockX * BLOCK_SIZE + pixelPerfectOffsetX,
      y: blockY * BLOCK_SIZE + (grassStart - grassStartOffset)
    };
  };

  // ブロックIDを生成
  const getBlockId = (blockX: number, blockY: number) => {
    return `${blockX}-${blockY}`;
  };

  // 画面上の座標が石の領域かどうかチェック
  const isStoneArea = (y: number) => {
    const stoneStart = windowSize.height * 0.625; // 62.5%から石の領域
    const stoneEnd = windowSize.height * 0.8125;   // 81.25%まで石の領域
    return y >= stoneStart && y <= stoneEnd;
  };

  // ダメージ処理
  const processDamage = () => {
    const { x, y } = mousePositionRef.current;
    
    // 石の領域でない場合は何もしない
    if (!isStoneArea(y)) {
      return;
    }

    const { blockX, blockY } = getBlockCoords(x, y);
    const blockId = getBlockId(blockX, blockY);

    // 既に破壊されたブロックかチェック
    const isAlreadyDestroyed = destroyedBlocks.some(block => block.id === blockId);
    if (isAlreadyDestroyed) {
      return; // 既に破壊されたブロックは再度破壊できない
    }

    setDamages(prev => {
      const existing = prev.find(d => d.id === blockId);
      
      if (existing) {
        // 既存のダメージを増加
        if (existing.damage >= 100) {
          // ブロックが破壊された - 破壊済みリストに追加
          const position = getBlockPosition(blockX, blockY);
          const newDestroyedBlock: DestroyedBlock = {
            x: position.x,
            y: position.y,
            id: blockId
          };
          
          setDestroyedBlocks(prevDestroyed => [...prevDestroyed, newDestroyedBlock]);
          currentDamageRef.current = null;
          return prev.filter(d => d.id !== blockId);
        } else {
          return prev.map(d => 
            d.id === blockId 
              ? { ...d, damage: Math.min(100, d.damage + DAMAGE_SPEED) }
              : d
          );
        }
      } else {
        // 新しいダメージを作成
        currentDamageRef.current = blockId;
        const position = getBlockPosition(blockX, blockY);
        return [...prev, {
          x: position.x,
          y: position.y,
          damage: DAMAGE_SPEED,
          id: blockId
        }];
      }
    });
  };

  // マウスイベントハンドラー
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsMouseDown(true);
    mousePositionRef.current = { x: e.clientX, y: e.clientY };
    
    // ダメージタイマー開始
    damageTimerRef.current = setInterval(processDamage, 50); // 20FPS
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    currentDamageRef.current = null;
    
    if (damageTimerRef.current) {
      clearInterval(damageTimerRef.current);
      damageTimerRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    handleMouseUp();
    setHoveredBlock(null);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    mousePositionRef.current = { x: e.clientX, y: e.clientY };
    
    // 石の領域でのみホバーブロックを更新
    if (isStoneArea(e.clientY)) {
      const { blockX, blockY } = getBlockCoords(e.clientX, e.clientY);
      const position = getBlockPosition(blockX, blockY);
      setHoveredBlock({ x: position.x, y: position.y });
    } else {
      setHoveredBlock(null);
    }
  };

  // クリーンアップ
  useEffect(() => {
    return () => {
      if (damageTimerRef.current) {
        clearInterval(damageTimerRef.current);
      }
    };
  }, []);

  // ウィンドウサイズの変更を監視
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 未使用ダメージのクリーンアップ（5秒後）
  useEffect(() => {
    const cleanup = setInterval(() => {
      setDamages(prev => 
        prev.filter(d => d.damage > 0 && (Date.now() - 5000) < Date.now())
      );
    }, 1000);

    return () => clearInterval(cleanup);
  }, []);

  // ダメージエフェクトのレンダリング
  const renderDamageEffect = (damage: BlockDamage) => {
    const opacity = damage.damage / 100;
    const crackStage = Math.floor((damage.damage / 100) * 9); // 0-9のクラック段階

    return (
      <div
        key={damage.id}
        style={{
          position: 'fixed',
          left: damage.x,
          top: damage.y,
          width: BLOCK_SIZE,
          height: BLOCK_SIZE,
          pointerEvents: 'none',
          zIndex: 1000,
          background: `
            radial-gradient(circle, 
              rgba(0,0,0,${opacity * 0.3}) 0%, 
              transparent 70%
            ),
            repeating-linear-gradient(
              ${45 + crackStage * 10}deg,
              rgba(139, 69, 19, ${opacity * 0.8}) 0px,
              rgba(139, 69, 19, ${opacity * 0.8}) 1px,
              transparent 1px,
              transparent ${2 + crackStage}px
            ),
            repeating-linear-gradient(
              ${-45 - crackStage * 10}deg,
              rgba(101, 67, 33, ${opacity * 0.6}) 0px,
              rgba(101, 67, 33, ${opacity * 0.6}) 1px,
              transparent 1px,
              transparent ${2 + crackStage}px
            )
          `,
          backgroundBlendMode: 'multiply',
          border: damage.damage > 50 ? `1px dashed rgba(139, 69, 19, ${opacity})` : 'none',
          transition: 'all 0.1s ease-out'
        }}
      />
    );
  };

  // 破壊されたブロックのレンダリング（黒いブロック）
  const renderDestroyedBlock = (block: DestroyedBlock) => {
    return (
      <div
        key={`destroyed-${block.id}`}
        style={{
          position: 'fixed',
          left: block.x,
          top: block.y,
          width: BLOCK_SIZE,
          height: BLOCK_SIZE,
          pointerEvents: 'none',
          zIndex: 999, // ダメージエフェクトより下に表示
          background: `
            linear-gradient(135deg, 
              #1a1a1a 0%, 
              #0d0d0d 25%, 
              #000000 50%, 
              #0d0d0d 75%, 
              #1a1a1a 100%
            ),
            repeating-linear-gradient(
              45deg,
              rgba(51, 51, 51, 0.3) 0px,
              rgba(51, 51, 51, 0.3) 2px,
              transparent 2px,
              transparent 6px
            ),
            repeating-linear-gradient(
              -45deg,
              rgba(68, 68, 68, 0.2) 0px,
              rgba(68, 68, 68, 0.2) 1px,
              transparent 1px,
              transparent 4px
            )
          `,
          border: '2px solid #2d2d2d',
          boxShadow: `
            inset 2px 2px 4px rgba(255,255,255,0.1),
            inset -2px -2px 4px rgba(0,0,0,0.8),
            0 0 8px rgba(0,0,0,0.5)
          `,
          transition: 'all 0.3s ease-out'
        }}
      />
    );
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ width: '100%', height: '100%', position: 'relative' }}
    >
      {children}
      
      {/* 破壊されたブロックレンダリング（黒いブロック） */}
      {destroyedBlocks.map(renderDestroyedBlock)}
      
      {/* 高精度ホバーしているブロックの境界表示 */}
      {hoveredBlock && !isMouseDown && (
        <div
          style={{
            position: 'fixed',
            left: hoveredBlock.x,
            top: hoveredBlock.y,
            width: BLOCK_SIZE,
            height: BLOCK_SIZE,
            pointerEvents: 'none',
            zIndex: 1001,
            border: '3px solid rgba(255, 255, 0, 0.9)',
            backgroundColor: 'rgba(255, 255, 0, 0.2)',
            boxSizing: 'border-box',
            transition: 'none' // アニメーションを完全に無効化
          }}
        />
      )}
      
      {/* ダメージエフェクトレンダリング */}
      {damages.map(renderDamageEffect)}
      
      {/* カーソルエフェクト（石の領域でのみ表示） */}
      {isMouseDown && isStoneArea(mousePositionRef.current.y) && (
        <div
          style={{
            position: 'fixed',
            left: mousePositionRef.current.x - 16,
            top: mousePositionRef.current.y - 16,
            width: 32,
            height: 32,
            pointerEvents: 'none',
            zIndex: 1001,
            background: 'rgba(139, 69, 19, 0.5)',
            border: '2px solid rgba(139, 69, 19, 0.8)',
            animation: 'mining 0.5s ease-in-out infinite alternate'
          }}
        />
      )}
      
      <style>{`
        @keyframes mining {
          0% { transform: scale(1) rotate(0deg); opacity: 0.7; }
          100% { transform: scale(1.1) rotate(5deg); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default BlockDamageSystem;
