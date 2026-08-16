import { useState } from "react";
import { Container, Nav, Navbar as BsNavbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { PiWalletDuotone } from "react-icons/pi";
import ThemeToggle from "./ThemeToggle";

function AppNavbar() {
  const [expanded, setExpanded] = useState(false);

  // Close the mobile menu after selecting a page.
  const closeMenu = () => {
    setExpanded(false);
  };

  return (
    <BsNavbar
      expand="lg"
      className="glass-navbar"
      variant="light"
      expanded={expanded}
      onToggle={setExpanded}
    >
      <Container>
        <BsNavbar.Brand
          as={NavLink}
          to="/"
          className="d-flex align-items-center gap-2"
          onClick={closeMenu}
        >
          <PiWalletDuotone
            size={26}
            className="gradient-text"
          />

          <span>
            Budget<span className="gradient-text">Tracker</span>
          </span>
        </BsNavbar.Brand>

        <div className="d-flex align-items-center gap-2 order-lg-3">
          <ThemeToggle />

          <BsNavbar.Toggle
            aria-controls="main-navbar-nav"
          />
        </div>

        <BsNavbar.Collapse
          id="main-navbar-nav"
          className="order-lg-2"
        >
          <Nav
            className="ms-lg-3 my-2 my-lg-0"
            onSelect={closeMenu}
          >
            <Nav.Link
              as={NavLink}
              to="/"
              end
              eventKey="/"
            >
              Dashboard
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/add"
              eventKey="/add"
            >
              Add Transaction
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/transaction"
              eventKey="/transaction"
            >
              Transaction Details
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/summary"
              eventKey="/summary"
            >
              Summary
            </Nav.Link>
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
}

export default AppNavbar;
