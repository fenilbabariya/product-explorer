"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import SortDropdown from "@/components/SortDropdown";

const ProductsClient = ({ products }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [priceSortOrder, setPriceSortOrder] = useState("none");
  const [nameSortOrder, setNameSortOrder] = useState("none");

  const categories = useMemo(() => {
    return [...new Set(products.map((product) => product.category))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        !searchQuery ||
        product.title.toLowerCase().includes(searchQuery) ||
        product.category.toLowerCase().includes(searchQuery);

      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      const matchesPrice =
        priceFilter === "all" || product.price <= Number(priceFilter);

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [products, searchQuery, selectedCategory, priceFilter]);

  const visibleProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      // Keep price sort primary whenever it is selected.
      if (priceSortOrder === "price-asc" && a.price !== b.price) {
        return a.price - b.price;
      }
      if (priceSortOrder === "price-desc" && a.price !== b.price) {
        return b.price - a.price;
      }

      if (nameSortOrder === "name-asc") {
        return a.title.localeCompare(b.title);
      }
      if (nameSortOrder === "name-desc") {
        return b.title.localeCompare(a.title);
      }

      return 0;
    });
  }, [filteredProducts, priceSortOrder, nameSortOrder]);

  return (
    <>
      <SearchBar onSearchChange={setSearchQuery} />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SortDropdown
          label="Price Sort"
          value={priceSortOrder}
          onChange={setPriceSortOrder}
          options={[
            { value: "none", label: "Recommended" },
            { value: "price-asc", label: "Cheapest First" },
            { value: "price-desc", label: "Highest Price First" },
          ]}
        />
        <SortDropdown
          label="Name Sort"
          value={nameSortOrder}
          onChange={setNameSortOrder}
          options={[
            { value: "none", label: "Default Name Order" },
            { value: "name-asc", label: "Name A-Z" },
            { value: "name-desc", label: "Name Z-A" },
          ]}
        />
        <SortDropdown
          label="Category"
          value={selectedCategory}
          onChange={setSelectedCategory}
          options={[
            { value: "all", label: "All Categories" },
            ...categories.map((category) => ({
              value: category,
              label: category,
            })),
          ]}
        />
        <SortDropdown
          label="Price"
          value={priceFilter}
          onChange={setPriceFilter}
          options={[
            { value: "all", label: "Any Price" },
            { value: "50", label: "Under $50" },
            { value: "100", label: "Under $100" },
            { value: "200", label: "Under $200" },
          ]}
        />
      </div>

      {visibleProducts.length === 0 ? (
        <p className="text-sm text-gray-500">No products found.</p>
      ) : (
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      )}
    </>
  );
};

export default ProductsClient;
