import FloatingButton from "./FloatingButton"
import MyBananas from "./MyBananas"
import Status from "./Status"

function Dashboard(props) {
	return <>
		<main>
			<Status lists={props.lists} />
			<MyBananas lists={props.lists} />
		</main>
		<FloatingButton
			lists={props.lists}
			saveLists={props.saveLists}
		/>
	</>
}

export default Dashboard
