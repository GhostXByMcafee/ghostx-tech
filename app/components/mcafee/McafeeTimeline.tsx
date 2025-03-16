'use client';

import { useIntl } from 'react-intl';
import { motion } from 'framer-motion';

type TimelineEvent = {
  year: string;
  titleKey: string;
  descriptionKey: string;
  side: 'left' | 'right';
};

export default function McafeeTimeline() {
  const intl = useIntl();
  
  const events: TimelineEvent[] = [
    {
      year: '1945',
      titleKey: 'mcafee.timeline.events.1945',
      descriptionKey: 'mcafee.timeline.events.1945',
      side: 'left'
    },
    {
      year: '1987',
      titleKey: 'mcafee.timeline.events.1987',
      descriptionKey: 'mcafee.timeline.events.1987',
      side: 'right'
    },
    {
      year: '2010',
      titleKey: 'mcafee.timeline.events.2010',
      descriptionKey: 'mcafee.timeline.events.2010',
      side: 'left'
    },
    {
      year: '2016',
      titleKey: 'mcafee.timeline.events.2016',
      descriptionKey: 'mcafee.timeline.events.2016',
      side: 'right'
    },
    {
      year: '2019',
      titleKey: 'mcafee.timeline.events.2019',
      descriptionKey: 'mcafee.timeline.events.2019',
      side: 'left'
    },
    {
      year: '2021',
      titleKey: 'mcafee.timeline.events.2021',
      descriptionKey: 'mcafee.timeline.events.2021',
      side: 'right'
    }
  ];

  return (
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
                {event.titleKey.includes('.') 
                  ? intl.formatMessage({ id: event.titleKey })
                  : event.titleKey}
              </h3>
              <p className="text-gray-400">
                {event.descriptionKey.includes('.')
                  ? intl.formatMessage({ id: event.descriptionKey })
                  : event.descriptionKey}
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
  );
} 