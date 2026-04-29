"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface Room {
  name: string;
  tag: string;
  price: string;
  image: string;
  features: string[];
}

interface MilestoneProps {
  number: string;
  title: string;
  subtitle: string;
  story: string;
  stats: { label: string; value: string }[];
  status: string;
  quote: string;
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const HERO_IMAGES = [
  { src: "/images/hero-1.jpg", alt: "Lustro Homes exterior" },
  { src: "/images/hero-2.jpg", alt: "Lustro Homes entrance" },
  { src: "/images/hero-3.jpg", alt: "Lustro Homes lobby" },
  { src: "/images/hero-4.jpg", alt: "Lustro Homes staircase" },
  { src: "/images/hero-5.jpg", alt: "Lustro Lagos at dusk" },
];

const ROOMS: Room[] = [
  {
    name: "The Studio",
    tag: "Classic Room",
    price: "₦50,000",
    image: "/images/room-1.jpg",
    features: ["King Bed", "Smart TV", "Fast WiFi", "AC", "En-suite"],
  },
  {
    name: "The Signature",
    tag: "Premium Suite",
    price: "₦85,000",
    image: "/images/room-2.jpg",
    features: [
      "King Bed",
      "Glass Shower",
      "Netflix Ready",
      "Rattan Wardrobe",
      "Lounge Area",
    ],
  },
  {
    name: "The Penthouse",
    tag: "Top Floor Suite",
    price: "₦120,000",
    image: "/images/room-3.jpg",
    features: [
      "King Bed",
      "Panoramic View",
      "Private Terrace",
      "Smart Automation",
      "Butler Ready",
    ],
  },
];

const MILESTONES: MilestoneProps[] = [
  {
    number: "1.0",
    title: "The Blueprint",
    subtitle: "Where Yaba First Met Luxury",
    story:
      "We started with a simple goal: to create the most sought-after shortlet destination in Yaba. We didn't just build apartments — we built an experience. Featuring signature in-house dining and world-class aesthetics, Lustro 1.0 set a standard Lagos had never seen.",
    stats: [
      { label: "Guests Hosted", value: "15,000+" },
      { label: "Monthly Revenue", value: "₦2M+" },
      { label: "Investor Profit", value: "₦1.4M/mo" },
    ],
    status: "SOLD OUT & ACTIVE",
    quote: "The proof is in the staying.",
  },
  {
    number: "2.0",
    title: "The Yankee Edition",
    subtitle: "Luxury Redefined on the Mainland",
    story:
      "They said luxury belonged on the Island. We disagreed. Yankee by Lustro brought resort-quality living to Lagos Mainland — and the market responded immediately. Launched. Sold out. Delivering. No delays. No excuses. Just results.",
    stats: [
      { label: "Launch Status", value: "Sold Out" },
      { label: "Returns", value: "Monthly" },
      { label: "Satisfaction", value: "100%" },
    ],
    status: "SOLD OUT & DELIVERING",
    quote: "Our standard is now everyone else's benchmark.",
  },
  {
    number: "3.0",
    title: "The Smart Ecosystem",
    subtitle: "The Ultimate Lifestyle Sanctuary",
    story:
      "Our most ambitious project yet. Lustro 3.0 isn't just a home — it's a sanctuary. Featuring Yaba's first-ever in-house spa, a professional gym, and fully automated smart apartments. Built, delivered, and currently generating wealth.",
    stats: [
      { label: "Smart Features", value: "Full Auto" },
      { label: "Yaba's First", value: "In-House Spa" },
      { label: "Investor ROI", value: "₦1.4M/mo" },
    ],
    status: "COMPLETED & EARNING",
    quote: "We don't build houses. We engineer the future.",
  },
];

const GALLERY_IMAGES = [
  { src: "/images/gallery-1.jpg", alt: "Lustro exterior" },
  { src: "/images/gallery-2.jpg", alt: "Dining area" },
  { src: "/images/gallery-3.jpg", alt: "Restaurant neon" },
  { src: "/images/gallery-4.jpg", alt: "Cocktails" },
  { src: "/images/gallery-5.jpg", alt: "Lobby art" },
  { src: "/images/gallery-6.jpg", alt: "Outdoor seating" },
  { src: "/images/gallery-7.jpg", alt: "Premium room" },
  { src: "/images/gallery-8.jpg", alt: "Lustro Lagos entrance" },
];

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const links = [
    { label: "About", id: "about" },
    { label: "Rooms", id: "rooms" },
    { label: "Dining", id: "dining" },
    { label: "Gallery", id: "gallery" },
    { label: "Invest", id: "invest" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-cream/95 backdrop-blur-md shadow-sm border-b border-cream-dark"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <Image
                src="/images/logo.png"
                alt="Lustro Homes"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span
              className={`font-display text-xl font-semibold tracking-wide transition-colors duration-300 ${
                scrolled ? "text-charcoal" : "text-white"
              }`}
            >
              Lustro Homes
            </span>
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className={`nav-link font-body text-sm tracking-widest uppercase transition-colors duration-300 ${
                  scrolled
                    ? "text-charcoal hover:text-brown"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("contact")}
              className="font-body text-xs tracking-widest uppercase px-6 py-3 bg-brown text-white hover:bg-brown-dark transition-colors duration-300"
            >
              Book Now
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span
              className={`block w-6 h-0.5 transition-all duration-300 ${
                menuOpen
                  ? "rotate-45 translate-y-2 bg-charcoal"
                  : scrolled
                  ? "bg-charcoal"
                  : "bg-white"
              }`}
            />
            <span
              className={`block w-6 h-0.5 transition-all duration-300 ${
                menuOpen
                  ? "opacity-0"
                  : scrolled
                  ? "bg-charcoal"
                  : "bg-white"
              }`}
            />
            <span
              className={`block w-6 h-0.5 transition-all duration-300 ${
                menuOpen
                  ? "-rotate-45 -translate-y-2 bg-charcoal"
                  : scrolled
                  ? "bg-charcoal"
                  : "bg-white"
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`mobile-menu ${
          menuOpen ? "open" : ""
        } fixed inset-0 z-40 bg-cream flex flex-col items-center justify-center gap-8`}
      >
        {links.map((l) => (
          <button
            key={l.id}
            onClick={() => scrollTo(l.id)}
            className="font-display text-4xl text-charcoal hover:text-brown transition-colors"
          >
            {l.label}
          </button>
        ))}
        <button
          onClick={() => scrollTo("contact")}
          className="mt-4 font-body text-sm tracking-widest uppercase px-10 py-4 bg-brown text-white"
        >
          Book Now
        </button>
      </div>
    </>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState<boolean[]>(
    new Array(HERO_IMAGES.length).fill(false)
  );
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const markLoaded = (i: number) => {
    setLoaded((prev) => {
      const next = [...prev];
      next[i] = true;
      return next;
    });
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const scrollToRooms = () => {
    document.getElementById("rooms")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      {/* Slideshow */}
      <div
        className="absolute inset-0 z-0"
        style={{ transform: "translateZ(0)" }}
      >
        {HERO_IMAGES.map((img, i) => (
          <div
            key={i}
            className={`hero-slide ${i === current ? "active" : ""}`}
            style={{
              transition:
                i === current
                  ? "opacity 1.5s ease, transform 6s ease"
                  : "opacity 1.5s ease",
            }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              priority={i === 0}
              sizes="100vw"
              onLoad={() => markLoaded(i)}
            />
          </div>
        ))}
      </div>

      {/* Scrim */}
      <div className="hero-scrim absolute inset-0 z-10" />

      {/* Glass Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-6 text-center">
        <div className="glass rounded-2xl px-8 py-10 max-w-3xl w-full mx-auto">
          <p className="font-body text-xs tracking-[0.4em] uppercase text-brown-light mb-4">
            Premium Staycation · Lagos
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-white font-light leading-none mb-6">
            Your Lagos
            <br />
            <em className="text-gold">Staycation</em>
            <br />
            Awaits.
          </h1>
          <p className="font-body text-white/80 text-base md:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            Premium shortlet living, signature dining, and smart investment —
            all under one roof in the heart of Yaba, Lagos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={scrollToContact}
              className="font-body text-xs tracking-widest uppercase px-10 py-4 bg-brown text-white hover:bg-brown-dark transition-colors duration-300"
            >
              Book Your Stay
            </button>
            <button
              onClick={scrollToRooms}
              className="font-body text-xs tracking-widest uppercase px-10 py-4 border border-white/40 text-white hover:bg-white/10 transition-colors duration-300"
            >
              Explore Rooms
            </button>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="flex gap-2 mt-8">
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (intervalRef.current) clearInterval(intervalRef.current);
                setCurrent(i);
                intervalRef.current = setInterval(
                  () => setCurrent((p) => (p + 1) % HERO_IMAGES.length),
                  5000
                );
              }}
              className={`transition-all duration-300 rounded-full ${
                i === current
                  ? "w-8 h-1.5 bg-brown-light"
                  : "w-1.5 h-1.5 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <span className="font-body text-white/50 text-xs tracking-widest uppercase">
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-white/50 to-transparent animate-pulse" />
      </div>
    </section>
  );
}

// ─── STATS BAR ────────────────────────────────────────────────────────────────
function StatsBar() {
  const stats = [
    { value: "15,000+", label: "Guests Hosted" },
    { value: "3", label: "Iconic Properties" },
    { value: "₦2M+", label: "Monthly Revenue" },
    { value: "100%", label: "Delivery Rate" },
  ];

  return (
    <div className="bg-charcoal py-8 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="font-display text-3xl md:text-4xl text-gold font-light">
              {s.value}
            </p>
            <p className="font-body text-xs text-white/50 uppercase tracking-widest mt-1">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────
function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let gsap: typeof import("gsap").gsap;
    let ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;

    const init = async () => {
      const g = await import("gsap");
      const st = await import("gsap/ScrollTrigger");
      gsap = g.gsap;
      ScrollTrigger = st.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current) return;

      const ctx = gsap.context(() => {
        gsap.from(".about-text", {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        });

        gsap.from(".about-image", {
          opacity: 0,
          x: 60,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        });
      }, sectionRef);

      return () => ctx.revert();
    };

    init();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 px-6 bg-cream">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Text */}
        <div>
          <p className="about-text font-body text-xs text-brown tracking-[0.35em] uppercase mb-4">
            Our Story
          </p>
          <h2 className="about-text font-display text-5xl md:text-6xl text-charcoal font-light leading-tight mb-6">
            Lagos Luxury,
            <br />
            <em>Redefined.</em>
          </h2>
          <div className="about-text section-line mb-8" />
          <p className="about-text font-body text-base text-charcoal/70 leading-relaxed mb-6">
            Lustro Homes was built on one belief: that premium living should not
            be a privilege of the Island. In the heart of Yaba, we created
            something Lagos had never seen — a world-class shortlet experience
            that combines signature aesthetics, signature dining, and smart
            investment returns.
          </p>
          <p className="about-text font-body text-base text-charcoal/70 leading-relaxed mb-10">
            Three properties. Over 15,000 guests. Zero failed promises. That is
            the Lustro track record, and it speaks louder than any advertisement
            ever could.
          </p>
          <div className="about-text flex gap-12">
            {[
              { v: "3", l: "Properties" },
              { v: "8,000+", l: "5-Star Stays" },
              { v: "3yrs", l: "Of Excellence" },
            ].map((s) => (
              <div key={s.l}>
                <p className="font-display text-3xl text-brown font-light">
                  {s.v}
                </p>
                <p className="font-body text-xs text-charcoal/50 uppercase tracking-widest mt-1">
                  {s.l}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Image */}
        <div className="about-image relative">
          <div className="img-zoom relative h-[520px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/images/about.jpg"
              alt="Lustro Homes interior"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={false}
            />
          </div>
          {/* Floating badge */}
          <div className="absolute -bottom-6 -left-6 glass-light rounded-xl px-6 py-5 shadow-lg">
            <p className="font-display text-2xl text-brown font-semibold">
              @lustro_homes
            </p>
            <p className="font-body text-xs text-charcoal/60 tracking-wider">
              STAYCATION · DINING · INVESTMENT
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── ROOMS ────────────────────────────────────────────────────────────────────
function RoomsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (!sectionRef.current) return;

      const ctx = gsap.context(() => {
        gsap.from(".room-card", {
          opacity: 0,
          y: 60,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        });
      }, sectionRef);

      return () => ctx.revert();
    };
    init();
  }, []);

  return (
    <section
      id="rooms"
      ref={sectionRef}
      className="py-24 px-6 bg-cream-dark"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-body text-xs text-brown tracking-[0.35em] uppercase mb-4">
            Accommodations
          </p>
          <h2 className="font-display text-5xl md:text-6xl text-charcoal font-light">
            Rooms & Suites
          </h2>
          <div className="section-line mx-auto mt-5" />
          <p className="font-body text-base text-charcoal/60 mt-5 max-w-lg mx-auto">
            Every room at Lustro is a carefully curated experience. Each space
            has its own identity, its own name, its own story.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {ROOMS.map((room) => (
            <div
              key={room.name}
              className="room-card card-lift bg-white rounded
