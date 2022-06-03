function Loading({ show }) {
	if (!show) {
		return;
	}

	return <div className="mask">
		<div className="loading"></div>
	</div>
}

export default Loading;
