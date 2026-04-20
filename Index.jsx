import { useState, useEffect, useRef } from "react";

// ─── COLOR PALETTE & DESIGN TOKENS ───
// Primary: Deep Navy #0A1628
// Gold: #C9973A
// Accent Blue: #1E4D8C
// Light Gold: #F5E6C8
// White: #FFFFFF
// Soft Gray: #F7F8FA

// ─── ICONS (inline SVG components) ───
const Icon = ({ name, size = 20, color = "currentColor" }) => {
  const icons = {
    menu: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />,
    x: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />,
    chevronLeft: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />,
    chevronRight: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />,
    star: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />,
    phone: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />,
    mail: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
    mapPin: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />,
    arrowRight: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />,
    check: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />,
    quote: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />,
    book: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />,
    users: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />,
    award: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />,
    globe: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    heart: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />,
    lightning: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />,
    cross: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />,
    facebook: null,
    instagram: null,
    twitter: null,
    whatsapp: null,
    youtube: null,
  };

  if (name === "facebook") return (
    <svg width={size} height={size} fill={color} viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
  if (name === "instagram") return (
    <svg width={size} height={size} fill={color} viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
  if (name === "twitter") return (
    <svg width={size} height={size} fill={color} viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
  if (name === "whatsapp") return (
    <svg width={size} height={size} fill={color} viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
  if (name === "youtube") return (
    <svg width={size} height={size} fill={color} viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );

  return (
    <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke={color}>
      {icons[name]}
    </svg>
  );
};

// ─── CAROUSEL COMPONENT ───
const Carousel = ({ items, renderItem, itemsPerView = 1, gap = 24, className = "" }) => {
  const [current, setCurrent] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const trackRef = useRef(null);
  const total = items.length;
  const maxIndex = Math.max(0, total - itemsPerView);

  const prev = () => setCurrent(c => Math.max(0, c - 1));
  const next = () => setCurrent(c => Math.min(maxIndex, c + 1));

  useEffect(() => {
    if (trackRef.current) {
      const itemWidth = trackRef.current.offsetWidth / itemsPerView;
      trackRef.current.scrollTo({ left: current * (itemWidth + gap), behavior: "smooth" });
    }
  }, [current, itemsPerView, gap]);

  return (
    <div className={`relative ${className}`}>
      <div
        ref={trackRef}
        className="flex overflow-x-hidden gap-6"
        style={{ scrollBehavior: "smooth" }}
      >
        {items.map((item, i) => (
          <div key={i} className="flex-shrink-0" style={{ width: `calc((100% - ${gap * (itemsPerView - 1)}px) / ${itemsPerView})` }}>
            {renderItem(item, i)}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={prev}
          disabled={current === 0}
          className="w-10 h-10 rounded-full border border-amber-400 flex items-center justify-center text-amber-600 disabled:opacity-30 hover:bg-amber-400 hover:text-white transition-all"
        >
          <Icon name="chevronLeft" size={18} />
        </button>
        <div className="flex gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-amber-500 w-6" : "bg-gray-300"}`}
            />
          ))}
        </div>
        <button
          onClick={next}
          disabled={current >= maxIndex}
          className="w-10 h-10 rounded-full border border-amber-400 flex items-center justify-center text-amber-600 disabled:opacity-30 hover:bg-amber-400 hover:text-white transition-all"
        >
          <Icon name="chevronRight" size={18} />
        </button>
      </div>
    </div>
  );
};

// ─── NAVBAR ───
const Navbar = ({ currentPage, setPage }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["Home", "About", "Academics", "Admissions", "Facilities", "Contact"];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-lg py-3" : "bg-transparent py-5"}`}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setPage("Home")}>
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #0A1628 60%, #C9973A)" }}>
            <span className="text-white font-bold text-xs">TIA</span>
          </div>
          <div>
            <div className={`font-bold text-sm leading-tight transition-colors ${scrolled ? "text-navy-900" : "text-white"}`} style={{ color: scrolled ? "#0A1628" : "white", fontFamily: "Georgia, serif" }}>
              Topnotchers
            </div>
            <div className={`text-xs transition-colors`} style={{ color: scrolled ? "#C9973A" : "#F5E6C8" }}>
              International Academy
            </div>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(link => (
            <button
              key={link}
              onClick={() => setPage(link)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                currentPage === link
                  ? "text-amber-500"
                  : scrolled ? "text-gray-700 hover:text-amber-600" : "text-white/90 hover:text-amber-300"
              }`}
            >
              {link}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => setPage("Admissions")}
            className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all"
            style={{ background: "#C9973A", color: "white" }}
          >
            Apply Now
          </button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)} style={{ color: scrolled ? "#0A1628" : "white" }}>
          <Icon name={mobileOpen ? "x" : "menu"} size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow-xl border-t">
          {links.map(link => (
            <button
              key={link}
              onClick={() => { setPage(link); setMobileOpen(false); }}
              className="block w-full text-left px-6 py-4 text-sm font-medium border-b border-gray-100 hover:bg-amber-50"
              style={{ color: currentPage === link ? "#C9973A" : "#0A1628" }}
            >
              {link}
            </button>
          ))}
          <div className="p-4">
            <button
              onClick={() => { setPage("Admissions"); setMobileOpen(false); }}
              className="w-full py-3 rounded-full text-sm font-semibold text-white"
              style={{ background: "#C9973A" }}
            >
              Apply Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

// ─── HERO SECTION ───
const Hero = ({ setPage }) => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
    {/* Background */}
    <div className="absolute inset-0" style={{
      background: "linear-gradient(135deg, #0A1628 0%, #1E4D8C 60%, #0A1628 100%)"
    }} />
    {/* Pattern overlay */}
    <div className="absolute inset-0 opacity-10" style={{
      backgroundImage: "radial-gradient(circle at 25% 25%, #C9973A 0%, transparent 50%), radial-gradient(circle at 75% 75%, #C9973A 0%, transparent 50%)"
    }} />
    {/* Grid pattern */}
    <div className="absolute inset-0 opacity-5" style={{
      backgroundImage: "linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)",
      backgroundSize: "60px 60px"
    }} />
    {/* Cross motif top right */}
    <div className="absolute top-24 right-12 opacity-10">
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
        <rect x="50" y="10" width="20" height="100" rx="4" fill="#C9973A"/>
        <rect x="10" y="45" width="100" height="20" rx="4" fill="#C9973A"/>
      </svg>
    </div>
    {/* Decorative circle */}
    <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-5" style={{ background: "#C9973A", transform: "translate(-50%, 50%)" }} />

    <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-xs font-semibold tracking-widest uppercase" style={{ background: "rgba(201,151,58,0.2)", color: "#F5E6C8", border: "1px solid rgba(201,151,58,0.4)" }}>
        <span>✦</span> Est. Excellence in Christian Education <span>✦</span>
      </div>

      <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: "Georgia, serif", textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}>
        Raising Academically<br />
        <span style={{ color: "#C9973A" }}>Excellent</span> and<br />
        Godly Leaders
      </h1>

      <p className="text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
        A leading Christian school offering a blend of Nigerian and British curriculum — where faith, excellence, and global standards meet.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => setPage("Admissions")}
          className="px-8 py-4 rounded-full text-base font-semibold transition-all hover:scale-105 hover:shadow-xl"
          style={{ background: "#C9973A", color: "white", boxShadow: "0 4px 24px rgba(201,151,58,0.4)" }}
        >
          Apply for Admission
        </button>
        <button
          className="px-8 py-4 rounded-full text-base font-semibold transition-all hover:bg-white/10 border-2 border-white/50 text-white"
          onClick={() => setPage("Contact")}
        >
          Book a School Tour
        </button>
      </div>

      {/* Stats strip */}
      <div className="mt-20 grid grid-cols-3 gap-8 max-w-xl mx-auto">
        {[["98%", "WAEC Pass Rate"], ["500+", "Students Enrolled"], ["20+", "Years of Excellence"]].map(([num, label]) => (
          <div key={label} className="text-center">
            <div className="text-3xl font-bold" style={{ color: "#C9973A" }}>{num}</div>
            <div className="text-white/60 text-xs mt-1">{label}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Scroll indicator */}
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center pt-2">
        <div className="w-1 h-3 bg-white/50 rounded-full animate-bounce" />
      </div>
    </div>
  </section>
);

// ─── SECTION HEADER ───
const SectionHeader = ({ badge, title, subtitle, light = false }) => (
  <div className="text-center mb-12">
    {badge && (
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
        style={{ background: light ? "rgba(201,151,58,0.15)" : "rgba(201,151,58,0.1)", color: "#C9973A" }}>
        {badge}
      </div>
    )}
    <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight" style={{ color: light ? "white" : "#0A1628", fontFamily: "Georgia, serif" }}>
      {title}
    </h2>
    {subtitle && <p className="text-base max-w-2xl mx-auto" style={{ color: light ? "rgba(255,255,255,0.7)" : "#6B7280" }}>{subtitle}</p>}
  </div>
);

// ─── TRUST STATS SECTION ───
const StatsSection = () => {
  const stats = [
    { icon: "award", value: "98%", label: "WAEC Pass Rate", desc: "Consistent top performance in national examinations" },
    { icon: "users", value: "45+", label: "Qualified Teachers", desc: "Experienced educators with BSc, MSc, and PGDE qualifications" },
    { icon: "book", value: "Dual", label: "Curriculum", desc: "Blending Nigerian national curriculum with British standards" },
    { icon: "heart", value: "Christian", label: "Core Values", desc: "Faith-centered education that builds character and integrity" },
    { icon: "globe", value: "Global", label: "Outlook", desc: "Preparing students for international universities and careers" },
    { icon: "lightning", value: "Modern", label: "Facilities", desc: "ICT labs, science labs, library, and sports facilities" },
  ];

  return (
    <section className="py-20 px-4" style={{ background: "#F7F8FA" }}>
      <div className="max-w-7xl mx-auto">
        <SectionHeader badge="Why Choose Us" title="Built for Excellence, Rooted in Faith" subtitle="Everything we do is designed to help your child become the best version of themselves." />
        <Carousel
          items={stats}
          itemsPerView={typeof window !== "undefined" && window.innerWidth < 768 ? 1 : 3}
          renderItem={(item) => (
            <div className="bg-white rounded-2xl p-8 h-full border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1 group">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5" style={{ background: "linear-gradient(135deg, #0A1628, #1E4D8C)" }}>
                <Icon name={item.icon} size={24} color="#C9973A" />
              </div>
              <div className="text-3xl font-bold mb-1" style={{ color: "#0A1628", fontFamily: "Georgia, serif" }}>{item.value}</div>
              <div className="text-sm font-semibold mb-3" style={{ color: "#C9973A" }}>{item.label}</div>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          )}
        />
      </div>
    </section>
  );
};

// ─── ABOUT PREVIEW ───
const AboutPreview = ({ setPage }) => (
  <section className="py-24 px-4 bg-white">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        {/* Image side */}
        <div className="relative">
          <div className="rounded-3xl overflow-hidden aspect-[4/3]" style={{ background: "linear-gradient(135deg, #0A1628 0%, #1E4D8C 100%)" }}>
            <div className="w-full h-full flex items-center justify-center opacity-30">
              <div className="text-white text-center">
                <div className="text-6xl mb-4">🏫</div>
                <div>School Campus Image</div>
              </div>
            </div>
            {/* Overlay text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: "rgba(201,151,58,0.3)", border: "2px solid rgba(201,151,58,0.6)" }}>
                  <Icon name="cross" size={32} color="#C9973A" />
                </div>
                <div className="text-2xl font-bold" style={{ fontFamily: "Georgia, serif" }}>Topnotchers</div>
                <div style={{ color: "#C9973A" }}>International Academy</div>
              </div>
            </div>
          </div>
          {/* Floating card */}
          <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-5 shadow-xl border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "#0A1628" }}>
                <Icon name="award" size={20} color="#C9973A" />
              </div>
              <div>
                <div className="font-bold text-sm" style={{ color: "#0A1628" }}>Accredited Institution</div>
                <div className="text-xs text-gray-500">Ministry of Education Approved</div>
              </div>
            </div>
          </div>
        </div>

        {/* Text side */}
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6"
            style={{ background: "rgba(201,151,58,0.1)", color: "#C9973A" }}>
            Our Story
          </div>
          <h2 className="text-4xl font-bold mb-6 leading-tight" style={{ color: "#0A1628", fontFamily: "Georgia, serif" }}>
            A Legacy of Academic<br />& Spiritual Excellence
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Topnotchers International Academy was founded on the conviction that every child deserves world-class education rooted in Christian values. We believe that academic excellence and godly character are not mutually exclusive — they are inseparable.
          </p>
          <p className="text-gray-600 mb-8 leading-relaxed">
            From our Early Years Montessori programme through to our Secondary School, we nurture curious minds, strong hearts, and purposeful futures. Our blend of Nigerian and British curriculum prepares students for both WAEC/NECO and international examinations.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-10">
            {[["Faith-Centered", "Every lesson rooted in Christian values"], ["Academic Excellence", "Top WAEC results year after year"], ["Holistic Development", "Sports, arts, music & leadership"], ["Global Curriculum", "Nigerian + British standards"]].map(([t, d]) => (
              <div key={t} className="flex gap-3">
                <div className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5" style={{ background: "#C9973A" }}>
                  <Icon name="check" size={10} color="white" />
                </div>
                <div>
                  <div className="text-sm font-semibold" style={{ color: "#0A1628" }}>{t}</div>
                  <div className="text-xs text-gray-500">{d}</div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setPage("About")}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm transition-all hover:gap-4"
            style={{ background: "#0A1628", color: "white" }}
          >
            Learn More About Us <Icon name="arrowRight" size={16} />
          </button>
        </div>
      </div>
    </div>
  </section>
);

// ─── PROGRAMS SECTION ───
const ProgramsSection = ({ setPage }) => {
  const programs = [
    {
      level: "Early Years",
      title: "Montessori & Early Learning",
      age: "Ages 1–5",
      desc: "A nurturing, play-based environment where children develop curiosity, independence, and a love for learning through the Montessori method.",
      features: ["Montessori materials", "Phonics & Numeracy", "Creative Arts", "Christian Foundation"],
      color: "#1E4D8C",
      emoji: "🌱"
    },
    {
      level: "Primary School",
      title: "Primary Education",
      age: "Ages 6–11",
      desc: "A structured yet engaging curriculum blending the Nigerian national syllabus with British standards, building strong academic foundations.",
      features: ["Core Subjects", "Science & ICT", "Sports & Music", "Leadership Training"],
      color: "#0A1628",
      emoji: "📚"
    },
    {
      level: "Secondary School",
      title: "Secondary & WAEC/NECO",
      age: "Ages 12–18",
      desc: "Rigorous preparation for WAEC, NECO, and international qualifications, with career guidance and university entry support.",
      features: ["WAEC/NECO Prep", "IGCSE Option", "Sciences & Arts", "University Guidance"],
      color: "#7A3E10",
      emoji: "🎓"
    },
  ];

  return (
    <section className="py-24 px-4" style={{ background: "#F7F8FA" }}>
      <div className="max-w-7xl mx-auto">
        <SectionHeader badge="Academic Programs" title="A Programme for Every Stage" subtitle="From first steps to final examinations — we walk with your child through every stage of their academic journey." />
        <Carousel
          items={programs}
          itemsPerView={typeof window !== "undefined" && window.innerWidth < 768 ? 1 : 3}
          renderItem={(item) => (
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 group h-full border border-gray-100">
              {/* Header */}
              <div className="p-8 pb-6" style={{ background: item.color }}>
                <div className="text-4xl mb-4">{item.emoji}</div>
                <div className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#C9973A" }}>{item.level}</div>
                <h3 className="text-xl font-bold text-white mb-1" style={{ fontFamily: "Georgia, serif" }}>{item.title}</h3>
                <div className="text-sm text-white/60">{item.age}</div>
              </div>
              {/* Body */}
              <div className="p-8">
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{item.desc}</p>
                <div className="space-y-2 mb-8">
                  {item.features.map(f => (
                    <div key={f} className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(201,151,58,0.2)" }}>
                        <Icon name="check" size={8} color="#C9973A" />
                      </div>
                      {f}
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setPage("Academics")}
                  className="w-full py-3 rounded-xl text-sm font-semibold transition-all border hover:text-white"
                  style={{ borderColor: item.color, color: item.color }}
                  onMouseEnter={e => { e.target.style.background = item.color; e.target.style.color = "white"; }}
                  onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = item.color; }}
                >
                  Explore Programme →
                </button>
              </div>
            </div>
          )}
        />
      </div>
    </section>
  );
};

// ─── GALLERY SECTION ───
const GallerySection = () => {
  const images = [
    { label: "Modern Classrooms", color: "#0A1628", emoji: "🏫", desc: "Spacious, technology-equipped learning spaces" },
    { label: "Sports & Athletics", color: "#1E4D8C", emoji: "⚽", desc: "Full sports grounds and athletic facilities" },
    { label: "ICT Laboratory", color: "#2D5A27", emoji: "💻", desc: "Fully equipped computer science lab" },
    { label: "Music & Arts", color: "#7A3E10", emoji: "🎵", desc: "Creative arts and music studios" },
    { label: "Morning Assembly", color: "#4A1760", emoji: "🙏", desc: "Daily devotion and character formation" },
    { label: "Science Laboratory", color: "#1A4A4A", emoji: "🔬", desc: "Hands-on scientific exploration" },
  ];

  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader badge="School Life" title="Life at Topnotchers" subtitle="A vibrant campus where learning goes beyond the classroom." />
        <Carousel
          items={images}
          itemsPerView={typeof window !== "undefined" && window.innerWidth < 768 ? 1 : 3}
          renderItem={(item) => (
            <div className="rounded-2xl overflow-hidden group cursor-pointer">
              <div className="aspect-[4/3] relative flex items-center justify-center" style={{ background: item.color }}>
                <div className="text-center text-white">
                  <div className="text-6xl mb-3">{item.emoji}</div>
                  <div className="font-bold text-lg" style={{ fontFamily: "Georgia, serif" }}>{item.label}</div>
                  <div className="text-white/60 text-sm mt-1">{item.desc}</div>
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity" style={{ background: "#C9973A" }} />
                <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: "#C9973A" }} />
              </div>
            </div>
          )}
        />
      </div>
    </section>
  );
};

// ─── TESTIMONIALS ───
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Mrs. Adaeze Okonkwo",
      role: "Parent – JSS3",
      quote: "Since enrolling my son at Topnotchers, I've watched him transform. The discipline, the faith-based approach, and the quality of teaching are second to none in Abuja.",
      rating: 5
    },
    {
      name: "Mr. Emeka Chukwu",
      role: "Parent – SSS2",
      quote: "My daughter's WAEC results were outstanding. The school truly prepares students for both local and international examinations. I couldn't be prouder.",
      rating: 5
    },
    {
      name: "Chidinma Okafor",
      role: "Student – SSS3",
      quote: "Topnotchers gave me confidence. The teachers care, the facilities are great, and the Christian environment keeps me grounded. I'm ready for the world.",
      rating: 5
    },
    {
      name: "Dr. Funmi Adeleke",
      role: "Parent – Primary 4",
      quote: "The Montessori-inspired early years program was transformational. My daughter reads, counts, and creates — and she actually loves going to school.",
      rating: 5
    },
    {
      name: "Emmanuel Balogun",
      role: "Alumni – University of Lagos",
      quote: "Topnotchers prepared me for university better than I expected. The values and academic discipline have carried me through my degree.",
      rating: 5
    },
  ];

  return (
    <section className="py-24 px-4" style={{ background: "#0A1628" }}>
      <div className="max-w-7xl mx-auto">
        <SectionHeader light badge="Testimonials" title="What Families Say About Us" subtitle="Hear from parents and students who've experienced the Topnotchers difference." />
        <Carousel
          items={testimonials}
          itemsPerView={typeof window !== "undefined" && window.innerWidth < 768 ? 1 : 2}
          renderItem={(item) => (
            <div className="rounded-2xl p-8 h-full border" style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(201,151,58,0.2)" }}>
              <div className="flex gap-1 mb-5">
                {Array(item.rating).fill(0).map((_, i) => (
                  <Icon key={i} name="star" size={16} color="#C9973A" />
                ))}
              </div>
              <div className="mb-4">
                <div className="w-8 h-6 mb-3 opacity-40" style={{ color: "#C9973A" }}>
                  <svg viewBox="0 0 32 22" fill="currentColor">
                    <path d="M0 22V13.273C0 5.383 4.605 1.051 13.818 0l1.09 2.182C11.15 3.042 9.014 4.47 7.636 6.545c-1.378 2.076-1.94 4.37-1.818 6.728H9.09V22H0zm16 0V13.273C16 5.383 20.605 1.051 29.818 0l1.09 2.182c-3.758.86-5.894 2.288-7.272 4.363-1.378 2.076-1.94 4.37-1.818 6.728H25.09V22H16z"/>
                  </svg>
                </div>
                <p className="text-white/80 text-sm leading-relaxed italic">"{item.quote}"</p>
              </div>
              <div className="flex items-center gap-3 mt-6 pt-6 border-t border-white/10">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: "#C9973A", color: "white" }}>
                  {item.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <div className="font-semibold text-sm text-white">{item.name}</div>
                  <div className="text-xs" style={{ color: "#C9973A" }}>{item.role}</div>
                </div>
              </div>
            </div>
          )}
        />
      </div>
    </section>
  );
};

// ─── ACHIEVEMENTS SECTION ───
const AchievementsSection = () => {
  const achievements = [
    { icon: "award", title: "Best Private School", year: "2023", body: "Recognised by Abuja Education Board as top-performing private institution", color: "#C9973A" },
    { icon: "star", title: "100% WAEC Pass", year: "2022 & 2023", body: "All candidates achieved 5 credits including English and Mathematics", color: "#1E4D8C" },
    { icon: "globe", title: "Debate Champions", year: "2023", body: "FCT inter-school debate competition — 1st place winners", color: "#2D5A27" },
    { icon: "lightning", title: "Science Olympiad", year: "2023", body: "Top finishers in the national junior science competition", color: "#4A1760" },
    { icon: "book", title: "Reading Champions", year: "2022", body: "Highest literacy scores among primary schools in the FCT region", color: "#7A3E10" },
  ];

  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader badge="Results & Achievements" title="A Record of Excellence" subtitle="Our students consistently achieve at the highest levels — nationally and beyond." />
        <Carousel
          items={achievements}
          itemsPerView={typeof window !== "undefined" && window.innerWidth < 768 ? 1 : 3}
          renderItem={(item) => (
            <div className="rounded-2xl p-7 border border-gray-100 hover:shadow-xl transition-all group h-full">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: item.color }}>
                <Icon name={item.icon} size={20} color="white" />
              </div>
              <div className="text-xs font-semibold mb-2" style={{ color: item.color }}>{item.year}</div>
              <h3 className="text-lg font-bold mb-3" style={{ color: "#0A1628", fontFamily: "Georgia, serif" }}>{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.body}</p>
            </div>
          )}
        />
      </div>
    </section>
  );
};

// ─── CTA SECTION ───
const CTASection = ({ setPage }) => (
  <section className="py-24 px-4 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #C9973A 0%, #A67C2A 100%)" }}>
    <div className="absolute inset-0 opacity-10" style={{
      backgroundImage: "radial-gradient(circle at 80% 50%, white 0%, transparent 60%)"
    }} />
    <div className="max-w-4xl mx-auto text-center relative z-10">
      <div className="text-5xl mb-6">✦</div>
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: "Georgia, serif" }}>
        Give Your Child the<br />Best Start in Life
      </h2>
      <p className="text-white/90 text-lg mb-12 max-w-2xl mx-auto">
        Admission for the new academic session is now open. Spaces are limited — secure your child's place today.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => setPage("Admissions")}
          className="px-10 py-4 rounded-full text-base font-semibold transition-all hover:scale-105"
          style={{ background: "#0A1628", color: "white" }}
        >
          Apply Now
        </button>
        <button
          onClick={() => setPage("Contact")}
          className="px-10 py-4 rounded-full text-base font-semibold transition-all hover:bg-white/20 border-2 border-white text-white"
        >
          Schedule a Visit
        </button>
      </div>
    </div>
  </section>
);

// ─── FOOTER ───
const Footer = ({ setPage }) => (
  <footer className="py-16 px-4" style={{ background: "#0A1628" }}>
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-4 gap-12 mb-12">
        {/* Brand */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "#C9973A" }}>
              <span className="text-white font-bold">TIA</span>
            </div>
            <div>
              <div className="text-white font-bold" style={{ fontFamily: "Georgia, serif" }}>Topnotchers International Academy</div>
              <div className="text-xs" style={{ color: "#C9973A" }}>Excellence. Faith. Leadership.</div>
            </div>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
            Raising academically excellent and godly leaders through a premium Christian education experience from Early Years through Secondary School.
          </p>
          <div className="flex gap-3">
            {["facebook", "instagram", "twitter", "youtube"].map(social => (
              <a key={social} href="#" className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:scale-110" style={{ background: "rgba(201,151,58,0.15)", color: "#C9973A" }}>
                <Icon name={social} size={16} color="#C9973A" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <div className="text-white font-semibold mb-5 text-sm tracking-wider uppercase">Quick Links</div>
          <div className="space-y-3">
            {["About", "Academics", "Admissions", "Facilities", "Contact"].map(link => (
              <button key={link} onClick={() => setPage(link)} className="block text-gray-400 text-sm hover:text-amber-400 transition-colors text-left">
                {link}
              </button>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <div className="text-white font-semibold mb-5 text-sm tracking-wider uppercase">Contact Us</div>
          <div className="space-y-4">
            {[
              { icon: "mapPin", text: "Plot 12, Education Close, Gwarinpa Estate, Abuja, FCT" },
              { icon: "phone", text: "+234 803 000 0000" },
              { icon: "mail", text: "info@topnotchersacademy.edu.ng" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex gap-3 text-gray-400 text-sm">
                <Icon name={icon} size={16} color="#C9973A" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-gray-500 text-xs">© 2024 Topnotchers International Academy. All rights reserved.</p>
        <p className="text-gray-600 text-xs">Ministry of Education Approved · Abuja, FCT, Nigeria</p>
      </div>
    </div>
  </footer>
);

// ─── PAGE: ABOUT ───
const AboutPage = () => {
  const values = [
    { title: "Faith", desc: "We are uncompromisingly Christian in our foundation, culture, and practice." },
    { title: "Excellence", desc: "We pursue the highest standards in everything — academically and personally." },
    { title: "Integrity", desc: "We build students of character who are honest, accountable, and trustworthy." },
    { title: "Innovation", desc: "We embrace modern teaching methods while holding to timeless values." },
    { title: "Community", desc: "We foster a loving, supportive environment for students, staff, and families." },
    { title: "Leadership", desc: "We develop tomorrow's leaders by equipping students to serve and lead with purpose." },
  ];

  const leadership = [
    { name: "Mr. James Afolabi", role: "Founder & Proprietor", initial: "JA" },
    { name: "Mrs. Grace Afolabi", role: "Co-Founder & Director", initial: "GA" },
    { name: "Dr. Ngozi Obi", role: "Principal / Head of School", initial: "NO" },
    { name: "Mr. Tunde Bello", role: "Head of Academics", initial: "TB" },
  ];

  return (
    <div>
      {/* Page Hero */}
      <div className="pt-32 pb-20 px-4" style={{ background: "linear-gradient(135deg, #0A1628, #1E4D8C)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "#C9973A" }}>About Us</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: "Georgia, serif" }}>Our Story & Mission</h1>
          <p className="text-white/70 max-w-2xl mx-auto">Founded on faith, driven by excellence — discover who we are and what we stand for.</p>
        </div>
      </div>

      {/* Story */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="rounded-3xl aspect-square flex items-center justify-center" style={{ background: "linear-gradient(135deg, #0A1628, #1E4D8C)" }}>
            <div className="text-center text-white p-8">
              <div className="text-8xl mb-4">🏫</div>
              <div className="text-2xl font-bold" style={{ fontFamily: "Georgia, serif" }}>Est. Excellence</div>
              <div style={{ color: "#C9973A" }}>Since Our Founding</div>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6" style={{ color: "#0A1628", fontFamily: "Georgia, serif" }}>How It All Began</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Topnotchers International Academy was born from a vision — a vision that Nigerian children deserve world-class education that does not compromise on Christian values. Our founders, Mr. and Mrs. James Afolabi, saw a gap: schools that were either academically rigorous but spiritually empty, or faith-based but academically mediocre.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              They set out to build something different. Something that would raise leaders — not just certificate holders. Students who would walk out of our gates not just prepared for exams, but prepared for life.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Today, Topnotchers International Academy stands as a testament to that vision — a growing institution with a sterling reputation for academic performance, character development, and Christian community.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4" style={{ background: "#F7F8FA" }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          {[
            { label: "Our Mission", icon: "cross", text: "To provide a premium, Christ-centered education that equips every student with the knowledge, values, and skills to excel academically, professionally, and spiritually in a global world." },
            { label: "Our Vision", icon: "globe", text: "To be the foremost Christian school in Nigeria — producing graduates who are academically excellent, morally upright, and globally competitive leaders in every sphere of human endeavour." },
          ].map(({ label, icon, text }) => (
            <div key={label} className="bg-white rounded-3xl p-10 border border-gray-100">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ background: "#0A1628" }}>
                <Icon name={icon} size={24} color="#C9973A" />
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: "#0A1628", fontFamily: "Georgia, serif" }}>{label}</h3>
              <p className="text-gray-600 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeader badge="Core Values" title="What We Stand For" subtitle="Six pillars that define everything we do at Topnotchers." />
          <Carousel
            items={values}
            itemsPerView={typeof window !== "undefined" && window.innerWidth < 768 ? 1 : 3}
            renderItem={(item) => (
              <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-all h-full" style={{ borderTop: "4px solid #C9973A" }}>
                <h3 className="text-xl font-bold mb-3" style={{ color: "#0A1628", fontFamily: "Georgia, serif" }}>{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            )}
          />
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 px-4" style={{ background: "#F7F8FA" }}>
        <div className="max-w-7xl mx-auto">
          <SectionHeader badge="Leadership" title="Meet Our Leadership Team" />
          <div className="grid md:grid-cols-4 gap-6">
            {leadership.map(person => (
              <div key={person.name} className="bg-white rounded-2xl p-8 text-center border border-gray-100 hover:shadow-lg transition-all">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 text-xl font-bold text-white" style={{ background: "linear-gradient(135deg, #0A1628, #C9973A)" }}>
                  {person.initial}
                </div>
                <div className="font-bold mb-1" style={{ color: "#0A1628" }}>{person.name}</div>
                <div className="text-sm" style={{ color: "#C9973A" }}>{person.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// ─── PAGE: ACADEMICS ───
const AcademicsPage = () => {
  const levels = [
    {
      name: "Early Years (Montessori)",
      age: "Ages 1–5",
      color: "#1E4D8C",
      emoji: "🌱",
      desc: "Our Early Years Programme is grounded in the Montessori philosophy — where children learn through exploration, discovery, and hands-on activity. Every child is treated as a unique learner with their own pace and style.",
      subjects: ["Phonics & Early Reading", "Numeracy & Counting", "Creative Arts & Craft", "Sensory Play", "Social Skills", "Bible Stories & Devotion"],
      outcomes: ["Strong foundation in reading and writing", "Early love for mathematics", "Social confidence and independence", "Christian values from the earliest age"]
    },
    {
      name: "Primary School",
      age: "Ages 6–11",
      color: "#0A1628",
      emoji: "📚",
      desc: "Our Primary School delivers the full Nigerian National Primary School Curriculum, enriched with elements of the British primary framework. Lessons are engaging, structured, and designed to build academic confidence.",
      subjects: ["English Language & Literature", "Mathematics", "Basic Science & Technology", "Social Studies", "Civic Education", "Christian Religious Studies", "French", "Physical & Health Education", "Cultural & Creative Arts", "Computer Science"],
      outcomes: ["Excellence in core literacy and numeracy", "Scientific curiosity and critical thinking", "Cultural awareness and civic responsibility", "Strong digital literacy foundations"]
    },
    {
      name: "Secondary School",
      age: "Ages 12–18 | JSS1–SSS3",
      color: "#7A3E10",
      emoji: "🎓",
      desc: "Our Secondary School prepares students comprehensively for WAEC, NECO, and other national examinations, while offering selected students pathways toward IGCSE and international qualifications.",
      subjects: ["English Language & Literature", "Mathematics & Further Mathematics", "Physics, Chemistry, Biology", "Economics & Government", "Commerce & Accounting", "Geography & History", "Computer Science & ICT", "French / Yoruba", "Agricultural Science", "CRS / Islamic Studies"],
      outcomes: ["100% WAEC/NECO pass rate target", "University entry preparation", "Career and vocational guidance", "Leadership and civic development"]
    }
  ];

  return (
    <div>
      <div className="pt-32 pb-20 px-4" style={{ background: "linear-gradient(135deg, #0A1628, #1E4D8C)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "#C9973A" }}>Academics</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: "Georgia, serif" }}>Our Academic Programmes</h1>
          <p className="text-white/70 max-w-2xl mx-auto">A rigorous, faith-based curriculum from nursery through to WAEC and beyond.</p>
        </div>
      </div>

      {levels.map((level, i) => (
        <section key={level.name} className="py-20 px-4" style={{ background: i % 2 === 0 ? "white" : "#F7F8FA" }}>
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <div className={i % 2 === 0 ? "" : "md:order-2"}>
                <div className="rounded-3xl p-10 text-white" style={{ background: level.color }}>
                  <div className="text-6xl mb-4">{level.emoji}</div>
                  <div className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#C9973A" }}>{level.age}</div>
                  <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "Georgia, serif" }}>{level.name}</h2>
                  <p className="text-white/80 leading-relaxed">{level.desc}</p>
                </div>
              </div>
              <div className={i % 2 === 0 ? "" : "md:order-1"}>
                <h3 className="text-xl font-bold mb-4" style={{ color: "#0A1628" }}>Subjects Offered</h3>
                <div className="grid grid-cols-2 gap-2 mb-8">
                  {level.subjects.map(s => (
                    <div key={s} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#C9973A" }} />
                      {s}
                    </div>
                  ))}
                </div>
                <h3 className="text-xl font-bold mb-4" style={{ color: "#0A1628" }}>Key Outcomes</h3>
                <div className="space-y-3">
                  {level.outcomes.map(o => (
                    <div key={o} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5" style={{ background: "#C9973A" }}>
                        <Icon name="check" size={10} color="white" />
                      </div>
                      <span className="text-gray-600 text-sm">{o}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

// ─── PAGE: ADMISSIONS ───
const AdmissionsPage = () => {
  const [form, setForm] = useState({ parentName: "", childName: "", email: "", phone: "", level: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const steps = [
    { num: "01", title: "Submit Enquiry", desc: "Fill out our online enquiry form or call our admissions office to express interest." },
    { num: "02", title: "Receive Application Pack", desc: "We'll send you the full application pack including all required documents and forms." },
    { num: "03", title: "Schedule Assessment", desc: "Your child will be invited for a brief assessment and school tour, tailored to their age group." },
    { num: "04", title: "Interview & Decision", desc: "Parents meet with the principal for a brief interview. Admission decision is communicated within 5 working days." },
    { num: "05", title: "Acceptance & Enrolment", desc: "Accept your offer, complete registration, and pay the required fees to secure your child's place." },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <div className="pt-32 pb-20 px-4" style={{ background: "linear-gradient(135deg, #0A1628, #1E4D8C)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "#C9973A" }}>Admissions</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: "Georgia, serif" }}>Begin Your Application</h1>
          <p className="text-white/70 max-w-2xl mx-auto">Admission for the new academic session is open. Follow these simple steps to get started.</p>
        </div>
      </div>

      {/* Steps */}
      <section className="py-24 px-4" style={{ background: "#F7F8FA" }}>
        <div className="max-w-4xl mx-auto">
          <SectionHeader badge="Admission Process" title="How to Apply" subtitle="A clear, straightforward process — we're with you every step of the way." />
          <div className="space-y-6">
            {steps.map((step, i) => (
              <div key={step.num} className="bg-white rounded-2xl p-8 flex gap-6 items-start border border-gray-100 hover:shadow-md transition-all">
                <div className="w-16 h-16 rounded-2xl flex-shrink-0 flex items-center justify-center text-lg font-bold text-white" style={{ background: "#0A1628" }}>
                  {step.num}
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: "#0A1628" }}>{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="ml-auto flex-shrink-0 self-center">
                    <Icon name="chevronRight" size={20} color="#C9973A" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-2xl mx-auto">
          <SectionHeader badge="Apply Now" title="Submit Your Application" subtitle="Complete the form below and our admissions team will be in touch within 48 hours." />
          {submitted ? (
            <div className="bg-green-50 rounded-3xl p-12 text-center border border-green-100">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "#C9973A" }}>
                <Icon name="check" size={28} color="white" />
              </div>
              <h3 className="text-2xl font-bold mb-3" style={{ color: "#0A1628" }}>Application Received!</h3>
              <p className="text-gray-600">Thank you for your interest in Topnotchers International Academy. Our admissions team will contact you within 48 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                { key: "parentName", label: "Parent/Guardian Full Name", type: "text", placeholder: "e.g. Mr. Emeka Okonkwo" },
                { key: "childName", label: "Child's Full Name", type: "text", placeholder: "e.g. Adaeze Okonkwo" },
                { key: "email", label: "Email Address", type: "email", placeholder: "your.email@example.com" },
                { key: "phone", label: "Phone Number (WhatsApp preferred)", type: "tel", placeholder: "+234 800 000 0000" },
              ].map(field => (
                <div key={field.key}>
                  <label className="block text-sm font-medium mb-2" style={{ color: "#0A1628" }}>{field.label}</label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={form[field.key]}
                    onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                    required
                    className="w-full px-5 py-3.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-amber-400 transition-colors"
                    style={{ background: "#F7F8FA" }}
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "#0A1628" }}>Level Applying For</label>
                <select
                  value={form.level}
                  onChange={e => setForm({ ...form, level: e.target.value })}
                  required
                  className="w-full px-5 py-3.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-amber-400 transition-colors"
                  style={{ background: "#F7F8FA", color: form.level ? "#0A1628" : "#9CA3AF" }}
                >
                  <option value="">Select a programme level</option>
                  <option>Early Years (Nursery / KG)</option>
                  <option>Primary School (Primary 1–6)</option>
                  <option>Junior Secondary (JSS 1–3)</option>
                  <option>Senior Secondary (SSS 1–3)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "#0A1628" }}>Additional Message (optional)</label>
                <textarea
                  placeholder="Any specific questions or information about your child..."
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  rows={4}
                  className="w-full px-5 py-3.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-amber-400 transition-colors resize-none"
                  style={{ background: "#F7F8FA" }}
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 rounded-xl font-semibold text-white transition-all hover:opacity-90 hover:shadow-lg text-sm"
                style={{ background: "linear-gradient(135deg, #0A1628, #1E4D8C)" }}
              >
                Submit Application →
              </button>
              <p className="text-center text-xs text-gray-400">Your information is kept confidential and used only for admissions purposes.</p>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

// ─── PAGE: FACILITIES ───
const FacilitiesPage = () => {
  const facilities = [
    { name: "Modern Classrooms", emoji: "🏫", desc: "Spacious, air-conditioned classrooms equipped with projectors, smart boards, and comfortable furniture designed to enhance learning.", color: "#0A1628" },
    { name: "ICT Laboratory", emoji: "💻", desc: "Fully equipped computer lab with high-speed internet, latest hardware and software, supporting coding, research, and digital literacy.", color: "#1E4D8C" },
    { name: "Science Laboratory", emoji: "🔬", desc: "Well-stocked Physics, Chemistry, and Biology labs enabling hands-on scientific experiments and WAEC practical preparation.", color: "#2D5A27" },
    { name: "Library & Resource Centre", emoji: "📖", desc: "A rich collection of textbooks, novels, encyclopaedias, and digital resources — supporting research and a love of reading.", color: "#4A1760" },
    { name: "Sports Complex", emoji: "⚽", desc: "Football pitch, basketball court, and outdoor track. We believe in developing the whole child — body, mind, and spirit.", color: "#7A3E10" },
    { name: "Music & Arts Studio", emoji: "🎵", desc: "Equipped music room with instruments, soundproofing, and a dedicated arts studio for visual arts, drama, and creative expression.", color: "#1A4A4A" },
    { name: "Dining Hall", emoji: "🍽️", desc: "A clean, spacious cafeteria serving balanced, nutritious meals prepared in a hygienic, supervised kitchen environment.", color: "#4A3010" },
    { name: "Chapel / Assembly Hall", emoji: "🙏", desc: "A dedicated space for daily devotion, school assemblies, drama performances, and large-scale events.", color: "#3A0A0A" },
  ];

  return (
    <div>
      <div className="pt-32 pb-20 px-4" style={{ background: "linear-gradient(135deg, #0A1628, #1E4D8C)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "#C9973A" }}>Our Facilities</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: "Georgia, serif" }}>World-Class Facilities</h1>
          <p className="text-white/70 max-w-2xl mx-auto">Every learning environment has been designed to inspire, challenge, and support our students to achieve their best.</p>
        </div>
      </div>

      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <Carousel
            items={facilities}
            itemsPerView={typeof window !== "undefined" && window.innerWidth < 768 ? 1 : 2}
            renderItem={(item) => (
              <div className="rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all group h-full">
                <div className="aspect-video flex items-center justify-center" style={{ background: item.color }}>
                  <div className="text-center text-white">
                    <div className="text-7xl mb-3">{item.emoji}</div>
                    <div className="text-xl font-bold" style={{ fontFamily: "Georgia, serif" }}>{item.name}</div>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-lg font-bold mb-3" style={{ color: "#0A1628" }}>{item.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            )}
          />
        </div>
      </section>
    </div>
  );
};

// ─── PAGE: CONTACT ───
const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  return (
    <div>
      <div className="pt-32 pb-20 px-4" style={{ background: "linear-gradient(135deg, #0A1628, #1E4D8C)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "#C9973A" }}>Get in Touch</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: "Georgia, serif" }}>Contact Us</h1>
          <p className="text-white/70 max-w-2xl mx-auto">We'd love to hear from you. Reach out to our team and we'll get back to you promptly.</p>
        </div>
      </div>

      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold mb-8" style={{ color: "#0A1628", fontFamily: "Georgia, serif" }}>Reach Out to Us</h2>
            <div className="space-y-6 mb-10">
              {[
                { icon: "mapPin", title: "Our Address", info: "Plot 12, Education Close, Gwarinpa Estate, Abuja, FCT, Nigeria" },
                { icon: "phone", title: "Phone / WhatsApp", info: "+234 803 000 0000\n+234 806 000 0000" },
                { icon: "mail", title: "Email", info: "info@topnotchersacademy.edu.ng\nadmissions@topnotchersacademy.edu.ng" },
              ].map(({ icon, title, info }) => (
                <div key={title} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: "#0A1628" }}>
                    <Icon name={icon} size={20} color="#C9973A" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm mb-1" style={{ color: "#0A1628" }}>{title}</div>
                    <div className="text-gray-500 text-sm whitespace-pre-line">{info}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="rounded-2xl overflow-hidden" style={{ height: 280, background: "linear-gradient(135deg, #0A1628 0%, #1E4D8C 100%)" }}>
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-5xl mb-3">📍</div>
                  <div className="font-bold" style={{ fontFamily: "Georgia, serif" }}>Gwarinpa Estate</div>
                  <div className="text-white/60 text-sm">Abuja, FCT, Nigeria</div>
                  <div className="mt-4 text-xs text-white/40">[Interactive Map]</div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            <h2 className="text-2xl font-bold mb-8" style={{ color: "#0A1628", fontFamily: "Georgia, serif" }}>Send Us a Message</h2>
            {sent ? (
              <div className="rounded-3xl p-10 text-center border border-green-100" style={{ background: "#F0FFF4" }}>
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-xl font-bold mb-2" style={{ color: "#0A1628" }}>Message Sent!</h3>
                <p className="text-gray-500 text-sm">Thank you for reaching out. We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-5">
                {[
                  { key: "name", label: "Full Name", type: "text", placeholder: "Your full name" },
                  { key: "email", label: "Email Address", type: "email", placeholder: "your@email.com" },
                  { key: "phone", label: "Phone Number", type: "tel", placeholder: "+234 800 000 0000" },
                  { key: "subject", label: "Subject", type: "text", placeholder: "e.g. Admissions Enquiry, School Tour, etc." },
                ].map(field => (
                  <div key={field.key}>
                    <label className="block text-sm font-medium mb-2" style={{ color: "#0A1628" }}>{field.label}</label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={form[field.key]}
                      onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                      required
                      className="w-full px-5 py-3.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-amber-400 transition-colors"
                      style={{ background: "#F7F8FA" }}
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "#0A1628" }}>Message</label>
                  <textarea
                    placeholder="Tell us how we can help you..."
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    required
                    rows={5}
                    className="w-full px-5 py-3.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-amber-400 transition-colors resize-none"
                    style={{ background: "#F7F8FA" }}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl font-semibold text-white transition-all hover:opacity-90 text-sm"
                  style={{ background: "linear-gradient(135deg, #0A1628, #1E4D8C)" }}
                >
                  Send Message →
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

// ─── HOME PAGE ───
const HomePage = ({ setPage }) => (
  <div>
    <Hero setPage={setPage} />
    <StatsSection />
    <AboutPreview setPage={setPage} />
    <ProgramsSection setPage={setPage} />
    <GallerySection />
    <TestimonialsSection />
    <AchievementsSection />
    <CTASection setPage={setPage} />
  </div>
);

// ─── FLOATING BUTTONS ───
const FloatingButtons = ({ setPage }) => (
  <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
    {/* WhatsApp */}
    <a
      href="https://wa.me/2348030000000"
      target="_blank"
      rel="noopener noreferrer"
      className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-110"
      style={{ background: "#25D366" }}
      title="Chat on WhatsApp"
    >
      <Icon name="whatsapp" size={24} color="white" />
    </a>
    {/* Apply */}
    <button
      onClick={() => setPage("Admissions")}
      className="md:hidden px-5 py-3 rounded-full text-xs font-bold shadow-xl text-white transition-all hover:scale-105"
      style={{ background: "#C9973A" }}
    >
      Apply Now
    </button>
  </div>
);

// ─── MAIN APP ───
export default function App() {
  const [currentPage, setCurrentPage] = useState("Home");

  const setPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (currentPage) {
      case "Home": return <HomePage setPage={setPage} />;
      case "About": return <AboutPage />;
      case "Academics": return <AcademicsPage />;
      case "Admissions": return <AdmissionsPage />;
      case "Facilities": return <FacilitiesPage />;
      case "Contact": return <ContactPage />;
      default: return <HomePage setPage={setPage} />;
    }
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", color: "#374151" }}>
      <Navbar currentPage={currentPage} setPage={setPage} />
      <main>
        {renderPage()}
      </main>
      <CTASection setPage={setPage} />
      <Footer setPage={setPage} />
      <FloatingButtons setPage={setPage} />
    </div>
  );
}
