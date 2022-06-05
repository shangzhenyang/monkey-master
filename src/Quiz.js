import React, { useState } from 'react';
import { Link, Navigate, useParams } from "react-router-dom"
import Alert from './Alert';

export default function Quiz(props) {

	const { index } = useParams();
	const list = props.lists[index];
	const [goBack, setGoBack] = useState(false);



	//quiz logic part
	//Track the word and score
	const [wordIndex, setWordIndex] = useState(0);
	const [score, setScore] = useState(0);


	//deal with the input value
	const [inputtedValue, setInputtedValue] = useState("");
	const handleChange = (event) => {
		let newValue = event.target.value;
		setInputtedValue(newValue);
	}
	//Control the check button
	const [enableCheck, setEnableCheck] = useState(true)
	//The logic of check button
	const handleCheck = () => {
		if (inputtedValue === list.words[wordIndex].definition) {
			setCorrectOrNot("Correct! ")
			setScore(score + 1)
		} else {
			setCorrectOrNot("Wrong! The correct answer is: " + list.words[wordIndex].definition)
		}
		setEnableCheck(false);
	}

	//The typed word is correct or not
	const [correctOrNot, setCorrectOrNot] = useState("")



	//KeyDown for check button
	const onInputKeyDown = event => {
		if (inputtedValue && event.code === "Enter") {
			if (enableCheck) {
				handleCheck();
			} else {
				handleNextWord();
			}
		}
	};

	//Set for Alert
	const [dialogContent, setDialogContent] = useState("");
	const dialogCallback = () => setGoBack(true);


	//HandleNextWord
	const handleNextWord = () => {
		//To see if it is the last word
		if (wordIndex >= list.words.length - 1) {
			setDialogContent("Congratulations! You just complete the quiz! Your score is " + Math.round(score/list.words.length*100) + "%");
		}else{
			setWordIndex(wordIndex + 1);
			setInputtedValue("");
			setEnableCheck(true);
			setCorrectOrNot("");
		}
	}


	//Check Button
	function Check() {
		return (
			<button className="quiz-buttons" type="button" disabled={!enableCheck} onClick={handleCheck}>Check</button>
		);
	}


	//Next Word Button
	function NextWord() {
		return (
			<button
				className="quiz-buttons"
				type="button"
				onClick={handleNextWord}>{wordIndex >= list.words.length - 1 ? "Complete" : "Next Word"}</button>
		);
	}


	//Back to the wordlist Button
	function BackWordList() {
		return (
			<Link to={`/wordlist/${index}`}>
				<button className="quiz-buttons" type="button">Back to Word List</button>
			</Link>
		);
	}

	return (
		<main className="quiz">
			{goBack && <Navigate to={`/wordlist/${index}`}></Navigate>}
			<div className="container h-100">
				<div className="row h-100 justify-content-center align items-center">
					<h1>Quiz of {list.title}</h1>
					<h2>Question {wordIndex + 1}/{list.words.length}</h2>
					<div className="quiz-box">
						<p>{list.words[wordIndex].word}</p>
						<p>{correctOrNot}</p>
						<label htmlFor="answer">Enter the definition:</label>
						<input id="answer"
							value={inputtedValue}
							autoComplete="off"
							onKeyDown={onInputKeyDown}
							onChange={handleChange} />
					</div>
					<div className="quiz-check-buttons">
						<Check />
						<NextWord />
						<BackWordList />
					</div>
				</div>
			</div>
			<Alert
				content={dialogContent}
				isShown={!!dialogContent}
				positiveCallback={dialogCallback}
			/>
		</main>
	);
}