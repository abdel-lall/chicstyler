

import NavHeader from "./nav-header/nav.header.component";
import Menu from "./nav-menu/menu.component";
import Brand from "./nav-brand/brand.component";
import "./navbar.scss";

function Navbar() {
  return (
    <div className="navbar">
          <NavHeader />
          <Brand />
          <Menu /> 
    </div>
  )
}

export default Navbar

