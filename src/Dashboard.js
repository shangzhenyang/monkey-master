import FloatingButton from "./FloatingButton"
import MyBananas from "./MyBananas"

function Dashboard(props) {
	return <>
		<main>
			<MyBananas lists={props.lists} />
		</main>
		<FloatingButton
			lists={props.lists}
			setLists={props.setLists}
		/>
	</>
}

export default Dashboard
