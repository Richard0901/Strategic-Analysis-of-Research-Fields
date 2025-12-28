import React, { useEffect, useState } from 'react';
import { Settings, X, Save, RotateCcw } from 'lucide-react';
import { ApiSettings, DEFAULT_SETTINGS } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ApiSettings;
  onSave: (settings: ApiSettings) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSave,
}) => {
  const [localSettings, setLocalSettings] = useState<ApiSettings>(settings);

  // Reset local state when modal opens to ensure it matches current app state
  useEffect(() => {
    if (isOpen) {
      setLocalSettings(settings);
    }
  }, [isOpen, settings]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(localSettings);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        <div className="bg-slate-50 border-b border-slate-100 p-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Settings className="w-5 h-5 text-academic-600" />
            API 设置
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-200 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 overflow-y-auto">
          {/* Provider Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              AI 提供商 (Provider)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setLocalSettings({ ...localSettings, provider: 'google' })}
                className={`py-2.5 px-4 rounded-lg border text-sm font-medium transition-all ${
                  localSettings.provider === 'google'
                    ? 'bg-academic-50 border-academic-500 text-academic-700 ring-1 ring-academic-500'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                Google Gemini
              </button>
              <button
                type="button"
                onClick={() => setLocalSettings({ ...localSettings, provider: 'openai' })}
                className={`py-2.5 px-4 rounded-lg border text-sm font-medium transition-all ${
                  localSettings.provider === 'openai'
                    ? 'bg-academic-50 border-academic-500 text-academic-700 ring-1 ring-academic-500'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                OpenAI / 兼容接口
              </button>
            </div>
          </div>

          {/* Settings Fields */}
          <div className="space-y-4">
            
            {/* Base URL (Only for OpenAI) */}
            {localSettings.provider === 'openai' && (
               <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  API Base URL
                </label>
                <input
                  type="text"
                  value={localSettings.baseUrl}
                  onChange={(e) => setLocalSettings({ ...localSettings, baseUrl: e.target.value })}
                  placeholder="https://api.deepseek.com"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-academic-500 focus:border-transparent text-sm"
                />
                <p className="text-xs text-slate-500 mt-1">
                  输入基础路径，系统会自动追加 <code className="bg-slate-100 px-1 py-0.5 rounded">/chat/completions</code>
                </p>
              </div>
            )}

            {/* Model Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                模型名称 (Model Name)
              </label>
              <input
                type="text"
                value={localSettings.modelName}
                onChange={(e) => setLocalSettings({ ...localSettings, modelName: e.target.value })}
                placeholder={localSettings.provider === 'google' ? "gemini-3-pro-preview" : "deepseek-chat"}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-academic-500 focus:border-transparent text-sm"
              />
              {localSettings.provider === 'google' && (
                  <p className="text-xs text-slate-500 mt-1">推荐: gemini-3-pro-preview (支持深度思考)</p>
              )}
            </div>

            {/* API Key */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                API Key
              </label>
              <input
                type="password"
                value={localSettings.apiKey}
                onChange={(e) => setLocalSettings({ ...localSettings, apiKey: e.target.value })}
                placeholder={localSettings.provider === 'google' ? "留空则使用默认环境变量" : "sk-..."}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-academic-500 focus:border-transparent text-sm font-mono"
              />
              <p className="text-xs text-slate-500 mt-1">
                 您的 Key 仅存储在本地浏览器内存中，刷新页面后需重新输入。
              </p>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-4 border-t border-slate-100 flex justify-end gap-3">
          <button
            onClick={() => setLocalSettings(DEFAULT_SETTINGS)}
            className="px-4 py-2 text-slate-600 text-sm font-medium hover:bg-slate-200 rounded-lg flex items-center gap-2 transition-colors mr-auto"
          >
            <RotateCcw className="w-4 h-4" />
            恢复默认
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-slate-600 text-sm font-medium hover:bg-slate-200 rounded-lg transition-colors"
          >
            取消
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-academic-600 text-white text-sm font-medium rounded-lg hover:bg-academic-700 shadow-sm flex items-center gap-2 transition-colors"
          >
            <Save className="w-4 h-4" />
            保存设置
          </button>
        </div>
      </div>
    </div>
  );
};
