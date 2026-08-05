"use client";

import Image from "next/image";
import logoImg from "../../National_Textile_University_Logo.png";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState, useCallback, memo } from "react";
import { ScrollProgress, FloatingParticles, BackToTop } from "../components/interactive";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";

/* ── NTU Absolute Grading System (New – Table 2, 2017 onwards) ── */
interface GradeInfo {
  grade: string;
  gradePoint: number;
  remark: string;
}

function getGradeInfo(marks: number): GradeInfo {
  if (marks >= 90) return { grade: "A+", gradePoint: 4.0, remark: "Exceptional" };
  if (marks >= 85) return { grade: "A", gradePoint: 4.0, remark: "Outstanding" };
  if (marks >= 80) return { grade: "A-", gradePoint: 3.66, remark: "Excellent" };
  if (marks >= 75) return { grade: "B+", gradePoint: 3.33, remark: "Very Good" };
  if (marks >= 71) return { grade: "B", gradePoint: 3.0, remark: "Good" };
  if (marks >= 68) return { grade: "B-", gradePoint: 2.66, remark: "Above Average" };
  if (marks >= 64) return { grade: "C+", gradePoint: 2.33, remark: "Average" };
  if (marks >= 61) return { grade: "C", gradePoint: 2.0, remark: "Satisfactory" };
  if (marks >= 58) return { grade: "C-", gradePoint: 1.66, remark: "Pass" };
  if (marks >= 54) return { grade: "D+", gradePoint: 1.33, remark: "Low Pass" };
  if (marks >= 50) return { grade: "D", gradePoint: 1.0, remark: "Marginal Pass" };
  return { grade: "F", gradePoint: 0.0, remark: "Fail" };
}

function getGradeColor(grade: string): string {
  if (grade.startsWith("A")) return "var(--accent-1)";
  if (grade.startsWith("B")) return "var(--accent-2)";
  if (grade.startsWith("C")) return "#fbbf24";
  if (grade.startsWith("D")) return "#f97316";
  return "#ef4444";
}

interface SubjectData {
  name: string;
  creditHours: number;
  marks: number;
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

const creditHourOptions = [1, 2, 3, 4, 5];
const subjectCountOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

interface SubjectCardProps {
  index: number;
  subject: SubjectData;
  updateSubject: (index: number, field: keyof SubjectData, value: string | number) => void;
}

const SubjectCard = memo(({ index, subject, updateSubject }: SubjectCardProps) => {
  const info = subject.marks > 0 ? getGradeInfo(subject.marks) : null;
  return (
    <motion.div
      className="glass-card min-w-0 rounded-2xl p-5 md:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.05, 0.4), duration: 0.4 }}
    >
      <div className="flex items-center gap-3 mb-4 min-w-0">
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold"
          style={{
            background: "linear-gradient(135deg, var(--accent-1), var(--accent-2))",
            color: "var(--cta-text)",
          }}
        >
          {index + 1}
        </span>
        <input
          type="text"
          value={subject.name}
          onChange={(e) => updateSubject(index, "name", e.target.value)}
          className="flex-1 bg-transparent text-lg font-display text-[var(--text-main)] outline-none border-b border-transparent focus:border-[var(--accent-1)] transition-colors pb-1"
          placeholder="Subject name"
        />
        {info && (
          <motion.span
            className="rounded-full px-3 py-1 text-xs font-bold shrink-0"
            style={{
              background: `${getGradeColor(info.grade)}20`,
              color: getGradeColor(info.grade),
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            key={info.grade}
          >
            {info.grade} · {info.gradePoint.toFixed(2)}
          </motion.span>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Credit Hours */}
        <div className="min-w-0">
          <label className="mb-2 block text-xs font-semibold tracking-wider text-[var(--text-soft)]">
            CREDIT HOURS
          </label>
          <div className="flex gap-1.5 flex-wrap">
            {creditHourOptions.map((ch) => (
              <motion.button
                key={ch}
                type="button"
                onClick={() => updateSubject(index, "creditHours", ch)}
                className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold transition-all duration-200"
                style={{
                  background:
                    subject.creditHours === ch
                      ? "linear-gradient(135deg, var(--accent-1), var(--accent-2))"
                      : "var(--surface)",
                  color:
                    subject.creditHours === ch
                      ? "var(--cta-text)"
                      : "var(--text-main)",
                  border: `1px solid ${subject.creditHours === ch ? "transparent" : "var(--line)"
                    }`,
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {ch}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Marks Input */}
        <div>
          <label className="mb-2 block text-xs font-semibold tracking-wider text-[var(--text-soft)]">
            MARKS (OUT OF 100)
          </label>
          <div className="relative">
            <input
              type="number"
              min="0"
              max="100"
              value={subject.marks || ""}
              onChange={(e) => updateSubject(index, "marks", e.target.value)}
              placeholder="Enter marks"
              className="gpa-input w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-2.5 pr-28 text-base font-semibold text-[var(--text-main)] outline-none transition-all duration-200 focus:border-[var(--accent-1)] focus:shadow-[0_0_0_3px_rgba(63,228,255,0.15)] placeholder:text-[var(--text-soft)]/50"
            />
            {subject.marks > 0 && (
              <motion.div
                className="absolute right-3 top-1/2 -translate-y-1/2"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <span className="text-xs font-semibold" style={{ color: getGradeColor(info!.grade) }}>
                  {info!.remark}
                </span>
              </motion.div>
            )}
          </div>
          {/* Mini progress bar for marks */}
          {subject.marks > 0 && (
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[var(--track)]">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${getGradeColor(info!.grade)}, ${getGradeColor(info!.grade)}cc)`,
                }}
                initial={{ width: 0 }}
                animate={{ width: `${subject.marks}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
});
SubjectCard.displayName = "SubjectCard";

export default function CalculatorPage() {
  /* ── All state declarations first ── */
  const [theme, setTheme] = useState<string>("dark");
  const [scrolled, setScrolled] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [showParticleLayer, setShowParticleLayer] = useState(true);
  const [step, setStep] = useState<"setup" | "input" | "results">("setup");
  const [totalCreditHours, setTotalCreditHours] = useState<number>(0);
  const [subjectCount, setSubjectCount] = useState<number>(0);
  const [subjects, setSubjects] = useState<SubjectData[]>([]);
  const [gpa, setGpa] = useState<number>(0);
  const [animatedGpa, setAnimatedGpa] = useState<number>(0);

  /* ── Effects ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    setShowParticleLayer(!prefersReducedMotion && !isMobile);

    try {
      const saved = localStorage.getItem("ntu_gpa_state");
      if (saved) {
        const parsed = JSON.parse(saved) as {
          subjectCount?: number;
          subjects?: SubjectData[];
        };

        if (typeof parsed.subjectCount === "number" && parsed.subjectCount > 0) {
          setSubjectCount(parsed.subjectCount);
        }

        if (Array.isArray(parsed.subjects) && parsed.subjects.length > 0) {
          setSubjects(
            parsed.subjects.map((subject, index) => ({
              name: subject?.name || `Subject ${index + 1}`,
              creditHours: typeof subject?.creditHours === "number" ? subject.creditHours : 3,
              marks: typeof subject?.marks === "number" ? Math.min(100, Math.max(0, subject.marks)) : 0,
            }))
          );
          setStep("input");
        }
      }
    } catch {
      // ignore malformed saved state
    }

    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(
        "ntu_gpa_state",
        JSON.stringify({ subjectCount, subjects })
      );
    } catch {
      // ignore write errors
    }
  }, [subjectCount, subjects, isHydrated]);

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

  const handleSetupComplete = () => {
    if (subjectCount < 1) return;
    if (subjects.length !== subjectCount) {
      const initial: SubjectData[] = Array.from({ length: subjectCount }, (_, i) => ({
        name: subjects[i]?.name || `Subject ${i + 1}`,
        creditHours: typeof subjects[i]?.creditHours === "number" ? subjects[i].creditHours : 3,
        marks: typeof subjects[i]?.marks === "number" ? subjects[i].marks : 0,
      }));
      setSubjects(initial);
    }
    setStep("input");
  };

  const goBackToInput = () => setStep("input");

  const updateSubject = useCallback(
    (index: number, field: keyof SubjectData, value: string | number) => {
      setSubjects((prev) => {
        const updated = [...prev];
        if (field === "marks") {
          let v = Number(value);
          if (isNaN(v)) v = 0;
          if (v > 100) v = 100;
          if (v < 0) v = 0;
          updated[index] = { ...updated[index], marks: v };
        } else if (field === "creditHours") {
          updated[index] = { ...updated[index], creditHours: Number(value) };
        } else {
          updated[index] = { ...updated[index], name: value as string };
        }
        return updated;
      });
    },
    []
  );

  const calculateGPA = () => {
    let totalQualityPoints = 0;
    let totalCredits = 0;

    subjects.forEach((s) => {
      const info = getGradeInfo(s.marks);
      totalQualityPoints += info.gradePoint * s.creditHours;
      totalCredits += s.creditHours;
    });

    const calculatedGpa = totalCredits > 0 ? totalQualityPoints / totalCredits : 0;
    setGpa(parseFloat(calculatedGpa.toFixed(2)));
    setTotalCreditHours(totalCredits);
    setStep("results");

    // Animate the GPA counter
    setAnimatedGpa(0);
    let start: number | null = null;
    const target = parseFloat(calculatedGpa.toFixed(2));
    const animate = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / 1200, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedGpa(parseFloat((target * eased).toFixed(2)));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  };

  const clearSavedState = () => {
    try {
      localStorage.removeItem("ntu_gpa_state");
    } catch {
      // ignore
    }
  };

  const resetCalculator = () => {
    clearSavedState();
    setStep("setup");
    setSubjects([]);
    setSubjectCount(0);
    setTotalCreditHours(0);
    setGpa(0);
    setAnimatedGpa(0);
  };

  const downloadPDF = async () => {
    try {
      const jsPDF = (await import("jspdf")).default;
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 18;
      let y = 20;

      // ── Header ──
      doc.setFillColor(8, 29, 43);
      doc.rect(0, 0, pageWidth, 48, "F");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.setTextColor(63, 228, 255);
      doc.text("NTU GPA Report", margin, 22);

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(185, 205, 221);
      doc.text("National Textile University — Absolute Grading System (New)", margin, 30);

      const dateStr = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      doc.setFontSize(9);
      doc.text(`Generated: ${dateStr}`, margin, 38);

      y = 58;

      // ── GPA Summary Box ──
      doc.setFillColor(14, 42, 63);
      doc.roundedRect(margin, y, pageWidth - margin * 2, 36, 4, 4, "F");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(185, 205, 221);
      doc.text("SEMESTER GPA", margin + 8, y + 12);

      doc.setFontSize(28);
      doc.setTextColor(63, 228, 255);
      doc.text(gpa.toFixed(2), margin + 8, y + 30);

      doc.setFontSize(12);
      doc.setTextColor(185, 205, 221);
      doc.text("/ 4.00", margin + 42, y + 30);

      // Right side stats
      const statsX = pageWidth - margin - 60;
      doc.setFontSize(9);
      doc.setTextColor(185, 205, 221);
      doc.text("Total Credits", statsX, y + 10);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(255, 255, 255);
      doc.text(totalCreditHours.toString(), statsX, y + 20);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(185, 205, 221);
      doc.text("Subjects", statsX + 35, y + 10);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(255, 255, 255);
      doc.text(subjects.length.toString(), statsX + 35, y + 20);

      const standing =
        gpa >= 3.5
          ? "Dean's List"
          : gpa >= 3.0
            ? "Good Standing"
            : gpa >= 2.0
              ? "Average"
              : "Needs Improvement";
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(185, 205, 221);
      doc.text("Standing", statsX, y + 28);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(255, 141, 92);
      doc.text(standing, statsX + 35, y + 28);

      y += 46;

      // ── Subject Breakdown Table ──
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.setTextColor(8, 29, 43);
      doc.text("Subject Breakdown", margin, y);
      y += 8;

      // Table header
      const colX = {
        num: margin,
        name: margin + 10,
        credits: margin + 80,
        marks: margin + 105,
        grade: margin + 128,
        gp: margin + 148,
      };

      doc.setFillColor(230, 240, 250);
      doc.rect(margin, y, pageWidth - margin * 2, 8, "F");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(70, 90, 110);
      doc.text("#", colX.num + 1, y + 5.5);
      doc.text("SUBJECT NAME", colX.name, y + 5.5);
      doc.text("CREDITS", colX.credits, y + 5.5);
      doc.text("MARKS", colX.marks, y + 5.5);
      doc.text("GRADE", colX.grade, y + 5.5);
      doc.text("GP", colX.gp, y + 5.5);
      y += 10;

      // Table rows
      subjects.forEach((subject, i) => {
        const info = getGradeInfo(subject.marks);

        // Check if we need a new page
        if (y > 270) {
          doc.addPage();
          y = 20;
        }

        // Alternating row bg
        if (i % 2 === 0) {
          doc.setFillColor(245, 248, 252);
          doc.rect(margin, y - 4, pageWidth - margin * 2, 10, "F");
        }

        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(40, 50, 70);
        doc.text(`${i + 1}`, colX.num + 1, y + 2);
        doc.text(subject.name.substring(0, 30), colX.name, y + 2);
        doc.text(subject.creditHours.toString(), colX.credits + 5, y + 2);
        doc.text(`${subject.marks}/100`, colX.marks, y + 2);

        // Color-code the grade
        if (info.grade.startsWith("A")) doc.setTextColor(15, 143, 176);
        else if (info.grade.startsWith("B")) doc.setTextColor(211, 101, 59);
        else if (info.grade.startsWith("C")) doc.setTextColor(180, 140, 20);
        else if (info.grade.startsWith("D")) doc.setTextColor(220, 100, 20);
        else doc.setTextColor(220, 50, 50);

        doc.setFont("helvetica", "bold");
        doc.text(info.grade, colX.grade, y + 2);
        doc.text(info.gradePoint.toFixed(2), colX.gp, y + 2);

        y += 10;
      });

      // Divider
      y += 4;
      doc.setDrawColor(200, 210, 225);
      doc.setLineWidth(0.5);
      doc.line(margin, y, pageWidth - margin, y);
      y += 10;

      // ── Footer ──
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(140, 155, 170);
      doc.text(
        "This report is generated by NTU GPA Calculator. Built by Malik Aneeb & Nawab Hasnain Raza.",
        pageWidth / 2,
        y,
        { align: "center" }
      );
      y += 5;
      doc.text(
        "GMD · Batch 2025-2029 | National Textile University",
        pageWidth / 2,
        y,
        { align: "center" }
      );

      doc.save(`NTU_GPA_Report_${gpa.toFixed(2)}.pdf`);
    } catch (err) {
      console.error("Failed to load PDF library:", err);
    }
  };

  const totalEnteredCredits = subjects.reduce((sum, s) => sum + s.creditHours, 0);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--bg-base)] text-[var(--text-main)] transition-colors duration-500">
      <ScrollProgress />
      {showParticleLayer && <FloatingParticles />}

      {/* Background elements */}
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

      <main className="mx-auto w-full max-w-5xl px-5 py-12 md:px-10 md:py-20">
        {/* Page heading */}
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <motion.span
            className="section-badge mb-4 inline-flex"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Image src={logoImg} alt="NTU logo" width={20} height={20} />
            <span>GPA CALCULATOR</span>
          </motion.span>

          <motion.h1
            className="mt-4 font-display text-3xl md:text-5xl"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            Calculate Your{" "}
            <span className="gradient-text-animated bg-clip-text text-transparent bg-gradient-to-r from-[var(--accent-1)] via-[var(--accent-2)] to-[var(--accent-1)]">
              GPA
            </span>
          </motion.h1>

          <motion.p
            className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[var(--text-soft)] md:text-base"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Using NTU&apos;s Absolute Grading System (New - 2017 onwards). Enter your subjects,
            marks out of 100, and get instant results.
          </motion.p>
        </motion.div>

        {/* Step Indicator */}
        <motion.div
          className="mb-10 flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {["Setup", "Subjects", "Results"].map((label, i) => {
            const stepMap = ["setup", "input", "results"];
            const isActive = stepMap[i] === step;
            const isPast = stepMap.indexOf(step) > i;
            return (
              <div key={label} className="flex items-center gap-2">
                {i > 0 && (
                  <div
                    className="h-px w-8 md:w-16 transition-colors duration-300"
                    style={{
                      background: isPast
                        ? "linear-gradient(90deg, var(--accent-1), var(--accent-2))"
                        : "var(--line)",
                    }}
                  />
                )}
                <motion.div
                  className="flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold tracking-wider transition-colors duration-300"
                  style={{
                    background: isActive
                      ? "linear-gradient(135deg, var(--accent-1), var(--accent-2))"
                      : isPast
                        ? "rgba(63, 228, 255, 0.15)"
                        : "var(--surface)",
                    color: isActive ? "var(--cta-text)" : isPast ? "var(--accent-1)" : "var(--text-soft)",
                    border: `1px solid ${isActive ? "transparent" : "var(--line)"}`,
                  }}
                  animate={isActive ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <span
                    className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold"
                    style={{
                      background: isActive ? "rgba(255,255,255,0.25)" : isPast ? "var(--accent-1)" : "var(--line)",
                      color: isActive ? "var(--cta-text)" : isPast ? "var(--cta-text)" : "var(--text-soft)",
                    }}
                  >
                    {isPast ? "✓" : i + 1}
                  </span>
                  <span className="hidden sm:inline">{label}</span>
                </motion.div>
              </div>
            );
          })}
        </motion.div>

        <AnimatePresence mode="wait">
          {/* ── STEP 1: Setup ── */}
          {step === "setup" && (
            <motion.div
              key="setup"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              <div className="glass-card mx-auto max-w-2xl rounded-3xl p-6 md:p-10">
                <div className="mb-8 text-center">
                  <motion.div
                    className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--line-strong)] bg-[var(--surface)]"
                    animate={{ rotate: [0, -5, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8 text-[var(--accent-1)]">
                      <rect x="4" y="2" width="16" height="20" rx="2" stroke="currentColor" strokeWidth="2" />
                      <line x1="8" y1="6" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <circle cx="9" cy="10" r="1" fill="currentColor" />
                      <circle cx="12" cy="10" r="1" fill="currentColor" />
                      <circle cx="15" cy="10" r="1" fill="currentColor" />
                      <circle cx="9" cy="13" r="1" fill="currentColor" />
                      <circle cx="12" cy="13" r="1" fill="currentColor" />
                      <circle cx="15" cy="13" r="1" fill="currentColor" />
                      <circle cx="9" cy="16" r="1" fill="currentColor" />
                      <circle cx="12" cy="16" r="1" fill="currentColor" />
                      <rect x="14" y="15" width="2" height="3" rx="0.5" fill="currentColor" />
                    </svg>
                  </motion.div>
                  <h2 className="font-display text-2xl md:text-3xl">Setup Your Semester</h2>
                  <p className="mt-2 text-sm text-[var(--text-soft)]">
                    Choose how many subjects you&apos;re taking this semester
                  </p>
                </div>

                {/* Number of Subjects */}
                <div className="mb-8">
                  <label className="mb-3 block text-sm font-semibold tracking-wider text-[var(--text-soft)]">
                    NUMBER OF SUBJECTS
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {subjectCountOptions.map((num) => (
                      <motion.button
                        key={num}
                        type="button"
                        onClick={() => setSubjectCount(num)}
                        className="relative flex h-12 w-12 items-center justify-center rounded-xl text-sm font-bold transition-all duration-200"
                        style={{
                          background:
                            subjectCount === num
                              ? "linear-gradient(135deg, var(--accent-1), var(--accent-2))"
                              : "var(--surface)",
                          color: subjectCount === num ? "var(--cta-text)" : "var(--text-main)",
                          border: `1px solid ${subjectCount === num ? "transparent" : "var(--line)"
                            }`,
                        }}
                        whileHover={{ scale: 1.08, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {num}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Proceed Button */}
                <motion.button
                  type="button"
                  disabled={subjectCount < 1}
                  onClick={handleSetupComplete}
                  className="btn-primary w-full rounded-2xl py-4 text-base disabled:opacity-40 disabled:cursor-not-allowed"
                  whileHover={subjectCount >= 1 ? { scale: 1.02 } : {}}
                  whileTap={subjectCount >= 1 ? { scale: 0.98 } : {}}
                >
                  <span className="btn-shimmer" />
                  Continue to Subjects
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="ml-2">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.button>
              </div>

              {/* Grading Reference Table */}
              <motion.div
                className="glass-card mx-auto mt-8 max-w-2xl rounded-3xl p-6 md:p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="mb-4 font-display text-lg">
                  <span className="gradient-text-animated bg-clip-text text-transparent bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)]">
                    NTU Grading Scale
                  </span>
                  <span className="ml-2 text-xs font-normal text-[var(--text-soft)]">(Absolute Grading System – New)</span>
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[var(--line)]">
                        <th className="pb-2 text-left font-semibold text-[var(--text-soft)]">Marks %</th>
                        <th className="pb-2 text-center font-semibold text-[var(--text-soft)]">Grade</th>
                        <th className="pb-2 text-center font-semibold text-[var(--text-soft)]">GP</th>
                        <th className="pb-2 text-right font-semibold text-[var(--text-soft)]">Remark</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { range: "90 & above", grade: "A+", gp: "4.00", remark: "Exceptional" },
                        { range: "85 – 89.9", grade: "A", gp: "4.00", remark: "Outstanding" },
                        { range: "80 – 84.9", grade: "A-", gp: "3.66", remark: "Excellent" },
                        { range: "75 – 79.9", grade: "B+", gp: "3.33", remark: "Very Good" },
                        { range: "71 – 74.9", grade: "B", gp: "3.00", remark: "Good" },
                        { range: "68 – 70.9", grade: "B-", gp: "2.66", remark: "Above Average" },
                        { range: "64 – 67.9", grade: "C+", gp: "2.33", remark: "Average" },
                        { range: "61 – 63.9", grade: "C", gp: "2.00", remark: "Satisfactory" },
                        { range: "58 – 60.9", grade: "C-", gp: "1.66", remark: "Pass" },
                        { range: "54 – 57.9", grade: "D+", gp: "1.33", remark: "Low Pass" },
                        { range: "50 – 53.9", grade: "D", gp: "1.00", remark: "Marginal Pass" },
                        { range: "Below 50", grade: "F", gp: "0.00", remark: "Fail" },
                      ].map((row, i) => (
                        <motion.tr
                          key={row.grade}
                          className="border-b border-[var(--line)] last:border-0"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + i * 0.03 }}
                        >
                          <td className="py-2 text-[var(--text-main)]">{row.range}</td>
                          <td className="py-2 text-center font-bold" style={{ color: getGradeColor(row.grade) }}>
                            {row.grade}
                          </td>
                          <td className="py-2 text-center text-[var(--text-main)]">{row.gp}</td>
                          <td className="py-2 text-right text-[var(--text-soft)]">{row.remark}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* ── STEP 2: Subject Input ── */}
          {step === "input" && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              {/* Summary bar */}
              <div className="mb-6 flex items-center justify-between rounded-2xl border border-[var(--line)] bg-[var(--surface)]/60 px-5 py-3 backdrop-blur-sm">
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-[var(--text-soft)]">
                    Subjects: <strong className="text-[var(--text-main)]">{subjectCount}</strong>
                  </span>
                  <span className="h-4 w-px bg-[var(--line)]" />
                  <span className="text-[var(--text-soft)]">
                    Total Credits: <strong className="text-[var(--accent-1)]">{totalEnteredCredits}</strong>
                  </span>
                </div>
                <motion.button
                  type="button"
                  onClick={() => setStep("setup")}
                  className="text-xs font-semibold text-[var(--text-soft)] hover:text-[var(--accent-1)] transition-colors"
                  whileHover={{ x: -2 }}
                >
                  ← Back
                </motion.button>
              </div>

              {/* Subject Cards */}
              <div className="space-y-4">
                {subjects.map((subject, index) => (
                  <SubjectCard
                    key={index}
                    index={index}
                    subject={subject}
                    updateSubject={updateSubject}
                  />
                ))}
              </div>

              {/* Calculate Button */}
              <motion.div
                className="mt-8 flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <motion.button
                  type="button"
                  onClick={calculateGPA}
                  className="btn-primary flex-1 rounded-2xl py-4 text-base"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="btn-shimmer" />
                  <svg viewBox="0 0 24 24" fill="none" className="mr-2 h-5 w-5">
                    <path d="M4 19V5M4 19h16M8 15v-4M12 15V9M16 15V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  Calculate GPA
                </motion.button>
              </motion.div>
            </motion.div>
          )}

          {/* ── STEP 3: Results ── */}
          {step === "results" && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              {/* Main GPA Card */}
              <div className="glass-card mx-auto max-w-2xl rounded-3xl p-6 md:p-10 text-center">
                <motion.div
                  className="pointer-events-none absolute -right-10 -top-10 opacity-10"
                  animate={{ rotate: [0, 12, 0] }}
                  transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                >
                  <Image src={logoImg} alt="" width={120} height={120} />
                </motion.div>

                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <p className="text-sm font-semibold tracking-[0.16em] text-[var(--text-soft)]">YOUR SEMESTER GPA</p>
                  <motion.div
                    className="mt-4 font-display text-7xl md:text-8xl"
                    style={{
                      background: "linear-gradient(135deg, var(--accent-1), var(--accent-2))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {animatedGpa.toFixed(2)}
                  </motion.div>
                  <p className="mt-2 text-lg text-[var(--text-soft)]">out of 4.00</p>
                </motion.div>

                {/* GPA Bar */}
                <div className="mx-auto mt-6 max-w-md">
                  <div className="h-3 overflow-hidden rounded-full bg-[var(--track)]">
                    <motion.div
                      className="gpa-bar-glow h-full rounded-full bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)]"
                      initial={{ width: 0 }}
                      animate={{ width: `${(gpa / 4) * 100}%` }}
                      transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                  <div className="mt-2 flex justify-between text-[10px] sm:text-xs text-[var(--text-soft)]">
                    <span>0.00</span>
                    <span>1.00</span>
                    <span>2.00</span>
                    <span>3.00</span>
                    <span>4.00</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
                  {[
                    { label: "Total Credits", value: totalCreditHours.toString() },
                    { label: "Subjects", value: subjects.length.toString() },
                    {
                      label: "Standing",
                      value:
                        gpa >= 3.5
                          ? "Dean's List"
                          : gpa >= 3.0
                            ? "Good"
                            : gpa >= 2.0
                              ? "Average"
                              : "Needs Improvement",
                    },
                  ].map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      className={`rounded-2xl border border-[var(--line)] bg-[var(--surface)]/60 p-4 ${i === 2 ? "col-span-2 sm:col-span-1" : ""
                        }`}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      <p className="text-xs text-[var(--text-soft)]">{stat.label}</p>
                      <p className="mt-1 text-lg font-bold text-[var(--text-main)]">{stat.value}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Subject Breakdown */}
              <motion.div
                className="glass-card mx-auto mt-6 max-w-2xl rounded-3xl p-6 md:p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="mb-4 font-display text-xl">Subject Breakdown</h3>
                <div className="space-y-3">
                  {subjects.map((subject, i) => {
                    const info = getGradeInfo(subject.marks);
                    return (
                      <motion.div
                        key={i}
                        className="flex min-w-0 flex-wrap items-center gap-4 rounded-xl border border-[var(--line)] bg-[var(--surface)]/40 p-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.07 }}
                        whileHover={{ scale: 1.01, x: 4 }}
                      >
                        <span
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold"
                          style={{
                            background: `${getGradeColor(info.grade)}20`,
                            color: getGradeColor(info.grade),
                          }}
                        >
                          {info.grade}
                        </span>
                        <div className="min-w-0 flex-1 overflow-hidden">
                          <p className="truncate font-semibold text-[var(--text-main)]">{subject.name}</p>
                          <p className="text-xs text-[var(--text-soft)] truncate">
                            {subject.marks}/100 · {subject.creditHours} Credit{subject.creditHours > 1 ? "s" : ""} · {info.remark}
                          </p>
                        </div>
                        <div className="text-right min-w-0">
                          <p className="text-lg font-bold truncate" style={{ color: getGradeColor(info.grade) }}>
                            {info.gradePoint.toFixed(2)}
                          </p>
                          <p className="text-xs text-[var(--text-soft)]">GP</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                className="mx-auto mt-8 flex max-w-2xl flex-col gap-4 sm:flex-row"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <motion.button
                  type="button"
                  onClick={downloadPDF}
                  className="btn-primary flex-1 rounded-2xl py-4 text-base"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="btn-shimmer" />
                  <svg viewBox="0 0 24 24" fill="none" className="mr-2 h-5 w-5">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <polyline points="7 10 12 15 17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Download PDF
                </motion.button>
                <motion.button
                  type="button"
                  onClick={goBackToInput}
                  className="btn-secondary flex-1 rounded-2xl py-4 text-base"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg viewBox="0 0 24 24" fill="none" className="mr-2 h-5 w-5">
                    <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Edit Subjects
                </motion.button>
                <motion.button
                  type="button"
                  onClick={resetCalculator}
                  className="btn-secondary flex-1 rounded-2xl py-4 text-base"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg viewBox="0 0 24 24" fill="none" className="mr-2 h-5 w-5">
                    <path d="M1 4v6h6M23 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Reset All
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => (window.location.href = "/")}
                  className="btn-secondary flex-1 rounded-2xl py-4 text-center text-base"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  ← Back to Home
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Background logo */}
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
