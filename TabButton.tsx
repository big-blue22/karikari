import React from 'react';

interface TabButtonProps {
  onClick: () => void;
  isActive: boolean;
  children: React.ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({ onClick, isActive, children }) => {
  const baseClasses = "px-3 py-2 sm:px-6 sm:py-3 text-sm sm:text-lg font-bold rounded-md transition-all duration-200 ease-in-out transform focus:outline-none focus:ring-4 focus:ring-yellow-500 focus:ring-opacity-50";
  
  const activeClasses = "minecraft-button text-white scale-105";
  
  const inactiveClasses = "bg-gray-700/80 border-4 border-gray-600 text-yellow-300 hover:bg-gray-600/80 hover:text-white hover:border-yellow-400 shadow-lg";

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