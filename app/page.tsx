"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";

// Fonts
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});

// Types for GSAP & Lenis
type GSAPType = typeof import("gsap");
type ScrollTriggerType = typeof import("gsap/ScrollTrigger");
type LenisType = typeof import("lenis");

// Navbar Component
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileOpen(false);
  };

  const menuItems = [
    { label: "About", id: "about" },
    { label: "Rooms", id: "rooms" },
    { label: "Dining", id: "dining" },
    { label: "Gallery", id: "gallery" },
    { label: "Invest", id: "invest" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#FAF7F2]/95 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <button onClick={() => scrollTo("hero")} className="flex items-center gap-3">
          <div className="relative w-10 h-10">
            <Image src="/images/logo.png" alt="Lustro Homes" fill className="object-contain" />
          </div>
          <span
            className={`text-xl font-semibold tracking-tight transition-colors duration-300 ${
              isScrolled ? "text-[#1A1A1A]" : "text-white"
            } font-[var(--font-cormorant)]`}
          >
            Lustro Homes
          </span>
        </button>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`nav-link text-sm uppercase tracking-wider font-medium transition-colors duration-300 relative py-1 ${
                isScrolled ? "text-[#2D2D2D]" : "text-white/90"
              }`}
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#A0522D] scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100" />
            </button>
          ))}
          <button
            onClick={() =>
              window.open("https://wa.me/[NUMBER]", "_blank")
            }
            className="bg-[#A0522D] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#C17B3F] transition-all duration-300 shadow-lg shadow-[#A0522D]/20 hover:shadow-[#A0522D]/40 hover:-translate-y-0.5"
          >
            Book Now
          </button>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="lg:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menu"
        >
          <span
            className={`block w-6 h-0.5 transition-all duration-300 ${
              isScrolled ? "bg-[#1A1A1A]" : "bg-white"
            } ${isMobileOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 transition-all duration-300 ${
              isScrolled ? "bg-[#1A1A1A]" : "bg-white"
            } ${isMobileOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 transition-all duration-300 ${
              isScrolled ? "bg-[#1A1A1A]" : "bg-white"
            } ${isMobileOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`mobile-menu fixed inset-0 bg-[#1A1A1A]/98 backdrop-blur-lg z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-500 ease-in-out lg:hidden ${
          isMobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className="text-white text-2xl uppercase tracking-widest font-light hover:text-[#C9A96E] transition-colors"
          >
            {item.label}
          </button>
        ))}
        <button
          onClick={() => {
            window.open("https://wa.me/[NUMBER]", "_blank");
            setIsMobileOpen(false);
          }}
          className="mt-4 bg-[#A0522D] text-white px-10 py-3 rounded-full text-lg font-semibold hover:bg-[#C17B3F] transition"
        >
          Book Now
        </button>
      </div>
    </nav>
  );
};

// Hero Section
const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = ["hero-1.jpg", "hero-2.jpg", "hero-3.jpg", "hero-4.jpg", "hero-5.jpg"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      {/* Slideshow Container */}
      <div className="absolute inset-0 translate-z-0 will-change-transform">
        {images.map((img, index) => (
          <div
            key={img}
            className={`hero-slide absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
              index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-[1.08]"
            }`}
            style={{ pointerEvents: "none" }}
          >
            <Image
              src={`/images/${img}`}
              alt={`Lustro Homes ${index + 1}`}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
              style={{ transform: "translateZ(0)" }}
            />
          </div>
        ))}
      </div>

      {/* Scrim Overlay */}
      <div className="hero-scrim absolute inset-0 z-10 bg-gradient-to-b from-[#1A1A1A]/60 via-[#1A1A1A]/40 to-[#1A1A1A]/80" />

      {/* Glass Card Content */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="glass mx-4 p-8 md:p-12 lg:p-16 rounded-2xl max-w-2xl w-full text-center">
          <p className="text-[#C9A96E] text-sm uppercase tracking-[0.3em] mb-3 font-medium">
            Premium Staycation · Lagos
          </p>
          <h1 className={`text-4xl md:text-6xl lg:text-7xl text-white font-light leading-tight mb-6 ${cormorant.className}`}>
            Your Lagos <br />
            <span className="italic text-[#C9A96E] font-medium">Staycation</span> Awaits.
          </h1>
          <p className="text-white/70 text-base md:text-lg mb-8 max-w-lg mx-auto leading-relaxed">
            Where Yaba meets world-class luxury — experience signature shortlets, in-house dining, and a stay that feels like home, only better.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.open("https://wa.me/[NUMBER]", "_blank")}
              className="bg-[#A0522D] text-white px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-[#C17B3F] transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
            >
              Book Your Stay
            </button>
            <button
              onClick={() => document.getElementById("rooms")?.scrollIntoView({ behavior: "smooth" })}
              className="border border-white/30 text-white px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-white/10 transition-all duration-300"
            >
              Explore Rooms
            </button>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-500 rounded-full ${
                  index === currentSlide
                    ? "w-8 h-2.5 bg-[#A0522D]"
                    : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/50">
        <span className="block w-[1px] h-10 bg-gradient-to-b from-white/40 to-transparent" />
        <span className="text-xs uppercase tracking-[0.3em]">Scroll</span>
      </div>
    </section>
  );
};

// Stats Bar
const StatsBar = () => {
  const stats = [
    { number: "15,000+", label: "Guests Hosted" },
    { number: "3", label: "Iconic Properties" },
    { number: "₦2M+", label: "Monthly Revenue" },
    { number: "100%", label: "Delivery Rate" },
  ];

  return (
    <section className="bg-[#1A1A1A] py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="text-[#C9A96E] text-3xl md:text-4xl font-semibold mb-1 font-[var(--font-cormorant)]">
              {stat.number}
            </p>
            <p className="text-white/50 text-xs uppercase tracking-[0.2em]">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  return (
    <section id="about" className="bg-[#FAF7F2] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-[#A0522D] text-sm uppercase tracking-[0.3em] mb-3 font-medium">
            Our Story
          </p>
          <h2 className={`text-4xl md:text-5xl lg:text-6xl text-[#1A1A1A] font-light leading-tight mb-6 ${cormorant.className}`}>
            Lagos Luxury, <br />
            <span className="italic text-[#A0522D]">Redefined.</span>
          </h2>
          <div className="section-line w-16 h-0.5 bg-[#A0522D] mb-8" />
          <div className="space-y-5 text-[#2D2D2D]/80 leading-relaxed">
            <p>
              Lustro Homes was born from a simple yet bold vision — to bring uncompromising luxury to the heart of Yaba. What started as a single property on Ibukun Olu Street has evolved into a movement redefining what staycations mean on the Lagos Mainland.
            </p>
            <p>
              Every Lustro property is a curated experience — blending modern aesthetics, signature in-house dining, and the warmth of Nigerian hospitality. We don&apos;t just offer rooms; we craft moments that linger long after check-out.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-6 mt-8 pt-6 border-t border-[#EDE8E0]">
            <div>
              <p className="text-[#A0522D] text-2xl font-semibold font-[var(--font-cormorant)]">3</p>
              <p className="text-xs uppercase tracking-wider text-[#2D2D2D]/60">Properties</p>
            </div>
            <div>
              <p className="text-[#A0522D] text-2xl font-semibold font-[var(--font-cormorant)]">8,000+</p>
              <p className="text-xs uppercase tracking-wider text-[#2D2D2D]/60">Stays</p>
            </div>
            <div>
              <p className="text-[#A0522D] text-2xl font-semibold font-[var(--font-cormorant)]">3yrs</p>
              <p className="text-xs uppercase tracking-wider text-[#2D2D2D]/60">Legacy</p>
            </div>
          </div>
        </div>
        <div className="relative group">
          <div className="relative overflow-hidden rounded-2xl aspect-[4/5] img-zoom">
            <Image
              src="/images/about.jpg"
              alt="Lustro Homes Interior"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="absolute -bottom-4 -right-4 glass-light px-5 py-3 rounded-xl shadow-lg">
            <p className="text-sm font-medium text-[#1A1A1A]">@lustro_homes</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Rooms Section
const RoomsSection = () => {
  const rooms = [
    {
      name: "The Studio",
      type: "Classic Room",
      price: "₦50,000",
      features: ["King Bed", "Smart TV", "Fast WiFi", "AC", "En-suite"],
      image: "room-1.jpg",
    },
    {
      name: "The Signature",
      type: "Premium Suite",
      price: "₦85,000",
      features: ["King Bed", "Glass Shower", "Netflix Ready", "Rattan Wardrobe", "Lounge Area"],
      image: "room-2.jpg",
    },
    {
      name: "The Penthouse",
      type: "Top Floor Suite",
      price: "₦120,000",
      features: ["King Bed", "Panoramic View", "Private Terrace", "Smart Automation", "Butler Ready"],
      image: "room-3.jpg",
    },
  ];

  return (
    <section id="rooms" className="bg-[#EDE8E0] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#A0522D] text-sm uppercase tracking-[0.3em] mb-3 font-medium">
            Stay With Us
          </p>
          <h2 className={`text-4xl md:text-5xl text-[#1A1A1A] font-light mb-4 ${cormorant.className}`}>
            Rooms & Suites
          </h2>
          <div className="section-line w-16 h-0.5 bg-[#A0522D] mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <div key={room.name} className="card-lift group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500">
              <div className="relative h-64 overflow-hidden img-zoom">
                <Image
                  src={`/images/${room.image}`}
                  alt={room.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <span className="absolute top-4 left-4 bg-[#A0522D]/90 text-white text-xs px-3 py-1.5 rounded-full font-medium backdrop-blur-sm">
                  {room.type}
                </span>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className={`text-2xl text-[#1A1A1A] font-medium ${cormorant.className}`}>
                    {room.name}
                  </h3>
                  <p className="text-[#A0522D] font-semibold">
                    {room.price}<span className="text-xs font-normal text-[#2D2D2D]/50">/night</span>
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mb-5">
                  {room.features.map((f) => (
                    <span key={f} className="text-xs bg-[#FAF7F2] text-[#2D2D2D]/70 px-2.5 py-1 rounded-full">
                      {f}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => window.open(`https://wa.me/[NUMBER]?text=I'm interested in ${room.name}`, "_blank")}
                  className="w-full bg-[#1A1A1A] text-white py-3 rounded-full text-sm font-semibold hover:bg-[#A0522D] transition-all duration-300"
                >
                  Book This Room
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Dining Section
const DiningSection = () => {
  const images = ["dining-1.jpg", "dining-2.jpg", "dining-3.jpg", "dining-4.jpg"];
  const gridSpans = [
    "md:row-span-2 md:h-full",
    "md:h-64",
    "md:h-64",
    "md:row-span-2 md:h-full",
  ];

  return (
    <section id="dining" className="bg-[#1A1A1A] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-[#C9A96E] text-sm uppercase tracking-[0.3em] mb-3 font-medium">
            Signature Dining
          </p>
          <h2 className={`text-4xl md:text-5xl text-white font-light leading-tight mb-6 ${cormorant.className}`}>
            Lustro Lagos <br />
            <span className="italic text-[#C9A96E]">Restaurant</span>
          </h2>
          <div className="section-line w-16 h-0.5 bg-[#C9A96E] mb-8" />
          <div className="space-y-5 text-white/60 leading-relaxed">
            <p>
              Lustro Lagos is our in-house culinary experience — where bold African flavors meet international finesse. Every dish is crafted with intention, plated with artistry, and served in an ambiance that whispers luxury.
            </p>
            <p>
              Whether it&apos;s a candlelit dinner for two, a celebratory brunch with friends, or a quiet solo meal — our restaurant transforms dining into a destination.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 mt-8">
            <button
              onClick={() => window.open("https://wa.me/[NUMBER]", "_blank")}
              className="bg-[#C9A96E] text-[#1A1A1A] px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-[#A0522D] hover:text-white transition-all duration-300"
            >
              Reserve A Table
            </button>
            <a
              href="https://instagram.com/lustro_lagos"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/20 text-white px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-white/10 transition-all duration-300 inline-flex items-center gap-2"
            >
              @lustro_lagos
            </a>
          </div>
        </div>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-2 gap-3 md:h-[500px]">
          {images.map((img, i) => (
            <div
              key={img}
              className={`relative overflow-hidden rounded-xl img-zoom ${gridSpans[i]} h-48`}
            >
              <Image
                src={`/images/${img}`}
                alt={`Dining ${i + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Gallery Section
const GallerySection = () => {
  const images = Array.from({ length: 8 }, (_, i) => `gallery-${i + 1}.jpg`);
  const bigIndices = [0, 4]; // images 1 and 5 span 2 cols

  return (
    <section id="gallery" className="bg-[#FAF7F2] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#A0522D] text-sm uppercase tracking-[0.3em] mb-3 font-medium">
            Our Spaces
          </p>
          <h2 className={`text-4xl md:text-5xl text-[#1A1A1A] font-light mb-4 ${cormorant.className}`}>
            Gallery
          </h2>
          <div className="section-line w-16 h-0.5 bg-[#A0522D] mx-auto" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-auto">
          {images.map((img, i) => (
            <div
              key={img}
              className={`relative overflow-hidden rounded-xl img-zoom ${
                bigIndices.includes(i)
                  ? "md:col-span-2 h-72"
                  : "h-52"
              }`}
            >
              <Image
                src={`/images/${img}`}
                alt={`Gallery ${i + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="https://instagram.com/lustro_homes"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#A0522D] hover:text-[#C17B3F] font-medium transition-colors"
          >
            <span>Follow @lustro_homes on Instagram</span>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.882 0 1.441 1.441 0 012.882 0z"/></svg>
          </a>
        </div>
      </div>
    </section>
  );
};

// Investment Section
const InvestmentSection = () => {
  const milestones = [
    {
      title: "Lustro 1.0 — The Blueprint",
      subtitle: "Where Yaba First Met Luxury",
      story:
        "Started with a simple goal — create the most sought-after shortlet in Yaba. Built an experience with signature in-house dining and world-class aesthetics.",
      stats: ["15,000+ Guests Hosted", "₦2M+ Monthly Revenue", "₦1.4M/mo Investor Profit"],
      badge: "SOLD OUT & ACTIVE",
      quote: "The proof is in the staying.",
    },
    {
      title: "Lustro 2.0 — The Yankee Edition",
      subtitle: "Luxury Redefined on the Mainland",
      story:
        "Brought resort-quality living to Lagos Mainland. Yankee by Lustro — launched, sold out, delivering. No delays. No excuses. Just results.",
      stats: ["Sold Out Launch Status", "Monthly Returns", "100% Satisfaction"],
      badge: "SOLD OUT & DELIVERING",
      quote: "Our standard is now everyone else's benchmark.",
    },
    {
      title: "Lustro 3.0 — The Smart Ecosystem",
      subtitle: "The Ultimate Lifestyle Sanctuary",
      story:
        "Most ambitious project yet. Fully automated smart apartments. Yaba's first in-house spa. Professional gym. Built, delivered, earning.",
      stats: ["Full Auto Smart Features", "Yaba's First In-House Spa", "₦1.4M/mo Investor ROI"],
      badge: "COMPLETED & EARNING",
      quote: "We don't build houses. We engineer the future.",
    },
  ];

  return (
    <section id="invest" className="bg-[#2D2D2D] py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className={`text-3xl md:text-5xl text-white font-light mb-4 ${cormorant.className}`}>
            The Lustro Journey — From Vision to Value
          </h2>
          <p className="text-white/50 text-lg">3 Iconic Projects. 100% Delivery. A New Era.</p>
        </div>

        <div className="relative pl-8 md:pl-0">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-[3px] bg-[#C17B3F]/30 hidden md:block" />

          <div className="space-y-16">
            {milestones.map((m, i) => (
              <div key={m.title} className="milestone-card relative pl-8 md:pl-16 border-l-[3px] border-[#C17B3F] md:border-l-0">
                {/* Dot */}
                <div className="absolute left-[-7px] md:left-[29px] top-1.5 w-[11px] h-[11px] rounded-full bg-[#C17B3F] shadow-[0_0_0_4px_rgba(193,123,63,0.2)] z-10" />

                <div className="bg-[#1A1A1A]/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/5">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <h3 className={`text-2xl md:text-3xl text-white font-medium ${cormorant.className}`}>
                      {m.title}
                    </h3>
                    <span className="status-badge inline-flex items-center gap-2 bg-[#A0522D]/20 text-[#C9A96E] text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wider border border-[#A0522D]/30">
                      <span className="pulse-dot w-2 h-2 bg-red-500 rounded-full" />
                      {m.badge}
                    </span>
                  </div>
                  <p className="text-[#C9A96E] text-lg mb-3 font-medium">{m.subtitle}</p>
                  <p className="text-white/60 leading-relaxed mb-6">{m.story}</p>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {m.stats.map((s) => (
                      <div key={s} className="text-center p-3 bg-white/5 rounded-lg">
                        <p className="text-white text-sm font-medium">{s}</p>
                      </div>
                    ))}
                  </div>

                  <blockquote className="border-l-2 border-[#C17B3F] pl-4 italic text-white/40 text-sm">
                    &ldquo;{m.quote}&rdquo;
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 glass p-8 md:p-12 rounded-2xl text-center max-w-3xl mx-auto">
          <h3 className={`text-3xl md:text-4xl text-white font-light mb-4 ${cormorant.className}`}>
            Lustro 4.0 Is Coming.
          </h3>
          <p className="text-white/60 mb-8 max-w-xl mx-auto leading-relaxed">
            People who moved first on 1.0, 2.0, 3.0 are earning every month. Don&apos;t miss out on the next chapter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#A0522D] text-white px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-[#C17B3F] transition-all duration-300 shadow-lg">
              Get Early Access
            </button>
            <button className="border border-white/20 text-white px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-white/10 transition-all duration-300">
              Stay Connected
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const TestimonialsSection = () => {
  const reviews = [
    {
      name: "Adaeze O.",
      location: "Lekki, Lagos",
      stars: 5,
      text: "From the moment we arrived, everything was perfect. The room aesthetics, the service, the food at Lustro Lagos — I have never experienced anything like it in Nigeria.",
    },
    {
      name: "Tunde M.",
      location: "Ikeja, Lagos",
      stars: 5,
      text: "Yankee by Lustro is a different world entirely. My girls and I booked for a staycation and did not want to leave. Every corner is Instagram-worthy.",
    },
    {
      name: "Chisom E.",
      location: "Abuja",
      stars: 5,
      text: "I was visiting Lagos for a conference and chose Lustro on a recommendation. Best decision I made. The room felt like an international hotel.",
    },
  ];

  return (
    <section className="bg-[#EDE8E0] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#A0522D] text-sm uppercase tracking-[0.3em] mb-3 font-medium">
            Testimonials
          </p>
          <h2 className={`text-4xl md:text-5xl text-[#1A1A1A] font-light mb-4 ${cormorant.className}`}>
            Loved by Guests
          </h2>
          <div className="section-line w-16 h-0.5 bg-[#A0522D] mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.name} className="card-lift bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: review.stars }).map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-[#C9A96E]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="italic text-[#2D2D2D]/70 mb-6 leading-relaxed">
                &ldquo;{review.text}&rdquo;
              </blockquote>
              <div>
                <p className="font-semibold text-[#1A1A1A]">{review.name}</p>
                <p className="text-sm text-[#2D2D2D]/50">{review.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  return (
    <section id="contact" className="relative py-24 md:py-32">
      <Image
        src="/images/hero-1.jpg"
        alt="Contact Background"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[#1A1A1A]/80 z-10" />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className={`text-4xl md:text-5xl text-white font-light mb-6 ${cormorant.className}`}>
          Ready to Experience{" "}
          <span className="italic text-[#C9A96E]">Lustro?</span>
        </h2>
        <p className="text-white/50 mb-12 max-w-lg mx-auto">
          Your luxury staycation is just a message away. Reach out and let us curate your perfect escape.
        </p>

        <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
          <a
            href="https://wa.me/[NUMBER]"
            target="_blank"
            rel="noopener noreferrer"
            className="glass p-6 rounded-xl hover:bg-white/10 transition-all duration-300 group"
          >
            <p className="text-2xl mb-2">📱</p>
            <p className="text-white font-medium mb-1">WhatsApp Us</p>
            <p className="text-white/40 text-sm">Start a conversation</p>
          </a>
          <div className="glass p-6 rounded-xl">
            <p className="text-2xl mb-2">📍</p>
            <p className="text-white font-medium mb-1">Location</p>
            <p className="text-white/40 text-sm">37 Ibukun Olu St, Akoka, Yaba</p>
          </div>
          <a
            href="https://instagram.com/lustro_homes"
            target="_blank"
            rel="noopener noreferrer"
            className="glass p-6 rounded-xl hover:bg-white/10 transition-all duration-300"
          >
            <p className="text-2xl mb-2">📸</p>
            <p className="text-white font-medium mb-1">Instagram</p>
            <p className="text-white/40 text-sm">@lustro_homes</p>
          </a>
        </div>

        <button
          onClick={() => window.open("https://wa.me/[NUMBER]", "_blank")}
          className="bg-[#C9A96E] text-[#1A1A1A] px-12 py-4 rounded-full text-lg font-semibold hover:bg-white transition-all duration-300 shadow-2xl"
        >
          Book Your Stay Now
        </button>
      </div>
    </section>
  );
};

// Footer
const FooterSection = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#1A1A1A] border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-12 mb-16">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="relative w-10 h-10">
              <Image src="/images/logo.png" alt="Lustro Homes" fill className="object-contain" />
            </div>
            <span className={`text-xl font-semibold text-white ${cormorant.className}`}>
              Lustro Homes
            </span>
          </div>
          <p className="text-[#C9A96E] text-sm mb-3 italic">Staycation in Lagos | Signature Dining | Investment</p>
          <p className="text-white/40 text-sm leading-relaxed">
            Where luxury meets Lagos Mainland. Curated shortlets, exceptional dining, and premium investment opportunities in the heart of Yaba.
          </p>
        </div>

        <div>
          <h4 className="text-white font-medium mb-4 uppercase tracking-wider text-sm">Navigate</h4>
          <div className="space-y-3">
            {["About", "Rooms", "Dining", "Gallery", "Invest", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className="block text-white/40 hover:text-white transition-colors text-sm"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-medium mb-4 uppercase tracking-wider text-sm">Connect</h4>
          <div className="space-y-3">
            <a
              href="https://instagram.com/lustro_homes"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-white/40 hover:text-white transition-colors text-sm"
            >
              Instagram · @lustro_homes
            </a>
            <a
              href="https://instagram.com/lustro_lagos"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-white/40 hover:text-white transition-colors text-sm"
            >
              Restaurant · @lustro_lagos
            </a>
            <a
              href="https://wa.me/[NUMBER]"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-white/40 hover:text-white transition-colors text-sm"
            >
              WhatsApp Booking
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-white/20 text-xs">
          &copy; {new Date().getFullYear()} Lustro Homes. All rights reserved.
        </p>
        <p className="text-white/20 text-xs">
          37 Ibukun Olu Street, Akoka, Yaba, Lagos, Nigeria.
        </p>
      </div>
    </footer>
  );
};

// Main Page Component
export default function HomePage() {
  const lenisRef = useRef<LenisType | null>(null);
  const gsapRef = useRef<GSAPType | null>(null);
  const scrollTriggerRef = useRef<ScrollTriggerType | null>(null);
  const sectionsRef = useRef<HTMLElement[]>([]);

  // Initialize GSAP, ScrollTrigger, and Lenis
  useEffect(() => {
    let isMounted = true;

    const initAnimations = async () => {
      try {
        const gsapModule = await import("gsap");
        const scrollTriggerModule = await import("gsap/ScrollTrigger");
        const lenisModule = await import("lenis");

        if (!isMounted) return;

        gsapRef.current = gsapModule.default;
        scrollTriggerRef.current = scrollTriggerModule.default;
        gsapRef.current.registerPlugin(scrollTriggerRef.current);

        // Initialize Lenis
        const Lenis = lenisModule.default;
        const lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
        });

        lenisRef.current = lenis;

        // Wire to GSAP ticker
        gsapRef.current.ticker.add((time: number) => {
          lenis.raf(time * 1000);
        });
        gsapRef.current.ticker.lagSmoothing(0);

        // Setup ScrollTrigger animations
        if (scrollTriggerRef.current && gsapRef.current) {
          const gsap = gsapRef.current;
          const ScrollTrigger = scrollTriggerRef.current;

          // Animate sections on scroll
          const sections = sectionsRef.current;
          sections.forEach((section) => {
            const elements = section.querySelectorAll("[data-reveal]");
            if (elements.length > 0) {
              gsap.fromTo(
                elements,
                { opacity: 0, y: 50 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.9,
                  stagger: 0.15,
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    once: true,
                  },
                }
              );
            }
          });

          // Dining split-screen animation
          const diningSection = document.getElementById("dining");
          if (diningSection && gsap && ScrollTrigger) {
            const left = diningSection.querySelector(".dining-left");
            const right = diningSection.querySelector(".dining-right");
            if (left) {
              gsap.fromTo(
                left,
                { x: -60, opacity: 0 },
                {
                  x: 0,
                  opacity: 1,
                  duration: 1,
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: diningSection,
                    start: "top 70%",
                    once: true,
                  },
                }
              );
            }
            if (right) {
              gsap.fromTo(
                right,
                { x: 60, opacity: 0 },
                {
                  x: 0,
                  opacity: 1,
                  duration: 1,
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: diningSection,
                    start: "top 70%",
                    once: true,
                  },
                }
              );
            }
          }
        }
      } catch (error) {
        console.warn("Animation libraries failed to load:", error);
        // Graceful fallback — site works without animations
      }
    };

    initAnimations();

    return () => {
      isMounted = false;
      lenisRef.current?.destroy();
      gsapRef.current?.ticker.remove(() => {});
    };
  }, []);

  // Collect section refs
  const setSectionRef = useCallback((el: HTMLElement | null, index: number) => {
    if (el) sectionsRef.current[index] = el;
  }, []);

  return (
    <div className={`${dmSans.variable} ${cormorant.variable} font-[var(--font-dm-sans)] text-[#1A1A1A]`}>
      <Navbar />
      <main>
        <HeroSection />
        <div ref={(el) => setSectionRef(el, 0)}><StatsBar /></div>
        <div ref={(el) => setSectionRef(el, 1)} data-reveal><AboutSection /></div>
        <div ref={(el) => setSectionRef(el, 2)} data-reveal><RoomsSection /></div>
        <div ref={(el) => setSectionRef(el, 3)}><DiningSection /></div>
        <div ref={(el) => setSectionRef(el, 4)} data-reveal><GallerySection /></div>
        <div ref={(el) => setSectionRef(el, 5)} data-reveal><InvestmentSection /></div>
        <div ref={(el) => setSectionRef(el, 6)} data-reveal><TestimonialsSection /></div>
        <div ref={(el) => setSectionRef(el, 7)} data-reveal><ContactSection /></div>
      </main>
      <FooterSection />
    </div>
  );
}