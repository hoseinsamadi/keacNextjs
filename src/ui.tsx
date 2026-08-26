import { useEffect, useRef, useState, type ReactNode } from "react";

/* ---------- hooks ---------- */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fn = () => setReduced(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return reduced;
}

export function useInView<T extends HTMLElement>(threshold = 0.18) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ---------- Reveal ---------- */
export function Reveal({
  children,
  className = "",
  variant = "up",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  variant?: "up" | "r" | "l" | "z";
  delay?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const v = variant === "r" ? "rv rv-r" : variant === "l" ? "rv rv-l" : variant === "z" ? "rv rv-z" : "rv";
  return (
    <div
      ref={ref}
      className={`${v} ${inView ? "on" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

/* ---------- Scramble decode (Persian) ---------- */
const POOL = "ابپتثجچحخدرزسشصطعقکگلمنوهی۰۱۲۳۴۵۶۷۸۹#";
export function Scramble({ text, className = "", speed = 42 }: { text: string; className?: string; speed?: number }) {
  const reduced = useReducedMotion();
  const [out, setOut] = useState(reduced ? text : "");
  const { ref, inView } = useInView<HTMLSpanElement>(0.4);
  useEffect(() => {
    if (reduced) {
      setOut(text);
      return;
    }
    if (!inView) return;
    let frame = 0;
    const id = window.setInterval(() => {
      frame++;
      const fixed = Math.floor(frame / 2.2);
      let res = "";
      for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") res += " ";
        else if (i < fixed) res += text[i];
        else res += POOL[Math.floor(Math.random() * POOL.length)];
      }
      setOut(res);
      if (fixed >= text.length) window.clearInterval(id);
    }, speed);
    return () => window.clearInterval(id);
  }, [text, inView, reduced, speed]);
  return (
    <span ref={ref} className={className} aria-label={text}>
      {out || "\u200c"}
    </span>
  );
}

/* ---------- CountUp with Persian digits ---------- */
export function CountUp({
  to,
  decimals = 0,
  suffix = "",
  prefix = "",
  className = "",
  duration = 1800,
}: {
  to: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  duration?: number;
}) {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLSpanElement>(0.5);
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setVal(to);
      return;
    }
    let start: number | null = null;
    let raf = 0;
    const step = (t: number) => {
      if (start === null) start = t;
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(to * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduced]);
  const txt = val.toLocaleString("fa-IR", { maximumFractionDigits: decimals, minimumFractionDigits: 0 });
  return (
    <span ref={ref} className={className} dir="ltr">
      {prefix}
      {txt}
      {suffix}
    </span>
  );
}

/* ---------- Ticker ---------- */
export function Ticker({ items, className = "" }: { items: string[]; className?: string }) {
  const row = (key: string) => (
    <div key={key} className="flex items-center shrink-0">
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-3 px-5 whitespace-nowrap">
          <svg viewBox="0 0 8 8" className="w-2 h-2 text-amber" aria-hidden>
            <rect x="1" y="1" width="6" height="6" transform="rotate(45 4 4)" fill="currentColor" />
          </svg>
          <span>{it}</span>
        </span>
      ))}
    </div>
  );
  return (
    <div dir="ltr" className={`overflow-hidden ${className}`}>
      <div className="ticker-track">{[row("a"), row("b")]}</div>
    </div>
  );
}

/* ---------- Section heading ---------- */
export function SectionHead({
  kicker,
  title,
  desc,
  className = "",
}: {
  kicker: string;
  title: string;
  desc?: string;
  className?: string;
}) {
  return (
    <Reveal className={className}>
      <div className="flex items-center gap-3 mb-4">
        <span className="h-px w-10 bg-teal/60" />
        <span className="text-teal text-sm font-bold tracking-wide">{kicker}</span>
      </div>
      <h2 className="font-display text-3xl md:text-5xl leading-[1.25] text-ink">{title}</h2>
      {desc && <p className="text-mute mt-4 max-w-2xl leading-8">{desc}</p>}
    </Reveal>
  );
}

export const faNum = (n: number | string) => String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);
