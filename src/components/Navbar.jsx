import { Link } from "react-router-dom";
import logo from "../assets/images/White Color WOBG-02.png";
import { FaArrowRight } from "react-icons/fa6";
import { ShieldUser } from "lucide-react";

function Navbar() {
  return (
    <header className="fixed top-6 left-0 w-full z-50 px-6">
      <div className="max-w-7xl mx-auto">
        <nav className="flex items-center justify-between h-20 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl px-8 shadow-2xl">

          {/* Logo */}
          <Link to="/">
            <img
              src={logo}
              alt="HD Logo"
              className="h-18 w-auto object-contain"
            />
          </Link>

          {/* Navigation */}
          <ul className="hidden md:flex items-center gap-10 text-white">
            <li>
              <Link
                to="/work"
                className="hover:text-gray-300 transition"
              >
                Work
              </Link>
            </li>

            <li>
              <Link
                to="/services"
                className="hover:text-gray-300 transition"
              >
                Services
              </Link>
            </li>

            <li>
              <Link
                to="/about"
                className="hover:text-gray-300 transition"
              >
                About
              </Link>
            </li>

            <li>
              <Link
                to="/contact"
                className="hover:text-gray-300 transition"
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* Right Side */}
          <div className="flex items-center gap-4">

            {/* Admin Login */}
            <Link
              to="/admin"
              title="Admin Login"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-all duration-300 hover:scale-110 hover:bg-purple-600 hover:border-purple-600"
            >
              <ShieldUser size={20} />
            </Link>

            {/* Hire Me Button */}
            <Link
              to="/contact"
              className="bg-white text-black px-6 py-3 rounded-full flex items-center gap-2 font-semibold hover:scale-105 duration-300"
            >
              Hire Me
              <FaArrowRight />
            </Link>

          </div>

        </nav>
      </div>
    </header>
  );
}

export default Navbar;