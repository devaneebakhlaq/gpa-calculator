"use client";

import Image from "next/image";
import logoImg from "../National_Textile_University_Logo.png";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import {
  AnimatedCounter,
  BackToTop,
  FloatingParticles,
  MagneticButton,
  ScrollProgress,
  TiltCard,
} from "./components/interactive";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};


const features = [
  {
    title: "Precision Planning",
    description:
      "Estimate GPA outcomes quickly with smooth, student-first inputs designed around NTU academic flow.",
    icon: "chart",
  },
  {
    title: "Goal Tracker",
    description:
      "Track target GPA progress with visual indicators, so every semester decision feels intentional.",
    icon: "target",
  },
  {
    title: "Fast What-If Engine",
    description:
      "Try multiple credit and grade combinations in seconds to discover your best strategy.",
    icon: "bolt",
  },
];

const stats = [
  { label: "Planning Accuracy", value: 96, suffix: "%" },
  { label: "Scenario Speed", value: 1, prefix: "< ", suffix: "s" },
  { label: "Student Focus", value: 100, suffix: "%" },
];

const momentum = [
  {
    title: "Clear GPA direction",
    text: "See how every course affects your final standing before you register.",
  },
  {
    title: "Better semester balance",
    text: "Compare loads visually so difficult terms and easy terms stay balanced.",
  },
  {
    title: "Confidence at a glance",
    text: "Use the full dashboard to make academic decisions with less guesswork.",
  },
];

function CodeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-8 w-8 text-[var(--accent-1)]">
      <path d="M9 18L3 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 6L21 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 4L10 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function HatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-8 w-8 text-[var(--accent-2)]">
      <path d="M12 4L2 9L12 14L22 9L12 4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M6 11V15C6 17 8.7 19 12 19C15.3 19 18 17 18 15V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 9V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function FeatureIcon({ type }: { type: string }) {
  if (type === "target") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-[var(--accent-2)]" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
      </svg>
    );
  }
  if (type === "bolt") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-[var(--accent-1)]" aria-hidden="true">
        <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-[var(--accent-1)]" aria-hidden="true">
      <path d="M4 19V5M4 19h16M8 15v-4M12 15V9M16 15V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function Home() {
  const [theme, setTheme] = useState<string>("dark");

  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 400], [0, -60]);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (v) => setScrolled(v > 40));
    return () => unsubscribe();
  }, [scrollY]);

  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem("ntu_theme");
      if (storedTheme === "light" || storedTheme === "dark") {
        setTheme(storedTheme);
      }
    } catch {
      // ignore client storage errors
    }
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("light", theme === "light");
    localStorage.setItem("ntu_theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--bg-base)] text-[var(--text-main)] transition-colors duration-500">
      <ScrollProgress />
      <FloatingParticles />

      <div className="pointer-events-none absolute inset-0 opacity-10">
        <motion.div
          className="absolute left-10 top-36 rotate-[-12deg]"
          animate={{ y: [0, -12, 0], opacity: [0.08, 0.14, 0.08], rotate: [-12, -8, -12] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        >
          <Image src={logoImg} alt="" width={260} height={260} />
        </motion.div>
        <motion.div
          className="absolute right-8 top-[28rem] rotate-[14deg]"
          animate={{ y: [0, 14, 0], opacity: [0.06, 0.12, 0.06], rotate: [14, 18, 14] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        >
          <Image src={logoImg} alt="" width={220} height={220} />
        </motion.div>
      </div>

      <div className="hero-grid pointer-events-none absolute inset-0 opacity-45" />

      <motion.div
        className="pointer-events-none absolute -left-20 top-20 h-80 w-80 rounded-full bg-[var(--accent-1)]/30 blur-[125px]"
        animate={{ x: [0, 30, 0], y: [0, -16, 0], scale: [1, 1.08, 1] }}
        transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -right-16 top-48 h-[22rem] w-[22rem] rounded-full bg-[var(--accent-2)]/28 blur-[130px]"
        animate={{ x: [0, -32, 0], y: [0, 18, 0], scale: [1, 1.06, 1] }}
        transition={{ repeat: Infinity, duration: 11, ease: "easeInOut" }}
      />

      <SiteHeader theme={theme} toggleTheme={toggleTheme} scrolled={scrolled} />

      <main>
        <section className="mx-auto grid w-full max-w-7xl gap-12 px-5 pb-14 pt-16 md:grid-cols-[1.1fr_0.9fr] md:px-10 md:pb-20 md:pt-24">
          <motion.div style={{ y: heroParallax }} variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.6 }}>
            <motion.div
              className="section-badge mb-6"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.45 }}
              whileHover={{ scale: 1.03 }}
            >
              <Image src={logoImg} alt="NTU logo" width={22} height={22} />
              <span>NTU GPA PLATFORM</span>
            </motion.div>

            <motion.h1
              className="font-display text-4xl leading-[1.02] md:text-6xl"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              GPA Calculator for
              <motion.span
                className="gradient-text-animated mt-1 block bg-clip-text text-transparent bg-gradient-to-r from-[var(--accent-1)] via-[var(--accent-2)] to-[var(--accent-1)]"
                initial={{ filter: "brightness(0.95)" }}
                animate={{ filter: ["brightness(0.95)", "brightness(1.2)", "brightness(0.95)"] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                NTU Students
              </motion.span>
            </motion.h1>

            <motion.p
              className="mt-6 max-w-xl text-base leading-relaxed text-[var(--text-soft)] md:text-lg"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.55 }}
            >
              A fully  professional GPA experience for NTU students to plan smarter,
              forecast outcomes, and stay in control of academic goals.
            </motion.p>

            <motion.div className="mt-9 flex flex-wrap items-center gap-4" initial="hidden" animate="show" variants={staggerContainer}>
              <motion.div variants={fadeUp}>
                <MagneticButton href="/calculator" className="btn-primary px-6 py-3">
                  Start GPA Planning
                </MagneticButton>
              </motion.div>
              <motion.div variants={fadeUp}>
                <motion.a
                  href="#features"
                  className="btn-secondary px-6 py-3"
                  whileHover={{ y: -4, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Explore Features
                </motion.a>
              </motion.div>
            </motion.div>

            <motion.div
              className="mt-10 flex flex-wrap gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {["Real-time GPA", "NTU Grading", "What-if Scenarios"].map((tag, i) => (
                <motion.span
                  key={tag}
                  className="flex items-center gap-2 text-xs font-semibold tracking-wide text-[var(--text-soft)]"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  whileHover={{ x: 4, color: "var(--accent-1)" }}
                >
                  <span className="pulse-dot" />
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, type: "spring", stiffness: 80 }}
          >
            <TiltCard className="glass-card relative overflow-hidden rounded-3xl p-6 md:p-8">
              <motion.div
                className="pointer-events-none absolute -right-10 -top-10 opacity-10"
                animate={{ rotate: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
              >
                <Image src={logoImg} alt="" width={150} height={150} />
              </motion.div>

              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold tracking-[0.16em] text-[var(--text-soft)]">LIVE GPA SNAPSHOT</p>
                <motion.span
                  className="flex items-center gap-1.5 rounded-full bg-[var(--accent-1)]/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--accent-1)]"
                  animate={{ opacity: [1, 0.6, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-1)]" />
                  Live
                </motion.span>
              </div>

              <h2 className="mt-3 font-display text-3xl">Current Standing</h2>

              <div className="mt-7 space-y-4">
                <motion.div
                  className="rounded-2xl bg-[var(--surface)]/85 p-4"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div className="mb-2 flex justify-between text-sm text-[var(--text-soft)]">
                    <span>Cumulative GPA</span>
                    <motion.span
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8, type: "spring" }}
                    >
                      3.74 / 4.00
                    </motion.span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-[var(--track)]">
                    <motion.div
                      className="gpa-bar-glow h-full rounded-full bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)]"
                      initial={{ width: 0 }}
                      animate={{ width: "93.5%" }}
                      transition={{ delay: 0.55, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </motion.div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  {[
                    { label: "Target GPA", value: "3.90" },
                    { label: "Credits Left", value: "31" },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      className="rounded-2xl bg-[var(--surface)]/85 p-4"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + i * 0.12 }}
                      whileHover={{ y: -8, scale: 1.04, boxShadow: "0 16px 32px rgba(0,0,0,0.2)" }}
                    >
                      <p className="text-[var(--text-soft)]">{item.label}</p>
                      <p className="mt-1 text-xl font-bold">{item.value}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-5 py-8 md:px-10 md:py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55 }}
            className="glass-card rounded-3xl p-8 md:p-10"
          >
            <span className="section-badge mb-4">
              <span className="pulse-dot" />
              SEO CONTENT
            </span>
            <h2 className="font-display text-3xl md:text-4xl">
              Calculate NTU Semester GPA with a Fast and Reliable Online Tool
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--text-soft)]">
              Our NTU GPA calculator helps students at the National Textile University calculate semester GPA, grade points, and academic standing with the official absolute grading system. Enter credit hours, marks, and subjects to get results instantly.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "Fast Semester GPA Results",
                  text: "Get instant GPA estimates for any subject combination using the NTU grading scale.",
                },
                {
                  title: "Credit Hour Planning",
                  text: "Compare course loads and calculate total credit hours for smarter semester planning.",
                },
                {
                  title: "Grade Point Tracking",
                  text: "Track your grade points and standing with a clear, student-friendly GPA calculator experience.",
                },
              ].map((item) => (
                <article key={item.title} className="rounded-2xl border border-[var(--line)] bg-[var(--surface)]/60 p-5">
                  <h3 className="font-semibold text-[var(--text-main)]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-soft)]">{item.text}</p>
                </article>
              ))}
            </div>
          </motion.div>
        </section>

        <section id="features" className="mx-auto w-full max-w-7xl px-5 py-14 md:px-10 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55 }}
          >
            <span className="section-badge mb-4">
              <span className="pulse-dot" />
              FEATURES
            </span>
            <h3 className="font-display text-3xl md:text-4xl">Core GPA Features</h3>
          </motion.div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {features.map((feature, index) => (
              <motion.article
                key={feature.title}
                className="feature-card glass-card rounded-2xl p-6"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.12, duration: 0.55, type: "spring", stiffness: 90 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className="feature-icon-wrap">
                  <FeatureIcon type={feature.icon} />
                </div>
                <h4 className="mt-4 font-display text-2xl">{feature.title}</h4>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-soft)]">{feature.description}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="insights" className="mx-auto w-full max-w-7xl px-5 pb-16 md:px-10 md:pb-24">
          <motion.div
            className="mb-8 text-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="section-badge">
              <span className="pulse-dot" />
              INSIGHTS
            </span>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-3">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="stat-card rounded-2xl border border-[var(--line)] bg-[var(--surface)]/75 p-6 text-center"
                initial={{ opacity: 0, y: 32, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.12, duration: 0.55, type: "spring" }}
              >
                <p className="font-display text-4xl text-[var(--accent-2)]">
                  <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-sm text-[var(--text-soft)]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="momentum" className="mx-auto w-full max-w-7xl px-5 py-12 md:px-10 md:py-16">
          <motion.h3
            className="font-display text-3xl md:text-4xl"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            More Than a Snapshot
          </motion.h3>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {momentum.map((item, index) => (
              <motion.article
                key={item.title}
                className="glass-card rounded-2xl p-6"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.12, duration: 0.55 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <motion.div
                  className="mb-4 inline-flex rounded-full border border-[var(--line)] bg-[var(--surface)] px-3 py-2"
                  whileHover={{ rotate: [0, -6, 6, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  {index === 1 ? <HatIcon /> : <CodeIcon />}
                </motion.div>
                <h4 className="font-display text-2xl">{item.title}</h4>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-soft)]">{item.text}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="team-cards" className="relative mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="text-center"
          >
            <motion.span
              className="section-badge mb-3"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="pulse-dot" />
              MEET THE TEAM
            </motion.span>
            <motion.h3
              className="mt-4 font-display text-3xl md:text-5xl"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.55 }}
            >
              Built by{" "}
              <span className="gradient-text-animated bg-clip-text text-transparent bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)]">
                NTU Students
              </span>
            </motion.h3>
            <motion.p
              className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[var(--text-soft)] md:text-base"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.18, duration: 0.5 }}
            >
              The people behind this platform — passionate about making academic planning effortless.
            </motion.p>
          </motion.div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {[
              {
                name: "Malik Aneeb",
                role: "MERN Stack Developer",
                desc: "Built and developed the entire GPA Calculator platform from scratch — design, code, and animations.",
                batch: "GMD · Batch 2025-2029",
                accent: "accent-1" as const,
                icon: <CodeIcon />,
                dir: -40,
              },
              {
                name: "Nawab Hasnain Raza",
                role: "Calculations & Research",
                desc: "Performed all GPA calculations, credit-hour research, and grading logic to ensure accurate results.",
                batch: "GMD · Batch 2025-2029",
                accent: "accent-2" as const,
                icon: <HatIcon />,
                dir: 40,
              },
            ].map((member, idx) => (
              <motion.article
                key={member.name}
                className="team-profile-card group relative overflow-hidden rounded-3xl"
                initial={{ opacity: 0, x: member.dir }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -12, scale: 1.02 }}
              >
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
                    member.accent === "accent-1"
                      ? "from-[var(--accent-1)]/20 via-transparent to-[var(--accent-1)]/5"
                      : "from-[var(--accent-2)]/20 via-transparent to-[var(--accent-2)]/5"
                  }`}
                />
                <div className="relative overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--surface)]/40 p-7 backdrop-blur-xl md:p-8">
                  <motion.div
                    className="pointer-events-none absolute -right-8 -top-8 opacity-[0.04]"
                    animate={{ rotate: idx === 0 ? [0, 360] : [0, -360] }}
                    transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                  >
                    <Image src={logoImg} alt="" width={120} height={120} />
                  </motion.div>

                  <motion.div
                    className={`mb-5 inline-flex items-center justify-center rounded-2xl border p-3 ${
                      member.accent === "accent-1"
                        ? "border-[var(--accent-1)]/30 bg-[var(--accent-1)]/10"
                        : "border-[var(--accent-2)]/30 bg-[var(--accent-2)]/10"
                    }`}
                    whileHover={{ rotate: [0, idx === 0 ? -8 : 8, idx === 0 ? 8 : -8, 0], scale: 1.12 }}
                    transition={{ duration: 0.5 }}
                  >
                    {member.icon}
                  </motion.div>

                  <h4 className="font-display text-2xl md:text-3xl">{member.name}</h4>
                  <motion.span
                    className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-bold tracking-wider ${
                      member.accent === "accent-1"
                        ? "bg-[var(--accent-1)]/15 text-[var(--accent-1)]"
                        : "bg-[var(--accent-2)]/15 text-[var(--accent-2)]"
                    }`}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + idx * 0.1, duration: 0.5 }}
                  >
                    {member.role}
                  </motion.span>

                  <p className="mt-4 text-sm leading-relaxed text-[var(--text-soft)]">{member.desc}</p>

                  <div className="mt-5 flex items-center gap-3">
                    <div
                      className={`h-px flex-1 bg-gradient-to-r to-transparent ${
                        member.accent === "accent-1" ? "from-[var(--accent-1)]/40" : "from-[var(--accent-2)]/40"
                      }`}
                    />
                    <p className="text-xs font-medium text-[var(--text-soft)]">{member.batch}</p>
                    <div
                      className={`h-px flex-1 bg-gradient-to-l to-transparent ${
                        member.accent === "accent-1" ? "from-[var(--accent-1)]/40" : "from-[var(--accent-2)]/40"
                      }`}
                    />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      </main>

      <motion.div
        className="pointer-events-none absolute right-6 bottom-24 hidden md:block"
        animate={{ y: [0, -8, 0], opacity: [0.08, 0.14, 0.08] }}
        transition={{ repeat: Infinity, duration: 6 }}
      >
        <Image src={logoImg} alt="" width={140} height={140} />
      </motion.div>

      <SiteFooter />

      <BackToTop />
    </div>
  );
}
