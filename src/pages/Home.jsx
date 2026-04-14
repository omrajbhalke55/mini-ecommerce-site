import { useState } from "react";
import ProductGrid from "../components/product/ProductGrid";
import ProductFilters from "../components/product/ProductFilters";
import { products } from "../data/product";
import { filterProducts } from "../utils/filters";

const Home = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");

  const filteredProducts = filterProducts(
    products,
    search,
    category,
    sort
  );

  return (
    <div className="px-6 py-8">

      <h1 className="text-2xl font-semibold mb-6">
        All Products
      </h1>

      <ProductFilters
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
      />

      <ProductGrid products={filteredProducts} />

    </div>
  );
};

export default Home;