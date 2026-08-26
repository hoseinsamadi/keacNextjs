import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NetworkBg from "../components/NetworkBg";
import { Reveal, Scramble, CountUp, Ticker, SectionHead, useReducedMotion } from "../ui";
import { PRODUCTS, POSTS, ACTIVITIES, STATS, CLIENTS, TICKER_ITEMS, CAT_COLOR } from "../data";
import { productIcon, IArrow, INet, ICode, IChevron } from "../icons";
import { Shell } from "../chrome";

const LOGS: { c: string; t: string }[] = [
  { c: "text-teal", t: "$ keac status --all" },
  { c: "text-mute", t: "» سوییچ Core ................ آنلاین" },
  { c: "text-mute", t: "» فایروال (HA) ............... فعال" },
  { c: "text-mute", t: "» پروژه‌های در جریان ......... ۲۷ مورد" },
  { c: "text-amber", t: "» هشدارهای دیشب .............. ۰ بحرانی ✓" },
  { c: "text-teal", t: "» آپ‌تایم ۳۰ روزه ............ ۹۹٫۹۸٪" },
];

function LiveClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const time = new Intl.DateTimeFormat("fa-IR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(now);
  const date = new Intl.DateTimeFormat("fa-IR", { weekday: "long", day: "numeric", month: "long" }).format(now);
  return (
    <div className="text-left" dir="ltr">
      <div className="font-display text-3xl md:text-4xl text-teal text-glow tabular-nums">{time}</div>
      <div className="text-xs text-mute mt-1" dir="rtl">{date}</div>
    </div>
  );
}

function Terminal() {
  const reduced = useReducedMotion();
  const [n, setN] = useState(reduced ? LOGS.length : 0);
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setN((v) => (v >= LOGS.length ? v : v + 1)), 620);
    return () => clearInterval(id);
  }, [reduced]);
  return (
    <div className="relative rounded-xl border border-line bg-abyss/80 backdrop-blur overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-linesoft bg-deep/70">
        <span className="w-2.5 h-2.5 rounded-full bg-[#e0604f]" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-teal/80" />
        <span className="text-[11px] text-faint mr-3 font-mono" dir="ltr">keac@noc: ~</span>
        <span className="ms-auto chip !text-[10px] !py-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-teal dot-live" /> زنده
        </span>
      </div>
      <div className="p-5 font-mono text-[13px] leading-7 min-h-[196px]" dir="rtl">
        {LOGS.slice(0, n).map((l, i) => (
          <div key={i} className={l.c}>{l.t}</div>
        ))}
        <span className="cursor-blink text-teal">▌</span>
      </div>
      <div className="grid grid-cols-3 border-t border-linesoft divide-x divide-x-reverse divide-linesoft">
        {[
          { to: 40, suffix: "", label: "گیگابیت پهنای باند" },
          { to: 99.9, suffix: "٪", label: "آپ‌تایم سرویس‌ها", decimals: 1 },
          { to: 27, suffix: "", label: "پروژه فعال این هفته" },
        ].map((m) => (
          <div key={m.label} className="px-4 py-4 text-center">
            <CountUp to={m.to} decimals={m.decimals ?? 0} suffix={m.suffix} className="font-display text-2xl text-ink" />
            <div className="text-[11px] text-mute mt-1">{m.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const featured = ["netcore", "securegate", "studio", "flow"].map((s) => PRODUCTS.find((p) => p.slug === s)!);
  const today = ACTIVITIES.slice(0, 5);

  return (
    <Shell title="کیوان ارتباطات عصر کاسپین | KEAC — شبکه و نرم‌افزار">
      {/* ======= HERO: شبکه زنده ======= */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 gridlines" />
        <NetworkBg density={52} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-abyss pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 py-16 w-full grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="chip mb-7 !text-teal !border-teal/30">
                <span className="w-2 h-2 rounded-full bg-teal dot-live" />
                شبکه‌های شمال کشور؛ زیر نظر مرکز عملیات KEAC
              </div>
            </Reveal>
            <h1 className="font-display leading-[1.2]">
              <span className="block text-5xl md:text-7xl text-ink">
                <Scramble text="کیوان ارتباطات" />
              </span>
              <span className="block text-5xl md:text-7xl text-amber mt-2">
                <Scramble text="عصر کاسپین" speed={55} />
              </span>
            </h1>
            <Reveal delay={200}>
              <p className="mt-3 text-[13px] tracking-[0.35em] text-faint font-mono" dir="ltr">
                KEYVAN ERTEBATAT ASR CASPIAN — <span className="text-teal">KEAC</span>
              </p>
            </Reveal>
            <Reveal delay={320}>
              <p className="text-mute text-lg leading-9 mt-7 max-w-xl">
                ده سال است زیرساخت <strong className="text-teal font-bold">شبکه</strong> و{" "}
                <strong className="text-amber font-bold">نرم‌افزار</strong> سازمان‌های شمال کشور را طراحی، اجرا و ۲۴ ساعته
                زنده نگه می‌داریم — با تعهدی که روی کاغذ می‌آید.
              </p>
            </Reveal>
            <Reveal delay={440}>
              <div className="flex flex-wrap gap-4 mt-9">
                <Link to="/products" className="btn btn-primary">
                  محصولات و خدمات <IArrow className="w-5 h-5" />
                </Link>
                <Link to="/activities" className="btn btn-ghost">
                  <span className="w-2 h-2 rounded-full bg-amber dot-live" />
                  فعالیت زنده امروز
                </Link>
              </div>
            </Reveal>
            <Reveal delay={560}>
              <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-faint">
                <span>مورد اعتماد:</span>
                {CLIENTS.slice(0, 5).map((c) => (
                  <span key={c} className="text-mute font-semibold">{c}</span>
                ))}
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal variant="l" delay={250}>
              <Terminal />
              <div className="mt-5 flex items-center justify-between rounded-xl border border-line bg-panel/60 px-5 py-4">
                <div>
                  <div className="text-xs text-mute">مرکز عملیات شبکه — رشت</div>
                  <div className="text-sm font-bold text-ink mt-0.5">همه سیستم‌ها در وضعیت عادی</div>
                </div>
                <LiveClock />
              </div>
            </Reveal>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-teal/70 scue">
          <IChevron className="w-6 h-6" />
        </div>
      </section>

      {/* ======= TICKER ======= */}
      <div className="border-y border-linesoft bg-deep/80 py-4 text-sm font-bold text-mute">
        <Ticker items={TICKER_ITEMS} />
      </div>

      {/* ======= دو بازو ======= */}
      <section className="max-w-7xl mx-auto px-5 lg:px-8 py-24">
        <SectionHead
          kicker="حوزه‌های فعالیت"
          title="دو بازوی تخصصی؛ یک مسئولیت مشترک"
          desc="هر پروژه KEAC یا شبکه را پایدارتر می‌کند یا نرم‌افزاری می‌سازد که کار را جلو می‌برد — و اغلب، هر دو."
        />
        <div className="grid lg:grid-cols-5 gap-6 mt-12">
          <Reveal className="lg:col-span-3">
            <Link to="/products" className="card-hover group block h-full rounded-xl border border-line bg-panel/70 p-8 md:p-10 relative overflow-hidden">
              <div className="absolute -left-10 -top-10 opacity-[0.06] group-hover:opacity-[0.12] transition-opacity">
                <INet className="w-56 h-56 text-teal" />
              </div>
              <div className="relative">
                <div className="w-14 h-14 rounded-xl border border-teal/40 bg-teal/10 flex items-center justify-center text-teal group-hover:rotate-6 transition-transform duration-500">
                  <INet className="w-8 h-8" />
                </div>
                <h3 className="font-display text-3xl text-ink mt-6">زیرساخت شبکه و امنیت</h3>
                <p className="text-mute leading-8 mt-3 max-w-lg">
                  طراحی توپولوژی، فایروال نسل بعد، لینک‌های وایرلس و مانیتورینگ ۲۴/۷ — از رک و کابل تا BGP.
                </p>
                <ul className="mt-6 grid sm:grid-cols-2 gap-2.5 text-sm text-ink/90">
                  {["NetCore — زیرساخت شبکه", "SecureGate — فایروال و UTM", "Link — لینک وایرلس PTP", "Monitor — مانیتورینگ NOC", "Rack+ — پسیو و دیتاسنتر"].map((x) => (
                    <li key={x} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-sm bg-teal" /> {x}
                    </li>
                  ))}
                </ul>
                <span className="inline-flex items-center gap-2 mt-8 text-teal font-bold text-sm">
                  محصولات شبکه <IArrow className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform" />
                </span>
              </div>
            </Link>
          </Reveal>
          <Reveal className="lg:col-span-2" delay={150}>
            <Link to="/products" className="card-hover group block h-full rounded-xl border border-line bg-panel/70 p-8 md:p-10 relative overflow-hidden">
              <div className="absolute -left-8 -top-8 opacity-[0.06] group-hover:opacity-[0.12] transition-opacity">
                <ICode className="w-48 h-48 text-amber" />
              </div>
              <div className="relative">
                <div className="w-14 h-14 rounded-xl border border-amber/40 bg-amber/10 flex items-center justify-center text-amber group-hover:-rotate-6 transition-transform duration-500">
                  <ICode className="w-8 h-8" />
                </div>
                <h3 className="font-display text-3xl text-ink mt-6">نرم‌افزار و داده</h3>
                <p className="text-mute leading-8 mt-3">
                  وب‌اپ، پورتال سازمانی، اتوماسیون و داشبورد BI — با استک مدرن و تحویل سورس کامل.
                </p>
                <ul className="mt-6 space-y-2.5 text-sm text-ink/90">
                  {["Studio — وب و موبایل", "Flow — اتوماسیون سازمانی", "Insight — هوش تجاری"].map((x) => (
                    <li key={x} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-sm bg-amber" /> {x}
                    </li>
                  ))}
                </ul>
                <span className="inline-flex items-center gap-2 mt-8 text-amber font-bold text-sm">
                  محصولات نرم‌افزاری <IArrow className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform" />
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ======= محصولات منتخب ======= */}
      <section className="border-y border-linesoft bg-deep/50 py-24 relative overflow-hidden">
        <div className="absolute inset-0 gridlines opacity-50 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead kicker="محصولات منتخب" title="آنچه بیشتر از همه می‌سازیم" />
            <Reveal delay={150}>
              <Link to="/products" className="btn btn-ghost !py-2.5 text-sm">
                همه محصولات <IArrow className="w-4 h-4" />
              </Link>
            </Reveal>
          </div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-12">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={i * 110}>
                <Link to={`/products/${p.slug}`} className="card-hover group block h-full rounded-xl border border-line bg-panel/80 p-7">
                  <div className="flex items-center justify-between">
                    <span className={`w-12 h-12 rounded-lg border flex items-center justify-center ${p.cat === "شبکه" ? "text-teal border-teal/40 bg-teal/10" : "text-amber border-amber/40 bg-amber/10"}`}>
                      {productIcon(p.icon, "w-6 h-6")}
                    </span>
                    <span className="chip">{p.cat}</span>
                  </div>
                  <h3 className="font-display text-2xl text-ink mt-5 group-hover:text-teal transition-colors" dir="ltr" style={{ textAlign: "right" }}>
                    {p.name}
                  </h3>
                  <p className="text-mute text-sm leading-7 mt-2">{p.tagline}</p>
                  <span className="inline-flex items-center gap-2 mt-6 text-sm font-bold text-teal">
                    جزئیات محصول <IArrow className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ======= آمار ======= */}
      <section className="max-w-7xl mx-auto px-5 lg:px-8 py-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((st, i) => (
            <Reveal key={st.label} delay={i * 120} variant="z">
              <div className="rounded-xl border border-line bg-panel/60 px-6 py-9 text-center card-hover">
                <CountUp
                  to={st.to}
                  decimals={(st as { decimals?: number }).decimals ?? 0}
                  suffix={st.suffix}
                  className="font-display text-4xl md:text-5xl text-teal text-glow"
                />
                <div className="text-mute text-sm mt-3">{st.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ======= وبلاگ + نبض روزانه ======= */}
      <section className="border-t border-linesoft bg-deep/40 py-24">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-16">
          <div>
            <SectionHead kicker="وبلاگ فنی" title="یادداشت‌های تیم" desc="تجربه‌های واقعی پروژه‌ها، بدون تعارف و بدون کلمات بازاریابی." />
            <div className="mt-10 space-y-4">
              {POSTS.slice(0, 3).map((post, i) => (
                <Reveal key={post.slug} delay={i * 120}>
                  <Link to={`/blog/${post.slug}`} className="card-hover group flex items-center gap-5 rounded-xl border border-line bg-panel/70 p-5">
                    <span className="w-12 h-12 shrink-0 rounded-lg border border-line bg-deep flex items-center justify-center text-teal">
                      {productIcon(post.icon, "w-6 h-6")}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-[15px] font-bold text-ink leading-7 group-hover:text-teal transition-colors">
                        {post.title.length > 68 ? post.title.slice(0, 68) + "…" : post.title}
                      </span>
                      <span className="text-xs text-faint mt-1 block">{post.date} · {post.read} مطالعه</span>
                    </span>
                    <IArrow className="w-5 h-5 text-faint group-hover:text-teal group-hover:-translate-x-1.5 transition-all shrink-0" />
                  </Link>
                </Reveal>
              ))}
            </div>
            <Reveal delay={200}>
              <Link to="/blog" className="btn btn-ghost mt-8 !py-2.5 text-sm">
                همه یادداشت‌ها <IArrow className="w-4 h-4" />
              </Link>
            </Reveal>
          </div>

          <div>
            <SectionHead kicker="نبض شرکت" title="امروز در KEAC چه می‌گذرد؟" desc="گزارش شفاف فعالیت‌های روزانه تیم — همان چیزی که در صفحه «فعالیت روزانه» زنده نگه می‌داریم." />
            <div className="mt-10 rounded-xl border border-line bg-panel/70 overflow-hidden">
              {today.map((a, i) => (
                <Reveal key={a.id} delay={i * 90}>
                  <div className="flex items-center gap-4 px-5 py-4 border-b border-linesoft last:border-0 hover:bg-panel2/60 transition-colors">
                    <span className="font-mono text-xs text-faint w-12 shrink-0" dir="ltr">{a.time}</span>
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: CAT_COLOR[a.cat] }} />
                    <span className="flex-1 min-w-0 text-sm font-semibold text-ink truncate">{a.title}</span>
                    <span
                      className={`chip !text-[10px] shrink-0 ${
                        a.status === "انجام‌شده" ? "!text-teal !border-teal/40" : a.status === "در جریان" ? "!text-amber !border-amber/40" : "!text-faint"
                      }`}
                    >
                      {a.status}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={200}>
              <Link to="/activities" className="btn btn-amber mt-8 !py-2.5 text-sm">
                <span className="w-2 h-2 rounded-full bg-[#3a2806] dot-live" /> صفحه فعالیت روزانه <IArrow className="w-4 h-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ======= CTA ======= */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 gridlines pointer-events-none" />
        <svg className="absolute -left-24 top-1/2 -translate-y-1/2 w-[420px] h-[420px] text-teal/15 spin-slow" viewBox="0 0 200 200" fill="none" aria-hidden>
          <circle cx="100" cy="100" r="96" stroke="currentColor" strokeDasharray="4 8" />
          <circle cx="100" cy="100" r="70" stroke="currentColor" strokeDasharray="2 10" />
        </svg>
        <svg className="absolute -right-16 -bottom-16 w-[300px] h-[300px] text-amber/15 spin-slower" viewBox="0 0 200 200" fill="none" aria-hidden>
          <circle cx="100" cy="100" r="96" stroke="currentColor" strokeDasharray="4 8" />
        </svg>
        <div className="relative max-w-4xl mx-auto px-5 text-center">
          <Reveal variant="z">
            <p className="chip mx-auto mb-6 !text-amber !border-amber/40">ظرفیت پروژه جدید: ۲ اسلات در دی‌ماه</p>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.3] text-ink">
              پروژه بعدی‌تان را با <span className="text-teal">ما</span> کلید بزنید
            </h2>
            <p className="text-mute text-lg leading-9 mt-6 max-w-2xl mx-auto">
              اولین جلسه بررسی فنی رایگان است؛ حتی اگر در نهایت با کس دیگری کار کنید، نقشه راه با شما می‌ماند.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <Link to="/contact" className="btn btn-primary">
                درخواست جلسه مشاوره <IArrow className="w-5 h-5" />
              </Link>
              <Link to="/about" className="btn btn-ghost">آشنایی با شرکت</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </Shell>
  );
}
