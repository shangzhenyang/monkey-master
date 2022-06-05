import React, { useState } from 'react';
import { useParams } from "react-router-dom"

export default function Quiz(props) {

	const { index } = useParams();
	const list = props.lists[index];

	//quiz logic part
	//set wordIndex and Score
	const [wordIndex, setWordIndex] = useState(0);
	const [score, setScore] = useState(0);

	//Check Button
	function Check(props) {
		return (
			<input type="submit" className="quiz-buttons" value="Check" />
		);
	}


	//Next Word Button
	function NextWord(props) {
		return (
			<input type="submit" className="quiz-buttons" value="Next Word" />
		);
	}


	//Back to the wordlist Button
	function BackWordList(props) {
		return (
			<input type="submit" className="quiz-buttons" value="Back to the wordlist" />
		);
	}


	//Correct or not



	//Final Score

//


	return (
		<main className="quiz">
			<div className="container h-100">
				<div className="row h-100 justify-content-center align items-center">
					<h1>Quiz of {list.title}</h1>
					<h2>Question {wordIndex}/{list.words.length}</h2>
					<div className="quiz-box">
						<p>{list.words[wordIndex].word}</p>
						<label htmlFor="answer">Enter the definition:</label>
						<input id="answer" type="text" name="answer" />
						<div className="quiz-check-buttons">
								<Check />
								<NextWord />
								<BackWordList />
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}