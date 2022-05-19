function FloatingButton(props) {
	return <button className="floating-btn" onClick={() => {
		props.setLists([...props.lists, {
			title: "Untitled",
			words: []
		}])
	}}>+</button>
}

export default FloatingButton
