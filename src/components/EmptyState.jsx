import { TreeDeciduous } from "lucide-react";

export function EmptyState({ onReset }) {
  return (
    <div className="col-span-full flex flex-col items-center gap-3 rounded-2xl border border-dashed border-forest-200 bg-white py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-forest-50 text-forest-500">
        <TreeDeciduous className="h-7 w-7" aria-hidden />
      </div>
      <h3 className="font-display text-xl font-semibold text-forest-800">
        No trees match these filters
      </h3>
      <p className="max-w-sm text-sm text-forest-600">
        Try a different search term, or reset the category and sun filters to see the full catalog.
      </p>
      <button
        onClick={onReset}
        className="mt-1 rounded-full bg-forest-700 px-5 py-2 text-sm font-semibold text-cream transition-colors hover:bg-forest-800"
      >
        Reset filters
      </button>
    </div>
  );
}
