import { NextResponse } from 'next/server';
import { getMarketTickers } from '@/lib/data';

export async function GET() {
  try {
    const tickers = await getMarketTickers();
    return NextResponse.json(tickers);
  } catch (error) {
    if (error instanceof Error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Failed to fetch market data' }, { status: 500 });
  }
}
