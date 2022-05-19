function AddWord(props) {
	return <form id="new-word-form" className="form-template">
		<div className="form-template">
			<label htmlFor="word">Enter the word: </label>
			<input type="text" name="word" id="word" required></input>
		</div>
		<div className="form-template">
			<label htmlFor="definition">Enter the definition for that word: </label>
			<input type="text" name="definition" id="definition" required></input>
		</div>
		<div className="form-template">
			<input type="submit" value="Confirm" onClick={event => {
				event.preventDefault()
			}}></input>
		</div>
	</form>
}

export default AddWord
