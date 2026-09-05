import { Search } from "lucide-react";

const SearchBar = ({ value, onChange, activeTab }) => {
  const placeholder =
    activeTab === "marketplace"
      ? "Search products..."
      : activeTab === "stores"
      ? "Search nearby stores..."
      : "Search online stores...";

  return (
    <div className="relative">
      <Search
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-gray-200 bg-white py-2 pl-12 pr-4 text-sm outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
      />
    </div>
  );
};

export default SearchBar;