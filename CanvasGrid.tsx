import React, { useEffect, useRef, useState } from 'react';

interface CanvasGridProps {
  blockSize: number;
}

const CanvasGrid: React.FC<CanvasGridProps> = ({ blockSize }) => {
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

    // 各地形領域を計算
    const grassStart = 0.25 * windowSize.height;  // 25%から草地
    const soilStart = 0.4375 * windowSize.height; // 43.75%から土
    const stoneStart = 0.625 * windowSize.height; // 62.5%から石
    const stoneEnd = 0.8125 * windowSize.height;  // 81.25%まで石

    // キャンバスをクリア
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // ピクセル完璧なオフセット計算
    const pixelPerfectOffsetX = (windowSize.width % blockSize) / 2;
    
    // 草地の開始位置（25vh）を基準にY軸オフセットを計算
    const grassStartOffset = grassStart % blockSize;

    // 垂直線を描画（全地形領域に）
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.lineWidth = 1;

    for (let x = pixelPerfectOffsetX; x <= canvas.width; x += blockSize) {
      ctx.beginPath();
      ctx.moveTo(x, grassStart);
      ctx.lineTo(x, stoneEnd);
      ctx.stroke();
    }

    // 水平線を描画（草地から石まで、32pxグリッドで）
    for (let y = grassStart - grassStartOffset; y <= stoneEnd; y += blockSize) {
      if (y >= grassStart) { // 草地領域開始位置以降のみ
        // 草地領域
        if (y >= grassStart && y < soilStart) {
          ctx.strokeStyle = 'rgba(34, 139, 34, 0.6)'; // 草色
          ctx.lineWidth = 1;
        }
        // 土領域  
        else if (y >= soilStart && y < stoneStart) {
          ctx.strokeStyle = 'rgba(139, 115, 85, 0.6)'; // 土色
          ctx.lineWidth = 1;
        }
        // 石領域
        else if (y >= stoneStart && y <= stoneEnd) {
          ctx.strokeStyle = 'rgba(105, 105, 105, 0.6)'; // 石色
          ctx.lineWidth = 2;
        }
        
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    }

    // 石のテクスチャを追加（石領域のみ）
    ctx.strokeStyle = 'rgba(169, 169, 169, 0.3)';
    ctx.lineWidth = 1;

    for (let x = pixelPerfectOffsetX; x <= canvas.width; x += blockSize / 2) {
      for (let y = stoneStart - grassStartOffset; y <= stoneEnd; y += blockSize / 2) {
        if (y >= stoneStart && (x / (blockSize / 2) + y / (blockSize / 2)) % 2 === 0) {
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + blockSize / 4, y + blockSize / 4);
          ctx.stroke();
        }
      }
    }

  }, [windowSize, blockSize]);

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
