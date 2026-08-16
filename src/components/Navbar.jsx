import { Container, Nav, Navbar as BsNavbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { PiWalletDuotone } from "react-icons/pi";
import ThemeToggle from "./ThemeToggle";

function AppNavbar() {
  return (
    <BsNavbar expand="lg" className="glass-navbar" variant="light">
      <Container>
        <BsNavbar.Brand
          as={NavLink}
          to="/"
          className="d-flex align-items-center gap-2"
        >
          <PiWalletDuotone size={26} className="gradient-text" />

          <span>
            Budget<span className="gradient-text">Tracker</span>
          </span>
        </BsNavbar.Brand>

        <div className="d-flex align-items-center gap-2 order-lg-3">
          <ThemeToggle />
          <BsNavbar.Toggle aria-controls="main-navbar-nav" />
        </div>

        <BsNavbar.Collapse id="main-navbar-nav" className="order-lg-2">
          <Nav className="ms-lg-3 my-2 my-lg-0">
            <Nav.Link as={NavLink} to="/" end>
              Dashboard
            </Nav.Link>

            <Nav.Link as={NavLink} to="/add">
              Add Transaction
            </Nav.Link>

            <Nav.Link as={NavLink} to="/transaction">
              Transaction Details
            </Nav.Link>

            <Nav.Link as={NavLink} to="/summary">
              Summary
            </Nav.Link>
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
}

export default AppNavbar;