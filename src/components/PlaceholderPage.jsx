import { useState } from 'react';
// Placeholder Page Component for upcoming features

export const PlaceholderPage = ({ title, icon, theme }) => (
  <div className="max-w-4xl mx-auto">
    <div className={`bg-${theme.secondary} bg-opacity-50 rounded-lg p-8 sm:p-12 text-center`}>
      <div className="text-6xl mb-4"><span className="text-5xl">{icon()}</span></div>
      <h2 className="text-[1.05rem] sm:text-3xl font-bold mb-2">{title}</h2>
      <p className={`text-sm sm:text-base text-${theme.textMuted}`}>Coming soon! This feature is under development.</p>
    </div>
  </div>
);


