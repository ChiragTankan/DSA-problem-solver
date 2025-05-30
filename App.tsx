
import React, { useState, useCallback } from 'react';
import { InputSection } from './components/InputSection';
import { OutputSection } from './components/OutputSection';
import { generateSolution } from './services/geminiService';

const App: React.FC = () => {
  const [problemStatement, setProblemStatement] = useState<string>('');
  const [examples, setExamples] = useState<string>('');
  const [constraints, setConstraints] = useState<string>('');
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async () => {
    if (!problemStatement.trim()) {
      setError('Problem statement cannot be empty.');
      setGeneratedCode('');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedCode('');
    try {
      const code = await generateSolution(problemStatement, examples, constraints);
      setGeneratedCode(code);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred while generating the solution.');
    } finally {
      setIsLoading(false);
    }
  }, [problemStatement, examples, constraints]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 flex flex-col items-center p-4 sm:p-8 font-sans">
      <header className="w-full max-w-5xl mb-8 sm:mb-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-sky-400">
          DSA Problem Solver AI
        </h1>
        <p className="text-slate-400 mt-3 text-md sm:text-lg">
          Paste your problem statement, examples, and constraints to get a Python solution from Gemini.
        </p>
      </header>

      <main className="w-full max-w-5xl bg-slate-800 shadow-2xl rounded-xl p-6 sm:p-10">
        <div className="grid md:grid-cols-2 gap-8">
          <InputSection
            problemStatement={problemStatement}
            setProblemStatement={setProblemStatement}
            examples={examples}
            setExamples={setExamples}
            constraints={constraints}
            setConstraints={setConstraints}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
          <OutputSection
            generatedCode={generatedCode}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </main>

      <footer className="w-full max-w-5xl mt-12 text-center text-slate-500 text-sm">
        <p>Powered by Google Gemini &bull; Designed for Educational Purposes</p>
      </footer>
    </div>
  );
};

export default App;
