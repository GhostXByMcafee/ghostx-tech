'use client';

import React from 'react';
import { useIntl } from 'react-intl';
import { useParams } from 'next/navigation';

export interface WithTranslation {
  t: (key: string, defaultMessage?: string) => string;
}

export function withLocalization<P extends object>(
  Component: React.ComponentType<P & WithTranslation>,
  translationPrefix: string = ''
) {
  const LocalizedComponent = (props: Omit<P, keyof WithTranslation>) => {
    const intl = useIntl();
    const params = useParams();
    
    const t = (key: string, defaultMessage?: string) => {
      const fullKey = translationPrefix ? `${translationPrefix}.${key}` : key;
      
      try {
        return intl.formatMessage({ id: fullKey }, {});
      } catch (error) {
        console.warn(`Translation key not found: ${fullKey}`, error);
        return defaultMessage || key;
      }
    };
    
    return <Component {...props as P} t={t} />;
  };
  
  const displayName = Component.displayName || Component.name || 'Component';
  LocalizedComponent.displayName = `Localized(${displayName})`;
  
  return LocalizedComponent;
} 