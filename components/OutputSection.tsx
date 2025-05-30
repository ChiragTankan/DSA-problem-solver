
import React, { useState, useEffect } from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';

interface OutputSectionProps {
  generatedCode: string;
  isLoading: boolean;
  error: string | null;
}

const DocumentDuplicateIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75m9.75 3.75H17.25a1.125 1.125 0 011.125 1.125v9.75M9.75 3.75A1.125 1.125 0 008.625 2.625h-1.5A1.125 1.125 0 006 3.75v1.5A1.125 1.125 0 007.125 6.375H9.75V3.75z" />
  </svg>
);


export const OutputSection: React.FC<OutputSectionProps> = ({
  generatedCode,
  isLoading,
  error,
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleCopy = async () => {
    if (generatedCode) {
      try {
        await navigator.clipboard.writeText(generatedCode);
        setCopied(true);
      } catch (err) {
        console.error('Failed to copy text: ', err);
        alert('Failed to copy code to clipboard.');
      }
    }
  };
  
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!generatedCode && !isLoading && !error) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 bg-slate-700/30 rounded-lg border-2 border-dashed border-slate-600">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-slate-500 mb-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
        </svg>
        <p className="text-slate-400 text-center">Your generated Python code will appear here.</p>
        <p className="text-slate-500 text-sm mt-1 text-center">Fill in the details on the left and click "Generate Solution".</p>
      </div>
    );
  }
  
  if (generatedCode) {
    return (
      <div className="bg-slate-900 p-1 rounded-lg shadow-lg h-full flex flex-col">
        <div className="flex justify-between items-center px-4 py-2 bg-slate-700 rounded-t-md">
          <span className="text-sm font-medium text-slate-300">Generated Python Code</span>
          <button
            onClick={handleCopy}
            className="flex items-center text-sm bg-sky-500 hover:bg-sky-600 text-white py-1 px-3 rounded-md transition-colors duration-150"
            title="Copy code"
          >
            <DocumentDuplicateIcon className="w-4 h-4 mr-1.5" />
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <pre className="flex-grow p-4 text-sm text-slate-200 overflow-auto bg-slate-900 rounded-b-lg custom-scrollbar">
          <code className="font-mono whitespace-pre-wrap break-all">
            {generatedCode}
          </code>
        </pre>
      </div>
    );
  }

  return null; // Should not reach here given the above conditions
};
