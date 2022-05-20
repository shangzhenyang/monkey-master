import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css"
import About from "./About"
import Dashboard from "./Dashboard"
import Footer from "./Footer"
import Header from "./Header"
import WordList from "./WordList"

function App() {
	const [lists, setLists] = useState(
		JSON.parse(localStorage.getItem("wordLists")) || [{
			title: "Title 1",
			words: [{
				word: "hello",
				definition: "你好"
			}, {
				word: "world",
				definition: "世界"
			}, {
				word: "code",
				definition: "代码"
			}]
		}, {
			title: "Title 2",
			words: [{
				word: "hello",
				definition: "你好"
			}, {
				word: "world",
				definition: "世界"
			}]
		}]
	)
	const saveLists = () => {
		const newLists = [...lists]
		setLists(newLists)
		localStorage.setItem("wordLists", JSON.stringify(newLists))
	}
	return <div className="App">
		<BrowserRouter>
			<Header navItems={["Dashboard", "About"]} />
			<Routes>
				<Route
					path="/"
					element={<Dashboard
						lists={lists}
						saveLists={saveLists}
					/>} />
				<Route
					path="/about"
					element={<About />} />
				<Route
					path="/wordlist/:index"
					element={<WordList
						lists={lists}
						saveLists={saveLists}
					/>} />
			</Routes>
		</BrowserRouter>
		<Footer />
	</div>
}

export default App
