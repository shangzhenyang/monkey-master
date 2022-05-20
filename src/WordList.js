import { useParams } from "react-router-dom"
import AddWord from "./AddWord"
import WordCard from "./WordCard"

function WordList(props) {
	const { index } = useParams()
	const list = props.lists[index]

	const addWord = (newWord, newDefinition) => {
		list.words.push({
			word: newWord,
			definition: newDefinition,
		})
		props.saveLists()
		setTimeout(scrollToBottom, 100)
	}

	const scrollToBottom = () => {
		window.scrollTo({
			top: document.body.scrollHeight,
			behavior: "smooth"
		})
	}

	return <main>
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
			<li className="wordlist-nav-button" title="Search for words"><span className="icon">&#xe8ba;</span></li>
			<li className="wordlist-nav-button" title="Test your knowledge"><span className="icon">&#xe62f;</span></li>
			<li className="wordlist-nav-button" title="Import"><span className="icon">&#xe641;</span></li>
			<li className="wordlist-nav-button" title="Export"><span className="icon">&#xe642;</span></li>
			<li className="wordlist-nav-button" title="Delete this list"><span className="icon">&#xe603;</span></li>
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
	</main>
}

export default WordList
