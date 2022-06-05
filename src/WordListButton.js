import { Link } from "react-router-dom";

function WordListButton(props) {
	const { icon, link, onClick, title } = props.item;
	return <span
		className="wordlist-button"
		role="button"
		tabIndex="0"
		title={title}
		onClick={onClick}>
		{link ? <Link to={link}>
			<span className="icon">{icon}</span>
		</Link> : <span className="icon">{icon}</span>}
	</span>
}

export default WordListButton;
