import React from 'react';
import { Command } from '../types';

interface CommandCardProps {
  command: Command;
}

const CommandCard: React.FC<CommandCardProps> = ({ command }) => {
  return (
    <div className="bg-slate-900/60 border border-orange-400/30 rounded-lg p-4 h-full flex flex-col transition-all duration-300 hover:scale-105 hover:border-orange-400 hover:shadow-xl hover:shadow-orange-400/20 backdrop-blur-sm">
      <div className="flex-grow">
        <p className="bg-black/50 text-white font-mono text-sm sm:text-base p-3 rounded-md mb-3 break-words">
          {command.command}
        </p>
        <p className="text-gray-200 text-sm">
          {command.description}
        </p>
      </div>
    </div>
  );
};

export default CommandCard;