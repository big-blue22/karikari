import React from 'react';
import { Command } from './types';
import CommandCard from './CommandCard';

interface CommandListProps {
  commands: Command[];
  categories: Record<string, string>;
}

export const CommandList: React.FC<CommandListProps> = ({ commands, categories }) => {
  const groupedCommands = commands.reduce((acc, command) => {
    (acc[command.category] = acc[command.category] || []).push(command);
    return acc;
  }, {} as Record<string, Command[]>);

  return (
    <div className="text-white">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-orange-400 drop-shadow-md">コマンド一覧（いちらん）</h2>
      <p className="mb-8 text-base sm:text-lg text-gray-200">
        コマンドを使えば、マイクラの世界で神様みたいになんでもできる！<br className="sm:hidden" />
        チャット画面（Tキー）を開いて、スラッシュ `/` から入力してみよう！
      </p>

      <div className="space-y-10">
        {Object.entries(categories).map(([key, categoryName]) => (
          groupedCommands[categoryName] && (
            <div key={key}>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 p-2 bg-black/50 border-l-8 border-orange-400 rounded-r-md shadow-md">
                {categoryName}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {groupedCommands[categoryName].map((command, index) => (
                  <CommandCard key={index} command={command} />
                ))}
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
};