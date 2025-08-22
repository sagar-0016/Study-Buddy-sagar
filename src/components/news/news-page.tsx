"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getNewsAction } from '@/lib/actions';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Newspaper, AlertTriangle, X, Bot, Tv, Zap, BarChart, ExternalLink } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type Article = {
  headline: string;
  summary: string;
  fullContent: string;
  source: string;
  imageUrl?: string;
  url: string;
};

type NewsCategory = 'General' | 'JEE' | 'UPSC' | 'History' | 'Literature';
const newsCategories: NewsCategory[] = ['General', 'JEE', 'UPSC', 'History', 'Literature'];
type NewsMode = 'live' | 'ai';
type SortMode = 'latest' | 'relevant';
type ApiSource = 'auto' | 'gnews' | 'newsdata';

const ArticleImage = ({ article }: { article: Article }) => {
    // This component now assumes article.imageUrl exists.
    // The fallback is removed as the parent component will handle conditional rendering.
    return (
        <Image
            src={article.imageUrl!}
            alt={article.headline}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized={true} // Good for external, sometimes problematic URLs
        />
    )
}

const ArticleCard = ({ article, onReadMore }: { article: Article; onReadMore: () => void; }) => {
  return (
    <motion.div
      layoutId={`card-${article.headline}-${article.url}`}
      className="block group cursor-pointer"
      onClick={onReadMore}
    >
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col border-0">
        {article.imageUrl && (
            <div className="relative aspect-video overflow-hidden">
                <ArticleImage article={article} />
            </div>
        )}
        <CardContent className={cn("p-4 flex-grow flex flex-col")}>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{article.source}</p>
          <h3 className="font-bold text-base leading-snug flex-grow">{article.headline}</h3>
          <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{article.summary}</p>
          <div className="flex justify-between items-center mt-4">
             <span className="text-sm font-semibold text-primary">Read More</span>
             {article.source === 'Study Buddy System' && <Bot className="h-4 w-4 text-muted-foreground" title="AI-Generated Content" />}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ExpandedArticle = ({ article, onClose }: { article: Article | null; onClose: () => void; }) => {
  if (!article) return null;

  // Check if the full content HTML string contains an <img> tag.
  const contentHasImage = /<img[^>]+>/i.test(article.fullContent);
  const showTopImage = article.imageUrl && !contentHasImage;
  
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      
      <motion.div layoutId={`card-${article.headline}-${article.url}`} className="relative z-10 w-full max-w-3xl">
         <Card className="max-h-[85vh] flex flex-col overflow-hidden">
          <CardContent className="p-6 md:p-8 overflow-y-auto">
             {showTopImage && (
              <div className="relative aspect-video mb-6 rounded-lg overflow-hidden">
                <ArticleImage article={article} />
              </div>
            )}
             <div className="flex justify-between items-start mb-2">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{article.source}</p>
                 {article.source === 'Study Buddy System' && (
                    <div className="flex items-center gap-1 text-xs font-semibold bg-muted text-muted-foreground px-2 py-1 rounded-full">
                        <Bot className="h-3 w-3" />
                        <span>AI-Generated</span>
                    </div>
                )}
             </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{article.headline}</h2>
            <div 
              className="prose prose-sm dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: article.fullContent || "<p>No content available.</p>" }}
            />
            {article.url !== '#' && (
                 <Button asChild className="mt-6">
                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                        Read Original Article <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                </Button>
            )}
          </CardContent>
        </Card>
      </motion.div>
       <button onClick={onClose} className="absolute top-4 right-4 z-20 text-foreground/70 hover:text-foreground bg-background/50 rounded-full p-1">
          <X className="h-6 w-6" />
      </button>
    </motion.div>
  );
};


export default function NewsPageClient() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<NewsCategory>('General');
  const [mode, setMode] = useState<NewsMode>('live');
  const [sort, setSort] = useState<SortMode>('latest');
  const [apiSource, setApiSource] = useState<ApiSource>('auto');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      setError(null);
      setArticles([]);
      
      try {
        const result = await getNewsAction({ 
            category, 
            useAi: mode === 'ai',
            sortBy: sort,
            sourceApi: apiSource,
        });

        if (result.debugUrls && result.debugUrls.length > 0) {
            result.debugUrls.forEach(url => console.log(`Fetched API URL: ${url}`));
        }

        if (result.articles.length > 0 && (result.articles[0].headline.includes('Failed') || result.articles[0].headline.includes('Error'))) {
            setError(result.articles[0].fullContent);
        } else {
            setArticles(result.articles);
        }
      } catch (err) {
        console.error("Failed to get news:", err);
        setError("Could not load news at this time. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();
  }, [category, mode, sort, apiSource]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
             <div key={i} className="space-y-2">
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-12 w-3/4" />
            </div>
          ))}
        </div>
      );
    }

    if (error) {
        return (
             <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg min-h-[40vh] bg-destructive/10 border-destructive">
                <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
                <h3 className="text-lg font-semibold text-destructive">An Error Occurred</h3>
                <p className="text-destructive max-w-prose dark:text-destructive-foreground/80">{error}</p>
            </div>
        )
    }

    if (articles.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg min-h-[40vh]">
          <Newspaper className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold">No Articles Found</h3>
          <p className="text-muted-foreground">There are no articles for this category and mode right now.</p>
        </div>
      );
    }
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
                <ArticleCard key={`${article.headline}-${article.url}`} article={article} onReadMore={() => setSelectedArticle(article)} />
            ))}
        </div>
    )
  };

  return (
    <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
             <div className="w-full">
                <Select value={category} onValueChange={(value: NewsCategory) => setCategory(value)}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                    {newsCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                </SelectContent>
                </Select>
            </div>

            <div className="flex justify-center items-center">
                 <div className="flex items-center space-x-2 bg-muted p-1 rounded-lg">
                    <Button 
                        variant={mode === 'live' ? 'secondary' : 'ghost'} 
                        onClick={() => setMode('live')}
                        className="px-3 py-1 h-8 shadow-sm text-secondary-foreground"
                    >
                        <Tv className="mr-2 h-4 w-4"/>
                        Live News
                    </Button>
                    <Button 
                        variant={mode === 'ai' ? 'secondary' : 'ghost'} 
                        onClick={() => setMode('ai')}
                        className="px-3 py-1 h-8 shadow-sm text-secondary-foreground"
                    >
                        <Bot className="mr-2 h-4 w-4"/>
                        AI Generated
                    </Button>
                </div>
            </div>

            {mode === 'live' && (
                <div className="flex justify-center lg:justify-end">
                     <div className="flex items-center space-x-2 bg-muted p-1 rounded-lg">
                        <Button 
                            variant={sort === 'latest' ? 'secondary' : 'ghost'} 
                            onClick={() => setSort('latest')}
                            className="px-3 py-1 h-8 shadow-sm text-secondary-foreground"
                        >
                            <Zap className="mr-2 h-4 w-4"/>
                            Latest
                        </Button>
                        <Button 
                            variant={sort === 'relevant' ? 'secondary' : 'ghost'} 
                            onClick={() => setSort('relevant')}
                            className="px-3 py-1 h-8 shadow-sm text-secondary-foreground"
                        >
                            <BarChart className="mr-2 h-4 w-4"/>
                            Relevant
                        </Button>
                    </div>
                </div>
            )}
        </div>
        
        {mode === 'live' && (
            <Card className="p-2 border-0">
                <CardContent className="p-0">
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        <Button variant={apiSource === 'auto' ? 'default' : 'outline'} size="sm" onClick={() => setApiSource('auto')}>Auto</Button>
                        <Button variant={apiSource === 'gnews' ? 'default' : 'outline'} size="sm" onClick={() => setApiSource('gnews')}>GNews</Button>
                        <Button variant={apiSource === 'newsdata' ? 'default' : 'outline'} size="sm" onClick={() => setApiSource('newsdata')}>NewsData.io</Button>
                    </div>
                </CardContent>
            </Card>
        )}
        
        {renderContent()}

        <AnimatePresence>
            {selectedArticle && (
                <ExpandedArticle article={selectedArticle} onClose={() => setSelectedArticle(null)} />
            )}
        </AnimatePresence>
    </div>
  );
}
