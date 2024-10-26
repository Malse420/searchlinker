export interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  domain: string;
}

export interface SearchFilters {
  category?: string;
  domain?: string;
}

export const searchAPI = async (query: string, filters?: SearchFilters): Promise<SearchResult[]> => {
  const baseUrl = "http://localhost:3000/r/video/search";
  const queryParams = new URLSearchParams({ q: query });
  
  if (filters?.category) {
    queryParams.append("category", filters.category);
  }
  
  if (filters?.domain) {
    queryParams.append("domain", filters.domain);
  }

  const response = await fetch(`${baseUrl}?${queryParams}`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch search results");
  }

  return response.json();
};

export const getDomainsAPI = async (): Promise<string[]> => {
  const response = await fetch("http://localhost:3000/r/video/domains");
  
  if (!response.ok) {
    throw new Error("Failed to fetch domains");
  }

  return response.json();
};