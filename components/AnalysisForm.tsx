import React from 'react';
import { BookOpen, Database, Search } from 'lucide-react';

interface AnalysisFormProps {
  field: string;
  setField: (value: string) => void;
  literature: string;
  setLiterature: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const AnalysisForm: React.FC<AnalysisFormProps> = ({
  field,
  setField,
  literature,
  setLiterature,
  onSubmit,
  isLoading
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden h-full flex flex-col">
      <div className="bg-academic-900 p-6 text-white">
        <h2 className="text-xl font-serif font-semibold flex items-center gap-2">
          <Database className="w-5 h-5" />
          数据输入面板
        </h2>
        <p className="text-academic-200 text-sm mt-1">
          请输入您的研究领域并粘贴文献元数据，AI 将为您生成战略分析报告。
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 flex-grow flex flex-col gap-6 overflow-y-auto">
        
        {/* Field Input */}
        <div>
          <label htmlFor="field" className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
            <Search className="w-4 h-4 text-academic-600" />
            研究大领域
          </label>
          <input
            id="field"
            type="text"
            value={field}
            onChange={(e) => setField(e.target.value)}
            placeholder="例如：钙钛矿太阳能电池、阿尔茨海默病药物开发、大语言模型幻觉..."
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-academic-500 focus:ring-2 focus:ring-academic-200 transition-all outline-none text-slate-800 placeholder:text-slate-400"
            required
            disabled={isLoading}
          />
        </div>

        {/* Literature Data Input */}
        <div className="flex-grow flex flex-col">
          <label htmlFor="literature" className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-academic-600" />
            文献列表数据
          </label>
          <div className="relative flex-grow">
            <textarea
              id="literature"
              value={literature}
              onChange={(e) => setLiterature(e.target.value)}
              placeholder={`请直接从 Excel 或 Zotero 复制粘贴以下三列信息：
1. 年份
2. 期刊名称
3. 论文标题

示例：
2024  Nature Energy  Interface engineering for high-efficiency perovskite cells
2023  Joule  Stable extraction layers...
...`}
              className="w-full h-full min-h-[300px] px-4 py-3 rounded-lg border border-slate-300 focus:border-academic-500 focus:ring-2 focus:ring-academic-200 transition-all outline-none text-sm font-mono text-slate-600 placeholder:text-slate-400 resize-none"
              required
              disabled={isLoading}
            />
          </div>
          <p className="text-xs text-slate-400 mt-2">
            * 数据越丰富，分析结果越准确。建议提供至少 20-50 条代表性文献。
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || !field.trim() || !literature.trim()}
          className={`w-full py-4 rounded-lg font-semibold text-white shadow-md transition-all flex items-center justify-center gap-2
            ${isLoading 
              ? 'bg-slate-400 cursor-not-allowed' 
              : 'bg-academic-700 hover:bg-academic-800 hover:shadow-lg active:transform active:scale-[0.98]'
            }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              深度分析中 (可能需要 1-2 分钟)...
            </>
          ) : (
            '开始战略分析'
          )}
        </button>
      </form>
    </div>
  );
};

export default AnalysisForm;