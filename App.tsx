import React, { useState } from 'react';
import AnalysisForm from './components/AnalysisForm';
import AnalysisResult from './components/AnalysisResult';
import { analyzeResearchField } from './services/geminiService';
import { BrainCircuit } from 'lucide-react';

const App: React.FC = () => {
  const [field, setField] = useState('');
  const [literature, setLiterature] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysis = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const analysisText = await analyzeResearchField({
        field: field,
        literatureData: literature
      });
      setResult(analysisText);
    } catch (err: any) {
      setError(err.message || '分析服务暂时不可用，请稍后重试或检查 API Key。');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-academic-600 p-2 rounded-lg">
              <BrainCircuit className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">学术战略大师</h1>
              <p className="text-xs text-slate-500 font-medium tracking-wide">AI 驱动的科研战略分析系统</p>
            </div>
          </div>
          <div className="hidden sm:block">
            <span className="inline-flex items-center rounded-full bg-academic-50 px-3 py-1 text-xs font-medium text-academic-700 ring-1 ring-inset ring-academic-600/20">
              由 Gemini 3.0 Pro 驱动
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-8rem)] min-h-[800px]">
          {/* Left Column: Input (4 columns) */}
          <div className="lg:col-span-4 h-full">
            <AnalysisForm 
              field={field} 
              setField={setField}
              literature={literature}
              setLiterature={setLiterature}
              onSubmit={handleAnalysis}
              isLoading={isLoading}
            />
          </div>

          {/* Right Column: Output (8 columns) */}
          <div className="lg:col-span-8 h-full">
            <AnalysisResult result={result} error={error} />
          </div>
        </div>
      </main>
      
      {/* Mobile-only footprint (hidden on desktop to save space) */}
      <footer className="lg:hidden bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-400">
        &copy; {new Date().getFullYear()} 学术战略大师 AI
      </footer>
    </div>
  );
};

export default App;