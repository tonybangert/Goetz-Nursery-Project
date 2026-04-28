import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { trees, categories, sunFilters } from "./data/trees";
import { Header } from "./components/Header";
import { FilterBar } from "./components/FilterBar";
import { TreeCard } from "./components/TreeCard";
import { TreeDialog } from "./components/TreeDialog";
import { Footer } from "./components/Footer";
import { EmptyState } from "./components/EmptyState";

function priceValue(p) {
  return parseInt(p.replace("$", ""), 10);
}

export default function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sunFilter, setSunFilter] = useState("All Sun");
  const [sortBy, setSortBy] = useState("name");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return trees
      .filter((t) => {
        const matchesSearch =
          !q ||
          t.name.toLowerCase().includes(q) ||
          t.baysideNotes.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q));
        const matchesCategory = category === "All" || t.type.startsWith(category);
        const matchesSun = sunFilter === "All Sun" || t.sun === sunFilter;
        return matchesSearch && matchesCategory && matchesSun;
      })
      .sort((a, b) => {
        if (sortBy === "price") return priceValue(a.prices[0]) - priceValue(b.prices[0]);
        if (sortBy === "price-desc") return priceValue(b.prices[0]) - priceValue(a.prices[0]);
        return a.name.localeCompare(b.name);
      });
  }, [search, category, sunFilter, sortBy]);

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setSunFilter("All Sun");
  };

  return (
    <div className="min-h-screen bg-cream">
      <Header />

      <FilterBar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        categories={categories}
        sunFilter={sunFilter}
        setSunFilter={setSunFilter}
        sunFilters={sunFilters}
        sortBy={sortBy}
        setSortBy={setSortBy}
        resultCount={filtered.length}
        totalCount={trees.length}
      />

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-8 sm:py-12">
        {filtered.length === 0 ? (
          <EmptyState onReset={resetFilters} />
        ) : (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((tree, i) => (
                <li key={tree.slug} className="contents">
                  <TreeCard tree={tree} index={i} onSelect={setSelected} />
                </li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </main>

      <TreeDialog tree={selected} onClose={() => setSelected(null)} />
      <Footer />
    </div>
  );
}
