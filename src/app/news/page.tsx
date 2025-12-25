import { GlobalTicker } from '@/components/global-ticker';
import { Navbar } from '@/components/navbar';
import { NewsCard } from '@/components/news-card';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { getNews } from '@/lib/data';

const NEWS_PER_PAGE = 10;

interface NewsPageProps {
  searchParams?: {
    page?: string;
  };
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const currentPage = Number(searchParams?.page) || 1;
  const { posts, totalPages } = await getNews(currentPage, NEWS_PER_PAGE);

  const renderPagination = () => {
    const pages = [];
    const maxPagesToShow = 5;
    const ellipsis = <PaginationItem key="ellipsis"><PaginationEllipsis /></PaginationItem>;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink href={`/news?page=${i}`} isActive={i === currentPage}>
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
        pages.push(
          <PaginationItem key={1}>
            <PaginationLink href={`/news?page=1`} isActive={1 === currentPage}>
              1
            </PaginationLink>
          </PaginationItem>
        );

        if (currentPage > 3) {
            pages.push(ellipsis);
        }

        let startPage = Math.max(2, currentPage - 1);
        let endPage = Math.min(totalPages - 1, currentPage + 1);

        if (currentPage <= 2) {
            startPage = 2;
            endPage = 4;
        }
        if (currentPage >= totalPages -1) {
            startPage = totalPages - 3;
            endPage = totalPages - 1;
        }
        
        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <PaginationItem key={i}>
                    <PaginationLink href={`/news?page=${i}`} isActive={i === currentPage}>
                    {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        if (currentPage < totalPages - 2) {
            pages.push(ellipsis);
        }

        pages.push(
          <PaginationItem key={totalPages}>
            <PaginationLink href={`/news?page=${totalPages}`} isActive={totalPages === currentPage}>
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        );
    }


    return pages;
  };

  return (
    <>
      <GlobalTicker />
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-headline font-bold text-primary mb-8 border-b-2 border-primary/20 pb-4">
          All News
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <NewsCard key={post.id} post={post} />
          ))}
        </div>

        <div className="mt-12">
          <Pagination>
            <PaginationContent>
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious href={`/news?page=${currentPage - 1}`} />
                </PaginationItem>
              )}
              {renderPagination()}
              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationNext href={`/news?page=${currentPage + 1}`} />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      </main>
    </>
  );
}
