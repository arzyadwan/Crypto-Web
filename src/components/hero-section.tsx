import type { FullPost } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from './ui/card';

interface HeroSectionProps {
  mainArticle: FullPost;
  trendingArticles: FullPost[];
}

export function HeroSection({ mainArticle, trendingArticles }: HeroSectionProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-4 gap-6 h-[600px]">
      {/* Main Article */}
      <Link href={`/news/${mainArticle.slug}`} className="block md:col-span-2 md:row-span-4 group relative overflow-hidden rounded-lg">
        <Card className="h-full w-full bg-card border-0 transition-all duration-300 group-hover:border-accent border-2">
            <Image
              src={mainArticle.imageUrl}
              alt={mainArticle.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint="main article"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              {mainArticle.category && (
                  <Badge style={{ backgroundColor: mainArticle.category.color, color: '#0A0A0A' }} className="font-bold mb-2">
                    {mainArticle.category.name}
                  </Badge>
              )}
              <h2 className="text-3xl font-headline font-bold text-white group-hover:text-primary transition-colors">
                {mainArticle.title}
              </h2>
              <p className="mt-2 text-sm text-slate-300 hidden md:block">{mainArticle.excerpt}</p>
            </div>
        </Card>
      </Link>

      {/* Trending Articles */}
      <div className="md:col-span-1 md:row-span-4 grid grid-cols-1 md:grid-rows-4 gap-6">
        {trendingArticles.map((article) => (
          <Link key={article.id} href={`/news/${article.slug}`} className="block group md:row-span-1">
            <Card className="h-full bg-card border-2 border-transparent transition-all duration-300 group-hover:border-accent">
                <CardContent className="p-4 flex gap-4 h-full">
                    <div className="relative w-24 h-full flex-shrink-0 overflow-hidden rounded-md">
                        <Image
                            src={article.imageUrl}
                            alt={article.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            data-ai-hint="trending news"
                             sizes="96px"
                        />
                    </div>
                    <div className="flex flex-col justify-center">
                        {article.category && (
                            <Badge variant="secondary" className="mb-1 text-xs self-start">{article.category.name}</Badge>
                        )}
                        <h3 className="text-sm font-semibold leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-3">
                            {article.title}
                        </h3>
                    </div>
                </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
