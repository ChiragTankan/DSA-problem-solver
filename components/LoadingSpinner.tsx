
import React from 'react';

export const LoadingSpinner: React.FC = () => (
  <div className="flex flex-col justify-center items-center h-full py-8 text-slate-300">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-t-2 border-sky-400"></div>
    <p className="mt-4 text-lg">Generating solution...</p>
    <p className="text-sm text-slate-400">Please wait a moment.</p>
  </div>
);
