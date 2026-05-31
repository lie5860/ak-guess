import React from 'react';

export interface I18nApi {
  get: {
    (key: string, params?: Record<string, string | number> | null): string;
    (
      key: string,
      params: Record<string, string | number> | null | undefined,
      hasLegacyDom: true,
    ): JSX.Element | string;
  };
  setLanguage?: (lang: string) => void;
  language: string;
}

export const AppCtx = React.createContext<{
  i18n: I18nApi;
  chartsData: Character[];
  aliasData: Alias[];
  chartNameToIndexDict: Record<string, number>;
}>({} as never);
