'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt, faRobot } from '@fortawesome/free-solid-svg-icons';
import { WithTranslation } from '@/app/i18n/withLocalization';

interface PrivacyToolsProps extends WithTranslation {
  customClass?: string;
}

export default function PrivacyToolsBase({ t, customClass = '' }: PrivacyToolsProps) {
  const privacyTools = [
    {
      title: 'privacySwap.title',
      description: 'privacySwap.description',
      cta: 'privacySwap.cta',
      icon: faExchangeAlt,
      href: `#`
    },
    {
      title: 'chatbot.title',
      description: 'chatbot.description',
      cta: 'chatbot.cta',
      icon: faRobot,
      href: `https://t.me/ghostxtech`
    }
  ];

  return (
    <section id="privacy-tools" className={`py-20 ${customClass}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-white">{t('heading')}</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t('subheading')}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {privacyTools.map((tool, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-zinc-900 rounded-xl p-6 flex flex-col h-full"
            >
              <div className="mb-4">
                <div className="bg-zinc-700 p-6 rounded-full inline-block mb-2">
                  <FontAwesomeIcon 
                    icon={tool.icon} 
                    className="text-white h-16 w-16" 
                  />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">{t(tool.title)}</h3>
              <p className="text-gray-400 flex-grow mb-6">{t(tool.description)}</p>
              
              {tool.title === 'chatbot.title' ? (
                <a 
                  href={tool.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-zinc-800 text-white font-medium py-2 px-4 rounded-full w-full border border-white hover:bg-white hover:text-black transition-all duration-300 text-center"
                >
                  {t(tool.cta)}
                </a>
              ) : (
                <button 
                  disabled
                  className="bg-zinc-800 cursor-not-allowed opacity-70 text-white font-medium py-2 px-4 rounded-full w-full border border-white"
                >
                  {t('common.soon')}
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 