function WordCard(props) {
	return <div className="word-card">
		<div className="word">{props.word}</div>
		<div className="word">{props.definition}</div>
		<span className="icon-card" title="Bookmark">&#xe600;</span>
		<span className="icon-card" title="Edit this card">&#xe601;</span>
		<span className="icon-card" title="Play pronunciation">&#xe8b8;</span>
	</div>
}

export default WordCard
