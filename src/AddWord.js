import { useState } from "react"
function AddWord(props) {
	const [inputtedWord, setInputtedWord] = useState("")
	const [inputtedDef, setInputtedDef] = useState("")

	const handleWordChange = (event) => {
		let newValue = event.target.value
		setInputtedWord(newValue)
	}

	const handleDefChange = (event) => {
		let newValue = event.target.value
		setInputtedDef(newValue)
	}

	const handleSubmit = (event) => {
		event?.preventDefault()
		props.addWordCallBack(inputtedWord, inputtedDef)
		setInputtedWord("")
		setInputtedDef("")
	}

	const handleEnterKey = (event, callback) => {
		if (event.key === "Enter") {
			event.preventDefault()
			callback()
		}
	}

	return <form id="new-word-form" className="form-template" onSubmit={handleSubmit}>
		<div className="form-template">
			<label htmlFor="word">Enter a new word:</label>
			<input type="text"
				name="word"
				id="word"
				onChange={handleWordChange}
				onKeyDown={event => {
					handleEnterKey(event, () => {
						document.getElementById("definition").focus()
					})
				}}
				placeholder="ex: Japan"
				value={inputtedWord}
				required></input>
		</div>
		<div className="form-template">
			<label htmlFor="definition">Enter the definition of the new word:</label>
			<input type="text"
				name="definition"
				id="definition"
				onChange={handleDefChange}
				onKeyDown={event => {
					handleEnterKey(event, () => {
						handleSubmit()
						document.getElementById("word").focus()
					})
				}}
				placeholder="ex: 日本"
				value={inputtedDef}
				required></input>
		</div>
		<div className="form-template">
			<input type="submit" value="Confirm"></input>
		</div>
	</form>
}

export default AddWord
