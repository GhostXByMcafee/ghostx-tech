'use client';

import HeaderBase from './layout/Header';
import FooterBase from './layout/Footer';
import HeroBase from './mcafee/Hero';
import PrivacyToolsBase from './mcafee/PrivacyTools';
import QuotesSectionBase from './mcafee/QuotesSection';
import TimelineSectionBase from './mcafee/TimelineSection';
import LegacySectionBase from './mcafee/LegacySection';
import { withLocalization } from '@/app/i18n/withLocalization';

export const Header = withLocalization(HeaderBase, '');
export const Footer = withLocalization(FooterBase, '');

export const Hero = withLocalization(HeroBase, 'mcafee.hero');
export const PrivacyTools = withLocalization(PrivacyToolsBase, 'mcafee.tools');
export const QuotesSection = withLocalization(QuotesSectionBase, 'mcafee.quotes');
export const TimelineSection = withLocalization(TimelineSectionBase, 'mcafee.timeline');
export const LegacySection = withLocalization(LegacySectionBase, 'mcafee.legacy'); 