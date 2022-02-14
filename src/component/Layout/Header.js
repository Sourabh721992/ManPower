import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import UserProfile from "../../utils/UserProfile";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { AiOutlineUser, AiFillHome, AiOutlineUsergroupAdd } from "react-icons/ai";
import { IconContext } from "react-icons";

export default function Header(props) {

  const history = useHistory();

  var session = null;

  if (props) {
    if (props.session) {
      session = props.session;
    }
  }

  var logoutButton = null;
  var OrgName = null
  var navbar = null;

  console.log("Header ", session)

  const logout = async (e) => {
    e.preventDefault();
    UserProfile.logout();
    history.push("");
  }

  if (session) {
    logoutButton = (<NavDropdown className="text-white" style={{ marginRight: "20px" }} title={
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
    </NavDropdown>)

    OrgName = (<Navbar.Brand className="text-white"> Tata Power Co. </Navbar.Brand>)

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

          {/* <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item p-3">
              <Link className="nav-link active" aria-current="page" to="/">
                <h6 style={{ color: "black", fontWeight: "500" }}>Dashboard</h6>
              </Link>
            </li>
            <li className="nav-item p-3">
              <Link className="nav-link" to="/Signup">
                <h6 style={{ color: "black", fontWeight: "500" }}>Admin</h6>
              </Link>
            </li>
            <li className="nav-item p-3">
              <Link className="nav-link" to="/settings">
                <h6 style={{ color: "black", fontWeight: "500" }}>Settings</h6>
              </Link>
            </li>
          </ul>
        </div> */}
        </div>
        {logoutButton}
      </nav>
      <div className="clr"></div>

      {navbar}

    </>
  );
}
