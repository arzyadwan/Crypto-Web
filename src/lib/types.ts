import type { Post, Category, User, MarketTicker } from '@prisma/client';

export type FullPost = Post & {
  category: Category | null;
  author: User | null;
};

export type { Post, Category, User, MarketTicker };
