import React, { useState } from "react"

function SearchBar({ data }) {
	const [filteredData, setFilteredData] = useState([])
	const [wordEntered, setWordEntered] = useState("")

	const handleFilter = (event) => {
		const searchWord = event.target.value
		setWordEntered(searchWord);
		const newFilter = data.filter((value) => {
			return value.word.toLowerCase().includes(searchWord.toLowerCase())
		})

		if (searchWord === "") {
			setFilteredData([])
		} else {
			setFilteredData(newFilter)
		}
	};

	const resultItems = filteredData.map((value, key) => {
		return (
			<div className="data-item">
				<p>{value.word} {value.definition}</p>
			</div>
		)
	});

	return (
		<div className="search">
			<div className="searchInputs">
				<input
					placeholder={"Search for a word..."}
					value={wordEntered}
					onChange={handleFilter}
				/>
				{filteredData.length !== 0 && (
					<div className="data-result">{resultItems}</div>
				)}
			</div>
		</div>
	);
}

export default SearchBar
