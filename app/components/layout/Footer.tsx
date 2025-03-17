'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { WithTranslation } from '@/app/i18n/withLocalization';

interface FooterProps extends WithTranslation {
  customClass?: string;
}

export default function FooterBase({ t, customClass = '' }: FooterProps) {
  const params = useParams();
  const locale = params?.locale as string || 'en';
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { 
      href: '#', 
      label: t('header.privacySwap'), 
      isProductLink: true,
      disabled: true,
      isAnchor: false 
    },
    { 
      href: '#', 
      label: t('header.aiChatbot'), 
      isProductLink: true,
      disabled: true,
      isAnchor: false 
    },
    { 
      href: '#privacy-tools', 
      label: t('footer.about'), 
      isProductLink: false, 
      disabled: false,
      isAnchor: true 
    },
    { 
      href: '#', 
      label: t('footer.privacy'), 
      isProductLink: false,
      disabled: true,
      isAnchor: false 
    }
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#') && href !== '#') {
      e.preventDefault();
      const id = href.substring(1);
      const element = document.getElementById(id);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <footer className={`bg-zinc-900 text-gray-300 py-12 ${customClass}`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Link href={locale === 'en' ? '/' : `/${locale}`}>
              <div className="relative h-14 w-56 md:h-16 md:w-64 mb-6">
                <Image 
                  src="/ghostXLogo.png" 
                  alt="ghostX"
                  fill
                  sizes="(max-width: 768px) 224px, 256px"
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-gray-400 mb-6">
              {t('footer.description')}
            </p>
            <div className="mb-6">
              <div className="flex space-x-4">
                <a 
                  href="https://github.com/GhostXByMcafee" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="GitHub"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a 
                  href="https://x.com/intent/follow?screen_name=ghostX_____" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="X (Twitter)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">{t('footer.quickLinks')}</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  {link.disabled ? (
                    <span className={`${link.isProductLink ? 'text-gray-400' : 'text-gray-400'} cursor-not-allowed opacity-70 flex items-center`}>
                      {link.label}
                      {link.isProductLink && (
                        <span className="ml-2 text-xs bg-zinc-800 px-2 py-1 rounded text-gray-300">
                          {t('common.soon')}
                        </span>
                      )}
                    </span>
                  ) : link.isAnchor ? (
                    <a 
                      href={link.href} 
                      onClick={(e) => handleSmoothScroll(e, link.href)}
                      className={`hover:text-white transition-colors ${link.isProductLink ? 'text-gray-400' : 'text-gray-400'}`}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link 
                      href={link.href}
                      className={`hover:text-white transition-colors ${link.isProductLink ? 'text-gray-400' : 'text-gray-400'}`}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-800 text-center">
          <div className="text-gray-400 flex items-center justify-center">
            {t('footer.tribute')} <span className="text-red-500 mx-1">❤</span> {t('footer.by')} 
            <a
              href="https://dexkit.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-200 transition-colors flex items-center ml-1"
            >
              <div className="relative h-6 w-24">
                <Image 
                  src="/dexkit-logo-white.png" 
                  alt="DexKit"
                  fill
                  sizes="(max-width: 768px) 96px, 96px"
                  className="object-contain"
                />
              </div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
} 