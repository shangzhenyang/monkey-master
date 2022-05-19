import { useParams } from "react-router-dom"
import AddWord from "./AddWord"
import WordCard from "./WordCard"

function WordList(props) {
	const { index } = useParams()
	const list = props.lists[index]
	return <main>
		<h2 className="wordlist-title" title="Change the title" onClick={() => {
			const newTitle = prompt("Please enter a new title.")
			if (!newTitle) {
				return false
			}
			list.title = newTitle
			props.setLists([...props.lists])
		}}>{list.title}</h2>
		<ul className="wordlist-nav-row">
			<li className="wordlist-nav-button" title="Add new words"><span className="icon">&#xe624;</span></li>
			<li className="wordlist-nav-button" title="Search for words"><span className="icon">&#xe8ba;</span></li>
			<li className="wordlist-nav-button" title="Test your knowledge"><span className="icon">&#xe62f;</span></li>
			<li className="wordlist-nav-button" title="More options"><span className="icon">&#xe73a;</span></li>
		</ul>
		{list.words.map((item, index) =>
			<WordCard
				key={index}
				word={item.word}
				definition={item.definition}
				onChange={(newWord, newDefinition) => {
					item.word = newWord
					item.definition = newDefinition
					props.setLists([...props.lists])
				}}
			/>
		)}
		<AddWord onAdd={() => {

		}} />
	</main>
}

export default WordList
