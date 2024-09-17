import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";

const SearchDiv = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleKeyPress = (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
      if (query === "") {
        router.push("products");
      } else {
        router.push(`/searchResults?q=${query}`);
      }
    }
  };

  return (
    <div>
      <div>
        <form className="flex gap-2 items-center border border-slate-500 rounded-r-full p-2">
          <Search onClick={() => query === "" ? router.push('products') :router.push(`/searchResults?q=${query}`)} height={15} width={15} />
          <input
            className="focus:outline-none text-sm"
            type="text"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyPress}
          />
        </form>
      </div>
    </div>
  );
};

export default SearchDiv;
