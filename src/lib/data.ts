import prisma from './prisma';
import 'server-only';

export async function getMarketTickers() {
  try {
    const tickers = await prisma.marketTicker.findMany({
      orderBy: { symbol: 'asc' },
    });
    return tickers;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch market data.');
  }
}

export async function getNews(page = 1, limit = 10) {
  try {
    const skip = (page - 1) * limit;
    const posts = await prisma.post.findMany({
      skip,
      take: limit,
      include: {
        author: true,
        category: true,
      },
      orderBy: { publishedAt: 'desc' },
    });
    const totalPosts = await prisma.post.count();
    return { posts, totalPosts, totalPages: Math.ceil(totalPosts / limit) };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch news.');
  }
}

export async function getNewsBySlug(slug: string) {
  try {
    const post = await prisma.post.findUnique({
      where: { slug },
      include: {
        author: true,
        category: true,
      },
    });
    return post;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch post.');
  }
}
