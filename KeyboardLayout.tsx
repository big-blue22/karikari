import React from 'react';

const KeyboardLayout: React.FC = () => {
  return (
    <div className="text-white">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-orange-400 drop-shadow-md">キーボード配列（はいれつ）</h2>
      <p className="mb-6 text-base sm:text-lg text-gray-200">
        マイクラをPCで遊ぶときの基本のキーボード操作だ！まずはこれを覚えよう！
      </p>
      <div className="bg-black/30 border-2 border-orange-400/40 rounded-lg p-4 sm:p-8 flex flex-col justify-center items-center min-h-[300px] sm:min-h-[400px] text-center shadow-inner shadow-orange-400/10">
        <a href="https://picsum.photos/seed/keyboard/1200/600" target="_blank" rel="noopener noreferrer" className="block w-full max-w-2xl" aria-label="キーボード配列の画像を拡大表示">
          <img 
            src="https://picsum.photos/seed/keyboard/800/400" 
            alt="キーボードの画像がここに表示されます" 
            className="rounded-md shadow-lg border-2 border-orange-400/50 w-full h-auto transition-transform duration-200 hover:scale-[1.02] hover:shadow-orange-400/40"
          />
        </a>
        <p className="mt-2 text-gray-300 text-xs sm:text-sm">
          画像（がぞう）をタップすると拡大（かくだい）できます
        </p>
        <p className="mt-4 text-orange-300 text-lg font-bold">
          ここにキーボードの画像が入ります
        </p>
        <p className="text-gray-400 text-sm sm:text-base mt-1">
          (先生へ：この画像を実際のキーボード表に差し替えてください)
        </p>
      </div>
    </div>
  );
};

export default KeyboardLayout;