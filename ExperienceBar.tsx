import React from 'react';
import { ExperienceState } from './types';

interface ExperienceBarProps {
  experience: ExperienceState;
  recentXPGain?: number;
  className?: string;
}

const ExperienceBar: React.FC<ExperienceBarProps> = ({ 
  experience, 
  recentXPGain = 0,
  className 
}) => {
  const { currentXP, level, maxXP } = experience;
  const progressPercentage = (currentXP / maxXP) * 100;

  return (
    <div 
      className={className}
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        minWidth: '300px',
        maxWidth: '400px'
      }}
    >
      <div 
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          border: '3px solid #8B4513',
          borderRadius: '8px',
          padding: '12px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.1)',
          backdropFilter: 'blur(4px)'
        }}
      >
        {/* Level display */}
        <div 
          style={{
            textAlign: 'center',
            color: '#FFD700',
            fontSize: '16px',
            fontWeight: 'bold',
            marginBottom: '8px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
          }}
        >
          レベル {level}
        </div>

        {/* XP Bar Background */}
        <div 
          style={{
            width: '100%',
            height: '20px',
            backgroundColor: 'rgba(47, 47, 47, 0.9)',
            border: '2px solid #333',
            borderRadius: '4px',
            overflow: 'hidden',
            position: 'relative',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)'
          }}
        >
          {/* XP Progress Fill */}
          <div 
            style={{
              width: `${Math.min(progressPercentage, 100)}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #32CD32 0%, #7FFF00 50%, #32CD32 100%)',
              transition: 'width 0.5s ease-out',
              position: 'relative',
              boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.3)',
              animation: progressPercentage > 95 ? 'xpGlow 1s ease-in-out infinite alternate' : 'none'
            }}
          />
          
          {/* XP Text Overlay */}
          <div 
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '12px',
              fontWeight: 'bold',
              color: 'white',
              textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
              pointerEvents: 'none'
            }}
          >
            {currentXP} / {maxXP} XP
          </div>
        </div>

        {/* Recent XP Gain Notification */}
        {recentXPGain > 0 && (
          <div 
            style={{
              position: 'absolute',
              top: '-30px',
              right: '10px',
              color: '#7FFF00',
              fontSize: '14px',
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
              animation: 'xpGain 2s ease-out forwards',
              pointerEvents: 'none'
            }}
          >
            +{recentXPGain} XP
          </div>
        )}
      </div>

      {/* CSS Animations */}
      <style>
        {`
          @keyframes xpGlow {
            0% { 
              box-shadow: inset 0 2px 4px rgba(255,255,255,0.3), 0 0 8px #32CD32; 
            }
            100% { 
              box-shadow: inset 0 2px 4px rgba(255,255,255,0.3), 0 0 16px #7FFF00; 
            }
          }
          
          @keyframes xpGain {
            0% {
              opacity: 1;
              transform: translateY(0px) scale(1);
            }
            50% {
              opacity: 1;
              transform: translateY(-10px) scale(1.2);
            }
            100% {
              opacity: 0;
              transform: translateY(-20px) scale(1);
            }
          }
        `}
      </style>
    </div>
  );
};

export default ExperienceBar;