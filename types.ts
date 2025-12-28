export type ApiProvider = 'google' | 'openai';

export interface ApiSettings {
  provider: ApiProvider;
  apiKey: string;
  baseUrl: string;
  modelName: string;
}

export const DEFAULT_SETTINGS: ApiSettings = {
  provider: 'google',
  apiKey: '', // Empty string implies using process.env.API_KEY if available for Google
  baseUrl: '',
  modelName: 'gemini-3-pro-preview',
};
