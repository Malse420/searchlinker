import { SearchResult } from "@/lib/api";

interface ResultCardProps {
  result: SearchResult;
}

export const ResultCard = ({ result }: ResultCardProps) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow animate-fade-in">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{result.title}</h3>
      <p className="text-gray-600 mb-4">{result.description}</p>
      <div className="flex flex-wrap gap-2">
        {result.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};