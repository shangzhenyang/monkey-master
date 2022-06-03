import { Button, Modal } from "react-bootstrap"

function Prompt({
	content,
	isShown,
	negativeCallback,
	positiveCallback,
	setValue,
	value
}) {
	return <Modal
		show={isShown}
		onHide={negativeCallback}
		backdrop="static"
	>
		<Modal.Header>
			<Modal.Title>Input</Modal.Title>
		</Modal.Header>
		<Modal.Body>
			<label htmlFor="prompt-input">{content}</label>
			<input id="prompt-input"
				value={value}
				autoComplete="off"
				onChange={event => {
					setValue(event.target.value);
				}}
				onKeyDown={event => {
					if (event.code === "Enter") {
						positiveCallback(value);
					}
				}}
			/>
		</Modal.Body>
		<Modal.Footer>
			<Button variant="secondary" onClick={negativeCallback}>Cancel</Button>
			<Button variant="primary" onClick={() => {
				positiveCallback(value);
			}}>OK</Button>
		</Modal.Footer>
	</Modal>
}

export default Prompt
