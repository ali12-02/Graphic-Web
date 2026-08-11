import { useEffect, useState } from "react";
import { Heart, Briefcase, MessageCircle, Globe, Users } from "lucide-react";

function Footer() {
  const [footer, setFooter] = useState({
    brand: "Kreative Art & Design Studio",
    tagline: "Where Creativity Meets Professionalism.",
    copyright: "© 2026 Kreative Art & Design Studio. All rights reserved.",
    columns: [
      {
        title: "Explore",
        links: [
          { label: "Work", url: "/work" },
          { label: "Services", url: "/services" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About", url: "/about" },
          { label: "Contact", url: "/contact" },
          { label: "Our Team", url: "/team" },
        ],
      },
    ],
    socials: [
      { label: "Instagram", url: "#" },
      { label: "LinkedIn", url: "#" },
      { label: "Twitter / X", url: "#" },
    ],
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("websiteThemeConfig"));
    if (saved) {
      setFooter({
        brand: saved.footerBrand || "Kreative Art & Design Studio",
        tagline: saved.footerTagline || "Where Creativity Meets Professionalism.",
        copyright: saved.footerCopyright || "© 2026 Kreative Art & Design Studio. All rights reserved.",
        columns: saved.footerColumns || [
          { title: "Explore", links: [{ label: "Work", url: "/work" }, { label: "Services", url: "/services" }] },
          { title: "Company", links: [{ label: "About", url: "/about" }, { label: "Contact", url: "/contact" }, { label: "Our Team", url: "/team" }] },
        ],
        socials: saved.footerSocials || [
          { label: "Instagram", url: "#" },
          { label: "LinkedIn", url: "#" },
          { label: "Twitter / X", url: "#" },
        ],
      });
    }
  }, []);

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5 py-16 lg:py-20 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-center md:text-left">
        
        {/* Column 1: Brand & Tagline */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">{footer.brand}</h2>
          <p className="text-gray-400 max-w-xs mx-auto md:mx-0">{footer.tagline}</p>
          <div className="pt-4 text-sm text-gray-500">{footer.copyright}</div>
        </div>

        {/* 🟢 DYNAMIC COLUMNS */}
        {footer.columns.map((col, index) => (
          <div key={index} className="space-y-4">
            <h4 className="text-sm uppercase tracking-widest text-gray-500">{col.title}</h4>
            <ul className="space-y-3">
              {col.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <a href={link.url} className="text-gray-400 hover:text-white transition-colors flex items-center justify-center md:justify-start gap-2">
                    {/* Icons based on column and link index (Just for style) */}
                    {index === 0 && linkIndex === 0 && <Briefcase size={16} />}
                    {index === 0 && linkIndex === 1 && <Globe size={16} />}
                    {index === 1 && linkIndex === 0 && <Heart size={16} />}
                    {index === 1 && linkIndex === 1 && <MessageCircle size={16} />}
                    {index === 1 && linkIndex === 2 && <Users size={16} />}
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* 🟢 DYNAMIC SOCIAL LINKS */}
        <div className="space-y-4">
          <h4 className="text-sm uppercase tracking-widest text-gray-500">Connect</h4>
          <div className="flex justify-center md:justify-start gap-4">
            {footer.socials.map((social, index) => (
              <a 
                key={index} 
                href={social.url} 
                target="_blank" 
                rel="noreferrer" 
                className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition text-gray-400 hover:text-white"
              >
                {index === 0 && <Heart size={20} />}
                {index === 1 && <Briefcase size={20} />}
                {index === 2 && <MessageCircle size={20} />}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;