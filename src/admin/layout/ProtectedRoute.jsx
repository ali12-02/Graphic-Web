import { Navigate } from "react-router-dom";

// 🟢 FIXED: Direct LocalStorage check bypass kiya
function ProtectedRoute({ children }) {
  // Check if user is logged in via the bypass or actual login
  const isAuthenticated = 
    localStorage.getItem("admin") === "true" || 
    localStorage.getItem("token") !== null;

  // Agar authenticate nahi hai, toh /admin par bhej do
  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  // Agar authenticate hai, toh children (Dashboard) dikhao
  return children;
}

export default ProtectedRoute;