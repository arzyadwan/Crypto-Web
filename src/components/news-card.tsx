import type { FullPost } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { format } from 'date-fns';
import { ArrowRight } from 'lucide-react';

interface NewsCardProps {
  post: FullPost;
}

export function NewsCard({ post }: NewsCardProps) {
  return (
    <Link href={`/news/${post.slug}`} className="block group">
      <Card className="bg-card h-full flex flex-col border-2 border-transparent transition-all duration-300 hover:border-accent hover:shadow-lg hover:shadow-accent/10">
        <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint="news article"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <CardHeader>
          <div className="flex items-center justify-between gap-2 mb-2">
            {post.category && (
              <Badge style={{ backgroundColor: post.category.color, color: '#0A0A0A' }} className="font-bold text-xs">
                {post.category.name}
              </Badge>
            )}
            <time className="text-xs text-muted-foreground">
              {format(post.publishedAt, 'MMM d, yyyy')}
            </time>
          </div>
          <CardTitle className="text-lg font-headline font-semibold leading-tight group-hover:text-primary transition-colors">
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-between">
          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
            {post.excerpt}
          </p>
          <div className="flex items-center text-sm font-semibold text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Read More
            <ArrowRight className="ml-2 h-4 w-4" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
