function FloatingButton(props) {
	const addWordList = () => {
		props.lists.push({
			title: "Untitled",
			words: []
		})
		props.saveLists()
	}

	return <button className="floating-btn" type="button" onClick={addWordList}>+</button>
}

export default FloatingButton
