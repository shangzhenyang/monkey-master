import { useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import AddWord from "./AddWord"
import Alert from "./Alert"
import ContextMenu from "./ContextMenu"
import Loading from "./Loading"
import Prompt from "./Prompt"
import WordCard from "./WordCard"
import SearchBar from "./SearchBar"

function WordList(props) {
	const { index } = useParams()
	const list = props.lists[index]

	const [goHome, setGoHome] = useState(false);
	const [isContextMenuShown, setIsContextMenuShown] = useState(false);
	const [isDialogConfirm, setIsDialogConfirm] = useState(false);
	const [isDialogShown, setIsDialogShown] = useState(false);
	const [isPromptShown, setIsPromptShown] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const closeDialog = () => {
		setIsDialogShown(false);
	};
	const closePrompt = () => {
		setIsPromptShown(false);
	};
	const [contextMenuPositionX, setcontextMenuPositionX] = useState(null);
	const [contextMenuPositionY, setcontextMenuPositionY] = useState(null);
	const [dialogContent, setDialogContent] = useState("");
	const [dialogCallback, setDialogCallback] = useState(() => closeDialog);
	const [promptCallback, setPromptCallback] = useState(() => closePrompt);
	const [promptValue, setPromptValue] = useState("");

	if (!list || goHome) {
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
	};

	const alert = text => {
		setIsDialogShown(true);
		setIsDialogConfirm(false);
		setDialogContent(text);
		setDialogCallback(() => closeDialog);
	};

	const confirm = content => {
		return new Promise(resolve => {
			setIsDialogShown(true);
			setIsDialogConfirm(true);
			setDialogContent(content);
			setDialogCallback(() => resolve);
		});
	};

	const prompt = (content, defaultValue) => {
		return new Promise(resolve => {
			setIsPromptShown(true);
			setDialogContent(content);
			setPromptValue(defaultValue);
			setPromptCallback(() => resolve);
		});
	};

	const closeContextMenu = () => {
		setIsContextMenuShown(false);
	};

	const changeTitle = () => {
		prompt("Please enter a new title.", list.title)
			.then(newValue => {
				if (newValue) {
					list.title = newValue;
					props.saveLists();
				}
				closePrompt();
			});
	};

	const deleteList = () => {
		confirm("Are you sure that you want to delete this word list?")
			.then(() => {
				props.lists.splice(index, 1);
				props.saveLists();
				setGoHome(true);
			});
	};

	const exportCsv = () => {
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
	};

	const showCsvContextMenu = event => {
		setcontextMenuPositionX(event.pageX);
		setcontextMenuPositionY(event.pageY);
		setIsContextMenuShown(true);
	};

	const importCsv = content => {
		const rowSplit = content.split("\n");
		for (const row of rowSplit) {
			const columnSplit = row.split(",");
			for (const key in columnSplit) {
				const column = columnSplit[key];
				columnSplit[key] = column
					.replace(/^\"|(\"(\s+)?)$/g, "")
					.replaceAll(`""`, `"`);
			}
			addWord(columnSplit[0], columnSplit[1], false);
		}
	};

	const selectCsvFile = () => {
		const fileInput = document.createElement("input")
		fileInput.type = "file"
		fileInput.accept = ".csv"
		fileInput.onchange = function () {
			const file = this.files[0]
			const type = file.name.toLowerCase().split(".").pop()
			if (type !== "csv") {
				alert("The file type has to be CSV.")
			} else {
				if (list.title === "Untitled") {
					list.title = file.name.replace(/\.csv$/i, "")
				}
				const reader = new FileReader()
				reader.onload = function () {
					importCsv(this.result)
				}
				reader.readAsText(file)
			}
		}
		fileInput.click()
	};

	const loadCsvFromUrl = async () => {
		let url = await prompt("Please enter the URL to a CSV file.", "https://tmp.yangshangzhen.com/genki-ch12.csv");
		closePrompt();
		if (!url) {
			alert("You did not enter anything.");
			return
		}
		try {
			const urlObj = new URL(url.toLowerCase());
			if (urlObj.protocol === "http:") {
				alert(`A HTTPS site cannot access insecure HTTP resource, so the URL must start with "https://".`);
				return;
			} else if (urlObj.protocol !== "https:") {
				alert(`The URL must start with "https://".`);
				return;
			}
			if (!urlObj.pathname.endsWith(".csv")) {
				alert(`The URL must end with ".csv".`);
				return;
			}
		} catch (err) {
			alert(err.message);
			return;
		}
		setIsLoading(true);
		try {
			const response = await fetch(url);
			if (response.ok) {
				const data = await response.text();
				if (data) {
					importCsv(data);
				} else {
					alert("No data found.");
				}
			} else {
				alert("Error: " + response.status);
			}
		} catch (err) {
			alert(err.message);
		}
		setIsLoading(false);
	};

	const scrollToBottom = () => {
		window.scrollTo({
			top: document.body.scrollHeight,
			behavior: "smooth"
		})
	};

	const wordCards = list.words.map((item, index) =>
		<WordCard
			key={index}
			word={item.word}
			definition={item.definition}
			onChange={async () => {
				const newWord = await prompt("Please enter a new word.", item.word);
				if (!newWord) {
					return false;
				}
				const newDefinition = await prompt("Please enter a new definition.", item.definition);
				if (!newDefinition) {
					return false;
				}
				item.word = newWord;
				item.definition = newDefinition;
				props.saveLists();
				closePrompt();
			}}
			onDelete={() => {
				confirm(`Are you sure that you want to delete the word "${item.word}"?`)
					.then(() => {
						list.words.splice(index, 1);
						props.saveLists();
						closeDialog();
					});
			}}
		/>
	);

	return <main>
		<SearchBar data={list.words} />
		<h2 className="wordlist-title" title="Change the title" onClick={changeTitle}>{list.title}</h2>
		<ul className="wordlist-nav-row">
			<li className="wordlist-nav-button" title="Add new words" onClick={scrollToBottom}><span className="icon">&#xe624;</span></li>
			<li className="wordlist-nav-button" title="Test your knowledge"><Link to={`/quiz/${index}`}><span className="icon">&#xe62f;</span></Link></li>
			<li className="wordlist-nav-button" title="Import as CSV" onClick={showCsvContextMenu}><span className="icon">&#xe641;</span></li>
			<li className="wordlist-nav-button" title="Export as CSV" onClick={exportCsv}><span className="icon">&#xe642;</span></li>
			<li className="wordlist-nav-button" title="Delete this list" onClick={deleteList}><span className="icon">&#xe603;</span></li>
		</ul>

		{wordCards}

		<AddWord addWordCallBack={addWord} />

		<Alert
			content={dialogContent}
			isConfirm={isDialogConfirm}
			isShown={isDialogShown}
			negativeCallback={closeDialog}
			positiveCallback={dialogCallback}
		/>

		<Prompt
			content={dialogContent}
			isShown={isPromptShown}
			negativeCallback={closePrompt}
			positiveCallback={promptCallback}
			setValue={setPromptValue}
			value={promptValue}
		/>

		<ContextMenu
			close={closeContextMenu}
			items={[
				{
					name: "Upload from Local",
					onClick: selectCsvFile
				}, {
					name: "Load from URL",
					onClick: loadCsvFromUrl
				}
			]}
			show={isContextMenuShown}
			x={contextMenuPositionX}
			y={contextMenuPositionY}
		/>

		<Loading show={isLoading} />
	</main>
}

export default WordList
