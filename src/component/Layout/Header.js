import React from "react";
import { Navbar, Nav, NavDropdown/* , Container */ } from "react-bootstrap";
import UserProfile from "../../utils/UserProfile";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { /* AiOutlineUser, */ AiFillHome, AiOutlineUsergroupAdd } from "react-icons/ai";
import {FaUserCircle} from "react-icons/fa"
import { IconContext } from "react-icons";

export default function Header(props) {

  const history = useHistory();

  var session = null;

  if (props && props.session) {
    session = props.session;
  }else{
    session = UserProfile.getSession()
  }

  // var logoutButton = null;
  var OrgName = null
  var navbar = null;
  var supplierNavBar = null
  var navRightMenu = null

  console.log("Header ", session)

  const logout = async (e) => {
    e.preventDefault();
    UserProfile.logout();
    history.push("");
  }

  if (session) {
    /* logoutButton = (<NavDropdown className="text-white" style={{ marginRight: "20px" }} title={
      <div style={{ border: "2px solid white", borderRadius: "5px", padding: "2px", width: "132px", float: "left", marginTop: "-5px" }}>
        <IconContext.Provider value={{ color: "#FFFFFF", size: "1.4em" }} >
          <div style={{ width: "30px", float: "left" }}>
            <AiOutlineUser />
          </div>
        </IconContext.Provider>
        <span className="text-white my-auto">{"Hello " + session.FirstName}</span>
      </div>
    } id="navbarScrollingDropdown">
      <NavDropdown.Item href="/Profile">Profile</NavDropdown.Item>
      <NavDropdown.Item href="#" onClick={logout}>Logout</NavDropdown.Item>
    </NavDropdown>) */

    navRightMenu = (
      <NavDropdown className="nav-dropdown" title={
          <div className="text-white">
            <FaUserCircle className="mr-2" />
            <span>{"Hello "+session.FirstName}</span>
          </div>
        } id="navbarScrollingDropdown">
        <NavDropdown.Item href="/Profile">Profile</NavDropdown.Item>
        <NavDropdown.Item href="#" onClick={logout}>Logout</NavDropdown.Item>
      </NavDropdown>
    )

    OrgName = (<Navbar.Brand className="text-white"> {session.OrgName} </Navbar.Brand>)

    supplierNavBar = (
      <Navbar className="px-3" bg="light" variant="light">
        <Navbar.Brand href="/dashboard">Home</Navbar.Brand>
        {/* <Navbar.Brand href="/SupplierDashboard">Home</Navbar.Brand> */}
        <Nav className="me-auto">
          <Nav.Link href="/buyer">Buyer</Nav.Link>
          <Nav.Link href="/worker">Worker</Nav.Link>
          <Nav.Link href="#requirements">Requirements</Nav.Link>
        </Nav>
      </Navbar>
    )

    navbar = (
      <nav style={{ backgroundColor: "#f3f5fc" }} className="navbar navbar-expand-lg">
        <div className="container-fluid ml-8">
          <Nav className="me-auto">

            <IconContext.Provider value={{ color: "#6c757d", size: "1.4em" }} >
              <div style={{ width: "7px", float: "left", marginTop: "5px" }}>
                <AiFillHome />
              </div>
            </IconContext.Provider>
            <Nav.Link className="text-secondary" href="/Dashboard">Home</Nav.Link>

            <IconContext.Provider value={{ color: "#6c757d", size: "1.4em" }} >
              <div style={{ width: "7px", float: "left", marginTop: "5px" }}>
                <AiOutlineUsergroupAdd />
              </div>
            </IconContext.Provider>
            <Nav.Link className="text-secondary" href="/Supplier">Supplier</Nav.Link>
          </Nav>
        </div>
      </nav>
    )
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light blue">
        <div className="container-fluid ml-8">
          <Navbar.Brand href="#home">
            {OrgName}
          </Navbar.Brand>
        </div>
        {/* {logoutButton} */}
        {navRightMenu}
      </nav>
      {/* <div className="clr"></div> */}

      {
        session && session.Role === "S"
        ?
          supplierNavBar
          :
            navbar
      }
      {/* {navbar} */}

    </>
  );
}
