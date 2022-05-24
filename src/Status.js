function Status(props) {
	let count = 0
	for (const list of props.lists) {
		count += list.words.length
	}
	let title
	if (count < 10) {
		title = "Little Monkey (Lv1)"
	} else if (count < 20) {
		title = "Monkey Master (Lv2)"
	} else if (count < 30) {
		title = "Monkey Monster (Lv3)"
	} else if (count < 40) {
		title = "Monkey King (Lv4)"
	} else {
		title = "Monkey Elder (Lv5)"
	}
	return <>
		<h2>Status</h2>
		<div className="status">You have added {count} words.<br />You are now <strong>{title}</strong>!</div>
	</>
}

export default Status
