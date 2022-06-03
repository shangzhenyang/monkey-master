function ContextMenu({ close, items, show, x, y }) {
	if (!show) {
		return;
	}

	const elements = items.map((item, index) =>
		<div key={index} onClick={item.onClick}>{item.name}</div>
	);

	return <div className="mask" onClick={close}>
		<div className="context-menu" style={{
			left: x,
			top: y
		}}>{elements}</div>
	</div>
}

export default ContextMenu;
