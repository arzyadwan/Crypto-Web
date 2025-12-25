import { GlobalTicker } from '@/components/global-ticker';
import { Navbar } from '@/components/navbar';
import { HeroSection } from '@/components/hero-section';
import { SidebarWidgets } from '@/components/sidebar-widgets';
import { NewsCard } from '@/components/news-card';
import { getNews } from '@/lib/data';
import type { FullPost } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function Home() {
  const { posts } = await getNews(1, 11);

  const heroPost = posts[0] as FullPost | undefined;
  const trendingPosts = posts.slice(1, 4) as FullPost[];
  const otherPosts = posts.slice(4) as FullPost[];

  return (
    <>
      <GlobalTicker />
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-9">
            {heroPost && <HeroSection mainArticle={heroPost} trendingArticles={trendingPosts} />}
            
            <section className="mt-12">
              <h2 className="text-3xl font-headline font-bold text-primary mb-6 border-b-2 border-primary/20 pb-2">
                Latest News
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {otherPosts.map((post) => (
                  <NewsCard key={post.id} post={post} />
                ))}
              </div>
            </section>
            
            {posts.length > 10 && (
              <div className="text-center mt-12">
                <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  <Link href="#">View More Articles</Link>
                </Button>
              </div>
            )}
          </div>
          
          <aside className="lg:col-span-3">
            <SidebarWidgets />
          </aside>
        </div>
      </main>
    </>
  );
}
