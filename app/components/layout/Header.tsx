'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import LanguageSelector from './LanguageSelector';
import { WithTranslation } from '@/app/i18n/withLocalization';

interface HeaderProps extends WithTranslation {
  customClass?: string;
}

export default function HeaderBase({ t, customClass = '' }: HeaderProps) {
  const params = useParams();
  const locale = params?.locale as string || 'en';
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: `#`, label: t('header.privacySwap'), isProductLink: true },
    { href: `#`, label: t('header.aiChatbot'), isProductLink: true },
    { href: '#privacy-tools', label: t('header.about'), isProductLink: false, isAnchor: true }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const id = href.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setMobileMenuOpen(false);
        window.scrollTo({
          top: element.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-zinc-900/95 shadow-md' : 'bg-transparent'} ${customClass}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="relative z-50 pl-2">
            <div className="flex items-center">
              <Image 
                src="/ghostXLogo.png" 
                alt="ghostX Logo" 
                width={48} 
                height={48} 
                className="mr-2"
              />
              <span className="text-xl sm:text-2xl font-bold text-white">ghostX</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              link.isProductLink ? (
                <span 
                  key={index}
                  className="text-white hover:text-gray-300 transition-colors font-medium cursor-not-allowed opacity-70 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs bg-zinc-800 px-2 py-1 rounded text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity">
                    {t('common.soon')}
                  </span>
                </span>
              ) : link.isAnchor ? (
                <a 
                  key={index}
                  href={link.href}
                  className="text-white hover:text-gray-300 transition-colors font-medium"
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                >
                  {link.label}
                </a>
              ) : (
                <Link 
                  key={index}
                  href={link.href}
                  className="text-white hover:text-gray-300 transition-colors font-medium"
                >
                  {link.label}
                </Link>
              )
            ))}

            <LanguageSelector mode="header" />
          </nav>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden relative z-50 flex items-center mr-3"
            aria-label="Toggle menu"
          >
            <svg 
              className="w-6 h-6 text-white" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-zinc-900/95 border-t border-zinc-800 shadow-lg">
          <div className="py-3 px-4 space-y-3">
            {navLinks.map((link, index) => (
              <div key={index} className="py-2">
                {link.isProductLink ? (
                  <span className="text-white block font-medium cursor-not-allowed opacity-70">
                    {link.label}
                    <span className="ml-2 text-xs bg-zinc-800 px-1.5 py-0.5 rounded text-gray-300">
                      {t('common.soon')}
                    </span>
                  </span>
                ) : link.isAnchor ? (
                  <a 
                    href={link.href}
                    className="text-white block font-medium"
                    onClick={(e) => {
                      handleSmoothScroll(e, link.href);
                      setMobileMenuOpen(false);
                    }}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link 
                    href={link.href}
                    className="text-white block font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-2">
              <LanguageSelector customClass="flex-row items-center" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
} 