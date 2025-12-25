import { getMarketTickers } from '@/lib/data';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export async function GlobalTicker() {
  const tickers = await getMarketTickers();

  return (
    <div className="bg-primary text-primary-foreground relative flex overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap py-2">
        {tickers.map((ticker) => (
          <div key={ticker.symbol} className="mx-4 flex items-center gap-2 text-sm font-semibold">
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
       <div className="absolute top-0 flex animate-marquee2 whitespace-nowrap py-2">
         {tickers.map((ticker) => (
          <div key={ticker.symbol} className="mx-4 flex items-center gap-2 text-sm font-semibold">
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

// Add keyframes for the second marquee animation to create a seamless loop
const style = `
@keyframes marquee2 {
  0% { transform: translateX(100%); }
  100% { transform: translateX(0%); }
}
.animate-marquee2 {
  animation: marquee2 45s linear infinite;
}`;

// This is a bit of a hack to inject keyframes, but works for this case.
// In a real app, this should be in a CSS file or tailwind.config.
if (typeof window !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = style;
  document.head.appendChild(styleSheet);
}
