import WordCardButton from "./WordCardButton";

function WordCard(props) {
	const playPronunciation = () => {
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
	}

	const buttons = [{
		icon: "\ue601",
		onClick: props.onChange,
		title: "Edit the word"
	}, {
		icon: "\ue8b8",
		onClick: playPronunciation,
		title: "Play pronunciation of"
	}, {
		icon: "\ue602",
		onClick: props.onDelete,
		title: "Delete the word"
	}].map((item, index) =>
		<WordCardButton
			item={item}
			key={index}
			word={props.word}
		/>
	);

	return <div className="word-card">
		<div className="word">{props.word}</div>
		<div className="word">{props.definition}</div>
		{buttons}
	</div>
}

export default WordCard
