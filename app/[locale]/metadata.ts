import { getMetadata } from '@/app/metadata';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const locale = params.locale || 'en';
  const metadata = getMetadata(locale);
  
  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
  };
} 