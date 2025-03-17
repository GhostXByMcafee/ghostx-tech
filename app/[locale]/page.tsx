'use client';

import { useParams } from 'next/navigation';
import { Header, Footer, Hero, PrivacyTools, QuotesSection, TimelineSection, LegacySection, VideoCarousel } from '../components/LocalizedComponents';

export default function LocalePage() {
  const params = useParams();
  const locale = params?.locale as string;
  
  return (
    <>
      <Header />
      <main>
        <Hero />
        <PrivacyTools />
        <VideoCarousel />
        <QuotesSection />
        <TimelineSection />
        <LegacySection />
      </main>
      <Footer />
    </>
  );
} 