function AddWord() {
	return <form id="new-word-form" action="" method="get" className="form-template">
		<div className="form-template">
			<label for="word">Enter the word: </label>
			<input type="text" name="word" id="word" required></input>
		</div>
		<div className="form-template">
			<label for="definition">Enter the definition for that word: </label>
			<input type="text" name="definition" id="definition" required></input>
		</div>
		<div className="form-template">
			<input type="submit" value="Confirm"></input>
		</div>
	</form>
}

export default AddWord
