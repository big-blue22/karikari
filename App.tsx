import React, { useState, useCallback } from 'react';
import Header from './Header';
import KeyboardLayout from './KeyboardLayout';
import { CommandList } from './CommandList';
import { MINECRAFT_COMMANDS, COMMAND_CATEGORIES } from './constants';

export enum Tab {
  Keyboard = 'keyboard',
  Commands = 'commands',
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Keyboard);

  const handleTabChange = useCallback((tab: Tab) => {
    setActiveTab(tab);
  }, []);

  return (
    <div className="min-h-screen minecraft-world p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <Header activeTab={activeTab} onTabChange={handleTabChange} />
        
        <main className="mt-6 p-4 sm:p-6 md:p-8 minecraft-panel rounded-lg">
          {activeTab === Tab.Keyboard && <KeyboardLayout />}
          {activeTab === Tab.Commands && <CommandList commands={MINECRAFT_COMMANDS} categories={COMMAND_CATEGORIES} />}
        </main>
        
        <footer className="text-center mt-8 text-white drop-shadow-lg">
          <p className="text-lg font-bold bg-black/50 inline-block px-4 py-2 rounded-lg border-2 border-yellow-400/50">
            &copy; 2024 マイクラ. たのしくあそんで、たくさん学ぼう！
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;