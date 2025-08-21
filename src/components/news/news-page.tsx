"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getNewsAction } from '@/lib/actions';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Newspaper, AlertTriangle } from 'lucide-react';

type Article = {
  headline: string;
  summary: string;
  source: string;
  imageKeywords: string;
};

type NewsCategory = 'General News' | 'JEE News' | 'UPSC News' | 'UPSC Articles' | 'Literature';

const newsCategories: NewsCategory[] = ['General News', 'JEE News', 'UPSC News', 'UPSC Articles', 'Literature'];

const ArticleCard = ({ article }: { article: Article }) => {
  return (
    <Card className="flex flex-col md:flex-row overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-0 h-full">
      <div className="md:w-1/3 relative aspect-video md:aspect-square">
        <Image
          src={`https://placehold.co/400x400.png`}
          data-ai-hint={article.imageKeywords}
          alt={article.headline}
          fill
          className="object-cover"
        />
      </div>
      <div className="md:w-2/3 flex flex-col">
        <CardHeader>
          <h3 className="text-lg font-bold leading-snug">{article.headline}</h3>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-muted-foreground text-sm">{article.summary}</p>
        </CardContent>
        <CardFooter>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{article.source}</p>
        </CardFooter>
      </div>
    </Card>
  );
};

export default function NewsPageClient() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<NewsCategory>('General News');

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await getNewsAction({ category });
        setArticles(result.articles);
      } catch (err) {
        console.error("Failed to get news:", err);
        setError("Could not load news at this time. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();
  }, [category]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex flex-col md:flex-row gap-4">
              <Skeleton className="h-48 w-full md:w-1/3" />
              <div className="w-full md:w-2/3 space-y-2">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-16 w-full" />
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (error) {
        return (
             <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg min-h-[40vh] bg-destructive/10 border-destructive">
                <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
                <h3 className="text-lg font-semibold text-destructive-foreground">An Error Occurred</h3>
                <p className="text-destructive-foreground/80">{error}</p>
            </div>
        )
    }

    if (articles.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg min-h-[40vh]">
          <Newspaper className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold">No Articles Found</h3>
          <p className="text-muted-foreground">The AI couldn't find any articles for this category right now.</p>
        </div>
      );
    }
    
    return (
        <div className="space-y-6">
            {articles.map((article, index) => (
                <ArticleCard key={index} article={article} />
            ))}
        </div>
    )
  };

  return (
    <div className="space-y-6">
      <div className="max-w-xs">
        <Select value={category} onValueChange={(value: NewsCategory) => setCategory(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {newsCategories.map((cat) => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {renderContent()}
    </div>
  );
}
