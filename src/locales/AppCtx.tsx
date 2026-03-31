import React from 'react';

export const AppCtx = React.createContext<{
  i18n: {
    get: (key: string, params?: Record<string, string | number>) => string;
    language: string;
  };
  chartsData: Character[];
  aliasData: Alias[];
  chartNameToIndexDict: Record<string, number>;
}>({} as never);
