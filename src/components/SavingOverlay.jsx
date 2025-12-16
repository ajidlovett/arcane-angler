import { useState } from 'react';
// Saving Overlay Component

export const SavingOverlay = ({ savingProgress, theme }) => {
  if (!savingProgress) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-[100] flex items-center justify-center">
      <div className={`bg-${theme.primarySolid} rounded-lg p-8 text-center border-4 border-${theme.accent} shadow-2xl`}>
        <div className="text-6xl mb-4 animate-pulse">💾</div>
        <h2 className="text-[1.05rem] font-bold mb-2">Saving Your Progress...</h2>
        <p className={`text-${theme.textMuted} mb-4`}>Please wait while we save your game data</p>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-yellow-400"></div>
        </div>
      </div>
    </div>
  );
};


