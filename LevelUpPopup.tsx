import React from 'react';
import { LevelUpPopup } from './types';

interface LevelUpPopupProps {
  popup: LevelUpPopup;
  onClose: () => void;
}

const LevelUpPopupComponent: React.FC<LevelUpPopupProps> = ({ popup, onClose }) => {
  if (!popup.isVisible) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        animation: 'popupFadeIn 0.5s ease-out'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          backgroundColor: 'rgba(47, 47, 47, 0.95)',
          border: '6px solid #FFD700',
          borderRadius: '16px',
          padding: '32px',
          textAlign: 'center',
          color: 'white',
          boxShadow: '0 16px 48px rgba(0,0,0,0.7), inset 0 4px 8px rgba(255,255,255,0.1)',
          animation: 'levelUpBounce 0.6s ease-out',
          backdropFilter: 'blur(8px)',
          maxWidth: '400px',
          margin: '20px'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Celebration Icon */}
        <div 
          style={{
            fontSize: '48px',
            marginBottom: '16px',
            animation: 'celebrate 0.8s ease-in-out infinite alternate'
          }}
        >
          🎉
        </div>

        {/* Level Up Text */}
        <h2 
          style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#FFD700',
            textShadow: '3px 3px 6px rgba(0,0,0,0.8)',
            marginBottom: '8px',
            animation: 'textGlow 1s ease-in-out infinite alternate'
          }}
        >
          レベルアップ！
        </h2>

        {/* New Level */}
        <p 
          style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#7FFF00',
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
            marginBottom: '16px'
          }}
        >
          レベル {popup.newLevel} に到達しました！
        </p>

        {/* Congratulations Message */}
        <p 
          style={{
            fontSize: '16px',
            color: '#E0E0E0',
            marginBottom: '24px',
            lineHeight: '1.5'
          }}
        >
          おめでとうございます！<br />
          採掘スキルが向上しました！
        </p>

        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            backgroundColor: '#8B4513',
            border: '3px solid #654321',
            borderRadius: '8px',
            color: 'white',
            fontSize: '16px',
            fontWeight: 'bold',
            padding: '12px 24px',
            cursor: 'pointer',
            boxShadow: 'inset 2px 2px 0 rgba(255,255,255,0.3), inset -2px -2px 0 rgba(0,0,0,0.3), 0 4px 8px rgba(0,0,0,0.3)',
            transition: 'all 0.1s ease',
            textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#A0522D';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#8B4513';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'translateY(1px)';
            e.currentTarget.style.boxShadow = 'inset 2px 2px 0 rgba(0,0,0,0.3), inset -2px -2px 0 rgba(255,255,255,0.3), 0 2px 4px rgba(0,0,0,0.3)';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = 'inset 2px 2px 0 rgba(255,255,255,0.3), inset -2px -2px 0 rgba(0,0,0,0.3), 0 4px 8px rgba(0,0,0,0.3)';
          }}
        >
          続ける
        </button>
      </div>

      {/* CSS Animations */}
      <style>
        {`
          @keyframes popupFadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
          
          @keyframes levelUpBounce {
            0% { 
              opacity: 0;
              transform: scale(0.5) translateY(-100px);
            }
            60% { 
              opacity: 1;
              transform: scale(1.1) translateY(0px);
            }
            100% { 
              opacity: 1;
              transform: scale(1) translateY(0px);
            }
          }
          
          @keyframes celebrate {
            0% { 
              transform: scale(1) rotate(-5deg);
            }
            100% { 
              transform: scale(1.2) rotate(5deg);
            }
          }
          
          @keyframes textGlow {
            0% { 
              text-shadow: 3px 3px 6px rgba(0,0,0,0.8), 0 0 10px #FFD700;
            }
            100% { 
              text-shadow: 3px 3px 6px rgba(0,0,0,0.8), 0 0 20px #FFD700, 0 0 30px #FFD700;
            }
          }
        `}
      </style>
    </div>
  );
};

export default LevelUpPopupComponent;