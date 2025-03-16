'use client';

import { useIntl } from 'react-intl';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function QuoteCarousel() {
  const intl = useIntl();
  const [currentQuote, setCurrentQuote] = useState(0);
  
  const quotes = [
    intl.formatMessage({ id: 'mcafee.quotes.privacy' }),
    intl.formatMessage({ id: 'mcafee.quotes.government' }),
    intl.formatMessage({ id: 'mcafee.quotes.crypto' }),
    intl.formatMessage({ id: 'mcafee.quotes.freedom' })
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-black to-zinc-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-center text-3xl md:text-4xl font-bold text-white mb-12">
          {intl.formatMessage({ id: 'mcafee.quotes.heading' })}
        </h2>
        
        <div className="relative h-60 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuote}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7 }}
              className="absolute text-xl md:text-2xl text-center italic font-medium text-gray-100"
            >
              &quot;{quotes[currentQuote]}&quot;
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
} 