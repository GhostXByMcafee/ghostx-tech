'use client';

import { useIntl } from 'react-intl';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt, faLock, faCode } from '@fortawesome/free-solid-svg-icons';

export default function LegacySection() {
  const intl = useIntl();
  const params = useParams();
  const locale = params?.locale as string || 'en';
  
  const principles = [
    {
      id: 'mcafee.legacy.principles.p1.title',
      description: 'mcafee.legacy.principles.p1.description',
      icon: faShieldAlt
    },
    {
      id: 'mcafee.legacy.principles.p2.title',
      description: 'mcafee.legacy.principles.p2.description',
      icon: faLock
    },
    {
      id: 'mcafee.legacy.principles.p3.title',
      description: 'mcafee.legacy.principles.p3.description',
      icon: faCode
    }
  ];

  return (
    <section id="legacy" className="py-20 bg-zinc-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-white">
            {intl.formatMessage({ id: 'mcafee.legacy.heading' })}
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {intl.formatMessage({ id: 'mcafee.legacy.subheading' })}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-white mb-8">
              {intl.formatMessage({ id: 'mcafee.legacy.principles.title' })}
            </h3>
            <div className="space-y-6">
              {principles.map((principle, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-zinc-800 p-3 rounded-full mr-4">
                    <FontAwesomeIcon icon={principle.icon} className="text-white h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">
                      {intl.formatMessage({ id: principle.id })}
                    </h4>
                    <p className="text-gray-400">
                      {intl.formatMessage({ id: principle.description })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-zinc-800 p-8 rounded-lg h-full flex flex-col justify-center">
              <h3 className="text-3xl font-bold text-white mb-4">
                {intl.formatMessage({ id: 'mcafee.legacy.join.title' })}
              </h3>
              <p className="text-gray-300 mb-8 text-lg">
                {intl.formatMessage({ id: 'mcafee.legacy.join.description' })}
              </p>
              <div>
                <a
                  href="https://t.me/ghostxtech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white hover:bg-gray-200 text-black font-bold py-3 px-6 rounded-md transition duration-300 inline-block text-center"
                >
                  {intl.formatMessage({ id: 'mcafee.legacy.join.cta' })}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 