import { useQuery } from "@tanstack/react-query";
import { searchAPI, SearchFilters, SearchResult } from "@/lib/api";

export const useSearch = (query: string, filters?: SearchFilters) => {
  return useQuery({
    queryKey: ["search", query, filters],
    queryFn: () => searchAPI(query, filters),
    enabled: query.length > 0,
  });
};