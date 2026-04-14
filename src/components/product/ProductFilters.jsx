const ProductFilters = ({
  search,
  setSearch,
  category,
  setCategory,
  sort,
  setSort
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">

      {/* SEARCH */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
        className="border px-3 py-2 rounded w-full md:w-1/3"
      />

      {/* CATEGORY */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border px-3 py-2 rounded"
      >
        <option value="all">All</option>
        <option value="tablets">Tablets</option>
        <option value="syrup">Syrup</option>
        <option value="equipment">Equipment</option>
      </select>

      {/* SORT */}
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="border px-3 py-2 rounded"
      >
        <option value="">Sort</option>
        <option value="low">Price: Low → High</option>
        <option value="high">Price: High → Low</option>
      </select>

    </div>
  );
};

export default ProductFilters;