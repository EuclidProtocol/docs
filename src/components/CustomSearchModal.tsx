import React, { useState } from "react";
import Modal from "react-modal";
import { useLunrSearch } from "docusaurus-lunr-search";
import Link from "@docusaurus/Link";
import "./CustomSearchModal.css";

// React-Modal initialization
Modal.setAppElement("#__docusaurus");

const CustomSearchModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const results = useLunrSearch(query);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <>
      <button onClick={openModal} className="search-button">
        Search
      </button>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Search Modal"
        className="search-modal"
        overlayClassName="search-modal-overlay"
      >
        <div className="search-modal-header">
          <button onClick={closeModal} className="close-button">
            X
          </button>
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search..."
            className="search-input"
          />
        </div>
        <div className="search-results">
          {results.length > 0 ? (
            <ul>
              {results.map((result) => (
                <li key={result.id}>
                  <Link to={result.url} onClick={closeModal}>
                    {result.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            query && <p>No results found</p>
          )}
        </div>
      </Modal>
    </>
  );
};

export default CustomSearchModal;
