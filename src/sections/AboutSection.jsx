// AboutSection.jsx
import { motion } from "framer-motion";
import aboutImage from "../assets/images/about-workspace.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 }
  }
};

export default function AboutSection() {
  const skills = [
    "Brand Identity",
    "Logo Design",
    "Website Design",
    "UI / UX Design",
    "Social Media",
    "Packaging Design",
  ];

  const stats = [
    ["1000+","Projects"],
    ["100++","Clients"],
    ["5+","Years"],
    ["100%","Satisfaction"],
  ];

  return (
    <section className="relative overflow-hidden bg-[#050505] py-28">
      <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-violet-600/20 blur-[170px]" />
      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-[170px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{once:true}}>
            <div className="overflow-hidden rounded-[32px] border border-white/10">
              <img
                src={aboutImage}
                alt="About"
                className="h-[650px] w-full object-cover transition duration-700 hover:scale-105"
              />
            </div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{once:true}}>
            <p className="uppercase tracking-[8px] text-gray-400">ABOUT ME</p>

            <h2 className="mt-4 text-5xl font-bold leading-tight text-white md:text-6xl">
              Designing Brands
              <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
                That People Remember.
              </span>
            </h2>

            <p className="mt-8 text-lg leading-8 text-gray-300">
              I'm Mohsin Azeem, a Brand Identity Designer creating premium
              branding, websites and digital experiences that help businesses
              stand out.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {skills.map((s)=>(
                <div key={s} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-gray-200">
                  {s}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-24 grid gap-6 md:grid-cols-4">
          {stats.map(([n,t])=>(
            <div key={t} className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <div className="text-5xl font-bold text-white">{n}</div>
              <div className="mt-3 uppercase tracking-[3px] text-gray-400">{t}</div>
            </div>
          ))}
        </div>

        <div className="mt-24 rounded-[36px] border border-white/10 bg-white/5 px-8 py-16 text-center">
          <h3 className="text-4xl font-bold text-white md:text-5xl">
            Let's Build Something Amazing
          </h3>
          <p className="mx-auto mt-6 max-w-2xl text-gray-300">
            Ready to elevate your brand with premium design?
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <button className="rounded-full bg-white px-8 py-4 font-semibold text-black">
              Let's Talk
            </button>
            <a
  href="/Mohsin-Azeem-Resume.pdf"
  download
  className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-4 font-semibold text-white transition-all duration-300 hover:border-violet-400 hover:bg-violet-500/10"
>
  Download Resume
</a>          </div>
        </div>
      </div>
    </section>
  );
}