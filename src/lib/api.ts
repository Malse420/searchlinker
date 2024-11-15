export interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  domain: string;
  duration: string; // ISO 8601 duration format
}

export interface SearchFilters {
  category?: string;
  domain?: string;
}

export const getDurationCategory = (duration: string): string => {
  try {
    const durationInMinutes = parseDuration(duration);
    if (durationInMinutes <= 5) return "Short";
    if (durationInMinutes >= 20) return "Long";
    return "Medium";
  } catch (error) {
    return "Unknown";
  }
};

const parseDuration = (duration: string): number => {
  // Parse ISO 8601 duration to minutes
  const matches = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!matches) return 0;
  
  const hours = parseInt(matches[1] || '0');
  const minutes = parseInt(matches[2] || '0');
  const seconds = parseInt(matches[3] || '0');
  
  return hours * 60 + minutes + Math.ceil(seconds / 60);
};

export const searchAPI = async (query: string, filters?: SearchFilters): Promise<SearchResult[]> => {
  try {
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

    const results = await response.json();
    
    // Filter by duration category if specified
    if (filters?.category && ["Short", "Medium", "Long"].includes(filters.category)) {
      return results.filter(
        (result: SearchResult) => getDurationCategory(result.duration) === filters.category
      );
    }

    return results;
  } catch (error) {
    console.error('Search API Error:', error);
    return []; // Return empty array as fallback
  }
};

export const getDomainsAPI = async (): Promise<string[]> => {
  try {
    const response = await fetch("http://localhost:3000/r/video/domains");
    
    if (!response.ok) {
      throw new Error("Failed to fetch domains");
    }

    return await response.json();
  } catch (error) {
    console.error('Domains API Error:', error);
    return ['youtube.com', 'vimeo.com']; // Return default domains as fallback
  }
};