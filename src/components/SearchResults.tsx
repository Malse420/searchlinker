import { SearchResult } from "@/lib/api";
import { VideoCard } from "./VideoCard";

interface SearchResultsProps {
  results: SearchResult[];
  isLoading: boolean;
  error: Error | null;
}

export const SearchResults = ({ results, isLoading, error }: SearchResultsProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse aspect-video bg-gray-200 rounded-lg"
          />
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
      <div className="text-center py-12 flex flex-col items-center gap-4">
        <Video className="w-12 h-12 text-gray-400" />
        <p className="text-gray-500">No videos found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {results.map((result) => (
        <VideoCard key={result.id} video={result} />
      ))}
    </div>
  );
};