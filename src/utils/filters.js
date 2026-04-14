export const filterProducts = (products, search, category, sort) => {
  let result = [...products];

  // 🔍 SEARCH
  if (search) {
    const term = search.toLowerCase();

    result = result.filter(p =>
      p.name.toLowerCase().includes(term) ||
      p.filter.toLowerCase().includes(term)
    );
  }

  // 🗂 CATEGORY
  if (category && category !== "all") {
    result = result.filter(p => p.category === category);
  }

  // 💰 SORT
  if (sort === "low") {
    result.sort((a, b) => a.price - b.price);
  } else if (sort === "high") {
    result.sort((a, b) => b.price - a.price);
  }

  return result;
};