import ProductGrid from "../components/product/ProductGrid";
import { products } from "../data/product";

const Home = () => {
  return (
    <div className="px-6 py-8">

      <h1 className="text-2xl font-semibold mb-6">
        All Products
      </h1>

      <ProductGrid products={products} />

    </div>
  );
};

export default Home;