"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Search from "./svg/Search";

const DEBOUNCE_DELAY = 300;

const SearchProjectsInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("search") || "");

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (query) {
        params.set("search", query);
      } else {
        params.delete("search");
      }
      router.replace(`${window.location.pathname}?${params.toString()}`);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(handler);
  }, [query, router, searchParams]);

  return (
    <div className="px-2 py-2 items-center flex border border-foreground/80 rounded">
      <Search />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="outline-none focus:outline-0 text-sm font-normal px-1.5"
        placeholder="Search projects"
      />
    </div>
  );
};

export default SearchProjectsInput;
