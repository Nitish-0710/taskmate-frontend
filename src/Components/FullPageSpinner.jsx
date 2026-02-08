import { Spinner } from "react-bootstrap";
import { useDarkMode } from "../Context/DarkModeContext";
import { theme } from "../Components/Theme";

const FullPageSpinner = () => {
  const { darkMode } = useDarkMode();

  const spinnerColor = darkMode
    ? theme.doing.primary // Dark mode
    : theme.navbar.light.border; // Light mode

  return (
    <div
      className="vh-100 d-flex justify-content-center align-items-center"
      style={{
        backgroundColor: darkMode ? theme.navbar.dark.background : "#ffffff",
      }}
    >
      <Spinner
        animation="border"
        role="status"
        style={{
          width: "4.5rem",
          height: "4.5rem",
          borderWidth: "0.35em",
          color: spinnerColor,
          boxShadow: darkMode ? `0 0 16px ${theme.doing.primary}66` : "none",
        }}
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default FullPageSpinner;
