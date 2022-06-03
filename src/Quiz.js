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
						<label htmlFor="answer">Enter the definition:</label>
						<input id="answer" type="text" name="answer" />
						<div className="quiz-check-buttons">
							<input type="submit" className="quiz-buttons" value="Check" />
							<input type="submit" className="quiz-buttons" value="Next Word" />
							<input type="submit" className="quiz-buttons" value="Back to the wordlist" />
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}