import type { Metadata } from 'next';
import NewsPageClient from '@/components/news/news-page';

export const metadata: Metadata = {
  title: 'News',
};

export default function NewsPage() {
  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-2xl font-bold tracking-tight">News & Articles</h1>
        <p className="text-muted-foreground">
          Stay updated with curated news and articles relevant to your goals.
        </p>
      </div>
      <NewsPageClient />
    </div>
  );
}
