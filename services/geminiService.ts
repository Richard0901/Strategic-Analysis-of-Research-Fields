import { GoogleGenAI } from "@google/genai";
import { STRATEGIC_ANALYSIS_PROMPT_TEMPLATE } from "../constants";
import { ApiSettings } from "../types";

export interface AnalysisInput {
  field: string;
  literatureData: string;
  settings: ApiSettings;
}

export const analyzeResearchField = async (input: AnalysisInput): Promise<string> => {
  const { field, literatureData, settings } = input;
  
  // Interpolate the prompt
  const prompt = STRATEGIC_ANALYSIS_PROMPT_TEMPLATE
    .replace('{{FIELD}}', field)
    .replace('{{LITERATURE_DATA}}', literatureData);

  // 1. OpenAI Compatible Provider
  if (settings.provider === 'openai') {
    if (!settings.apiKey) throw new Error("请输入 OpenAI 兼容 API Key");
    if (!settings.baseUrl) throw new Error("请输入 API Base URL");
    if (!settings.modelName) throw new Error("请输入模型名称");

    const baseUrl = settings.baseUrl.replace(/\/+$/, ''); // Remove trailing slash
    // Smart URL handling: append /chat/completions if missing
    let url = baseUrl;
    if (!url.endsWith('/chat/completions')) {
        url = `${url}/chat/completions`;
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${settings.apiKey}`
        },
        body: JSON.stringify({
          model: settings.modelName,
          messages: [
            // Sending the entire prompt as a user message to ensure maximum compatibility
            // with models that might be strict about system prompt roles.
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`API 请求失败: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      return data.choices?.[0]?.message?.content || "API 返回了空内容";

    } catch (error: any) {
      console.error("OpenAI API Request Failed:", error);
      throw error;
    }
  }

  // 2. Google Gemini Provider (Default)
  else {
    const apiKey = settings.apiKey || process.env.API_KEY;
    if (!apiKey) {
       throw new Error("未配置 Google API Key。请在设置中输入，或确保环境变量已配置。");
    }

    const ai = new GoogleGenAI({ apiKey });

    try {
      // Use user defined model or default
      const modelName = settings.modelName || 'gemini-3-pro-preview';
      
      const config: any = {};
      
      // Smart thinking budget application
      // Only apply to models known to support/benefit from it (Gemini 2.5/3 series)
      // This prevents errors if user switches to a model that doesn't support 'thinkingConfig'
      if (modelName.toLowerCase().includes('gemini')) {
         config.thinkingConfig = { thinkingBudget: 8192 };
      }

      const response = await ai.models.generateContent({
        model: modelName,
        contents: prompt,
        config: config
      });

      const text = response.text;
      if (!text) {
          throw new Error("模型未生成响应。");
      }
      return text;

    } catch (error) {
      console.error("Gemini API Error:", error);
      throw error;
    }
  }
};
