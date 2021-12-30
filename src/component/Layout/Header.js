import React from "react";
import { Navbar, Image } from "react-bootstrap";

export default function Header(props) {
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light blue">
      <div className="container-fluid ml-8">
        <Navbar.Brand href="#home">
          <Image src="./logo.jpg" />

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
    </nav>
    </>
  );
}
