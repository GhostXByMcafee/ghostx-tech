'use client';

import { IntlProvider } from 'react-intl';
import { useParams } from 'next/navigation';
import { ReactNode } from 'react';
import Head from 'next/head';

import messages from '@/app/i18n/messages';
import { getMetadata } from '@/app/metadata';

type LocaleKey = keyof typeof messages;

interface NestedMessages {
  [key: string]: string | NestedMessages;
}

interface FlattenedMessages {
  [key: string]: string;
}

function flattenMessages(nestedMessages: NestedMessages, prefix = ''): FlattenedMessages {
  return Object.keys(nestedMessages).reduce((flatMessages: FlattenedMessages, key) => {
    const value = nestedMessages[key];
    const prefixedKey = prefix ? `${prefix}.${key}` : key;
    
    if (typeof value === 'string') {
      flatMessages[prefixedKey] = value;
    } else {
      Object.assign(flatMessages, flattenMessages(value as NestedMessages, prefixedKey));
    }
    
    return flatMessages;
  }, {});
}

export default function LocaleLayout({
  children,
}: {
  children: ReactNode;
}) {
  const params = useParams();
  const localeParam = (params?.locale as string) || 'en';
  
  const locale = (Object.keys(messages).includes(localeParam) 
    ? localeParam 
    : 'en') as LocaleKey;
    
  const metadata = getMetadata(locale);

  const flattenedMessages = flattenMessages(messages[locale] as unknown as NestedMessages);

  return (
    <>
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
      </head>
      <IntlProvider 
        locale={locale} 
        messages={flattenedMessages}
        defaultLocale="en"
      >
        {children}
      </IntlProvider>
    </>
  );
} 