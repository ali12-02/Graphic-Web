import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Phone, MapPin, Heart, Briefcase, Code, Globe, Send } from "lucide-react";

// 🟢 IMPORT NOTIFICATION SERVICE
import { sendNotification } from "../utils/notificationService"; 

function Contact() {
  // DYNAMIC SETTINGS
  const [settings, setSettings] = useState({
    heroTitle: "Mohsin Azeem",
    heroSubtitle: "Creative Director & Brand Identity Designer",
    heroLocation: "Faisalabad, Pakistan",
    heroWebsite: "www.kreativedesign.com"
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("websiteThemeConfig"));
    if (saved) {
      setSettings({
        heroTitle: saved.heroTitle || "Mohsin Azeem",
        heroSubtitle: saved.heroSubtitle || "Creative Director & Brand Identity Designer",
        heroLocation: saved.heroLocation || "Faisalabad, Pakistan",
        heroWebsite: saved.heroWebsite || "www.kreativedesign.com"
      });
    }
  }, []);

  // Form State
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate sending email
    setTimeout(() => {
      
      // 🟢 NOTIFICATION TRIGGER
      sendNotification(
        "New Contact Message", 
        `You received a message from ${formData.name} (${formData.email}).`, 
        "contact"
      );

      alert("✅ Message sent successfully! (Demo mode)");
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white py-20 lg:py-32 px-6 relative overflow-hidden">
      
      {/* Premium Background Glows */}
      <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-violet-600/20 blur-[170px] pointer-events-none" />
      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-[170px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-purple-600/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 lg:mb-12 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>

        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-4 bg-gradient-to-r from-white via-purple-200 to-fuchsia-200 bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Let's bring your ideas to life.
          </p>
        </div>

        {/* Main Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start"
        >
          
          {/* ===== LEFT SIDE: CONTACT INFO ===== */}
          <div className="space-y-8 bg-[#0f0f0f] border border-white/5 rounded-3xl p-8 lg:p-10 shadow-xl">
            
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">{settings.heroTitle}</h2>
              <p className="text-purple-400">{settings.heroSubtitle}</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-purple-500/10">
                  <MapPin size={22} className="text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wider">Location</p>
                  <p className="text-white">{settings.heroLocation}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-purple-500/10">
                  <Globe size={22} className="text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wider">Website</p>
                  <a href="#" className="text-white hover:text-purple-400 transition">{settings.heroWebsite}</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-purple-500/10">
                  <Mail size={22} className="text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wider">Email</p>
                  <a href="mailto:hello@kreativedesign.com" className="text-white hover:text-purple-400 transition">hello@kreativedesign.com</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-purple-500/10">
                  <Phone size={22} className="text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wider">Phone</p>
                  <a href="tel:+923007617837" className="text-white hover:text-purple-400 transition">+92 300 7617837</a>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-6 border-t border-white/5">
              <p className="text-sm text-gray-400 uppercase tracking-wider mb-4">Follow Us</p>
              <div className="flex gap-4">
                <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition text-gray-400 hover:text-white"><Heart size={20} /></a>
                <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition text-gray-400 hover:text-white"><Briefcase size={20} /></a>
                <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition text-gray-400 hover:text-white"><Code size={20} /></a>
              </div>
            </div>
          </div>

          {/* ===== RIGHT SIDE: CONTACT FORM ===== */}
          <div className="bg-[#0f0f0f] border border-white/5 rounded-3xl p-8 lg:p-10 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 outline-none transition focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Your Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 outline-none transition focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Your Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Tell us about your project..."
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 outline-none transition focus:border-purple-500 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center gap-2 rounded-xl py-4 font-semibold text-white transition-all duration-300 ${isSubmitting ? 'bg-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:scale-105 hover:shadow-[0_0_35px_rgba(168,85,247,0.5)]'}`}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span> Sending...</span>
                ) : (
                  <span className="flex items-center gap-2"><Send size={18} /> Send Message</span>
                )}
              </button>
            </form>
          </div>

        </motion.div>
      </div>
    </div>
  );
}

export default Contact;