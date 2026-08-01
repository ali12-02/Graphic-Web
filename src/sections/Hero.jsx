import { motion } from "framer-motion";
import heroBg from "../assets/images/hero.jpg";

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: `url(${heroBg})`,
        }}
      />

      {/* Black Overlay with Spotlight */}
<div className="absolute inset-0 bg-black/90 spotlight" />

      {/* Left Glow */}
      <div className="absolute left-[-200px] top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-violet-600/20 blur-[180px]" />

      {/* Right Glow */}
      <div className="absolute right-[-200px] top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-fuchsia-500/20 blur-[180px]" />

      {/* Content */}
      <div className="relative z-10 text-center px-6">

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="uppercase tracking-[8px] text-gray-200 mb-6"
        >
          Brand Identity Designer
        </motion.p>

        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-white text-7xl md:text-9xl font-bold leading-none"
          >
            Mohsin Azeem
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.5,
            duration: 0.8,
          }}
          className="text-white text-lg max-w-3xl mx-auto mt-8 leading-8"
        >
          I design brands, websites and digital experiences that leave a lasting impression.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.8,
            duration: 0.8,
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="mt-10 rounded-full bg-white px-8 py-4 font-semibold text-black"
        >
          View Recent Projects
        </motion.button>

      </div>
    </section>
  );
}

export default Hero;