import { NavLink } from "react-router-dom"
import icon from "./img/icon.png"

const HOME_PAGE = "Dashboard"

function Header(props) {
	const navLinks = props.navItems.map((item, index) =>
		<NavLink
			key={index}
			to={item === HOME_PAGE ? "" : item.toLowerCase()}
			className={(status) => status.isActive ? "selected" : ""}
		>{item}</NavLink>
	);

	return <header>
		<img className="logo" src={icon} alt="icon"></img>
		<h1>Monkey Master</h1>
		<nav>{navLinks}</nav>
	</header>
}

export default Header