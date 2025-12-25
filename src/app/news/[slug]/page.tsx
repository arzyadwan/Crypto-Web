import { getNewsBySlug } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { GlobalTicker } from '@/components/global-ticker';
import { Navbar } from '@/components/navbar';
import { Clock, UserCircle } from 'lucide-react';

export default async function NewsArticlePage({ params }: { params: { slug: string } }) {
  const post = await getNewsBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <GlobalTicker />
      <Navbar />
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <article className="space-y-8">
          <header className="space-y-4">
            {post.category && (
              <Badge style={{ backgroundColor: post.category.color, color: '#0A0A0A' }} className="font-bold">
                {post.category.name}
              </Badge>
            )}
            <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-primary">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={post.author?.image || undefined} alt={post.author?.name || 'Author'} />
                  <AvatarFallback>
                    <UserCircle />
                  </AvatarFallback>
                </Avatar>
                <span>{post.author?.name || 'CryptoExist Staff'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <time dateTime={post.publishedAt.toISOString()}>
                  {format(post.publishedAt, 'MMMM d, yyyy')}
                </time>
              </div>
            </div>
          </header>

          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </div>

          <div
            className="prose prose-invert prose-lg max-w-none text-foreground prose-p:text-slate-300 prose-headings:text-primary prose-a:text-accent prose-strong:text-primary"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
    </>
  );
}
