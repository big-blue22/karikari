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
    <div className="min-h-screen bg-cover bg-fixed bg-center p-4 sm:p-8" style={{backgroundImage: "url('https://images.pexels.com/photos/22619746/pexels-photo-22619746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')", backgroundColor: '#60a5fa'}}>
      <div className="max-w-7xl mx-auto">
        <Header activeTab={activeTab} onTabChange={handleTabChange} />
        
        <main className="mt-6 p-4 sm:p-6 md:p-8 bg-slate-900/70 border-2 border-orange-400/30 rounded-lg shadow-2xl shadow-orange-400/10 backdrop-blur-md">
          {activeTab === Tab.Keyboard && <KeyboardLayout />}
          {activeTab === Tab.Commands && <CommandList commands={MINECRAFT_COMMANDS} categories={COMMAND_CATEGORIES} />}
        </main>
        
        <footer className="text-center mt-8 text-white/70 text-sm drop-shadow-lg">
          <p>&copy; 2024 マイクラ. たのしくあそんで、たくさん学ぼう！</p>
        </footer>
      </div>
    </div>
  );
};

export default App;