'use client';

import { Header, Footer, Hero, PrivacyTools, QuotesSection, TimelineSection, LegacySection, VideoCarousel } from './components/LocalizedComponents';

export default function HomePage() {
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
