import React, { useState } from 'react';

export default function Quiz() {
	return (
		<main className="quiz">
			<div className="container h-100">
				<div className="row h-100 justify-content-center align items-center">
					<h1>Quiz</h1>
					<h2>Question 1/1</h2>
					<div className="quiz-box">
						<p>A Word</p>
						<button className="quiz-button" title="refresh the page"><span className="icon">&#xe65e;</span></button>
						<label htmlFor="answer">Enter the definition:</label>
						<input id="answer" type="text" name="answer" />
						<input type="submit" className="quiz-submit-button" value="Check" />
					</div>
				</div>
			</div>
		</main>
	);
}