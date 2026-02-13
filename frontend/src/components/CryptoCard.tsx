import { CoinPrice } from "../types/crypto";
import PriceChange from "./PriceChange";

interface CryptoCardProps {
  coin: CoinPrice;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  }).format(price);

const formatCompact = (value: number) => {
  if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  return `$${value.toLocaleString()}`;
};

export default function CryptoCard({ coin }: CryptoCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      {/* Header: rank + coin info */}
      <div className="flex items-center gap-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-500">
          {coin.market_cap_rank}
        </span>
        <img
          src={coin.image}
          alt={coin.name}
          className="h-9 w-9 rounded-full"
          loading="lazy"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-gray-900">{coin.name}</p>
          <span className="text-xs font-medium uppercase text-gray-400">
            {coin.symbol}
          </span>
        </div>
      </div>

      {/* Price + change */}
      <div className="mt-4 flex items-end justify-between">
        <p className="text-xl font-bold text-gray-900">
          {formatPrice(coin.current_price)}
        </p>
        <PriceChange percentage={coin.price_change_percentage_24h} />
      </div>

      {/* Stats row */}
      <div className="mt-3 flex justify-between border-t border-gray-100 pt-3 text-xs text-gray-500">
        <div>
          <p className="font-medium text-gray-400">Market Cap</p>
          <p className="font-semibold text-gray-700">{formatCompact(coin.market_cap)}</p>
        </div>
        <div className="text-right">
          <p className="font-medium text-gray-400">Volume 24h</p>
          <p className="font-semibold text-gray-700">{formatCompact(coin.total_volume)}</p>
        </div>
      </div>
    </div>
  );
}
