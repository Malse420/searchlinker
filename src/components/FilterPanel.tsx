import { Filter } from "lucide-react";
import { SearchFilters } from "@/lib/api";
import { useDomains } from "@/hooks/useDomains";

interface FilterPanelProps {
  filters: SearchFilters;
  onFilterChange: (filters: SearchFilters) => void;
}

export const FilterPanel = ({ filters, onFilterChange }: FilterPanelProps) => {
  const categories = ["All", "Short", "Long", "Live"];
  const { data: domains = [], isLoading: isLoadingDomains } = useDomains();

  return (
    <div className="w-full max-w-xs space-y-6 p-6 bg-white rounded-lg shadow-sm">
      <div className="flex items-center gap-2 pb-4 border-b">
        <Filter size={20} className="text-primary" />
        <h2 className="font-semibold">Video Filters</h2>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-2">Duration</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="category"
                  checked={filters.category === category || (category === "All" && !filters.category)}
                  onChange={() => onFilterChange({ ...filters, category: category === "All" ? undefined : category })}
                  className="text-primary focus:ring-primary"
                />
                <span className="text-sm">{category}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Source</h3>
          {isLoadingDomains ? (
            <div className="animate-pulse space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-6 bg-gray-200 rounded"></div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="domain"
                  checked={!filters.domain}
                  onChange={() => onFilterChange({ ...filters, domain: undefined })}
                  className="text-primary focus:ring-primary"
                />
                <span className="text-sm">All Sources</span>
              </label>
              {domains.map((domain) => (
                <label key={domain} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="domain"
                    checked={filters.domain === domain}
                    onChange={() => onFilterChange({ ...filters, domain })}
                    className="text-primary focus:ring-primary"
                  />
                  <span className="text-sm">{domain}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};