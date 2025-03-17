export const baseMetadata = {
  en: {
    title: 'ghostX - Privacy Tools Inspired by John McAfee',
    description: 'ghostX provides privacy-focused tools inspired by John McAfee\'s vision for digital freedom',
    keywords: 'privacy, encryption, John McAfee, digital freedom, secure communication'
  },
  es: {
    title: 'ghostX - Herramientas de Privacidad Inspiradas por John McAfee',
    description: 'ghostX ofrece herramientas enfocadas en la privacidad inspiradas en la visión de John McAfee sobre la libertad digital',
    keywords: 'privacidad, cifrado, John McAfee, libertad digital, comunicación segura'
  },
  pt: {
    title: 'ghostX - Ferramentas de Privacidade Inspiradas por John McAfee',
    description: 'ghostX fornece ferramentas focadas em privacidade inspiradas na visão de John McAfee para liberdade digital',
    keywords: 'privacidade, criptografia, John McAfee, liberdade digital, comunicação segura'
  }
};

export function getMetadata(locale: string = 'en') {
  const validLocale = ['en', 'es', 'pt'].includes(locale) ? locale : 'en';
  return baseMetadata[validLocale as keyof typeof baseMetadata];
} 