'use client';

import { useState, useRef, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useIntl } from 'react-intl';
import Image from 'next/image';

interface LanguageSelectorProps {
  customClass?: string;
  mode?: 'header' | 'footer';
}

export default function LanguageSelector({ customClass = '', mode = 'header' }: LanguageSelectorProps) {
  const params = useParams();
  const intl = useIntl();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentLocale = params?.locale as string || 'en';
  
  const languages = [
    { code: 'en', name: 'English', flag: '/flags/en.png' },
    { code: 'es', name: 'Español', flag: '/flags/es.png' },
    { code: 'pt', name: 'Português', flag: '/flags/pt.png' }
  ];
  
  const t = (id: string) => {
    try {
      return intl.formatMessage({ id });
    } catch (error) {
      return id;
    }
  };
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);
  
  const currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[0];
  
  const changeLanguage = (code: string) => {
    if (code === currentLocale) return;
    
    const currentPath = window.location.pathname;
    
    if (currentPath === '/') {
      if (code === 'en') {
        window.location.href = '/';
      } else {
        window.location.href = `/${code}`;
      }
      return;
    }
    
    const segments = currentPath.split('/').filter(Boolean);
    if (languages.map(l => l.code).includes(segments[0])) {
      const pathWithoutLocale = '/' + segments.slice(1).join('/');
      
      if (code === 'en') {
        window.location.href = pathWithoutLocale;
      } else {
        window.location.href = `/${code}${pathWithoutLocale}`;
      }
    } else {
      if (code === 'en') {
        return;
      } else {
        window.location.href = `/${code}${currentPath}`;
      }
    }
  };

  return (
    <div ref={dropdownRef} className={`relative ${customClass}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 rounded-full ${
          mode === 'header' ? 'text-white' : 'text-gray-300'
        } hover:bg-black/20 p-2 transition duration-200`}
        aria-label={t('common.selectLanguage') || 'Seleccionar idioma'}
      >
        <div className="relative h-5 w-7">
          <Image
            src={currentLanguage.flag}
            alt={currentLanguage.name}
            fill
            className="object-cover rounded-sm"
          />
        </div>
        <span className="text-sm">{currentLanguage.code.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div className="absolute mt-2 right-0 w-48 bg-zinc-800 rounded-lg shadow-lg z-50 overflow-hidden">
          <ul className="py-1">
            {languages.map((language) => (
              <li 
                key={language.code}
                onClick={() => {
                  changeLanguage(language.code);
                  setIsOpen(false);
                }}
                className={`
                  px-4 py-2 flex items-center space-x-3 hover:bg-zinc-700 cursor-pointer transition
                  ${language.code === currentLocale ? 'bg-zinc-700' : ''}
                `}
              >
                <div className="relative h-4 w-6">
                  <Image
                    src={language.flag}
                    alt={language.name}
                    fill
                    className="object-cover rounded-sm"
                  />
                </div>
                <span className="text-white">{language.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 