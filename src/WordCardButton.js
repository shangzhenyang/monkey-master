function WordCardButton(props) {
	const { icon, onClick, title } = props.item;
	return <span
		className="icon-card"
		role="button"
		tabIndex="0"
		title={`${title} "${props.word}"`}
		onClick={onClick}>{icon}</span>
}

export default WordCardButton;
