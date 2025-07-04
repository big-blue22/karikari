import React from 'react';

interface TabButtonProps {
  onClick: () => void;
  isActive: boolean;
  children: React.ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({ onClick, isActive, children }) => {
  const baseClasses = "px-3 py-2 sm:px-6 sm:py-3 text-sm sm:text-lg font-bold rounded-md transition-all duration-200 ease-in-out transform focus:outline-none focus:ring-4 focus:ring-orange-500 focus:ring-opacity-50";
  
  const activeClasses = "bg-orange-500 text-black shadow-lg shadow-orange-500/50 scale-105";
  
  const inactiveClasses = "bg-black/50 border-2 border-orange-400/30 text-orange-300 hover:bg-orange-500/20 hover:text-white hover:border-orange-400";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      {children}
    </button>
  );
};

export default TabButton;