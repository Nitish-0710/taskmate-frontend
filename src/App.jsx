import "./Styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Board from "./Components/Board";
import { DndProvider } from "react-dnd";
import MyNavbar from "./Components/MyNavbar";
import { getBackend } from "./Utils/dndBackend";
import { DarkModeProvider } from "./Context/DarkModeContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./Components/ProtectedRoute";
import PublicRoute from "./Components/PublicRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <DarkModeProvider>
          <MyNavbar />
          <DndProvider backend={getBackend()}>
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    {" "}
                    <Board />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <PublicRoute>
                    <Register />
                  </PublicRoute>
                }
              />
            </Routes>
          </DndProvider>
        </DarkModeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
