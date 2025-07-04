import React from 'react';

interface TabButtonProps {
  onClick: () => void;
  isActive: boolean;
  children: React.ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({ onClick, isActive, children }) => {
  const baseClasses = "px-3 py-2 sm:px-6 sm:py-3 text-sm sm:text-lg font-bold rounded-md transition-all duration-200 ease-in-out transform focus:outline-none focus:ring-4 focus:ring-yellow-500 focus:ring-opacity-50";
  
  const activeStyle = {
    background: 'linear-gradient(135deg, #8B4513 0%, #D2691E 50%, #8B4513 100%)',
    border: '3px solid #654321',
    boxShadow: `
      inset 2px 2px 0 rgba(255,255,255,0.3),
      inset -2px -2px 0 rgba(0,0,0,0.3),
      0 4px 8px rgba(0,0,0,0.3)
    `,
    transform: 'scale(1.05)',
    color: 'white'
  };
  
  const inactiveStyle = {
    background: 'rgba(75, 85, 99, 0.8)',
    border: '4px solid rgb(75, 85, 99)',
    color: 'rgb(253, 224, 71)',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
  };

  return (
    <button
      onClick={onClick}
      className={baseClasses}
      style={isActive ? activeStyle : inactiveStyle}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.background = 'rgba(107, 114, 128, 0.8)';
          e.currentTarget.style.color = 'white';
          e.currentTarget.style.borderColor = 'rgb(253, 224, 71)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.background = 'rgba(75, 85, 99, 0.8)';
          e.currentTarget.style.color = 'rgb(253, 224, 71)';
          e.currentTarget.style.borderColor = 'rgb(75, 85, 99)';
        }
      }}
    >
      {children}
    </button>
  );
};

export default TabButton;