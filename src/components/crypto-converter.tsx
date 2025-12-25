"use client";

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { MarketTicker } from '@/lib/types';
import { ArrowRightLeft } from 'lucide-react';
import { Button } from './ui/button';

const USD_TO_IDR_RATE = 16200; // Static conversion rate for simplicity

export function CryptoConverter() {
  const [btcPrice, setBtcPrice] = useState<number | null>(null);
  const [idrAmount, setIdrAmount] = useState<string>('1000000');
  const [btcAmount, setBtcAmount] = useState<string>('');
  const [isCalculating, setIsCalculating] = useState(false);
  
  useEffect(() => {
    async function fetchBtcPrice() {
      try {
        const response = await fetch('/api/market');
        if (!response.ok) {
          throw new Error('Failed to fetch market data');
        }
        const tickers: MarketTicker[] = await response.json();
        const btcTicker = tickers.find(t => t.symbol === 'BTC');
        if (btcTicker) {
          setBtcPrice(btcTicker.price_usd);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchBtcPrice();
  }, []);

  const btcToIdrRate = useMemo(() => {
    if (!btcPrice) return null;
    return btcPrice * USD_TO_IDR_RATE;
  }, [btcPrice]);

  useEffect(() => {
    if (btcToIdrRate) {
      const idrValue = parseFloat(idrAmount.replace(/,/g, ''));
      if (!isNaN(idrValue)) {
        setIsCalculating(true);
        const calculatedBtc = idrValue / btcToIdrRate;
        setBtcAmount(calculatedBtc.toFixed(8));
        setIsCalculating(false);
      }
    }
  }, [idrAmount, btcToIdrRate]);

  const handleIdrChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setIdrAmount(value);
  };

  const handleBtcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBtcAmount(value);
    if (btcToIdrRate) {
      const btcValue = parseFloat(value);
      if (!isNaN(btcValue)) {
        const calculatedIdr = btcValue * btcToIdrRate;
        setIdrAmount(Math.round(calculatedIdr).toString());
      }
    }
  };
  
  const formattedIdrAmount = useMemo(() => {
      const num = parseInt(idrAmount, 10);
      return isNaN(num) ? '' : num.toLocaleString('id-ID');
  }, [idrAmount]);

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="font-headline text-xl text-primary">Crypto Converter</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="idr-amount">IDR</Label>
            <Input
              id="idr-amount"
              type="text"
              value={formattedIdrAmount}
              onChange={handleIdrChange}
              placeholder="1,000,000"
              className="font-code"
            />
          </div>
          
          <div className="flex justify-center">
            <Button variant="ghost" size="icon" className="cursor-default">
              <ArrowRightLeft className="h-5 w-5 text-accent" />
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="btc-amount">BTC</Label>
            <Input
              id="btc-amount"
              type="text"
              value={isCalculating ? '...' : btcAmount}
              onChange={handleBtcChange}
              placeholder="0.015"
              className="font-code"
            />
          </div>
          {btcToIdrRate && (
            <p className="text-xs text-muted-foreground text-center pt-2">
              1 BTC ≈ {Math.round(btcToIdrRate).toLocaleString('id-ID')} IDR
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
