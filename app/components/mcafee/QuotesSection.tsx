'use client';

import { useIntl } from 'react-intl';
import { motion } from 'framer-motion';

export default function QuotesSection() {
  const intl = useIntl();

  const quotes = [
    {
      id: 'quote1',
      text: intl.formatMessage({ id: 'mcafee.quotes.quote1.text' }),
      year: intl.formatMessage({ id: 'mcafee.quotes.quote1.year' })
    },
    {
      id: 'quote2',
      text: intl.formatMessage({ id: 'mcafee.quotes.quote2.text' }),
      year: intl.formatMessage({ id: 'mcafee.quotes.quote2.year' })
    },
    {
      id: 'quote3',
      text: intl.formatMessage({ id: 'mcafee.quotes.quote3.text' }),
      year: intl.formatMessage({ id: 'mcafee.quotes.quote3.year' })
    }
  ];

  return (
    <section className="py-20 px-4 bg-zinc-900">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {intl.formatMessage({ id: 'mcafee.quotes.heading' })}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-1 gap-8">
          {quotes.map((quote, index) => (
            <motion.div
              key={quote.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-zinc-800 border border-zinc-700 p-8 rounded-lg"
            >
              <p className="text-xl md:text-2xl italic text-gray-300 mb-6">
                &quot;{quote.text}&quot;
              </p>
              <div className="flex justify-end">
                <span className="text-gray-400">— John McAfee, {quote.year}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 