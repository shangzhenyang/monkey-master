import { useEffect, useState } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"
import About from "./About"
import Dashboard from "./Dashboard"
import Footer from "./Footer"
import Header from "./Header"
import WordList from "./WordList"
import Quiz from "./Quiz"
import WebFont from 'webfontloader';

function App() {
	useEffect(() => {
		WebFont.load({
			google: {
				families: ['Exo 2', 'sans-serif']
			}
		});
	}, []);

	const [lists, setLists] = useState(
		(() => {
			try {
				const result = JSON.parse(localStorage.getItem("wordLists"))
				if (typeof result !== "object") {
					throw new TypeError("Invalid data in localStorage")
				}
				return result
			} catch (error) {
				console.error(error)
				return null
			}
		})() || [{
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
		<div className="font-loader">
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
				<Route
					path="/quiz/:index"
					element={<Quiz
						lists={lists} />} />
				<Route
					path="*"
					element={<Navigate to="/" />}
				/>
			</Routes>
			<Footer />
		</div>
	</div>
}

export default App
