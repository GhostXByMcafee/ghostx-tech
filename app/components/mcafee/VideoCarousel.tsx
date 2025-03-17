'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import YouTube from 'react-youtube';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { WithTranslation } from '@/app/i18n/withLocalization';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface VideoCarouselProps extends WithTranslation {
  customClass?: string;
}

interface VideoData {
  id: string;
  title: string;
  description: string;
}

export default function VideoCarouselBase({ t, customClass = '' }: VideoCarouselProps) {
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRefs = useRef<any[]>([]);

  const videos: VideoData[] = [
    {
      id: 'klj99FL-QV8',
      title: 'video1.title',
      description: 'video1.description'
    },
    {
      id: 'apI1T_w9GRM',
      title: 'video2.title',
      description: 'video2.description'
    },
    {
      id: '8uEqk2p9MZU',
      title: 'video3.title',
      description: 'video3.description'
    }
  ];

  useEffect(() => {
    if (activeVideoIndex !== null && playerRefs.current[activeVideoIndex]) {
      const player = playerRefs.current[activeVideoIndex];
      if (isPlaying) {
        player?.playVideo();
      } else {
        player?.pauseVideo();
      }
    }
  }, [activeVideoIndex, isPlaying]);

  const handleCloseVideo = () => {
    if (activeVideoIndex !== null && playerRefs.current[activeVideoIndex]) {
      playerRefs.current[activeVideoIndex]?.pauseVideo();
    }
    setActiveVideoIndex(null);
    setIsPlaying(false);
  };

  const youtubeOpts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,
      modestbranding: 1,
      rel: 0,
      showinfo: 0
    }
  };

  const onReady = (event: any, index: number) => {
    playerRefs.current[index] = event.target;
  };

  return (
    <section id="videos" className={`py-20 bg-zinc-800 ${customClass}`}>
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

        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            className="py-10"
          >
            {videos.map((video, index) => (
              <SwiperSlide key={video.id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-zinc-900 rounded-xl overflow-hidden shadow-lg h-[300px] cursor-pointer transform transition-transform hover:scale-105"
                  onClick={() => {
                    setActiveVideoIndex(index);
                    setIsPlaying(true);
                  }}
                >
                  <div className="relative h-[160px] w-full">
                    <img
                      src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                      alt={t(video.title)}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-red-600 rounded-full w-12 h-12 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-2 text-white">{t(video.title)}</h3>
                    <p className="text-gray-400 line-clamp-3">{t(video.description)}</p>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <AnimatePresence>
        {activeVideoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            onClick={handleCloseVideo}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="w-full max-w-4xl bg-zinc-900 rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video">
                <YouTube
                  videoId={videos[activeVideoIndex].id}
                  opts={youtubeOpts}
                  onReady={(e) => onReady(e, activeVideoIndex)}
                  className="w-full h-full"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold text-white">
                    {t(videos[activeVideoIndex].title)}
                  </h3>
                  <button
                    onClick={handleCloseVideo}
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label="Cerrar video"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <p className="text-gray-400">{t(videos[activeVideoIndex].description)}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
} 