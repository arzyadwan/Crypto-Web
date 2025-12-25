import { CryptoConverter } from './crypto-converter';
import { FearGreedIndex } from './fear-greed-index';

export function SidebarWidgets() {
  return (
    <div className="sticky top-24 space-y-8">
      <CryptoConverter />
      <FearGreedIndex />
    </div>
  );
}
