import React from "react";
import { motion } from "framer-motion";
import { Menu, X, Cpu, Zap, Shield, Mail, ArrowRight, Github, Instagram, Facebook, Linkedin } from "lucide-react";

export default function LandingPage() {
  const [open, setOpen] = React.useState(false);
  const nav = [
    { id: "home", label: "Home" },
    { id: "features", label: "Features" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/60 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-2xl bg-slate-900 text-white grid place-items-center font-bold">O</div>
            <span className="font-semibold tracking-tight">Omar Studio</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {nav.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="text-sm hover:text-slate-700">
                {n.label}
              </button>
            ))}
            <a href="#contact" onClick={(e)=>{e.preventDefault();scrollTo('contact');}} className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 bg-slate-900 text-white hover:opacity-90">
              Get in touch <ArrowRight size={16} />
            </a>
          </nav>
          <button className="md:hidden p-2" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <div className="md:hidden border-t border-slate-200">
            <div className="max-w-6xl mx-auto px-4 py-3 grid gap-2">
              {nav.map((n) => (
                <button key={n.id} onClick={() => scrollTo(n.id)} className="text-left py-2">
                  {n.label}
                </button>
              ))}
              <button onClick={() => scrollTo("contact")} className="mt-2 inline-flex items-center gap-2 rounded-2xl px-4 py-2 bg-slate-900 text-white">
                Get in touch <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-20 md:py-28 grid md:grid-cols-2 items-center gap-10">
          <div>
            <motion.h1 initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
              Build something <span className="bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">great</span>
            </motion.h1>
            <p className="mt-5 text-slate-600 max-w-prose">A clean, responsive starter you can customize in minutes. Swap text, colors, and sections to launch a personal site, portfolio, or product page.</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href="#projects" onClick={(e)=>{e.preventDefault();scrollTo('projects');}} className="rounded-2xl px-5 py-3 bg-slate-900 text-white inline-flex items-center gap-2">
                See projects <ArrowRight size={18} />
              </a>
              <a href="#contact" onClick={(e)=>{e.preventDefault();scrollTo('contact');}} className="rounded-2xl px-5 py-3 border border-slate-300 inline-flex items-center gap-2">
                Contact me <Mail size={18} />
              </a>
            </div>
          </div>
          <motion.div initial={{opacity:0,scale:0.98}} animate={{opacity:1,scale:1}} transition={{duration:0.6, delay:0.1}} className="relative">
            <div className="aspect-[4/3] w-full rounded-3xl bg-gradient-to-br from-slate-200 to-slate-100 shadow-lg p-1">
              <div className="h-full w-full rounded-3xl bg-white grid place-items-center text-center p-8">
                <div className="max-w-md">
                  <div className="text-sm font-medium text-slate-500">Preview</div>
                  <div className="mt-2 text-2xl font-semibold">Drop your product shot or logo here</div>
                  <div className="mt-3 text-slate-500">Replace this box with an image, animation, or a short demo GIF.</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 md:py-24 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold">Features</h2>
          <p className="text-slate-600 mt-2">Built with React + Tailwind classes. Smooth scroll, responsive grid, and ready-to-edit content.</p>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[{Icon:Cpu,title:"Fast",desc:"Lightweight, minimal, and snappy."},{Icon:Zap,title:"Responsive",desc:"Looks great on phones and desktops."},{Icon:Shield,title:"Accessible",desc:"Semantic markup and good contrast."}].map(({Icon,title,desc},i)=>(
              <motion.div key={title} initial={{opacity:0,y:8}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:0.3}} transition={{delay:i*0.05}} className="rounded-3xl border border-slate-200 p-6 bg-white shadow-sm">
                <Icon className="mb-3" />
                <div className="font-semibold text-lg">{title}</div>
                <p className="text-slate-600 mt-1">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-2xl font-bold">About</h3>
            <p className="text-slate-600 mt-3">I’m Omar—maker, coder, and electronics tinkerer. I build clean interfaces and fun hardware projects (Arduino, sensors, servos) and document the process. This template is your jump-start: replace content and deploy.</p>
            <ul className="mt-4 list-disc pl-5 text-slate-600 space-y-1">
              <li>Single-file component, easy to move into any React app.</li>
              <li>Uses Tailwind utility classes—no extra CSS needed.</li>
              <li>Framer Motion for subtle animations.</li>
            </ul>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              {k:"Years Building", v:"3+"},
              {k:"Projects", v:"20+"},
              {k:"Happy Clients", v:"8"},
              {k:"Coffee/Day", v:"2"},
            ].map((stat) => (
              <div key={stat.k} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="text-3xl font-extrabold">{stat.v}</div>
                <div className="text-slate-500">{stat.k}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-16 md:py-24 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl md:text-4xl font-bold">Projects</h3>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {[1,2,3].map((i)=> (
              <div key={i} className="rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-sm">
                <div className="aspect-video bg-slate-100 grid place-items-center">Screenshot {i}</div>
                <div className="p-5">
                  <div className="font-semibold">Project {i}</div>
                  <p className="text-slate-600 mt-1">Short description of what you built, tools you used, and the result.</p>
                  <div className="mt-3 flex gap-3">
                    <a className="text-sm underline" href="#">Live</a>
                    <a className="text-sm underline inline-flex items-center gap-1" href="#"><Github size={16}/>Code</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-3xl md:text-4xl font-bold">Let’s talk</h3>
            <p className="text-slate-600 mt-2">Send a message and I’ll reply by email. (This demo form doesn’t send anywhere—wire it to your backend or a service like Formspree.)</p>
            <div className="mt-6 flex gap-3 text-slate-600">
              <a className="inline-flex items-center gap-2 underline" href="#"><Instagram size={18}/>Instagram</a>
              <a className="inline-flex items-center gap-2 underline" href="#"><Facebook size={18}/>Facebook</a>
              <a className="inline-flex items-center gap-2 underline" href="#"><Linkedin size={18}/>LinkedIn</a>
            </div>
          </div>
          <form onSubmit={(e)=>e.preventDefault()} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm grid gap-4">
            <div>
              <label className="text-sm text-slate-600">Name</label>
              <input className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-300" placeholder="Your name" />
            </div>
            <div>
              <label className="text-sm text-slate-600">Email</label>
              <input type="email" className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-300" placeholder="you@example.com" />
            </div>
            <div>
              <label className="text-sm text-slate-600">Message</label>
              <textarea rows={5} className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-300" placeholder="Tell me about your idea" />
            </div>
            <button className="rounded-2xl px-5 py-3 bg-slate-900 text-white inline-flex items-center gap-2 w-fit">Send <ArrowRight size={18}/></button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="text-sm text-slate-600">© {new Date().getFullYear()} Omar Studio. All rights reserved.</div>
          <div className="text-sm text-slate-500">Built with React + Tailwind classes</div>
        </div>
      </footer>
    </div>
  );
}
