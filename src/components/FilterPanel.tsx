import { Filter } from "lucide-react";
import { SearchFilters } from "@/lib/api";

interface FilterPanelProps {
  filters: SearchFilters;
  onFilterChange: (filters: SearchFilters) => void;
}

export const FilterPanel = ({ filters, onFilterChange }: FilterPanelProps) => {
  const categories = ["All", "Articles", "Videos", "Podcasts"];
  const availableTags = ["Technology", "Science", "Arts", "Business"];

  return (
    <div className="w-full max-w-xs space-y-6 p-6 bg-white rounded-lg shadow-sm">
      <div className="flex items-center gap-2 pb-4 border-b">
        <Filter size={20} className="text-primary" />
        <h2 className="font-semibold">Filters</h2>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-2">Category</h3>
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
          <h3 className="text-sm font-medium mb-2">Tags</h3>
          <div className="space-y-2">
            {availableTags.map((tag) => (
              <label key={tag} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.tags?.includes(tag) || false}
                  onChange={(e) => {
                    const newTags = e.target.checked
                      ? [...(filters.tags || []), tag]
                      : filters.tags?.filter((t) => t !== tag);
                    onFilterChange({ ...filters, tags: newTags });
                  }}
                  className="text-primary focus:ring-primary"
                />
                <span className="text-sm">{tag}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};