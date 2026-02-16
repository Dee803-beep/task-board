import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Board from "../pages/Board";
import { useAuth } from "../context/AuthContext";

export default function App() {
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
