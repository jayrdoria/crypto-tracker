interface PriceChangeProps {
  percentage: number;
}

export default function PriceChange({ percentage }: PriceChangeProps) {
  const isPositive = percentage >= 0;

  return (
    <span
      className={`inline-flex items-center gap-1 text-sm font-semibold ${
        isPositive ? "text-green-600" : "text-red-600"
      }`}
    >
      <span>{isPositive ? "\u25B2" : "\u25BC"}</span>
      <span>{Math.abs(percentage).toFixed(2)}%</span>
    </span>
  );
}
