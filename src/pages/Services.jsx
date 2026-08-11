import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Palette, Monitor, PenTool, Users, TrendingUp, Package } from "lucide-react";

function Services() {
  // 🟢 DYNAMIC CONTENT (Optional: Can be linked to Admin Panel later)
  const [content, setContent] = useState({
    title: "Our Services",
    subtitle: "What We Do Best"
  });

  useEffect(() => {
    // Load from Admin Theme Settings if needed
    const saved = JSON.parse(localStorage.getItem("websiteThemeConfig"));
    if (saved) {
      setContent({
        title: saved.heroTitle ? `Services by ${saved.heroTitle}` : "Our Services",
        subtitle: "What We Do Best"
      });
    }
  }, []);

  // 🟢 SERVICES DATA (You can add/remove any service here)
  const servicesList = [
    {
      icon: Palette,
      title: "Brand Identity Design",
      description: "Creating memorable logos, color palettes, and brand guidelines that make your business stand out."
    },
    {
      icon: Monitor,
      title: "Website Design & Development",
      description: "Building modern, responsive, and user-friendly websites that drive conversions and engagement."
    },
    {
      icon: PenTool,
      title: "UI / UX Design",
      description: "Designing intuitive digital experiences with a focus on user journeys and visual aesthetics."
    },
    {
      icon: TrendingUp, // 🟢 SOCIAL MEDIA
      title: "Social Media Marketing",
      description: "Strategic social media management to grow your audience, increase engagement, and build a loyal community."
    },
    {
      icon: Users, // 🟢 ADS MANAGEMENT
      title: "Ads Management & Campaigns",
      description: "Data-driven ad campaigns across Meta, Google, and LinkedIn to maximize your ROI and reach the right customers."
    },
    {
      icon: Package,
      title: "Packaging Design",
      description: "Eye-catching packaging designs that reflect your brand personality and stand out on the shelves."
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white py-20 lg:py-32 px-6 relative overflow-hidden">
      
      {/* Background Glows */}
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
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-4 bg-gradient-to-r from-white via-purple-200 to-fuchsia-200 bg-clip-text text-transparent"
          >
            {content.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            {content.subtitle}
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {servicesList.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-[#0f0f0f] border border-white/5 rounded-3xl p-8 hover:border-purple-500/50 hover:shadow-[0_0_40px_rgba(168,85,247,0.1)] transition-all duration-300 cursor-default"
              >
                {/* Glow on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 rounded-3xl pointer-events-none"></div>

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition">
                    <Icon size={24} className="text-purple-400 group-hover:scale-110 transition" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm group-hover:text-gray-300 transition-colors">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-20"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Ready to take your brand to the next level?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">Let's discuss how our creative services can help your business grow.</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(168,85,247,0.5)]"
          >
            Let's Talk
          </Link>
        </motion.div>

      </div>
    </div>
  );
}

export default Services;