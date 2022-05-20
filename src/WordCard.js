function WordCard(props) {
	return <div className="word-card">


		<div className="word">{props.word}</div>


		<div className="word">{props.definition}</div>


		<span className="icon-card" title="Bookmark">&#xe600;</span>


		<span className="icon-card" title="Edit this card" onClick={() => {
			const newWord = prompt(
				"Please enter a new word.",
				props.word
			)
			if (!newWord) {
				return false
			}
			const newDefinition = prompt(
				"Please enter a new definition.",
				props.definition
			)
			if (!newDefinition) {
				return false
			}
			props.onChange(newWord, newDefinition)
		}}>&#xe601;</span>



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


		<span className="icon-card" title="delete">
		
		&#xe602;</span>
	</div>
}

export default WordCard
