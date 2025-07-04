import React, { useEffect, useRef, useState } from 'react';

interface CanvasGridProps {
  blockSize: number;
  stoneAreaStart: number; // vh
  stoneAreaHeight: number; // vh
}

const CanvasGrid: React.FC<CanvasGridProps> = ({ blockSize, stoneAreaStart, stoneAreaHeight }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  // ウィンドウリサイズ監視
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // グリッド描画
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // キャンバスサイズを設定
    canvas.width = windowSize.width;
    canvas.height = windowSize.height;

    // 石の領域を計算（64%から84%）
    const stoneStart = (stoneAreaStart / 100) * windowSize.height;
    const stoneEnd = stoneStart + (stoneAreaHeight / 100) * windowSize.height;

    // キャンバスをクリア
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 背景CSSグリッドとの完全同期のためのオフセット計算
    // 1vh = windowSize.height / 100
    // 64vh = stoneStart
    // グリッドは32pxの境界で開始するように調整
    const pixelPerfectOffsetX = (windowSize.width % blockSize) / 2;
    const pixelPerfectOffsetY = stoneStart % blockSize;

    // 石の領域のみにグリッドを描画
    ctx.strokeStyle = 'rgba(105, 105, 105, 0.6)';
    ctx.lineWidth = 2;

    // 垂直線を描画
    for (let x = pixelPerfectOffsetX; x <= canvas.width; x += blockSize) {
      ctx.beginPath();
      ctx.moveTo(x, stoneStart);
      ctx.lineTo(x, stoneEnd);
      ctx.stroke();
    }

    // 水平線を描画（石の領域開始位置から）
    for (let y = stoneStart - pixelPerfectOffsetY; y <= stoneEnd; y += blockSize) {
      if (y >= stoneStart) { // 石の領域内のみ
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    }

    // 石のテクスチャを追加
    ctx.strokeStyle = 'rgba(169, 169, 169, 0.3)';
    ctx.lineWidth = 1;

    for (let x = pixelPerfectOffsetX; x <= canvas.width; x += blockSize / 2) {
      for (let y = stoneStart - pixelPerfectOffsetY; y <= stoneEnd; y += blockSize / 2) {
        if (y >= stoneStart && (x / (blockSize / 2) + y / (blockSize / 2)) % 2 === 0) {
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + blockSize / 4, y + blockSize / 4);
          ctx.stroke();
        }
      }
    }

  }, [windowSize, blockSize, stoneAreaStart, stoneAreaHeight]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none'
      }}
    />
  );
};

export default CanvasGrid;
