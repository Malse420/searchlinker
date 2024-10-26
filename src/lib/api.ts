export interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
}

export interface SearchFilters {
  category?: string;
  tags?: string[];
}

export const searchAPI = async (query: string, filters?: SearchFilters): Promise<SearchResult[]> => {
  const baseUrl = "http://localhost:3000/r/video/search";
  const queryParams = new URLSearchParams({ q: query });
  
  if (filters?.category) {
    queryParams.append("category", filters.category);
  }
  
  if (filters?.tags?.length) {
    filters.tags.forEach(tag => queryParams.append("tags", tag));
  }

  const response = await fetch(`${baseUrl}?${queryParams}`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch search results");
  }

  return response.json();
};