'use client';

import { motion } from 'framer-motion';
import { WithTranslation } from '@/app/i18n/withLocalization';

interface TimelineSectionProps extends WithTranslation {
  customClass?: string;
}

export default function TimelineSectionBase({ t, customClass = '' }: TimelineSectionProps) {
  const events = [
    {
      year: '1945',
      title: 'events.1945.title',
      description: 'events.1945.description',
      side: 'left'
    },
    {
      year: '1987',
      title: 'events.1987.title',
      description: 'events.1987.description',
      side: 'right'
    },
    {
      year: '2010',
      title: 'events.2010.title',
      description: 'events.2010.description',
      side: 'left'
    },
    {
      year: '2016',
      title: 'events.2016.title',
      description: 'events.2016.description',
      side: 'right'
    },
    {
      year: '2019',
      title: 'events.2019.title',
      description: 'events.2019.description',
      side: 'left'
    },
    {
      year: '2021',
      title: 'events.2021.title',
      description: 'events.2021.description',
      side: 'right'
    }
  ];

  return (
    <section className={`py-20 ${customClass}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-white">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>
        
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gray-700"></div>
          
          <div className="relative">
            {events.map((event, index) => (
              <motion.div 
                key={event.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`mb-16 flex ${event.side === 'left' ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className={`w-5/12 ${event.side === 'left' ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                    {t(event.title)}
                  </h3>
                  <p className="text-gray-400">
                    {t(event.description)}
                  </p>
                </div>
                
                <div className="w-2/12 flex justify-center relative">
                  <div className="absolute top-0 -mt-1 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold z-10 shadow-md">
                    {event.year}
                  </div>
                </div>
                
                <div className="w-5/12"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 