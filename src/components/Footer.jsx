import { FaInstagram, FaLinkedin, FaBehance, FaGithub } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-16 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <h2 className="text-white text-5xl font-bold mb-6">
          Let's Build Something Amazing.
        </h2>

        {/* Description */}
        <p className="text-gray-400 text-lg max-w-2xl">
          I'm always open to discussing new projects, creative ideas,
          or opportunities to be part of your vision.
        </p>

        {/* Contact */}
        <div className="mt-10 space-y-2">
          <p className="text-white">team.kreative.studio42645@gmail.com</p>
          <p className="text-gray-400">+92 370 7617837</p>
        </div>

        {/* Social Icons */}
        <div className="flex gap-6 mt-10 text-2xl text-white">
          <a
  href="https://www.instagram.com/kreative.studio.official/"
  target="_blank"
  rel="noopener noreferrer"
  className="hover:text-purple-400 transition duration-300"
>
  <FaInstagram />
</a>
          <a href="https://www.behance.net/kreativdesign6"target="_blank"rel="noopener noreferrer"className="hover:text-purple-400 transition duration-300"><FaBehance /></a>
          <a href="https://www.linkedin.com/in/kreative-art-and-design-studio-a81091373/"target="_blank"rel="noopener noreferrer"className="hover:text-purple-400 transition duration-300"><FaLinkedin /></a>
          <a href="https://web.facebook.com/profile.php?id=61578010898508"target="_blank"rel="noopener noreferrer"className="hover:text-purple-400 transition duration-300"><FaFacebook /></a>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-12 pt-6">
          <p className="text-gray-500 text-sm">
            © 2026 Kreative Art & Desing Studio. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;