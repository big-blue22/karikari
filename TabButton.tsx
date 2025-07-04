import React from 'react';

interface TabButtonProps {
  onClick: () => void;
  isActive: boolean;
  children: React.ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({ onClick, isActive, children }) => {
  const baseClasses = "px-3 py-2 sm:px-6 sm:py-3 text-sm sm:text-lg font-bold rounded-md transition-all duration-200 ease-in-out transform focus:outline-none focus:ring-4 focus:ring-yellow-500 focus:ring-opacity-50";
  
  const activeStyle = {
    background: 'linear-gradient(135deg, #6B4423 0%, #8B4513 25%, #D2691E 50%, #8B4513 75%, #6B4423 100%)',
    border: '4px solid #4A2C17',
    boxShadow: `
      inset 3px 3px 0 rgba(255,255,255,0.4),
      inset -3px -3px 0 rgba(0,0,0,0.6),
      0 6px 12px rgba(0,0,0,0.5),
      0 2px 4px rgba(0,0,0,0.3)
    `,
    transform: 'scale(1.05) translateY(-2px)',
    color: '#FFFFFF',
    textShadow: '2px 2px 0 #000'
  };
  
  const inactiveStyle = {
    background: 'linear-gradient(135deg, rgba(96, 125, 139, 0.25) 0%, rgba(84, 110, 122, 0.25) 50%, rgba(69, 90, 100, 0.25) 100%)',
    border: '4px solid rgba(55, 71, 79, 0.4)',
    color: '#FFF59D',
    boxShadow: `
      inset 2px 2px 0 rgba(255,255,255,0.1),
      inset -2px -2px 0 rgba(0,0,0,0.2),
      0 4px 8px rgba(0,0,0,0.15)
    `,
    textShadow: '1px 1px 0 #000'
  };

  return (
    <button
      onClick={onClick}
      className={baseClasses}
      style={isActive ? activeStyle : inactiveStyle}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(120, 144, 156, 0.4) 0%, rgba(96, 125, 139, 0.4) 50%, rgba(84, 110, 122, 0.4) 100%)';
          e.currentTarget.style.color = '#FFFFFF';
          e.currentTarget.style.borderColor = 'rgba(255, 213, 79, 0.6)';
          e.currentTarget.style.transform = 'scale(1.02) translateY(-1px)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(96, 125, 139, 0.25) 0%, rgba(84, 110, 122, 0.25) 50%, rgba(69, 90, 100, 0.25) 100%)';
          e.currentTarget.style.color = '#FFF59D';
          e.currentTarget.style.borderColor = 'rgba(55, 71, 79, 0.4)';
          e.currentTarget.style.transform = 'scale(1.0) translateY(0px)';
        }
      }}
    >
      {children}
    </button>
  );
};

export default TabButton;