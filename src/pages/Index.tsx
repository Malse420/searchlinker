import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { FilterPanel } from "@/components/FilterPanel";
import { SearchResults } from "@/components/SearchResults";
import { useSearch } from "@/hooks/useSearch";
import { SearchFilters } from "@/lib/api";

const Index = () => {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<SearchFilters>({});
  const { data: results = [], isLoading, error } = useSearch(query, filters);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">Search Aggregator</h1>
        <SearchBar onSearch={setQuery} />
        
        <div className="mt-8 flex gap-8">
          <aside className="w-64 flex-shrink-0">
            <FilterPanel filters={filters} onFilterChange={setFilters} />
          </aside>
          
          <main className="flex-1">
            <SearchResults
              results={results}
              isLoading={isLoading}
              error={error as Error}
            />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;