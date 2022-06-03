import { Button, Modal } from "react-bootstrap"

function Alert({
	content,
	isConfirm,
	isShown,
	negativeCallback,
	positiveCallback
}) {
	return <Modal
		show={isShown}
		onHide={negativeCallback}
		backdrop="static"
	>
		<Modal.Header>
			<Modal.Title>{isConfirm ? "Confirm" : "Alert"}</Modal.Title>
		</Modal.Header>
		<Modal.Body>{content}</Modal.Body>
		<Modal.Footer>
			<Button variant="secondary" hidden={!isConfirm} onClick={negativeCallback}>Cancel</Button>
			<Button variant="primary" onClick={positiveCallback}>OK</Button>
		</Modal.Footer>
	</Modal>
}

export default Alert
