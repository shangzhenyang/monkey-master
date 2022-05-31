import { Link } from "react-router-dom"
import bananaIcon from "./img/bananas.webp"

function BananaCard(props) {
	return <li className="banana-card">
		<Link to={`/wordlist/${props.index}`}>
			<h3 className="banana-card-title">{props.item.title}</h3>
			<div className="banana-card-content">
				{props.item.words.length}
				<img src={bananaIcon} alt="bananas" title="words"></img>
			</div>
		</Link>
	</li>
}

export default BananaCard
