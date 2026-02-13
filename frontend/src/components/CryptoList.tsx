import { useQuery } from "@tanstack/react-query";
import { fetchPrices } from "../services/api";
import CryptoCard from "./CryptoCard";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";

export default function CryptoList() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["prices"],
    queryFn: () => fetchPrices("usd", 20),
    refetchInterval: 30000,
    staleTime: 15000,
  });

  if (isLoading) return <LoadingSpinner />;

  if (isError) {
    return (
      <ErrorMessage
        message={error instanceof Error ? error.message : "Failed to fetch prices"}
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data?.map((coin) => (
        <CryptoCard key={coin.id} coin={coin} />
      ))}
    </div>
  );
}
