import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import logo from "../../assets/images/White Color WOBG-02.png";
import { FaArrowRight } from "react-icons/fa6";
import { ShieldUser } from "lucide-react";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  
  // 🟢 Default Data
  const [navData, setNavData] = useState({
    brand: "Kreative Art & Design Studio",
    hire: "Hire Me",
    menu: [
      { label: "Work", url: "/work" },
      { label: "Services", url: "/services" },
      { label: "About", url: "/about" },
      { label: "Team", url: "/team" },
      { label: "Contact", url: "/contact" },
    ],
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);

    // 🟢 1. Load Data from CENTRAL BRAIN (Content Manager)
    const brain = JSON.parse(localStorage.getItem("websiteThemeConfig"));
    
    if (brain) {
      setNavData((prev) => ({
        ...prev,
        brand: brain.navbarBrand || prev.brand,
        hire: brain.buttonConfig?.navHireLabel || prev.hire,
        menu: brain.navbarMenu || prev.menu
      }));
    }

    // 🟢 2. Listen for Live Updates from Brain
    const handleUpdate = () => {
      const updatedBrain = JSON.parse(localStorage.getItem("websiteThemeConfig"));
      if (updatedBrain) {
        setNavData((prev) => ({
          ...prev,
          brand: updatedBrain.navbarBrand || prev.brand,
          hire: updatedBrain.buttonConfig?.navHireLabel || prev.hire,
          menu: updatedBrain.navbarMenu || prev.menu
        }));
      }
    };
    window.addEventListener("themeUpdated", handleUpdate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("themeUpdated", handleUpdate);
    };
  }, []);

  return (
    <header className="fixed top-6 left-0 right-0 z-50 px-6">
      <motion.div
        className="mx-auto"
        animate={{
          width: scrolled ? "92%" : "820px",
        }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <nav className="relative flex h-20 items-center rounded-full border border-white/10 bg-white/5 backdrop-blur-2xl px-8 shadow-2xl">

          {/* Left */}
          <Link to="/" className="absolute left-10 flex items-center">
            <img src={logo} alt="Logo" className="h-20 w-auto object-contain" />
            <motion.span
              initial={false}
              animate={{
                opacity: scrolled ? 1 : 0,
                x: scrolled ? 10 : -20,
                width: scrolled ? "auto" : 0,
                marginLeft: scrolled ? 12 : 0,
              }}
              transition={{ duration: 0.35 }}
              className="overflow-hidden whitespace-nowrap text-lg font-semibold text-white"
            >
              {navData.brand}
            </motion.span>
          </Link>

          {/* Center */}
          <div className="absolute left-[47%] -translate-x-1/2 flex items-center justify-center">
            {!scrolled ? (
              <h2 className="cursor-pointer whitespace-nowrap text-sm font-bold uppercase tracking-[5px] text-white transition-all duration-300 hover:text-violet-400">
                BRAND IDENTITY DESIGNER
              </h2>
            ) : (
              <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-10 text-white">
                {navData.menu.map((item, index) => (
                  <li key={index}>
                    <Link to={item.url} className="hover:text-purple-400 transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </motion.ul>
            )}
          </div>

          {/* Right */}
          <div className="absolute right-10 flex items-center">
            {!scrolled ? (
              <Link to="/admin" className="group flex items-center gap-3 text-white transition-all duration-300">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 transition-all duration-300 group-hover:border-violet-500 group-hover:bg-violet-600">
                  <ShieldUser size={19} className="transition-colors duration-300 group-hover:text-white" />
                </div>
                <span className="font-semibold uppercase tracking-[2px] transition-colors duration-300 group-hover:text-violet-400">
                  ADMIN
                </span>
              </Link>
            ) : (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35 }}>
                <Link
                  to="/contact"
                  className="flex whitespace-nowrap items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-black transition hover:bg-purple-600 hover:text-white"
                >
                  {navData.hire}
                  <FaArrowRight />
                </Link>
              </motion.div>
            )}
          </div>

        </nav>
      </motion.div>
    </header>
  );
}

export default Navbar;