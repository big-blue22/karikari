import React, { useState } from 'react';
import Furigana from './Furigana';

const KeyboardLayout: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="text-white">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-orange-400 drop-shadow-md">
        <Furigana>キーボード配列</Furigana>
      </h2>
      <p className="mb-6 text-base sm:text-lg text-gray-200">
        <Furigana>マイクラをPCで遊ぶときの基本のキーボード操作だ！まずはこれを覚えよう！</Furigana>
      </p>
      <div className="bg-black/30 border-2 border-orange-400/40 rounded-lg p-4 sm:p-8 flex flex-col justify-center items-center min-h-[300px] sm:min-h-[400px] text-center shadow-inner shadow-orange-400/10">
        <button 
          onClick={openModal}
          className="block w-full max-w-2xl cursor-pointer transition-transform duration-200 hover:scale-[1.02]" 
          aria-label="キーボード配列の画像を拡大表示"
        >
          <img 
            src="https://picsum.photos/seed/keyboard/800/400" 
            alt="キーボードの画像がここに表示されます" 
            className="rounded-md shadow-lg border-2 border-orange-400/50 w-full h-auto hover:shadow-orange-400/40"
          />
        </button>
        <p className="mt-2 text-gray-300 text-xs sm:text-sm">
          <Furigana>画像をタップすると拡大できます</Furigana>
        </p>
        <p className="mt-4 text-orange-300 text-lg font-bold">
          <Furigana>ここにキーボードの画像が入ります</Furigana>
        </p>
        <p className="text-gray-400 text-sm sm:text-base mt-1">
          <Furigana>(先生へ：この画像を実際のキーボード表に差替えてください)</Furigana>
        </p>
      </div>

      {/* Modal for enlarged image */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div 
            className="relative max-w-6xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white text-2xl font-bold bg-red-600 hover:bg-red-700 rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-200"
              aria-label="画像を閉じる"
            >
              ×
            </button>
            <img 
              src="https://picsum.photos/seed/keyboard/1200/600" 
              alt="キーボード配列の拡大画像" 
              className="rounded-lg shadow-2xl border-4 border-orange-400 max-w-full max-h-[90vh] object-contain"
            />
            <p className="text-center text-white mt-4 text-lg">
              <Furigana>キーボード配列（拡大表示）</Furigana>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default KeyboardLayout;