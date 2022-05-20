function FloatingButton(props) {
	return <button className="floating-btn" onClick={() => {
		props.lists.push({
			title: "Untitled",
			words: []
		})
		props.saveLists()
	}}>+</button>
}

export default FloatingButton
