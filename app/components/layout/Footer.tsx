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
                  src="/logo.png" 
                  alt="GhostX"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-gray-400 mb-6">
              {t('footer.description')}
            </p>
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
              <div className="relative h-5 w-20">
                <Image 
                  src="/dexkit-logo-white.png" 
                  alt="DexKit"
                  fill
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