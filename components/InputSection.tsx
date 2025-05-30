
import React from 'react';

interface InputSectionProps {
  problemStatement: string;
  setProblemStatement: (value: string) => void;
  examples: string;
  setExamples: (value: string) => void;
  constraints: string;
  setConstraints: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const InputSection: React.FC<InputSectionProps> = ({
  problemStatement,
  setProblemStatement,
  examples,
  setExamples,
  constraints,
  setConstraints,
  onSubmit,
  isLoading,
}) => {
  const commonTextareaClasses = "w-full p-3 bg-slate-700 border border-slate-600 rounded-md text-slate-200 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-shadow duration-150 ease-in-out placeholder-slate-500 resize-y";

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="problemStatement" className="block text-sm font-medium text-slate-300 mb-1">
          Problem Statement
        </label>
        <textarea
          id="problemStatement"
          rows={8}
          className={commonTextareaClasses}
          placeholder="Paste the full problem statement here..."
          value={problemStatement}
          onChange={(e) => setProblemStatement(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <div>
        <label htmlFor="examples" className="block text-sm font-medium text-slate-300 mb-1">
          Examples (Input/Output)
        </label>
        <textarea
          id="examples"
          rows={5}
          className={commonTextareaClasses}
          placeholder="Provide examples, e.g.,&#10;Input: nums = [2,7,11,15], target = 9&#10;Output: [0,1]"
          value={examples}
          onChange={(e) => setExamples(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <div>
        <label htmlFor="constraints" className="block text-sm font-medium text-slate-300 mb-1">
          Constraints (Optional)
        </label>
        <textarea
          id="constraints"
          rows={3}
          className={commonTextareaClasses}
          placeholder="e.g., 1 <= nums.length <= 10^4&#10;-10^9 <= nums[i] <= 10^9"
          value={constraints}
          onChange={(e) => setConstraints(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <button
        onClick={onSubmit}
        disabled={isLoading}
        className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-4 rounded-md transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-sky-400 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          'Generate Python Solution'
        )}
      </button>
    </div>
  );
};
