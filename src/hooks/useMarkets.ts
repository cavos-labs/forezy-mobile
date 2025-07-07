import { useState, useEffect, useMemo } from 'react';

export interface Market {
  id: string;
  question: string;
  description: string;
  status: string;
  resolutionTime: string;
}

export const useMarkets = (sortOrder: 'asc' | 'desc' = 'asc') => {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarkets = async () => {
      try {
        const response = await fetch('https://forezy-backend.vercel.app/v1/api/markets');
        const data = await response.json();

        const now = new Date();

        const activeMarkets = data.markets.filter(
          (market: Market) =>
            market.status === 'open' &&
            new Date(market.resolutionTime) > now
        );

        setMarkets(activeMarkets);
      } catch (err) {
        console.error(err);
        setError('Failed to load markets.');
      } finally {
        setLoading(false);
      }
    };

    fetchMarkets();
  }, []);

  const sortedMarkets = useMemo(() => {
    const sorted = [...markets].sort((a, b) => {
      const dateA = new Date(a.resolutionTime).getTime();
      const dateB = new Date(b.resolutionTime).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
    return sorted;
  }, [markets, sortOrder]);

  return { markets: sortedMarkets, loading, error };
};
