'use client';

import { Header, Footer, Hero, PrivacyTools, QuotesSection, TimelineSection, LegacySection } from './components/LocalizedComponents';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <PrivacyTools />
        <QuotesSection />
        <TimelineSection />
        <LegacySection />
      </main>
      <Footer />
    </>
  );
}
