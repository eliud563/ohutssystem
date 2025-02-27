import React, { useState } from "react";
import "./SearchBar.css";

// List of Kenyan Universities & TVETs
const institutions = [
  "University of Nairobi",
  "Kenyatta University",
  "Moi University",
  "Egerton University",
  "Jomo Kenyatta University of Agriculture and Technology",
  "Technical University of Kenya",
  "Maseno University",
  "Masinde Muliro University of Science and Technology",
  "Dedan Kimathi University of Technology",
  "Pwani University",
  "Chuka University",
  "Meru University of Science and Technology",
  "South Eastern Kenya University",
  "Technical University of Mombasa",
  "University of Eldoret",
  "Rongo University",
  "Kirinyaga University",
  "Murang'a University of Technology",
  "Kisii University",
  "Garissa University",
  "Taita Taveta University",
  "Laikipia University",
  "Embu University",
  "Co-operative University of Kenya",
  "Kibabii University",
  "KCA University",
  "Strathmore University",
  "United States International University (USIU)",
  "Mount Kenya University",
  "Africa Nazarene University",
  "Daystar University",
  "Kenya Methodist University",
  "Catholic University of Eastern Africa",
  "Great Lakes University of Kisumu",
  "Pan Africa Christian University",
  "Management University of Africa",
  "Adventist University of Africa",
  "Riara University",
  "Zetech University",
  "Tangaza University College",
  "Kenya School of Government",
  "Eldoret Technical Training Institute",
  "Kabete National Polytechnic",
  "Nyeri National Polytechnic",
  "Nairobi Technical Training Institute",
  "Kisumu National Polytechnic",
  "Meru National Polytechnic",
  "Rift Valley Technical Training Institute",
  "Coast Institute of Technology",
  "Sigalagala National Polytechnic",
];

function SearchBar({ onUniversitySelect, setSearchQuery, setSelectedCategory, setPriceRange, setSortOrder }) {
  const [searchQuery, setLocalSearchQuery] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedCategory, setLocalSelectedCategory] = useState("");
  const [priceRange, setLocalPriceRange] = useState("");
  const [sortOrder, setLocalSortOrder] = useState("newest");

  const filteredInstitutions = institutions.filter((institution) =>
    institution.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (institution) => {
    setSelectedUniversity(institution);
    setLocalSearchQuery("");
    if (typeof onUniversitySelect === "function") {
      onUniversitySelect(institution);
    }
  };

  const handleFilterChange = () => {
    setSearchQuery(searchQuery);
    setSelectedCategory(selectedCategory.toUpperCase());
    setPriceRange(priceRange);
    setSortOrder(sortOrder);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search for a university or TVET..."
        value={searchQuery}
        onChange={(e) => setLocalSearchQuery(e.target.value)}
      />
      {searchQuery && (
        <div className="search-results">
          <ul>
            {filteredInstitutions.length > 0 ? (
              filteredInstitutions.map((institution, index) => (
                <li key={index} onClick={() => handleSelect(institution)}>
                  {institution}
                </li>
              ))
            ) : (
              <li>No institutions found.</li>
            )}
          </ul>
        </div>
      )}
      <div className="filters">
        <select value={selectedCategory} onChange={(e) => setLocalSelectedCategory(e.target.value.toUpperCase())}>
          <option value="">Select Category</option>
          <option value="ELECTRONICS">Electronics</option>
          <option value="FURNITURE">Furniture</option>
          <option value="CLOTHING">Clothing</option>
          <option value="KITCHENWARE">Kitchenware</option>
          <option value="TEXTBOOKS">Textbooks</option>
        </select>
        <select value={priceRange} onChange={(e) => setLocalPriceRange(e.target.value)}>
          <option value="">Select Price Range</option>
          <option value="0-1000">0 - 1,000 KES</option>
          <option value="1000-5000">1,000 - 5,000 KES</option>
          <option value="5000-10000">5,000 - 10,000 KES</option>
        </select>
        <select value={sortOrder} onChange={(e) => setLocalSortOrder(e.target.value)}>
          <option value="newest">Newest to Oldest</option>
          <option value="oldest">Oldest to Newest</option>
        </select>
        <button onClick={handleFilterChange}>Apply Filters</button>
      </div>
      {selectedUniversity && (
        <div className="selected-university">
          <strong>Selected: </strong> {selectedUniversity}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
