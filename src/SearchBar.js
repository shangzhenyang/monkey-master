import React, { useState } from "react";

function SearchBar({data}) {
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
  
    const handleFilter = (event) => {
      const searchWord = event.target.value;
      setWordEntered(searchWord);
      const newFilter = data.filter((value) => {
        return value.word.toLowerCase().includes(searchWord.toLowerCase());
      });
  
      if (searchWord === "") {
        setFilteredData([]);
      } else {
        setFilteredData(newFilter);
      }
    };

    return (
      <div className="search">
        <div className="searchInputs">
          <input
            placeholder={"Search for a word..."}
            value={wordEntered}
            onChange={handleFilter}
          />
        {filteredData.length != 0 && (
          <div className="dataResult">
            {filteredData.map((value, key) => {
              return (
                <a className="dataItem" href={value.link} target="_blank">
                  <p>{value.word} {value.definition}</p>
                </a>
              );
            })}
          </div>
        )}
      </div>
      </div>
    );
}

export default SearchBar;