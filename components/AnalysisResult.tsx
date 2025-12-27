import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Download, FileText, Sparkles } from 'lucide-react';

interface AnalysisResultProps {
  result: string | null;
  error: string | null;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ result, error }) => {
  if (error) {
    return (
      <div className="h-full flex items-center justify-center bg-white rounded-xl border border-red-100 shadow-sm p-8">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">分析过程中发生错误</h3>
          <p className="text-slate-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-white rounded-xl border border-dashed border-slate-300 p-12 text-center text-slate-400 min-h-[500px]">
        <Sparkles className="w-16 h-16 mb-4 text-slate-200" />
        <p className="text-lg font-medium text-slate-500">等待分析结果</p>
        <p className="max-w-xs mt-2 text-sm">
          在左侧提交数据后，AI 战略家将在此处生成深度学术报告。
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-100 flex flex-col h-full overflow-hidden">
      <div className="bg-white border-b border-slate-100 p-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-2 text-academic-800">
          <FileText className="w-5 h-5" />
          <h2 className="font-serif font-bold text-lg">战略分析报告</h2>
        </div>
        <button 
          onClick={() => window.print()}
          className="text-slate-500 hover:text-academic-600 hover:bg-slate-50 p-2 rounded-lg transition-colors flex items-center gap-1 text-sm font-medium"
        >
          <Download className="w-4 h-4" />
          导出/打印
        </button>
      </div>
      
      <div className="flex-grow overflow-y-auto p-8 md:p-12 bg-slate-50/50">
        <article className="markdown-content max-w-4xl mx-auto font-serif">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {result}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
};

export default AnalysisResult;