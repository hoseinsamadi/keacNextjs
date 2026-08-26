import { useEffect, useState, type ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { LogoMark, IMenu, IClose, IPhone, IMail, IPin, ITelegram, IInstagram, ILinkedin, IYoutube, ISend } from "./icons";

export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}

const NAV = [
  { to: "/", label: "خانه" },
  { to: "/products", label: "محصولات و خدمات" },
  { to: "/team", label: "اعضای شرکت" },
  { to: "/activities", label: "فعالیت روزانه" },
  { to: "/blog", label: "وبلاگ" },
  { to: "/about", label: "درباره ما" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-abyss/85 backdrop-blur-md border-b border-linesoft shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)]" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8 h-[74px] flex items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-3 group">
          <LogoMark className="w-11 h-11 transition-transform duration-500 group-hover:rotate-[18deg]" />
          <span className="leading-tight">
            <span className="block font-display text-xl text-ink">کیوان ارتباطات</span>
            <span className="block text-[11px] text-mute tracking-[0.22em]">عصر کاسپین · KEAC</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === "/"}
              className={({ isActive }) =>
                `link-underline text-sm font-semibold transition-colors ${
                  isActive ? "active text-teal" : "text-mute hover:text-ink"
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link to="/contact" className="btn btn-primary !py-2.5 !px-5 text-sm">
            تماس با ما
          </Link>
        </div>

        <button
          className="lg:hidden text-ink p-2 border border-line rounded-lg"
          onClick={() => setOpen((v) => !v)}
          aria-label="منو"
        >
          {open ? <IClose className="w-6 h-6" /> : <IMenu className="w-6 h-6" />}
        </button>
      </div>

      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 bg-abyss/95 backdrop-blur-md border-b border-linesoft ${
          open ? "max-h-[420px]" : "max-h-0"
        }`}
      >
        <nav className="px-5 py-4 flex flex-col gap-1">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === "/"}
              className={({ isActive }) =>
                `px-4 py-3 rounded-lg font-semibold text-sm border ${
                  isActive ? "border-teal/40 text-teal bg-teal/5" : "border-transparent text-mute"
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
          <Link to="/contact" className="btn btn-primary justify-center mt-2">
            تماس با ما
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  const [email, setEmail] = useState("");
  const [subbed, setSubbed] = useState(false);

  return (
    <footer className="relative border-t border-linesoft bg-deep mt-10">
      <div className="absolute inset-0 gridlines opacity-60 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link to="/" className="flex items-center gap-3 mb-5">
              <LogoMark className="w-12 h-12" />
              <span>
                <span className="block font-display text-2xl text-ink">کیوان ارتباطات</span>
                <span className="block text-xs text-mute tracking-[0.22em]">عصر کاسپین · KEAC</span>
              </span>
            </Link>
            <p className="text-mute text-sm leading-7 mb-6">
              از سال ۱۳۹۴ در کنار کسب‌وکارهای شمال کشور؛ طراحی زیرساخت شبکه، امنیت سایبری و توسعه نرم‌افزارهای سازمانی
              را یک‌جا ارائه می‌دهیم.
            </p>
            <div className="flex items-center gap-3">
              {[ITelegram, IInstagram, ILinkedin, IYoutube].map((I, i) => (
                <a
                  key={i}
                  href="#/"
                  onClick={(e) => e.preventDefault()}
                  className="w-10 h-10 rounded-lg border border-line flex items-center justify-center text-mute hover:text-teal hover:border-teal/60 hover:-translate-y-1 transition-all duration-300"
                  aria-label="شبکه اجتماعی"
                >
                  <I className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg text-ink mb-5">دسترسی سریع</h4>
            <ul className="space-y-3 text-sm">
              {[...NAV, { to: "/contact", label: "تماس با ما" }].map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="text-mute hover:text-teal transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal/50" />
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg text-ink mb-5">حوزه‌های تخصصی</h4>
            <ul className="space-y-3 text-sm text-mute">
              {["زیرساخت شبکه سازمانی", "امنیت و فایروال", "لینک‌های وایرلس", "مانیتورینگ ۲۴/۷", "توسعه وب و موبایل", "اتوماسیون سازمانی"].map(
                (t) => (
                  <li key={t} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber/60" />
                    {t}
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg text-ink mb-5">خبرنامه فنی</h4>
            <p className="text-mute text-sm leading-7 mb-4">ماهی یک ایمیل؛ خلاصه یادداشت‌های فنی و پروژه‌های جدید.</p>
            {subbed ? (
              <div className="text-teal text-sm font-bold border border-teal/40 bg-teal/5 rounded-lg px-4 py-3">
                ✓ عضویت شما ثبت شد؛ خوش آمدید!
              </div>
            ) : (
              <form
                className="flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email.includes("@")) setSubbed(true);
                }}
              >
                <input
                  dir="ltr"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.ir"
                  className="flex-1 min-w-0 bg-panel border border-line rounded-lg px-3 py-2.5 text-sm text-ink placeholder:text-faint focus:outline-none focus:border-teal/60 transition-colors"
                />
                <button className="btn btn-ghost !px-3.5" aria-label="عضویت" type="submit">
                  <ISend className="w-5 h-5 -scale-x-100" />
                </button>
              </form>
            )}
            <div className="mt-6 space-y-2.5 text-sm text-mute">
              <p className="flex items-center gap-2.5">
                <IPhone className="w-4 h-4 text-teal" />
                <span dir="ltr">۰۱۳-۳۳۵۵۶۶۷۷</span>
              </p>
              <p className="flex items-center gap-2.5">
                <IMail className="w-4 h-4 text-teal" />
                <span dir="ltr">info@keac.ir</span>
              </p>
              <p className="flex items-center gap-2.5">
                <IPin className="w-4 h-4 text-teal" />
                رشت، گلسار، برج کاسپین، طبقه ۵
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-7 border-t border-linesoft flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-faint">
          <p>© ۱۴۰۴ کیوان ارتباطات عصر کاسپین — تمامی حقوق محفوظ است.</p>
          <p className="flex items-center gap-2">
            طراحی و توسعه در
            <span className="text-teal font-bold" dir="ltr">
              KEAC Studio
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-teal dot-live" />
          </p>
        </div>
      </div>
    </footer>
  );
}

export function Shell({ title, children }: { title: string; children: ReactNode }) {
  useEffect(() => {
    document.title = title;
  }, [title]);
  return <div className="page-in pt-[74px]">{children}</div>;
}
