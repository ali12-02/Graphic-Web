// src/pages/About.jsx
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Award,
  Briefcase,
  Globe,
  Star,
  ArrowRight,
  Target,
  Lightbulb,
  Users,
  Clock,
  Shield,
  Zap,
  Sparkles,
  Crown,
  Gem,
  Rocket,
  PenTool,
  Monitor,
  Layers,
  Smartphone,
  Palette,
  Calendar,
  ArrowUpRight,
  Compass,
  Heart,
  TrendingUp,
} from "lucide-react";

function About() {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 30;
      const y = (clientY / innerHeight - 0.5) * 30;
      setMousePosition({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Counter Animation Hook
  const Counter = ({ value, label, suffix = "" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (isInView) {
        let start = 0;
        const duration = 2000;
        const step = Math.ceil(value / (duration / 16));
        const timer = setInterval(() => {
          start += step;
          if (start >= value) {
            setCount(value);
            clearInterval(timer);
          } else {
            setCount(start);
          }
        }, 16);
        return () => clearInterval(timer);
      }
    }, [isInView, value]);

    return (
      <motion.div ref={ref} className="text-center">
        <motion.h3 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          {count}{suffix}
        </motion.h3>
        <p className="mt-2 text-sm text-gray-400 uppercase tracking-wider">{label}</p>
      </motion.div>
    );
  };

  // Timeline Data
  const timelineData = [
    { year: "2020", title: "Started Journey", desc: "Began my design career with a passion for visual storytelling" },
    { year: "2021", title: "First 100 Clients", desc: "Helped 100+ businesses build their brand identities" },
    { year: "2022", title: "Studio Launch", desc: "Founded Kreative Art & Design Studio" },
    { year: "2023", title: "Global Recognition", desc: "Reached 500+ clients across 20+ countries" },
    { year: "2024", title: "5.0 ★ Rating", desc: "Achieved perfect Google rating with 17 reviews" },
    { year: "2025", title: "Today", desc: "Continuing to create premium brands worldwide" },
  ];

  return (
    <main ref={containerRef} className="relative bg-[#050505] text-white overflow-x-hidden">

      {/* ===== BACKGROUND ATMOSPHERE ===== */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <motion.div
          animate={{
            x: [0, 80, -40, 0],
            y: [0, -40, 80, 0],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-400px] left-[-400px] h-[900px] w-[900px] rounded-full bg-purple-600/8 blur-[200px]"
        />
        <motion.div
          animate={{
            x: [0, -80, 40, 0],
            y: [0, 40, -80, 0],
          }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-400px] right-[-400px] h-[900px] w-[900px] rounded-full bg-fuchsia-500/6 blur-[200px]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.008)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.008)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* ===== HERO SECTION ===== */}
      <motion.section
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 pt-32 pb-24 lg:px-8"
      >
        <div className="grid w-full gap-12 lg:grid-cols-2 lg:gap-20">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              transform: `perspective(1200px) rotateY(${mousePosition.x * 0.03}deg)`,
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-3 rounded-full border border-purple-500/20 bg-purple-500/5 px-5 py-1.5 text-xs uppercase tracking-[4px] text-purple-300 backdrop-blur-sm"
            >
              <Sparkles className="h-3 w-3" />
              About Me
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mt-6 text-6xl font-black leading-[1.05] md:text-7xl lg:text-8xl"
            >
              Crafting
              <br />
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-[length:300%_100%] animate-gradient bg-clip-text text-transparent">
                  Brands
                </span>
                <motion.span
                  animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -inset-6 -z-10 rounded-full bg-purple-500/20 blur-3xl"
                />
              </span>
              <br />
              That People
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Remember. ✦
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 max-w-xl text-lg leading-relaxed text-gray-300"
            >
              <span className="font-semibold text-white">Muhammad Mohsin Azeem</span>
              <br />
              Founder of{" "}
              <span className="bg-gradient-to-r from-purple-300 to-purple-400 bg-clip-text text-transparent font-semibold">
                Kreative Art & Design Studio
              </span>
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-4 max-w-xl text-base leading-relaxed text-gray-400"
            >
              I help businesses build premium visual identities, memorable brands
              and digital experiences that inspire trust, create recognition and drive growth.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <div className="relative group">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 blur-xl transition group-hover:opacity-70" />
                  <Link
                    to="/contact"
                    className="relative flex items-center gap-3 rounded-full bg-white px-8 py-4 font-medium text-black transition hover:scale-105"
                  >
                    Let's Work
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
                  </Link>
                </div>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/work"
                  className="rounded-full border border-white/10 px-8 py-4 text-sm font-medium text-white transition hover:border-purple-500/40 hover:bg-purple-500/5"
                >
                  View Portfolio
                </Link>
              </motion.div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-12 flex items-center gap-8"
            >
              <div className="flex -space-x-3">
                {["👤", "👤", "👤", "👤", "👤"].map((emoji, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + i * 0.08 }}
                    className="h-10 w-10 rounded-full border-2 border-[#050505] bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-sm backdrop-blur-sm"
                  >
                    {emoji}
                  </motion.div>
                ))}
              </div>
              <div>
                <p className="text-sm font-medium">1000+ Happy Clients</p>
                <p className="text-xs text-gray-400">Trusted worldwide</p>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT - HERO VISUAL */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            {/* Main Portrait Card */}
            <motion.div
              whileHover={{ scale: 1.02, boxShadow: "0 40px 100px rgba(168,85,247,0.2)" }}
              transition={{ duration: 0.6 }}
              className="relative h-[600px] w-full max-w-[480px] overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-2xl shadow-2xl shadow-purple-500/5"
            >
              {/* Animated Border */}
              <motion.div
                animate={{
                  background: [
                    "linear-gradient(45deg, transparent 0%, #a855f7 20%, transparent 40%, #a855f7 60%, transparent 80%, #a855f7 100%)",
                    "linear-gradient(45deg, transparent 0%, #7c3aed 20%, transparent 40%, #7c3aed 60%, transparent 80%, #7c3aed 100%)",
                  ],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-[2px] rounded-[42px] opacity-20 blur-sm"
              />

              <div className="relative z-10 flex h-full w-full flex-col items-center justify-center p-8 text-center">
                {/* Profile */}
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 30px rgba(168,85,247,0.2)",
                      "0 0 60px rgba(168,85,247,0.4)",
                      "0 0 30px rgba(168,85,247,0.2)",
                    ],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="relative"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-4 rounded-full border-2 border-dashed border-purple-500/20"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-8 rounded-full border border-purple-500/10"
                  />
                  <div className="relative h-40 w-40 rounded-full bg-gradient-to-br from-purple-600/30 to-pink-600/30 flex items-center justify-center text-7xl border-2 border-purple-500/20 shadow-2xl shadow-purple-500/20">
                    👨‍💻
                  </div>
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-8 text-2xl font-bold"
                >
                  Muhammad Mohsin Azeem
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mt-1 text-sm text-purple-400 font-medium tracking-wider"
                >
                  Founder & Creative Director
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="mt-0.5 text-xs text-gray-400"
                >
                  Kreative Art & Design Studio
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="mt-6 flex gap-3"
                >
                  <span className="rounded-full bg-purple-500/20 px-4 py-1.5 text-xs text-purple-300 border border-purple-500/20 backdrop-blur-sm flex items-center gap-2">
                    <Sparkles className="h-3 w-3" />
                    5+ Years
                  </span>
                  <span className="rounded-full bg-yellow-500/20 px-4 py-1.5 text-xs text-yellow-300 border border-yellow-500/20 backdrop-blur-sm flex items-center gap-2">
                    <Star className="h-3 w-3 fill-yellow-400" />
                    5.0 ★
                  </span>
                </motion.div>

                {/* Decorative Elements */}
                <motion.div
                  animate={{ y: [0, -15, 0], opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute top-10 right-10 text-4xl opacity-20"
                >
                  ✦
                </motion.div>
                <motion.div
                  animate={{ y: [0, 15, 0], opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="absolute bottom-10 left-10 text-4xl opacity-20"
                >
                  ✧
                </motion.div>
              </div>
            </motion.div>

            {/* Floating Cards */}
            <motion.div
              animate={{ y: [0, -25, 0], rotate: [0, 3, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-10 top-16 rounded-2xl border border-white/10 bg-[#0a0a0a]/90 p-5 backdrop-blur-xl shadow-2xl shadow-purple-500/10"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-purple-600/20 p-3">
                  <Briefcase className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    100+
                  </h4>
                  <p className="text-xs text-gray-400">Projects</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 25, 0], rotate: [0, -3, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-8 bottom-20 rounded-2xl border border-white/10 bg-[#0a0a0a]/90 p-5 backdrop-blur-xl shadow-2xl shadow-yellow-500/10"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-yellow-500/20 p-3">
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                </div>
                <div>
                  <h4 className="text-2xl font-black text-yellow-400">5.0★</h4>
                  <p className="text-xs text-gray-400">Google</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ scale: [1, 1.05, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -right-6 top-10"
            >
              <div className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-0.5">
                <div className="rounded-full bg-[#050505] px-3 py-1.5 text-[10px] font-semibold text-purple-300 tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <Crown className="h-3 w-3" />
                    Premium
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              className="absolute -left-4 bottom-10"
            >
              <div className="rounded-full border border-white/10 bg-[#0a0a0a]/80 px-3 py-1.5 text-[10px] font-medium text-gray-400 backdrop-blur-sm">
                <span className="flex items-center gap-1.5">
                  <Globe className="h-3 w-3 text-cyan-400" />
                  Global
                </span>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </motion.section>

      {/* ===== STATISTICS WITH COUNTERS ===== */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 text-sm uppercase tracking-[6px] text-purple-400">
            <TrendingUp className="h-4 w-4" />
            Statistics
          </span>
          <h2 className="mt-4 text-4xl font-black md:text-5xl">
            By the{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Numbers
            </span>
          </h2>
        </motion.div>

        <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl text-center">
            <Counter value={100} suffix="+" label="Projects Delivered" />
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl text-center">
            <Counter value={17} label="Google Reviews" />
            <div className="mt-1 flex justify-center gap-0.5 text-xs text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-yellow-400" />
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl text-center">
            <div className="text-6xl md:text-7xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              5.0
            </div>
            <p className="mt-2 text-sm text-gray-400 uppercase tracking-wider">Rating ★</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl text-center">
            <div className="text-6xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              20+
            </div>
            <p className="mt-2 text-sm text-gray-400 uppercase tracking-wider">Countries</p>
          </div>
        </div>
      </section>

      {/* ===== JOURNEY TIMELINE ===== */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 text-sm uppercase tracking-[6px] text-purple-400">
            <Calendar className="h-4 w-4" />
            Journey
          </span>
          <h2 className="mt-4 text-4xl font-black md:text-5xl">
            My{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Timeline
            </span>
          </h2>
        </motion.div>

        <div className="relative mt-16">
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-purple-500/50 via-purple-500/20 to-transparent md:left-1/2" />

          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative mb-12 flex flex-col md:flex-row ${
                index % 2 === 0 ? "md:pr-[50%]" : "md:pl-[50%] md:justify-end"
              }`}
            >
              <div className={`flex items-start gap-4 md:gap-6 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                <motion.div
                  whileHover={{ scale: 1.3 }}
                  className="relative z-10 mt-1 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-purple-500/30 bg-[#050505]"
                >
                  <div className="h-3 w-3 rounded-full bg-purple-500" />
                </motion.div>

                <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-purple-500/20">
                    <span className="text-sm font-bold text-purple-400">{item.year}</span>
                    <h4 className="mt-1 text-lg font-semibold">{item.title}</h4>
                    <p className="mt-1 text-sm text-gray-400">{item.desc}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 text-sm uppercase tracking-[6px] text-purple-400">
            <Gem className="h-4 w-4" />
            Services
          </span>
          <h2 className="mt-4 text-4xl font-black md:text-5xl">
            What I{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Offer
            </span>
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Palette, title: "Brand Identity", desc: "Complete visual identity systems that define your brand" },
            { icon: PenTool, title: "Logo Design", desc: "Unique, memorable logos that tell your story" },
            { icon: Layers, title: "Packaging", desc: "Premium packaging that stands out on shelves" },
            { icon: Monitor, title: "Visual Identity", desc: "Cohesive visual language across all touchpoints" },
            { icon: Smartphone, title: "UI Design", desc: "Beautiful, functional digital interfaces" },
            { icon: Globe, title: "Social Media", desc: "Engaging visual content for all platforms" },
          ].map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              whileHover={{ y: -8, boxShadow: "0 30px 60px rgba(168,85,247,0.08)" }}
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:border-purple-500/30"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-purple-500/10 group-hover:scale-110 transition">
                <service.icon className="h-6 w-6 text-purple-400" />
              </div>
              <h4 className="mt-4 text-lg font-semibold">{service.title}</h4>
              <p className="mt-2 text-sm text-gray-400 leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== WHY WORK WITH ME ===== */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 text-sm uppercase tracking-[6px] text-purple-400">
            <Heart className="h-4 w-4" />
            Why Work With Me
          </span>
          <h2 className="mt-4 text-4xl font-black md:text-5xl">
            Built on{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Trust & Excellence
            </span>
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Zap,
              title: "Fast Communication",
              desc: "Clear, responsive communication from start to finish. Always available.",
              color: "from-purple-500/20 to-purple-400/20",
            },
            {
              icon: Lightbulb,
              title: "Creative Thinking",
              desc: "Every project backed by research, creativity and strategic thinking.",
              color: "from-yellow-500/20 to-yellow-400/20",
            },
            {
              icon: Shield,
              title: "Professional Process",
              desc: "Structured workflow ensuring quality, deadlines and client satisfaction.",
              color: "from-cyan-500/20 to-cyan-400/20",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -10, boxShadow: "0 30px 60px rgba(168,85,247,0.08)" }}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${item.color} p-8 backdrop-blur-xl transition-all duration-300 hover:border-purple-500/30`}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-pink-500/0 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative z-10">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition">
                  <item.icon className="h-6 w-6 text-purple-400" />
                </div>
                <h4 className="mt-4 text-xl font-semibold">{item.title}</h4>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== GOOGLE REVIEWS ===== */}
      <section className="mx-auto max-w-5xl px-6 py-24 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-purple-600/10 to-pink-600/10 p-12 backdrop-blur-xl text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-pink-500/10 blur-3xl"
          />

          <div className="relative z-10">
            <div className="flex justify-center gap-1 text-3xl text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-8 w-8 fill-yellow-400" />
              ))}
            </div>
            <h3 className="mt-4 text-3xl font-bold">5.0 ★ Google Rating</h3>
            <p className="mt-2 text-sm text-gray-400">17 Verified Reviews</p>
            <blockquote className="mt-8 max-w-2xl mx-auto text-lg leading-relaxed text-gray-300 italic">
              "Muhammad Mohsin Azeem is the Founder of Kreative Art & Design Studio, 
              a professional graphic design studio providing creative and reliable 
              design solutions for businesses and individuals worldwide."
            </blockquote>
            <div className="mt-6 flex items-center justify-center gap-4 flex-wrap">
              <span className="text-sm text-gray-400">— Google Reviews</span>
              <span className="rounded-full bg-purple-500/20 px-4 py-1.5 text-xs text-purple-300 border border-purple-500/20">
                17 Reviews
              </span>
              <span className="rounded-full bg-yellow-500/20 px-4 py-1.5 text-xs text-yellow-300 border border-yellow-500/20 flex items-center gap-2">
                <Star className="h-3 w-3 fill-yellow-400" />
                5.0 Average
              </span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== CREATIVE PROCESS ===== */}
      <section className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 text-sm uppercase tracking-[6px] text-purple-400">
            <Compass className="h-4 w-4" />
            Process
          </span>
          <h2 className="mt-4 text-4xl font-black md:text-5xl">
            My Creative{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Process
            </span>
          </h2>
        </motion.div>

        <div className="relative mt-16">
          <div className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-purple-500/30 via-purple-500/10 to-transparent hidden md:block" />

          <div className="grid gap-8 md:grid-cols-3">
            {[
              { step: "01", title: "Discovery", desc: "Understanding your brand, goals, and audience" },
              { step: "02", title: "Research", desc: "Deep research into your industry and competitors" },
              { step: "03", title: "Strategy", desc: "Developing a clear creative direction and approach" },
              { step: "04", title: "Design", desc: "Crafting visuals that align with your brand strategy" },
              { step: "05", title: "Presentation", desc: "Presenting concepts with clear rationale" },
              { step: "06", title: "Delivery", desc: "Polished, production-ready final assets" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-purple-500/30"
              >
                <span className="text-sm font-bold text-purple-400">{item.step}</span>
                <h4 className="mt-2 text-lg font-semibold">{item.title}</h4>
                <p className="mt-1 text-sm text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CLIENTS ===== */}
      <section className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 text-sm uppercase tracking-[6px] text-purple-400">
            <Users className="h-4 w-4" />
            Clients
          </span>
          <h2 className="mt-4 text-3xl font-black md:text-4xl">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Businesses Worldwide
            </span>
          </h2>
        </motion.div>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            "🏢", "💼", "🏦", "🏗️",
            "🛍️", "💻", "🎯", "🌟",
          ].map((emoji, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              whileHover={{ scale: 1.05 }}
              className="flex h-24 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm text-4xl transition hover:border-purple-500/20"
            >
              {emoji}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="px-6 pb-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto max-w-7xl overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-br from-purple-700/20 to-fuchsia-600/20 p-12 md:p-20 text-center backdrop-blur-xl"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-purple-500/10 blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full bg-pink-500/10 blur-3xl"
          />

          <div className="relative z-10">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-dashed border-purple-500/30"
            >
              <Sparkles className="h-8 w-8 text-purple-400" />
            </motion.div>

            <h2 className="text-4xl font-black md:text-6xl lg:text-7xl">
              Let's Build Something
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Remarkable Together.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-300 md:text-lg">
              Whether you're launching a new business, rebranding an existing one,
              or looking for premium visual design — let's create something unforgettable.
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-10 inline-block"
            >
              <div className="relative group">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 blur-xl transition group-hover:opacity-70" />
                <Link
                  to="/contact"
                  className="relative inline-flex items-center gap-3 rounded-full bg-white px-10 py-5 text-lg font-medium text-black transition-all duration-300 hover:scale-105"
                >
                  Start Your Project
                  <ArrowUpRight size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                </Link>
              </div>
            </motion.div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-purple-400" />
                24/7 Support
              </span>
              <span className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-purple-400" />
                Global Clients
              </span>
              <span className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-400" />
                5.0 Rating
              </span>
              <span className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-purple-400" />
                Premium Quality
              </span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== KEYFRAMES ===== */}
      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 300% 100%;
          animation: gradient 5s ease infinite;
        }
      `}</style>

    </main>
  );
}

export default About;