// src/pages/Contact.jsx
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  Send,
  Sparkles,
  Star,
  Globe,
  Shield,
  MessageCircle,
} from "lucide-react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Thank you! Your message has been sent successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="relative bg-[#050505] text-white overflow-x-hidden">

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
      <section className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 pt-32 pb-24 lg:px-8">
        <div className="grid w-full gap-12 lg:grid-cols-2 lg:gap-20">

          {/* LEFT - Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-3 rounded-full border border-purple-500/20 bg-purple-500/5 px-5 py-1.5 text-xs uppercase tracking-[4px] text-purple-300 backdrop-blur-sm"
            >
              <Sparkles className="h-3 w-3" />
              Contact
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mt-6 text-6xl font-black leading-[1.05] md:text-7xl lg:text-8xl"
            >
              Get In
              <br />
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-[length:300%_100%] animate-gradient bg-clip-text text-transparent">
                  Touch
                </span>
              </span>
              <br />
              <span className="text-4xl md:text-5xl lg:text-6xl text-gray-400">
                Let's Connect.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-gray-300"
            >
              Have a project in mind? Let's bring your vision to life.
              I'm always open to discussing new projects, creative ideas,
              and opportunities to be part of your vision.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-10 space-y-4"
            >
              {/* Contact Details */}
              <div className="group flex items-center gap-4 rounded-xl border border-white/5 bg-white/5 p-4 backdrop-blur-sm transition hover:border-purple-500/30 hover:bg-purple-500/5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/10 text-purple-400 group-hover:scale-110 transition">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">Email</p>
                  <p className="font-medium">mohsin@example.com</p>
                </div>
              </div>

              <div className="group flex items-center gap-4 rounded-xl border border-white/5 bg-white/5 p-4 backdrop-blur-sm transition hover:border-purple-500/30 hover:bg-purple-500/5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/10 text-purple-400 group-hover:scale-110 transition">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">Phone</p>
                  <p className="font-medium">+92 300 1234567</p>
                </div>
              </div>

              <div className="group flex items-center gap-4 rounded-xl border border-white/5 bg-white/5 p-4 backdrop-blur-sm transition hover:border-purple-500/30 hover:bg-purple-500/5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/10 text-purple-400 group-hover:scale-110 transition">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">Location</p>
                  <p className="font-medium">Lahore, Pakistan</p>
                </div>
              </div>

              <div className="group flex items-center gap-4 rounded-xl border border-white/5 bg-white/5 p-4 backdrop-blur-sm transition hover:border-purple-500/30 hover:bg-purple-500/5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/10 text-purple-400 group-hover:scale-110 transition">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">Working Hours</p>
                  <p className="font-medium">Mon–Fri, 9AM – 6PM</p>
                </div>
              </div>
            </motion.div>

            {/* Social Icons - Simple Emojis */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-8 flex items-center gap-3"
            >
              <span className="text-sm text-gray-400">Follow me:</span>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg transition hover:border-purple-500/30 hover:bg-purple-500/10">📸</a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg transition hover:border-purple-500/30 hover:bg-purple-500/10">📘</a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg transition hover:border-purple-500/30 hover:bg-purple-500/10">🐦</a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg transition hover:border-purple-500/30 hover:bg-purple-500/10">🔗</a>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-10 flex flex-wrap items-center gap-6"
            >
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Shield className="h-4 w-4 text-purple-400" />
                <span>100% Professional</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Globe className="h-4 w-4 text-purple-400" />
                <span>Global Clients</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Star className="h-4 w-4 text-yellow-400" />
                <span>5.0 Rating</span>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            <motion.div
              whileHover={{ boxShadow: "0 40px 100px rgba(168,85,247,0.1)" }}
              transition={{ duration: 0.6 }}
              className="relative w-full max-w-[500px] overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-8 backdrop-blur-2xl shadow-2xl shadow-purple-500/5"
            >
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

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/10">
                    <MessageCircle className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Send a Message</h3>
                    <p className="text-xs text-gray-400">I'll get back to you within 24 hours</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 backdrop-blur-sm transition focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 backdrop-blur-sm transition focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Project Discussion"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 backdrop-blur-sm transition focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project..."
                      rows="4"
                      required
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 backdrop-blur-sm transition focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 resize-none"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative w-full group"
                  >
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 blur-xl transition group-hover:opacity-70" />
                    <div className="relative flex items-center justify-center gap-3 rounded-full bg-white px-6 py-3.5 font-medium text-black transition hover:scale-[1.02] w-full">
                      Send Message
                      <Send className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition" />
                    </div>
                  </motion.button>
                </form>

                <motion.div
                  animate={{ y: [0, -10, 0], opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute top-6 right-6 text-3xl opacity-20"
                >
                  ✦
                </motion.div>
                <motion.div
                  animate={{ y: [0, 10, 0], opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="absolute bottom-6 left-6 text-3xl opacity-20"
                >
                  ✧
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
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
              Let's Start Your
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Next Project Today.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-300 md:text-lg">
              Ready to take your brand to the next level? Let's collaborate
              and create something truly remarkable together.
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-10 inline-block"
            >
              <div className="relative group">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 blur-xl transition group-hover:opacity-70" />
                <Link
                  to="#"
                  className="relative inline-flex items-center gap-3 rounded-full bg-white px-10 py-5 text-lg font-medium text-black transition-all duration-300 hover:scale-105"
                  onClick={() => {
                    document.querySelector('input')?.focus();
                  }}
                >
                  Send a Message
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition" />
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

export default Contact;