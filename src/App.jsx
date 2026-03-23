import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence, animate } from 'framer-motion';
import Lenis from 'lenis';
import { Component as EtherealBackground } from '@/components/ui/etheral-shadow';

const VARIETIES = [
  {
    name: "PANAMA GEISHA",
    img: "/geisha.png",
    altitude: "1800m+",
    notes: "Floral, Berries",
    process: "Washed",
  },
  {
    name: "JAMAICA BLUE MOUNTAIN",
    img: "/jamaica.png",
    altitude: "1500m+",
    notes: "Chocolate, Mild",
    process: "Wet Process",
  },
  {
    name: "KOPI LUWAK",
    img: "/luwak.png",
    altitude: "1200m+",
    notes: "Earthy, Smooth",
    process: "Natural",
  }
];

// ==========================================
// 1. COMPONENT: Letter Swap Button (Top Nav)
// ==========================================
const LetterSwapButton = ({ label, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="relative overflow-hidden group font-montserrat text-[10px] md:text-sm tracking-widest text-[#D4AF37] uppercase h-5 md:h-6 pointer-events-auto"
      initial="initial"
      whileHover="hover"
      animate="initial"
    >
      <div className="flex h-full items-center">
        {label.split('').map((char, i) => (
          <motion.span
            key={`${label}-${i}`}
            className="inline-block whitespace-pre"
            variants={{ initial: { y: 0 }, hover: { y: "-100%" } }}
            transition={{ duration: 0.28, ease: [0.76, 0, 0.24, 1], delay: i * 0.03 }}
          >
            {char}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0 flex h-full items-center">
        {label.split('').map((char, i) => (
          <motion.span
            key={`${label}-${i}-bottom`}
            className="inline-block whitespace-pre"
            variants={{ initial: { y: "100%" }, hover: { y: 0 } }}
            transition={{ duration: 0.28, ease: [0.76, 0, 0.24, 1], delay: i * 0.03 }}
          >
            {char}
          </motion.span>
        ))}
      </div>
    </motion.button>
  );
};

// ==========================================
// 1.B. COMPONENT: Full-Screen Menu Overlay (Crimson Velvet)
// ==========================================
const MenuOverlay = ({ isOpen, setIsOpen, onNavigate }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const menuItems = [
    { num: "01", name: "DESIGN", progress: 0.18, isOutline: false },
    { num: "04", name: "HERITAGE", progress: 0.55, isOutline: true },
    { num: "02", name: "BLENDS", progress: 0.30, isOutline: false },
    { num: "05", name: "VARIETIES", progress: 0.78, isOutline: true },
    { num: "03", name: "ENGINEERING", progress: 0.40, isOutline: false },
    { num: "06", name: "CONTACT", progress: 0.95, isOutline: true }
  ];

  const overlayVariants = {
    hidden: { y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 } },
    visible: { y: "0%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }
  };

  const itemVariants = {
    hidden: { y: -30, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0.3 + i * 0.08 }
    }),
    exit: (i) => ({
      y: -30,
      opacity: 0,
      transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1], delay: i * 0.03 }
    })
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 z-[200] bg-[#1a0505] overflow-hidden flex items-center justify-center p-6 md:p-20 pointer-events-auto"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#2c0101_0%,#0a0000_100%)] opacity-90" />
          <div className="absolute inset-0 mix-blend-overlay opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/black-linen-2.png')]" />

          <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-x-20 md:gap-x-32 gap-y-8 md:gap-y-16 lg:gap-y-20 px-4 mt-12 md:mt-0">
            {menuItems.map((item, idx) => {
              const isHovered = hoveredIndex === idx;
              const isDimmed = hoveredIndex !== null && !isHovered;

              return (
                <motion.div
                  key={idx}
                  custom={idx}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => {
                    onNavigate(item.progress);
                    setIsOpen(false);
                  }}
                  className="group flex flex-row items-center gap-4 md:gap-10 cursor-pointer transition-all duration-500 ease-in-out"
                  style={{ opacity: isDimmed ? 0.2 : 1 }}
                >
                  <span className="font-montserrat text-[#D4AF37] text-[10px] md:text-[14px] tracking-[0.4em] opacity-50 shrink-0 italic">
                    {item.num}
                  </span>

                  <span
                    className={`font-serif italic text-2xl sm:text-3xl md:text-5xl lg:text-7xl uppercase tracking-wider transition-all duration-500 
                      ${item.isOutline ? 'text-transparent' : 'text-[#D4AF37]'}
                      ${isHovered ? 'scale-[1.05]' : 'scale-100'}`}
                    style={{
                      fontStyle: 'italic',
                      WebkitTextStroke: item.isOutline || isHovered ? '1px #D4AF37' : '0px transparent',
                      color: item.isOutline ? (isHovered ? '#FFF5E1' : 'transparent') : (isHovered ? '#FFF5E1' : '#D4AF37'),
                      textShadow: isHovered ? '0 0 25px rgba(212,175,55,0.4)' : 'none'
                    }}
                  >
                    {item.name}
                  </span>
                </motion.div>
              );
            })}
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:block">
            <span className="font-montserrat text-[#D4AF37]/30 text-[10px] tracking-[0.6em] uppercase italic">Select to navigate</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ==========================================
// 2. COMPONENT: The New Drop-Down Descramble Text
// ==========================================
const DescrambleWord = ({ startText, endText, state, fontClass = "" }) => {
  const maxLength = Math.max(startText.length, endText.length);
  const startStr = startText.padEnd(maxLength, " ");
  const endStr = endText.padEnd(maxLength, " ");

  return (
    <div className={`flex overflow-hidden pb-1 leading-none ${fontClass}`} style={fontClass ? {} : { fontFamily: 'Stardom', fontWeight: 'normal' }}>
      {startStr.split('').map((startChar, i) => {
        const endChar = endStr[i];

        let yPos = "-100%";
        if (state === 1) yPos = "0%";
        if (state === 2) yPos = "100%";

        return (
          <div key={i} className="relative inline-block tracking-[0.05em] sm:tracking-[0.1em] px-[1px] md:px-[2px]">
            <motion.div
              initial={false}
              animate={{ y: yPos }}
              transition={{
                duration: 1,
                ease: [0.87, 0, 0.13, 1],
                delay: state === 1 ? i * 0.04 : (state === 2 ? i * 0.05 : 0)
              }}
              className="relative flex justify-center"
            >
              <span className="absolute top-[-100%] whitespace-pre text-[#D4AF37]">{endChar}</span>
              <span className="whitespace-pre text-[#D4AF37]">{startChar}</span>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};

// ==========================================
// 3. COMPONENT: Animated Counter
// ==========================================
const AnimatedCounter = ({ from, to, duration, delay, format, isActive }) => {
  const nodeRef = React.useRef(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    if (isActive) {
      const controls = animate(from, to, {
        duration: duration,
        delay: delay,
        ease: [0.16, 1, 0.3, 1],
        onUpdate(value) {
          node.textContent = format(Math.round(value));
        }
      });
      return () => controls.stop();
    } else {
      node.textContent = format(from);
    }
  }, [from, to, duration, delay, format, isActive]);

  return <span ref={nodeRef}>{format(from)}</span>;
};


export default function App() {
  // ==========================================
  // ULTRA-SMOOTH LENIS SCROLL CONFIG
  // ==========================================
  const lenisRef = React.useRef(null);

  useEffect(() => {
    try {
      lenisRef.current = new Lenis({
        lerp: 0.01,
        smoothWheel: true,
        wheelMultiplier: 0.7,
        touchMultiplier: 1.2,
        easing: (t) => 1 - Math.pow(1 - t, 5),
      });

      function raf(time) {
        lenisRef.current?.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    } catch (e) {
      console.warn("Lenis not found, falling back to native scroll.");
    }

    return () => lenisRef.current?.destroy();
  }, []);

  const scrollToProgress = (progress) => {
    if (lenisRef.current) {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      lenisRef.current.scrollTo(scrollHeight * progress, { duration: 2, ease: (t) => 1 - Math.pow(1 - t, 4) });
    }
  };

  const { scrollYProgress } = useScroll();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [activeText, setActiveText] = useState({
    hero: true,
    alchemy: false,
    design: false,
    blends: false,
    engineering: false,
    heritage: false,
    varieties: false,
    contact: false,
  });

  const [scrambleState, setScrambleState] = useState(0);
  const [activeVariety, setActiveVariety] = useState(-1);
  const [activeChapter, setActiveChapter] = useState(-1);

  // ==========================================
  // MASTER TIMELINE MAPPING (3000vh)
  // ==========================================
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setActiveText({
      hero: latest < 0.06,
      alchemy: latest >= 0.08 && latest < 0.14,
      design: latest >= 0.17 && latest < 0.26,
      blends: latest >= 0.28 && latest < 0.36,
      engineering: latest >= 0.39 && latest < 0.49,
      heritage: latest >= 0.52 && latest < 0.72,
      varieties: latest >= 0.75 && latest < 0.90,
      contact: latest >= 0.90,
    });

    if (latest < 0.42) setScrambleState(0);
    else if (latest >= 0.42 && latest < 0.46) setScrambleState(1);
    else setScrambleState(2);

    if (latest < 0.52) setActiveChapter(-1);
    else if (latest >= 0.52 && latest < 0.57) setActiveChapter(0);
    else if (latest >= 0.57 && latest < 0.62) setActiveChapter(1);
    else if (latest >= 0.62 && latest < 0.67) setActiveChapter(2);
    else if (latest >= 0.67 && latest < 0.72) setActiveChapter(3);
    else setActiveChapter(-1);

    if (latest < 0.80) setActiveVariety(-1);
    else if (latest >= 0.80 && latest < 0.83) setActiveVariety(0);
    else if (latest >= 0.83 && latest < 0.86) setActiveVariety(1);
    else if (latest >= 0.86 && latest < 0.92) setActiveVariety(2);
    else setActiveVariety(-1);
  });

  const transitionText = (delay = 0) => ({ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: delay });

  const heightStr = "h-[3000vh]";

  // ==========================================
  // ANIMATION TRANSFORMS
  // ==========================================

  const heroOpacity = useTransform(scrollYProgress, [0, 0.06, 0.08, 1], [1, 1, 0, 0], { clamp: true });
  const heroY = useTransform(scrollYProgress, [0, 0.08, 1], [0, -150, -150], { clamp: true });
  const heroPointerEvents = useTransform(scrollYProgress, (p) => p > 0.08 ? "none" : "auto");

  const alchemyOpacity = useTransform(scrollYProgress, [0, 0.06, 0.10, 1], [0, 0, 1, 1], { clamp: true });
  const alchemyY = useTransform(scrollYProgress, [0, 0.06, 0.10, 0.14, 0.17, 1], [150, 150, 0, 0, -100, -100], { clamp: true });
  const alchemyPointerEvents = useTransform(scrollYProgress, (p) => (p < 0.08 || p > 0.17) ? "none" : "auto");

  const splitScreenY = useTransform(scrollYProgress, [0.36, 0.39], ["0%", "-100%"], { clamp: true });
  const leftPanelX = useTransform(scrollYProgress, [0.14, 0.18], ["-100%", "0%"], { clamp: true });
  const rightPanelX = useTransform(scrollYProgress, [0.14, 0.18], ["100%", "0%"], { clamp: true });

  const s3Image1Opacity = useTransform(scrollYProgress, [0.28, 0.32], [1, 0], { clamp: true });
  const s3Image2Opacity = useTransform(scrollYProgress, [0.25, 0.26], [0, 1], { clamp: true });
  const s3Image2ClipPath = useTransform(scrollYProgress, [0.26, 0.31], ["inset(35%)", "inset(0%)"], { clamp: true });

  const s5ContainerY = useTransform(scrollYProgress, [0.36, 0.39, 0.49, 0.52], ["100%", "0%", "0%", "-100%"], { clamp: true });

  const heritageContainerY = useTransform(scrollYProgress, [0.49, 0.52, 0.72, 0.75], ["100%", "0%", "0%", "-100%"], { clamp: true });
  const chapterTransition = { type: "tween", duration: 1.2, ease: [0.16, 1, 0.3, 1] };
  const chapterEntryVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 } }),
  };

  const s6ContainerY = useTransform(scrollYProgress, [0.72, 0.75, 0.88, 0.92], ["100%", "0%", "0%", "-100%"], { clamp: true });
  const s6TitleOpacity = useTransform(scrollYProgress, [0.76, 0.77, 0.79], [1, 1, 0], { clamp: true });

  const s7ContainerY = useTransform(scrollYProgress, [0.88, 0.92], ["100%", "0%"], { clamp: true });

  return (
    <div className={`relative w-full ${heightStr} bg-[#111111]`}>
      <div className="fixed inset-0 w-full h-screen overflow-hidden">
        <EtherealBackground color="#63031A" animation={{ scale: 100, speed: 90 }} noise={{ opacity: 1, scale: 1.2 }} sizing="fill" className="w-full h-full flex flex-col">
          <main className="relative z-10 w-full h-full">

            {/* TOP NAVIGATION */}
            <div className="fixed inset-x-0 top-0 z-[210] pointer-events-none p-4 sm:p-6 md:p-10">
              <div className="relative w-full max-w-[1400px] mx-auto flex justify-between items-center pointer-events-none">
                <LetterSwapButton label="Contact Us" onClick={() => scrollToProgress(0.95)} />
                <LetterSwapButton
                  label={isMenuOpen ? "Close" : "Menu"}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                />
              </div>
            </div>

            <MenuOverlay
              isOpen={isMenuOpen}
              setIsOpen={setIsMenuOpen}
              onNavigate={scrollToProgress}
            />

            {/* VERTICAL COUNTERS (6 SECTIONS) - Adjusted for mobile */}
            <div className="fixed bottom-10 left-4 md:bottom-16 md:left-10 z-[100] origin-bottom-left -rotate-90 flex items-center pointer-events-none">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: activeText.design ? 1 : 0 }} transition={transitionText(0)} className="absolute inset-0 flex items-center whitespace-nowrap">
                <span className="font-montserrat text-[#D4AF37] text-[8px] md:text-xs tracking-[0.2em]">01 / 06</span>
                <span className="w-6 md:w-12 h-px bg-[#D4AF37]/40 mx-2 md:mx-4" />
                <span className="font-montserrat text-[#D4AF37] text-[8px] md:text-xs tracking-[0.4em] uppercase">DESIGN</span>
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: activeText.blends ? 1 : 0 }} transition={transitionText(0)} className="absolute inset-0 flex items-center whitespace-nowrap">
                <span className="font-montserrat text-[#D4AF37] text-[8px] md:text-xs tracking-[0.2em]">02 / 06</span>
                <span className="w-6 md:w-12 h-px bg-[#D4AF37]/40 mx-2 md:mx-4" />
                <span className="font-montserrat text-[#D4AF37] text-[8px] md:text-xs tracking-[0.4em] uppercase">BLENDS</span>
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: activeText.engineering ? 1 : 0 }} transition={transitionText(0)} className="absolute inset-0 flex items-center whitespace-nowrap">
                <span className="font-montserrat text-[#D4AF37] text-[8px] md:text-xs tracking-[0.2em]">03 / 06</span>
                <span className="w-6 md:w-12 h-px bg-[#D4AF37]/40 mx-2 md:mx-4" />
                <span className="font-montserrat text-[#D4AF37] text-[8px] md:text-xs tracking-[0.4em] uppercase">ENGINEERING</span>
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: activeText.heritage ? 1 : 0 }} transition={transitionText(0)} className="absolute inset-0 flex items-center whitespace-nowrap">
                <span className="font-montserrat text-[#D4AF37] text-[8px] md:text-xs tracking-[0.2em]">04 / 06</span>
                <span className="w-6 md:w-12 h-px bg-[#D4AF37]/40 mx-2 md:mx-4" />
                <span className="font-montserrat text-[#D4AF37] text-[8px] md:text-xs tracking-[0.4em] uppercase">HERITAGE</span>
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: activeText.varieties ? 1 : 0 }} transition={transitionText(0)} className="absolute inset-0 flex items-center whitespace-nowrap">
                <span className="font-montserrat text-[#D4AF37] text-[8px] md:text-xs tracking-[0.2em]">05 / 06</span>
                <span className="w-6 md:w-12 h-px bg-[#D4AF37]/40 mx-2 md:mx-4" />
                <span className="font-montserrat text-[#D4AF37] text-[8px] md:text-xs tracking-[0.4em] uppercase">VARIETIES</span>
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: activeText.contact ? 1 : 0 }} transition={transitionText(0)} className="absolute inset-0 flex items-center whitespace-nowrap">
                <span className="font-montserrat text-[#D4AF37] text-[8px] md:text-xs tracking-[0.2em]">06 / 06</span>
                <span className="w-6 md:w-12 h-px bg-[#D4AF37]/40 mx-2 md:mx-4" />
                <span className="font-montserrat text-[#D4AF37] text-[8px] md:text-xs tracking-[0.4em] uppercase">CONTACT</span>
              </motion.div>
            </div>

            {/* SCENE 1: ORIGINS HERO */}
            <motion.div style={{ opacity: heroOpacity, y: heroY, pointerEvents: heroPointerEvents }} className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none px-4">
              <motion.div initial={{ opacity: 0, y: -60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }} className="mb-6 md:mb-10">
                <img src="/coffee-bean.png" alt="Golden Coffee Bean" style={{ transform: "scaleX(-1) rotate(-45deg)" }} className="w-16 sm:w-24 md:w-32 lg:w-40 mix-blend-screen drop-shadow-[0_0_20px_rgba(212,175,55,0.2)]" />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.4 }} className="flex flex-col items-center text-center select-none w-full">
                <h1 className="text-[#D4AF37] text-5xl sm:text-6xl md:text-7xl lg:text-[10vw] tracking-[0.25em] sm:tracking-[0.35em] mb-2 md:mb-4 ml-[0.25em] sm:ml-[0.35em] whitespace-nowrap" style={{ fontFamily: 'Stardom', fontWeight: 'normal' }}>Q I D A M</h1>
                <h2 className="text-[#D4AF37] text-2xl sm:text-3xl md:text-4xl lg:text-[2.5vw] tracking-[0.1em] sm:tracking-[0.2em] mb-6 md:mb-8" style={{ fontFamily: "'Amiri', 'Traditional Arabic', 'Aref Ruqaa', serif", fontWeight: 400 }}>قِــــــــــدَم</h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.5, delay: 0.8 }}
                  className="text-[#D4AF37] text-[9px] sm:text-xs md:text-sm tracking-[0.2em] sm:tracking-[0.4em] uppercase max-w-xs md:max-w-md leading-relaxed font-light"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Ancient Heritage • Modern Precision
                </motion.p>
              </motion.div>
              <div className="absolute bottom-[6vh] md:bottom-[8vh] flex flex-col items-center gap-3 md:gap-4 z-20">
                <span className="font-montserrat text-[8px] md:text-[10px] tracking-[0.4em] md:tracking-[0.5em] text-[#D4AF37] uppercase">Scroll Down</span>
                <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="w-px h-10 md:h-16 bg-gradient-to-b from-[#D4AF37] to-transparent block" />
              </div>
            </motion.div>

            {/* SCENE 2: ALCHEMY */}
            <motion.div style={{ opacity: alchemyOpacity, y: alchemyY, pointerEvents: alchemyPointerEvents }} className="alchemy-section absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-6 z-20 pointer-events-none">
              <div className="flex flex-col items-center justify-center">
                <span className="text-[#D4AF37] text-2xl sm:text-3xl md:text-5xl lg:text-6xl mb-[-10px] sm:mb-[-15px] md:mb-[-25px] z-10 lowercase tracking-wide" style={{ fontFamily: 'Britney Light', fontStyle: 'italic' }}>the art of</span>
                <span className="text-[#D4AF37] text-4xl sm:text-6xl md:text-8xl lg:text-[9vw] tracking-[0.1em] sm:tracking-widest uppercase" style={{ fontFamily: 'Stardom' }}>ALCHEMY</span>
              </div>
            </motion.div>

            {/* SCENE 3 & 4: SPLIT SCREEN */}
            <motion.div style={{ y: splitScreenY }} className="absolute inset-0 z-30 flex pointer-events-none">

              {/* Left Panel */}
              <motion.div style={{ x: leftPanelX }} className="relative w-1/2 h-full overflow-hidden bg-[#1A0505]">
                <motion.img
                  style={{ opacity: s3Image1Opacity }}
                  src="/vertical-coffee-bean.png"
                  alt="Realistic Vertical Coffee Bean"
                  className="absolute inset-0 w-full h-full object-contain scale-[0.8] md:scale-[0.75] opacity-60"
                />
                <motion.img
                  style={{ opacity: s3Image2Opacity, clipPath: s3Image2ClipPath }}
                  src="/coffeebeansblackandwhite.jpg"
                  alt="Black and White Beans"
                  className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-luminosity"
                />
                <div className="absolute inset-0 bg-[#000000]/20" />
              </motion.div>

              {/* Right Panel */}
              <motion.div style={{ x: rightPanelX }} className="relative w-1/2 h-full overflow-hidden flex items-center justify-center px-2 sm:px-8 md:px-16 bg-[#1A1A1A] pointer-events-auto">
                <div className={`absolute z-10 flex flex-col items-center text-center w-full px-2 max-w-lg ${activeText.design ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                  <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: activeText.design ? 1 : 0, y: activeText.design ? 0 : 20 }} transition={transitionText(0)} className="font-montserrat text-[#D4AF37] text-[7px] sm:text-[10px] md:text-xs tracking-[0.2em] sm:tracking-[0.5em] uppercase mb-2 md:mb-4">Aesthetic Mastery</motion.span>
                  <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: activeText.design ? 1 : 0, y: activeText.design ? 0 : 20 }} transition={transitionText(0.1)} className="text-[#D4AF37] text-lg sm:text-3xl md:text-4xl lg:text-5xl tracking-[0.05em] sm:tracking-[0.1em] mb-3 md:mb-6 leading-tight md:leading-snug" style={{ fontFamily: 'Stardom', fontWeight: 'normal' }}>THE DESIGN</motion.h2>
                  <motion.div initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: activeText.design ? 1 : 0, opacity: activeText.design ? 1 : 0 }} transition={transitionText(0.2)} className="w-8 md:w-16 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent mb-4 md:mb-8 origin-center" />
                  <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: activeText.design ? 1 : 0, y: activeText.design ? 0 : 20 }} transition={transitionText(0.3)} className="text-[#D4AF37] text-[9px] sm:text-sm md:text-base lg:text-lg leading-[1.6] sm:leading-[1.8] tracking-normal sm:tracking-wide font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Every detail is a testament to meticulous craftsmanship. Our philosophy transcends the ordinary, merging timeless elegance with visual sophistication.
                  </motion.p>
                </div>
                <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: activeText.blends ? 1 : 0, y: activeText.blends ? 0 : 40 }} transition={transitionText(0)} className={`absolute z-20 flex flex-col items-center text-center w-[90%] md:w-full max-w-lg ${activeText.blends ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                  <span className="font-montserrat text-[#D4AF37] text-[7px] sm:text-[10px] md:text-xs tracking-[0.2em] sm:tracking-[0.5em] uppercase mb-2 md:mb-4">Curated Selection</span>
                  <h2 className="text-[#D4AF37] text-xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight md:leading-snug mb-6 md:mb-12 tracking-normal sm:tracking-wide" style={{ fontFamily: 'Stardom', fontWeight: 'normal' }}>3 EXCLUSIVE BLENDS</h2>
                  <ul className="w-full flex flex-col gap-1 sm:gap-2">
                    {[{ num: "01", name: "Origins" }, { num: "02", name: "Roasting" }, { num: "03", name: "Tasting" }].map((item, idx) => (
                      <li key={idx} className="group border-b border-[#D4AF37]/20 py-3 sm:py-6 md:py-8 flex justify-between items-center cursor-pointer transition-colors px-1 sm:px-2 -mx-1 sm:-mx-2 rounded-lg">
                        <div className="flex items-center gap-3 sm:gap-8">
                          <span className="text-[#D4AF37] font-montserrat text-[8px] sm:text-xs tracking-widest group-hover:text-[#D4AF37] transition-colors">{item.num}</span>
                          <span className="text-[#D4AF37] text-sm sm:text-2xl md:text-3xl transition-transform group-hover:italic group-hover:translate-x-2 duration-500" style={{ fontFamily: "'Playfair Display', serif" }}>{item.name}</span>
                        </div>
                        <span className="text-[#D4AF37] text-xs sm:text-base opacity-0 group-hover:opacity-100 -translate-x-2 sm:-translate-x-4 group-hover:translate-x-0 transition-all duration-500">→</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* SCENE 5: PRECISION ENGINEERING */}
            <motion.div
              style={{ y: s5ContainerY }}
              className="absolute inset-0 z-40 flex items-center justify-center overflow-hidden bg-[#0a0a0a]"
            >
              <div className="absolute inset-0 z-0 w-full h-full">
                <img src="/coffeebackground.png" alt="Coffee Engineering Background" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[#0a0a0a]/50" />
              </div>

              <div className={`relative z-10 flex flex-col items-center text-center px-4 md:px-6 w-full max-w-4xl ${activeText.engineering ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                <motion.span
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: activeText.engineering ? 1 : 0, y: activeText.engineering ? 0 : 20 }} transition={transitionText(0)}
                  className="font-montserrat text-[#D4AF37] text-[8px] md:text-[10px] lg:text-xs tracking-[0.3em] md:tracking-[0.5em] uppercase mb-4 md:mb-6"
                >
                  The Blueprint
                </motion.span>

                <div className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl mb-4 md:mb-6 flex flex-col items-center gap-1 sm:gap-2">
                  <DescrambleWord startText="AESTHETIC" endText="PRECISION" state={scrambleState} />
                  <DescrambleWord startText="CALIBRATION" endText="ENGINEERING" state={scrambleState} />
                </div>

                <div className="relative min-h-16 flex items-center justify-center w-full px-2">
                  <motion.p
                    key={scrambleState}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: scrambleState > 0 ? 1 : 0, y: 0 }}
                    transition={transitionText(0.2)}
                    className="text-[#D4AF37] text-[11px] sm:text-sm md:text-base lg:text-xl leading-[1.6] sm:leading-[1.8] tracking-wide font-light max-w-2xl"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {scrambleState === 1
                      ? "The art of transforming raw sensory data into a visual masterpiece."
                      : scrambleState === 2
                        ? "Where science meets the soul of coffee. Every temperature curve and extraction pressure is calibrated to absolute perfection."
                        : ""
                    }
                  </motion.p>
                </div>
              </div>
            </motion.div>

            {/* SCENE 6: HERITAGE — Pinned Snap Horizontal Scroll */}
            <motion.div
              style={{ y: heritageContainerY }}
              className="absolute inset-0 z-[50] overflow-hidden bg-[#050505]"
            >
              <motion.div
                animate={{ x: activeChapter >= 0 ? `-${activeChapter * 100}vw` : "0vw" }}
                transition={chapterTransition}
                className="flex w-[400vw] h-full"
              >
                {/* CHAPTER I: THE GENESIS */}
                <div className="relative w-[100vw] h-full flex items-center justify-center overflow-hidden px-4">
                  <span
                    className="absolute text-[25vw] sm:text-[20vw] md:text-[18vw] lg:text-[16vw] text-[#D4AF37]/[0.04] select-none pointer-events-none leading-none whitespace-nowrap"
                    style={{ fontFamily: "'Amiri', 'Traditional Arabic', 'Aref Ruqaa', serif", fontWeight: 400 }}
                  >
                    قِــــــــــدَم
                  </span>
                  <div className="relative z-10 flex flex-col items-center text-center max-w-2xl">
                    <motion.span variants={chapterEntryVariants} initial="hidden" animate={activeChapter === 0 ? "visible" : "hidden"} custom={0} className="font-montserrat text-[#D4AF37]/60 text-[8px] sm:text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.5em] uppercase mb-4 md:mb-6">Chapter I</motion.span>
                    <motion.h2 variants={chapterEntryVariants} initial="hidden" animate={activeChapter === 0 ? "visible" : "hidden"} custom={1} className="text-[#D4AF37] text-3xl sm:text-4xl md:text-6xl lg:text-7xl tracking-[0.1em] sm:tracking-[0.15em] mb-4 md:mb-8" style={{ fontFamily: 'Stardom', fontWeight: 'normal' }}>THE GENESIS</motion.h2>
                    <motion.div variants={chapterEntryVariants} initial="hidden" animate={activeChapter === 0 ? "visible" : "hidden"} custom={2} className="w-12 md:w-16 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent mb-4 md:mb-8" />
                    <motion.p variants={chapterEntryVariants} initial="hidden" animate={activeChapter === 0 ? "visible" : "hidden"} custom={3} className="text-[#D4AF37]/70 text-[11px] sm:text-sm md:text-base lg:text-lg leading-[1.8] md:leading-[2] tracking-wide font-light max-w-[90%] md:max-w-xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                      Before the first roast, before the first pour — there was a pursuit. A relentless search across volcanic highlands and misty plateaus for beans that carry the memory of the earth. This is where Qidam begins: at the origin of all flavor.
                    </motion.p>
                  </div>
                </div>

                {/* CHAPTER II: THE ARTISAN'S LEDGER */}
                <div className="relative w-[100vw] h-full flex items-center justify-center overflow-hidden py-16 md:py-0">
                  <div className="relative z-10 flex flex-col md:flex-row items-center w-full max-w-6xl px-6 md:px-16 gap-6 md:gap-16">
                    <motion.div variants={chapterEntryVariants} initial="hidden" animate={activeChapter === 1 ? "visible" : "hidden"} custom={0} className="w-full md:w-1/2 flex items-center justify-center">
                      <div className="relative w-[70%] sm:w-[60%] md:w-full max-w-md aspect-video md:aspect-[4/3] bg-[#111111] rounded-lg overflow-hidden border border-[#D4AF37]/10">
                        <img src="/pexels-olha-ruskykh-6280315.jpg" alt="Roasting Process" className="w-full h-full object-cover opacity-80" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
                        <span className="absolute bottom-3 md:bottom-4 left-3 md:left-4 font-montserrat text-[#D4AF37]/50 text-[8px] md:text-[10px] tracking-[0.2em] md:tracking-[0.4em] uppercase">The Roasting Chamber</span>
                      </div>
                    </motion.div>
                    <div className="w-full md:w-1/2 flex flex-col text-center md:text-left">
                      <motion.span variants={chapterEntryVariants} initial="hidden" animate={activeChapter === 1 ? "visible" : "hidden"} custom={0} className="font-montserrat text-[#D4AF37]/60 text-[8px] md:text-[10px] tracking-[0.3em] md:tracking-[0.5em] uppercase mb-2 md:mb-4">Chapter II</motion.span>
                      <motion.h2 variants={chapterEntryVariants} initial="hidden" animate={activeChapter === 1 ? "visible" : "hidden"} custom={1} className="text-[#D4AF37] text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[0.05em] md:tracking-[0.1em] mb-3 md:mb-6" style={{ fontFamily: 'Stardom', fontWeight: 'normal' }}>THE ARTISAN'S LEDGER</motion.h2>
                      <motion.p variants={chapterEntryVariants} initial="hidden" animate={activeChapter === 1 ? "visible" : "hidden"} custom={2} className="text-[#D4AF37]/60 text-[10px] sm:text-sm md:text-base leading-[1.6] md:leading-[1.8] tracking-wide font-light mb-4 md:mb-10 mx-auto md:mx-0 max-w-[90%] md:max-w-none" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Every roast is a ledger entry — a record of temperature curves, timing, and intuition passed down through generations. The secret is not in the science alone, but in the silence between the cracks.
                      </motion.p>
                      <div className="flex flex-col gap-0 w-full max-w-sm mx-auto md:mx-0">
                        {[
                          { num: "01", label: "CALIBRATION", to: 12 },
                          { num: "02", label: "MAILLARD", to: 45 },
                          { num: "03", label: "DEVELOPMENT", to: 22 },
                        ].map((stat, idx) => (
                          <motion.div key={idx} variants={chapterEntryVariants} initial="hidden" animate={activeChapter === 1 ? "visible" : "hidden"} custom={3 + idx} className="flex items-center justify-between border-b border-[#D4AF37]/10 py-3 md:py-5 px-2 md:px-0">
                            <div className="flex items-center gap-3 md:gap-6">
                              <span className="font-montserrat text-[#D4AF37]/40 text-[9px] md:text-xs tracking-widest">{stat.num}.</span>
                              <span className="font-montserrat text-[#D4AF37] text-[9px] sm:text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] uppercase">{stat.label}</span>
                            </div>
                            <span className="font-montserrat text-[#D4AF37] text-sm sm:text-lg md:text-xl tracking-wider">
                              <AnimatedCounter
                                from={0}
                                to={stat.to}
                                duration={2}
                                delay={(3 + idx) * 0.12}
                                format={(v) => `${v}%`}
                                isActive={activeChapter === 1}
                              />
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* CHAPTER III: SACRED TERROIR */}
                <div className="relative w-[100vw] h-full flex items-center justify-center overflow-hidden px-4">
                  <img src="/coffeefarm.png" alt="Sacred Terroir" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-[#050505]/75" />
                  <div className="relative z-10 flex flex-col items-center text-center max-w-2xl">
                    <motion.span variants={chapterEntryVariants} initial="hidden" animate={activeChapter === 2 ? "visible" : "hidden"} custom={0} className="font-montserrat text-[#D4AF37]/60 text-[8px] sm:text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.5em] uppercase mb-4 md:mb-6">Chapter III</motion.span>
                    <motion.h2 variants={chapterEntryVariants} initial="hidden" animate={activeChapter === 2 ? "visible" : "hidden"} custom={1} className="text-[#D4AF37] text-3xl sm:text-4xl md:text-6xl lg:text-7xl tracking-[0.1em] sm:tracking-[0.15em] mb-4 md:mb-8" style={{ fontFamily: 'Stardom', fontWeight: 'normal' }}>SACRED TERROIR</motion.h2>
                    <motion.div variants={chapterEntryVariants} initial="hidden" animate={activeChapter === 2 ? "visible" : "hidden"} custom={2} className="w-12 md:w-16 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent mb-4 md:mb-8" />
                    <motion.p variants={chapterEntryVariants} initial="hidden" animate={activeChapter === 2 ? "visible" : "hidden"} custom={3} className="text-[#D4AF37]/70 text-[11px] sm:text-sm md:text-base lg:text-lg leading-[1.8] md:leading-[2] tracking-wide font-light max-w-[90%] md:max-w-xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                      At altitudes where the air grows thin and the clouds settle like veils, the rarest micro-lots flourish. Volcanic soil, equatorial sun, and the patience of generations converge to produce beans of extraordinary depth and character.
                    </motion.p>
                  </div>
                </div>

                {/* CHAPTER IV: THE VAULT */}
                <div className="relative w-[100vw] h-full flex items-center justify-center overflow-hidden bg-[#050505] px-4">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_60%)] pointer-events-none" />
                  <div className="relative z-10 flex flex-col items-center text-center w-full max-w-6xl">
                    <motion.span variants={chapterEntryVariants} initial="hidden" animate={activeChapter === 3 ? "visible" : "hidden"} custom={0} className="font-montserrat text-[#D4AF37]/60 text-[8px] sm:text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.5em] uppercase mb-2 md:mb-6">Chapter IV</motion.span>
                    <motion.h2 variants={chapterEntryVariants} initial="hidden" animate={activeChapter === 3 ? "visible" : "hidden"} custom={1} className="text-[#D4AF37] text-3xl sm:text-4xl md:text-6xl lg:text-7xl tracking-[0.1em] sm:tracking-[0.15em] mb-6 md:mb-16" style={{ fontFamily: 'Stardom', fontWeight: 'normal' }}>THE VAULT</motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-8 w-full max-w-md md:max-w-4xl mx-auto">
                      {[
                        { from: 0, to: 1, format: (v) => `No. ${v}`, value: "Certified Grade", sub: "Single Origin Excellence" },
                        { from: 100, to: 1, format: (v) => `< ${v}%`, value: "Global Yield", sub: "Extreme Scarcity" },
                        { from: 0, to: 1730, format: (v) => v, value: "Heritage Origins", sub: "Years of Cultivation" },
                      ].map((card, idx) => (
                        <motion.div key={idx} variants={chapterEntryVariants} initial="hidden" animate={activeChapter === 3 ? "visible" : "hidden"} custom={2 + idx} className="group relative flex flex-col items-center text-center p-4 sm:p-6 md:p-10 border border-[#D4AF37]/15 rounded-xl bg-[#D4AF37]/[0.03] backdrop-blur-sm hover:border-[#D4AF37]/30 hover:bg-[#D4AF37]/[0.06] transition-all duration-700">
                          <span className="font-montserrat text-[#D4AF37] text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-wider mb-2 md:mb-4" style={{ fontFamily: 'Stardom' }}>
                            <AnimatedCounter
                              from={card.from}
                              to={card.to}
                              duration={2.5}
                              delay={(2 + idx) * 0.12}
                              format={card.format}
                              isActive={activeChapter === 3}
                            />
                          </span>
                          <span className="font-montserrat text-[#D4AF37]/80 text-[10px] md:text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] uppercase mb-1 md:mb-2">{card.value}</span>
                          <span className="font-montserrat text-[#D4AF37]/40 text-[7px] md:text-[10px] tracking-[0.1em] md:tracking-[0.2em] uppercase">{card.sub}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 w-[70%] md:w-[60%] max-w-md z-20">
                <div className="relative w-full h-px bg-[#D4AF37]/15 rounded-full overflow-hidden">
                  <motion.div
                    animate={{ scaleX: activeChapter >= 0 ? (activeChapter + 1) / 4 : 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 h-full bg-[#D4AF37]/60 origin-left rounded-full"
                  />
                </div>
                <div className="flex justify-between mt-2 md:mt-3">
                  {["I", "II", "III", "IV"].map((label, idx) => (
                    <motion.span
                      key={label}
                      animate={{ opacity: activeChapter === idx ? 1 : 0.3 }}
                      transition={{ duration: 0.5 }}
                      className="font-montserrat text-[#D4AF37] text-[7px] md:text-[9px] tracking-[0.3em] uppercase"
                    >
                      {label}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* SCENE 7: COFFEE VARIETIES */}
            <motion.div
              style={{ y: s6ContainerY }}
              className="absolute inset-0 z-[60] flex items-center justify-center overflow-hidden bg-[#1f0208] px-4"
            >
              <div className="absolute inset-0 w-full h-full pointer-events-none">
                <img src="/coffee-bean.png" className="absolute top-[5%] left-[5%] w-10 sm:w-16 md:w-24 opacity-70 rotate-45 mix-blend-screen" alt="Golden Bean" />
                <img src="/vertical-coffee-bean.png" className="absolute top-[12%] left-[15%] w-8 sm:w-12 md:w-16 opacity-40 -rotate-12 drop-shadow-xl" alt="Roasted Bean" />
                <img src="/coffee-bean.png" className="absolute top-[30%] left-[8%] w-6 sm:w-10 md:w-14 opacity-80 rotate-[135deg] mix-blend-screen" alt="Golden Bean" />
                <img src="/vertical-coffee-bean.png" className="absolute top-[2%] left-[30%] w-10 sm:w-14 md:w-18 opacity-30 rotate-[65deg] drop-shadow-xl" alt="Roasted Bean" />

                <img src="/vertical-coffee-bean.png" className="absolute top-[8%] right-[8%] w-12 sm:w-20 md:w-28 opacity-60 rotate-[120deg] drop-shadow-xl" alt="Roasted Bean" />
                <img src="/coffee-bean.png" className="absolute top-[18%] right-[12%] w-10 sm:w-14 md:w-20 opacity-80 rotate-[60deg] mix-blend-screen" alt="Golden Bean" />
                <img src="/coffee-bean.png" className="absolute top-[35%] right-[6%] w-8 sm:w-12 md:w-16 opacity-70 rotate-[-45deg] mix-blend-screen" alt="Golden Bean" />
                <img src="/vertical-coffee-bean.png" className="absolute top-[5%] right-[35%] w-8 sm:w-12 md:w-16 opacity-40 rotate-[20deg] drop-shadow-xl" alt="Roasted Bean" />

                <img src="/vertical-coffee-bean.png" className="absolute bottom-[10%] left-[8%] w-16 sm:w-24 md:w-32 opacity-50 rotate-[-45deg] drop-shadow-xl" alt="Roasted Bean" />
                <img src="/coffee-bean.png" className="absolute bottom-[20%] left-[12%] w-10 sm:w-16 md:w-20 opacity-90 rotate-12 mix-blend-screen" alt="Golden Bean" />
                <img src="/vertical-coffee-bean.png" className="absolute bottom-[35%] left-[4%] w-8 sm:w-14 md:w-20 opacity-30 rotate-[20deg] drop-shadow-xl" alt="Roasted Bean" />
                <img src="/coffee-bean.png" className="absolute bottom-[5%] left-[30%] w-8 sm:w-12 md:w-16 opacity-60 rotate-[-15deg] mix-blend-screen" alt="Golden Bean" />

                <img src="/coffee-bean.png" className="absolute bottom-[8%] right-[5%] w-12 sm:w-20 md:w-28 opacity-75 rotate-[-110deg] mix-blend-screen" alt="Golden Bean" />
                <img src="/vertical-coffee-bean.png" className="absolute bottom-[15%] right-[15%] w-10 sm:w-16 md:w-20 opacity-40 rotate-[30deg] drop-shadow-xl" alt="Roasted Bean" />
                <img src="/vertical-coffee-bean.png" className="absolute bottom-[40%] right-[4%] w-8 sm:w-12 md:w-16 opacity-50 rotate-[10deg] drop-shadow-xl" alt="Roasted Bean" />
                <img src="/coffee-bean.png" className="absolute bottom-[5%] right-[35%] w-10 sm:w-14 md:w-20 opacity-80 rotate-[85deg] mix-blend-screen" alt="Golden Bean" />

                <img src="/coffee-bean.png" className="absolute top-[45%] left-[3%] w-8 sm:w-12 md:w-16 opacity-60 rotate-90 mix-blend-screen" alt="Golden Bean" />
                <img src="/vertical-coffee-bean.png" className="absolute top-[55%] right-[2%] w-10 sm:w-16 md:w-24 opacity-30 rotate-[-75deg] drop-shadow-xl" alt="Roasted Bean" />
                <img src="/coffee-bean.png" className="absolute top-[60%] left-[12%] w-6 sm:w-10 md:w-14 opacity-90 rotate-[75deg] mix-blend-screen" alt="Golden Bean" />

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_60%)] pointer-events-none" />
              </div>

              <div className="relative w-full sm:w-[90%] md:w-[80%] lg:w-[60%] aspect-[3/4] md:aspect-square max-h-[85vh] bg-[#8B0425]/20 backdrop-blur-xl border border-[#D4AF37]/10 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.6)] flex items-center justify-center">

                {/* العنوان التمهيدي للقسم مستبدل بتأثير الظهور الناعم المطابق لبقية الموقع */}
                <motion.div style={{ opacity: s6TitleOpacity }} className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none z-20 px-4">
                  <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: activeText.varieties ? 1 : 0, y: activeText.varieties ? 0 : 20 }} transition={transitionText(0)} className="font-montserrat text-[#D4AF37] text-[8px] sm:text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.5em] uppercase mb-2 md:mb-4">Rare Origins</motion.span>
                  <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: activeText.varieties ? 1 : 0, y: activeText.varieties ? 0 : 20 }} transition={transitionText(0.1)} className="text-[#D4AF37] text-2xl sm:text-4xl md:text-5xl lg:text-7xl tracking-[0.05em] md:tracking-[0.1em] mb-4 md:mb-6 leading-snug" style={{ fontFamily: 'Stardom', fontWeight: 'normal' }}>EXOTIC VARIETIES</motion.h2>
                  <motion.div initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: activeText.varieties ? 1 : 0, opacity: activeText.varieties ? 1 : 0 }} transition={transitionText(0.2)} className="w-12 md:w-16 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent origin-center" />
                </motion.div>

                <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-4 sm:p-8 pointer-events-none">
                  <AnimatePresence>
                    {activeVariety >= 0 && (
                      <motion.div
                        key={activeVariety}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full flex flex-col items-center justify-center"
                      >
                        <div className="relative flex-1 flex justify-center items-center min-h-0 w-full mb-2 sm:mb-4 md:mt-4">
                          <div className="absolute inset-0 bg-[#D4AF37]/10 blur-3xl rounded-full" />
                          <img src={VARIETIES[activeVariety].img} alt={VARIETIES[activeVariety].name} className="relative w-auto h-full max-h-[35vh] md:max-h-[45vh] lg:max-h-[50vh] object-contain drop-shadow-[0_30px_30px_rgba(0,0,0,0.9)] z-10 pointer-events-none" />

                          <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: "auto", opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="absolute top-[20%] md:top-[30%] right-[65%] md:right-[75%] lg:right-[65%] w-12 sm:w-20 md:w-[100px] h-px bg-[#D4AF37] flex items-center justify-end z-20 pointer-events-none"
                          >
                            <span className="absolute -top-4 sm:-top-6 text-[8px] md:text-xs text-[#D4AF37] font-montserrat tracking-widest whitespace-nowrap">Alt: {VARIETIES[activeVariety].altitude}</span>
                            <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-[#D4AF37] absolute -left-0.5" />
                          </motion.div>

                          <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: "auto", opacity: 1 }}
                            transition={{ delay: 0.7, duration: 0.8 }}
                            className="absolute bottom-[20%] md:bottom-[30%] left-[65%] md:left-[75%] lg:left-[65%] w-12 sm:w-24 md:w-[120px] h-px bg-[#D4AF37] flex items-center justify-start z-20 pointer-events-none"
                          >
                            <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-[#D4AF37] absolute -right-0.5" />
                            <span className="absolute -top-4 sm:-top-6 text-[8px] md:text-xs text-[#D4AF37] font-montserrat tracking-widest whitespace-nowrap hidden sm:block">Notes: {VARIETIES[activeVariety].notes}</span>
                            <span className="absolute -top-6 -left-6 text-[7px] text-[#D4AF37] font-montserrat tracking-widest whitespace-nowrap sm:hidden flex flex-col items-start leading-tight"><span>Notes:</span><span>{VARIETIES[activeVariety].notes}</span></span>
                          </motion.div>
                        </div>

                        <div className="relative flex flex-col items-center w-full z-40 pb-2 sm:pb-4">
                          <div className="flex flex-wrap justify-center overflow-hidden pb-1 max-w-[95%] sm:max-w-[90%]" style={{ fontFamily: 'Stardom' }}>
                            {VARIETIES[activeVariety].name.split('').map((char, i) => (
                              <motion.span
                                key={i}
                                initial={{ y: "100%", opacity: 0 }}
                                animate={{ y: "0%", opacity: 1 }}
                                transition={{ delay: 0.4 + i * 0.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="text-[#D4AF37] text-lg sm:text-2xl md:text-4xl lg:text-5xl uppercase tracking-[0.05em] sm:tracking-[0.1em] md:tracking-[0.15em] whitespace-pre drop-shadow-md"
                              >
                                {char}
                              </motion.span>
                            ))}
                          </div>

                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.0, duration: 0.8 }}
                            className="flex flex-wrap justify-center items-center gap-x-2 sm:gap-x-4 md:gap-x-6 gap-y-1 sm:gap-y-2 mt-1 sm:mt-2 md:mt-4 text-[#D4AF37]/80 font-montserrat text-[7px] sm:text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] uppercase w-full text-center"
                          >
                            <span>PROCESS: {VARIETIES[activeVariety].process}</span>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* SCENE 8: CONTACT US (THE GRAND FINALE) */}
            <motion.div
              style={{ y: s7ContainerY }}
              className="absolute inset-0 z-[70] flex flex-col overflow-hidden bg-[#111111]"
            >
              <div className="absolute inset-0 z-0">
                <EtherealBackground color="#63031A" animation={{ scale: 100, speed: 90 }} noise={{ opacity: 1, scale: 1.2 }} sizing="fill" className="w-full h-full opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050505]/90" />
              </div>

              <div className="relative z-10 w-full h-full max-w-[1400px] mx-auto flex flex-col justify-center px-6 md:px-20">
                <div className="flex flex-col md:flex-row items-center md:items-start justify-between w-full gap-8 md:gap-12 lg:gap-16">
                  <div className="flex flex-col items-center md:items-start justify-center w-full md:w-[45%] mt-12 md:mt-0 lg:-mt-10">
                    <h2 className="flex flex-col items-center md:items-start w-full leading-[0.85] tracking-tight uppercase select-none" style={{ fontFamily: 'Stardom', fontWeight: 'normal' }}>
                      <span className="text-[22vw] md:text-[11vw] lg:text-[10vw] text-transparent" style={{ WebkitTextStroke: '1px #D4AF37', letterSpacing: '0.05em' }}>CONTACT</span>
                      <span className="text-[25vw] md:text-[13vw] lg:text-[12vw] text-[#D4AF37] drop-shadow-[0_0_30px_rgba(212,175,55,0.2)] ml-0 md:ml-4">US</span>
                    </h2>
                  </div>

                  <div className="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-[55%] mt-4 sm:mt-8 md:mt-24 lg:mt-32 px-4 md:px-0">
                    <p className="text-[#D4AF37] text-xs sm:text-sm md:text-xl lg:text-2xl leading-[1.8] font-light mb-6 md:mb-8 max-w-2xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                      Qidam is dedicated to crafting a premium coffee experience. Connect with us to explore rare micro-lots, bespoke consulting, and curated selections.
                    </p>

                    <LetterSwapButton label="Get in touch" onClick={() => window.location.href = "mailto:contact@qidam.com"} />
                  </div>
                </div>
              </div>
            </motion.div>
          </main>
        </EtherealBackground>
      </div>
    </div>
  );
}