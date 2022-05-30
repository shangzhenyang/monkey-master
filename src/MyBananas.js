import BananaCard from "./BananaCard"

function MyBananas(props) {
	const bananaCards = props.lists.map((item, index) =>
		<BananaCard
			key={index}
			index={index}
			item={item}
		/>
	);

	return <>
		<h2>My Bananas (Words)</h2>
		<ul className="bananas">{bananaCards}</ul>
	</>
}

export default MyBananas
