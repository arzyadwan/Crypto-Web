import Link from 'next/link';
import { Zap } from 'lucide-react';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-2xl font-bold font-headline">
      <Zap className="h-7 w-7 text-primary" />
      <span className="text-white">Crypto</span><span className="text-primary">Exist</span>
    </Link>
  );
}
