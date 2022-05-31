function WordCard(props) {
	return <div className="word-card">
		<div className="word">{props.word}</div>
		<div className="word">{props.definition}</div>

		<span className="icon-card" title="Edit this card" onClick={props.onChange}>&#xe601;</span>

		<span className="icon-card" title="Play pronunciation" onClick={() => {
			if (window.speechSynthesis) {
				if (!onbeforeunload) {
					onbeforeunload = () => {
						speechSynthesis.cancel()
					}
				}
				speechSynthesis.cancel()
				speechSynthesis.speak(new SpeechSynthesisUtterance(props.word))
			} else {
				alert("Your browser does not support speech synthesis.")
			}
		}}>&#xe8b8;</span>

		<span className="icon-card" title="Delete the word" onClick={props.onDelete}>&#xe602;</span>
	</div >
}

export default WordCard
