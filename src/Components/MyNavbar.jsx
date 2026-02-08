import { Navbar, Nav, Container } from "react-bootstrap";
import DarkModeToggle from "./DarkModeToggle";
import { theme } from "./Theme";
import { useDarkMode } from "../Context/DarkModeContext";
import logo from "../assets/kanban.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { logoutUser } from "../services/authServices";
import { useAuth } from "../Context/AuthContext";

function MyNavbar() {
  const { darkMode } = useDarkMode();
  const colors = darkMode ? theme.navbar.dark : theme.navbar.light;

  const { isAuthenticated, setIsAuthenticated, user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    setIsAuthenticated(false);
    setUser(null);
    navigate("/login");
  };

  return (
    <Navbar
      style={{
        backgroundColor: colors.background,
        borderBottom: `2px solid ${colors.border}`,
        color: colors.text,
      }}
      className="mb-5"
      expand="lg"
      sticky="top"
      collapseOnSelect // Add this to close menu when item is selected
    >
      <Container fluid>
        {" "}
        {/* Changed to fluid for better spacing */}
        <Navbar.Brand href="#home" style={{ color: colors.text }}>
          <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Kanban Logo"
          />{" "}
          TaskMate | Kanban Board
        </Navbar.Brand>
        {/* Right-aligned controls */}
        <div className="d-flex align-items-center">
          <Navbar.Toggle
            aria-controls="navbar-collapse"
            className="ms-2" // Add margin between toggle and dark mode
            style={{
              border: "none",
              backgroundColor: darkMode
                ? "rgba(255,255,255,0.1)"
                : "transparent",
            }}
          />
        </div>
        {/* Collapsible content */}
        <Navbar.Collapse id="navbar-collapse">
          <Nav className="ms-auto">
            {" "}
            <DarkModeToggle />
            {isAuthenticated && user && (
              <Nav.Item
                className="me-3 d-flex align-items-center"
                style={{ color: colors.text }}
              >
                <i className="bi bi-person-circle me-2" />
                {user.email}
              </Nav.Item>
            )}
            {!isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/login" style={{ color: colors.text }}>
                  Login
                </Nav.Link>

                <Nav.Link
                  as={Link}
                  to="/register"
                  style={{
                    color: darkMode ? "#000" : "#fff",
                    backgroundColor: colors.text,
                    borderRadius: "6px",
                    marginLeft: "8px",
                    padding: "6px 12px",
                  }}
                >
                  Register
                </Nav.Link>
              </>
            ) : (
              <Nav.Link
                onClick={handleLogout}
                style={{
                  color: darkMode ? "#000" : "#fff",
                  backgroundColor: colors.text,
                  borderRadius: "6px",
                  marginLeft: "10px",
                  padding: "6px 12px",
                  cursor: "pointer",
                }}
              >
                Logout
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
