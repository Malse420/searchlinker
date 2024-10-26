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
  // Replace with your actual API endpoint
  const baseUrl = "YOUR_API_URL";
  const queryParams = new URLSearchParams({ query });
  
  if (filters?.category) {
    queryParams.append("category", filters.category);
  }
  
  if (filters?.tags?.length) {
    filters.tags.forEach(tag => queryParams.append("tags", tag));
  }

  const response = await fetch(`${baseUrl}/search?${queryParams}`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch search results");
  }

  return response.json();
};