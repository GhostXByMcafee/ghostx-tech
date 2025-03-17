'use client';

import { IntlProvider } from 'react-intl';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import Head from 'next/head';

import messages from '@/app/i18n/messages';
import { getMetadata } from '@/app/metadata';
import '@/app/globals.css';
import ConsoleMessage from './components/utils/ConsoleMessage';

const inter = Inter({ subsets: ['latin'] });

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

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const locale = 'en' as LocaleKey;
  
  const metadata = getMetadata('en');
  
  const flattenedMessages = flattenMessages(messages[locale] as unknown as NestedMessages);

  return (
    <html lang={locale}>
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
      </head>
      <body className={inter.className}>
        <ConsoleMessage />
        <IntlProvider 
          locale={locale} 
          messages={flattenedMessages}
          defaultLocale="en"
        >
          {children}
        </IntlProvider>
      </body>
    </html>
  );
}
