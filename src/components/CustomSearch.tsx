import React, { useState } from "react";
import Link from "@docusaurus/Link";
import { useLunrSearch } from "docusaurus-lunr-search";

export const CustomSearch = () => {
  const [query, setQuery] = useState("");
  const results = useLunrSearch(query);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <div className="custom-search">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
        className="search-input"
      />
      {results.length > 0 && (
        <ul className="search-results">
          {results.map((result) => (
            <li key={result.id}>
              <Link to={result.url}>{result.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
