import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css"
import About from "./About"
import Dashboard from "./Dashboard"
import Footer from "./Footer"
import Header from "./Header"
import WordList from "./WordList"

const WORD_LIST = [{
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

function App() {
	return <div className="App">
		<BrowserRouter>
			<Header navItems={["Dashboard", "About"]} />
			<Routes>
				<Route
					path="/"
					element={<Dashboard lists={WORD_LIST} />} />
				<Route
					path="/about"
					element={<About />} />
				<Route
					path="/wordlist/:index"
					element={<WordList lists={WORD_LIST} />} />
			</Routes>
		</BrowserRouter>
		<Footer />
	</div>
}

export default App
