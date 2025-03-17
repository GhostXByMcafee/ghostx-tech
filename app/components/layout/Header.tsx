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
          <Link href={locale === 'en' ? '/' : `/${locale}`} className="relative z-50">
            <div className="relative h-10 w-32 md:h-12 md:w-40">
              <Image 
                src="/ghostXLogo.png" 
                alt="GhostX"
                fill
                className="object-contain"
                priority
              />
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
            className="md:hidden text-white z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <span className="text-2xl">✕</span>
            ) : (
              <span className="text-2xl">☰</span>
            )}
          </button>
        </div>
      </div>

      <div className={`fixed inset-0 bg-zinc-900/98 z-40 flex flex-col items-center justify-center transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <nav className="flex flex-col items-center space-y-6 text-xl">
          {navLinks.map((link, index) => (
            link.isProductLink ? (
              <span 
                key={index}
                className="text-white hover:text-gray-300 transition-colors font-medium cursor-not-allowed opacity-70 relative"
              >
                {link.label}
                <span className="ml-2 text-sm bg-zinc-800 px-2 py-1 rounded-full text-gray-300">
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
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            )
          ))}
          
          <div className="mt-6">
            <LanguageSelector />
          </div>
        </nav>
      </div>
    </header>
  );
} 