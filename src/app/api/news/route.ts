import { NextResponse } from 'next/server';
import { getNews } from '@/lib/data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  
  try {
    const { posts, totalPages } = await getNews(page, limit);
    return NextResponse.json({ posts, totalPages });
  } catch (error) {
    if (error instanceof Error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}
