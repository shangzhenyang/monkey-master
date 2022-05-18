import BananaCard from "./BananaCard"

function MyBananas(props) {
	return <>
		<h2>My Bananas (Words)</h2>
		<ul className="bananas">
			{props.lists.map((item, index) =>
				<BananaCard
					key={index}
					index={index}
					item={item} />
			)}
		</ul>
	</>
}

export default MyBananas
