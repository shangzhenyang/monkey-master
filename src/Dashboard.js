import FloatingButton from "./FloatingButton"
import MyBananas from "./MyBananas"

function Dashboard(props) {
	return <>
		<main>
			<MyBananas lists={props.lists} />
		</main>
		<FloatingButton />
	</>
}

export default Dashboard
