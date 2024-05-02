import { Container, Nav, Navbar } from "react-bootstrap";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
const MyNav = () => {
  return (
    <Navbar
      expand="lg"
      style={{ backgroundColor: "#221f1f" }}
      data-bs-theme="dark"
    >
      <Container fluid>
        <Navbar.Brand href="#home">
          <img
            src={logo}
            width="100px"
            height="55px"
            className="d-inline-block align-top"
            alt="Netflix logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link text-light " />
            Home
            <NavLink to="/tv-shows" className="nav-link text-light " />
            TV Shows
            <NavLink to="*" className="nav-link text-light " />
            Movies
            <NavLink to="*" className="nav-link text-light " />
            Recently Added
            <NavLink to="*" className="nav-link text-light " />
            My List
          </Nav>
          <div className="d-flex align-items-center ms-auto">
            <i className="bi bi-search icons"></i>
            <div id="kids" className="fw-bold">
              KIDS
            </div>
            <i className="bi bi-bell icons"></i>
            <i className="bi bi-person-circle icons"></i>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNav;
