import { Navigate, useParams } from "react-router-dom"
import AddWord from "./AddWord"
import WordCard from "./WordCard"
import SearchBar from "./SearchBar"

function WordList(props) {
	const { index } = useParams();
	const list = props.lists[index]
	if (!list) {
		return <Navigate to="/" />
	}

	const addWord = (newWord, newDefinition, scroll = true) => {
		list.words.push({
			word: newWord,
			definition: newDefinition,
		})
		props.saveLists()
		if (scroll) {
			setTimeout(scrollToBottom, 100)
		}
	}

	const scrollToBottom = () => {
		window.scrollTo({
			top: document.body.scrollHeight,
			behavior: "smooth"
		})
	}
	console.log(list.words);

	return <main>
		<SearchBar data={list.words} />
		<h2 className="wordlist-title" title="Change the title" onClick={() => {
			const newTitle = prompt("Please enter a new title.")
			if (!newTitle) {
				return false
			}
			list.title = newTitle
			props.saveLists()
		}}>{list.title}</h2>
		<ul className="wordlist-nav-row">
			<li className="wordlist-nav-button" title="Add new words" onClick={scrollToBottom}><span className="icon">&#xe624;</span></li>
			<li className="wordlist-nav-button" title="Test your knowledge"><span className="icon">&#xe62f;</span></li>
			<li className="wordlist-nav-button" title="Import as CSV" onClick={() => {
				const fileInput = document.getElementById("file-input")
				fileInput.value = ""
				fileInput.click()
			}}><span className="icon">&#xe641;</span></li>

			<li className="wordlist-nav-button" title="Export as CSV" onClick={() => {
				const encodeCsvValue = text =>
					`"` + text.replaceAll(`"`, `""`) + `"`
				let str = ""
				for (const wordItem of list.words) {
					if (str) {
						str += "\n"
					}
					str += encodeCsvValue(wordItem.word) + "," +
						encodeCsvValue(wordItem.definition)
				}
				const newA = document.createElement("a")
				newA.href = "data:text/plain;charset=utf-8," +
					encodeURIComponent("\uFEFF" + str)
				newA.download = list.title + ".csv"
				newA.click()
			}}><span className="icon">&#xe642;</span></li>

			<li className="wordlist-nav-button" title="Delete this list" onClick={() => {
				props.lists.splice(index, 1)
				props.saveLists()
			}}><span className="icon">&#xe603;</span></li>
		</ul>
		{list.words.map((item, index) =>
			<WordCard
				key={index}
				word={item.word}
				definition={item.definition}
				onChange={(newWord, newDefinition) => {
					item.word = newWord
					item.definition = newDefinition
					props.saveLists()
				}}
				onDelete={() => {
					list.words.splice(index, 1)
					props.saveLists()
				}}
			/>
		)}

		<AddWord addWordCallBack={addWord} />

		<input id="file-input" type="file" hidden={true} onChange={event => {
			const file = event.target.files[0]
			const type = file.name.toLowerCase().split(".").pop()
			if (type !== "csv") {
				window.alert("The file type has to be CSV.")
			} else {
				if (list.title === "Untitled") {
					list.title = file.name.replace(/\.csv$/i, "")
				}
				const reader = new FileReader()
				reader.onload = function () {
					const content = this.result
					const rowSplit = content.split("\n")
					for (const row of rowSplit) {
						const columnSplit = row.split(",")
						for (const key in columnSplit) {
							const column = columnSplit[key]
							columnSplit[key] = column
								.substring(1, column.length - 1)
								.replaceAll(`""`, `"`)
						}
						addWord(columnSplit[0], columnSplit[1], false)
					}
				}
				reader.readAsText(file)
			}
		}}></input>
	</main>
}

export default WordList
