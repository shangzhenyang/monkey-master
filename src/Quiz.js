import React, { useState } from 'react';

export default function Quiz() {
	return (
		<main className="quiz">
			<div className="container h-100">
            	<div className="row h-100 justify-content-center align items-center">
				<h1 >Quiz</h1>
				<h2>Question 1/1</h2>
				<label>
    				<p>A Word</p>
					<button className="quiz_button" title="refresh the page"><span className="icon">&#xe65e;</span></button>
    				<input type="text" name="answer" />
					<input type="submit" className= "submit" value="Check" />
  				</label>
			  </div>
			</div>
		</main>
	);
}