function Member(props) {
	return <div className="member">
		<div className="avatar">
			<img src={props.info.photo} alt={props.info.name}></img>
		</div>
		<h3>{props.info.name}</h3>
		<p>{props.info.intro}</p>
	</div>
}

export default Member
