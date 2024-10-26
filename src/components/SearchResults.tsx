import { SearchResult } from "@/lib/api";
import { ResultCard } from "./ResultCard";

interface SearchResultsProps {
  results: SearchResult[];
  isLoading: boolean;
  error: Error | null;
}

export const SearchResults = ({ results, isLoading, error }: SearchResultsProps) => {
  if (isLoading) {
    return (
      <div className="w-full space-y-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse p-6 bg-white rounded-lg shadow-sm"
          >
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  if (!results.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No results found</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {results.map((result) => (
        <ResultCard key={result.id} result={result} />
      ))}
    </div>
  );
};