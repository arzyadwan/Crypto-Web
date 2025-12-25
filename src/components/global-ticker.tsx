import { getMarketTickers } from '@/lib/data';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export async function GlobalTicker() {
  const tickers = await getMarketTickers();
  const allTickers = [...tickers, ...tickers]; // Duplicate for seamless loop

  return (
    <div className="bg-primary text-primary-foreground relative flex overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap py-2">
        {allTickers.map((ticker, index) => (
          <div key={`${ticker.symbol}-${index}`} className="mx-4 flex items-center gap-2 text-sm font-semibold">
            <span>{ticker.symbol}</span>
            <span>${ticker.price_usd.toLocaleString()}</span>
            <div className={cn(
              "flex items-center",
              ticker.change_24h >= 0 ? 'text-green-300' : 'text-red-300'
            )}>
              {ticker.change_24h >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              <span className="ml-1">{ticker.change_24h.toFixed(2)}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
