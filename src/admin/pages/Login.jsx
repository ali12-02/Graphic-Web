import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../utils/auth";
import { motion } from "framer-motion";
import {
  FiUser,
  FiLock,
  FiEye,
  FiEyeOff,
  FiHome,
  FiArrowLeft,
} from "react-icons/fi";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (login(username, password)) {
      navigate("/dashboard");
    } else {
      setError("Invalid Username or Password");
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050505] overflow-hidden flex items-center justify-center px-6">

      {/* Purple Glow */}
      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-purple-700/20 blur-[140px]" />
      <div className="absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-fuchsia-700/20 blur-[140px]" />

      {/* Home Button */}
      <Link
        to="/"
        className="absolute left-8 top-8 z-20 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-white backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-purple-500 hover:bg-purple-600"
      >
        <FiArrowLeft size={18} />
        <FiHome size={18} />
        <span className="font-medium">Back to Website</span>
      </Link>

      {/* Glass Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl p-10 shadow-2xl"
      >
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[6px] text-purple-400">
            Graphic Web CMS
          </p>

          <h1 className="mt-4 text-4xl font-bold text-white">
            Welcome Back
          </h1>

          <p className="mt-3 text-gray-400">
            Login to manage your portfolio.
          </p>
        </div>

        <form onSubmit={handleLogin}>
          {/* Username */}
          <div className="relative mb-5">
            <FiUser className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Username"
              className="w-full rounded-2xl border border-white/10 bg-black/40 py-4 pl-14 pr-5 text-white outline-none transition focus:border-purple-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="relative mb-4">
            <FiLock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full rounded-2xl border border-white/10 bg-black/40 py-4 pl-14 pr-14 text-white outline-none transition focus:border-purple-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-white"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          {error && (
            <p className="mb-5 text-center text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-2xl bg-white py-4 font-semibold text-black transition duration-300 hover:scale-[1.02] hover:bg-purple-500 hover:text-white"
          >
            Login
          </button>
        </form>

        {/* 🟢 NEW: Bypass Link for Testing */}
        <div className="mt-8 border-t border-white/10 pt-6 text-center">
          <Link
            to="/dashboard"
            className="text-xs text-gray-500 hover:text-purple-400 transition-colors underline decoration-transparent hover:decoration-purple-400 underline-offset-2"
          >
            [ Test Mode: Skip Login → ]
          </Link>
        </div>

        <div className="mt-4 text-center text-sm text-gray-500">
          © 2026 Graphic Web CMS
        </div>
      </motion.div>
    </div>
  );
}

export default Login;