function ContextMenu({ close, items, show, x, y }) {
	const elements = items.map((item, index) =>
		<div key={index} onClick={item.onClick}>{item.name}</div>
	)

	return <div className="mask" hidden={!show} onClick={close}>
		<div className="context-menu" style={{
			left: x,
			top: y
		}}>{elements}</div>
	</div>
}

export default ContextMenu
