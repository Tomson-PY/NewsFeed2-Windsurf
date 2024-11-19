import React from 'react';
import { useStore } from '../store/useStore';
import { Moon, Sun } from 'lucide-react';

export const Settings: React.FC = () => {
  const { preferences, toggleTheme } = useStore();

  return (
    <div>
      <div className="max-w-3xl mx-auto">
        <div className="bg-card rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold text-card-foreground mb-6">Your Settings</h2>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-card-foreground mb-1">Theme</h3>
                <p className="text-muted-foreground">Choose your preferred theme</p>
              </div>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
              >
                {preferences.theme === 'light' ? (
                  <Moon className="w-5 h-5 text-secondary-foreground" />
                ) : (
                  <Sun className="w-5 h-5 text-secondary-foreground" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};