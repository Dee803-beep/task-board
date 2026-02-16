import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login.jsx";
import Board from "../pages/Board.jsx";
import { useAuth } from "../context/AuthContext";

export default function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={user ? <Board /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}
