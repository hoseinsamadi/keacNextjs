import { useState } from "react";
import { Link } from "react-router-dom";
import { Reveal, SectionHead, faNum } from "../ui";
import { PRODUCTS } from "../data";
import { productIcon, IArrow, ICheck } from "../icons";
import { Shell } from "../chrome";
import NetworkBg from "../components/NetworkBg";

const TABS = ["همه", "شبکه", "نرم‌افزار"] as const;

export default function Products() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("همه");
  const list = PRODUCTS.filter((p) => tab === "همه" || p.cat === tab);

  return (
    <Shell title="محصولات و خدمات | KEAC">
      <section className="relative overflow-hidden border-b border-linesoft">
        <div className="absolute inset-0 gridlines" />
        <NetworkBg density={26} />
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 pt-20 pb-14">
          <Reveal>
            <SectionHead
              kicker="محصولات و خدمات"
              title="هر آنچه یک سازمان برای «وصل ماندن» لازم دارد"
              desc="هشت محصول بسته‌بندی‌شده در دو خانواده شبکه و نرم‌افزار. هر محصول گارانتی، مستندات و مسئول مشخص دارد — نه یک فاکتور مبهم."
            />
          </Reveal>
          <Reveal delay={150}>
            <div className="flex flex-wrap items-center gap-3 mt-10">
              {TABS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-5 py-2.5 rounded-lg text-sm font-bold border transition-all duration-300 ${
                    tab === t
                      ? "border-teal/60 bg-teal/10 text-teal shadow-[0_0_30px_-10px_rgba(55,214,195,0.4)]"
                      : "border-line text-mute hover:text-ink hover:border-teal/30"
                  }`}
                >
                  {t}
                  <span className="mr-2 text-xs opacity-70">
                    {faNum(t === "همه" ? PRODUCTS.length : PRODUCTS.filter((p) => p.cat === t).length)}
                  </span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-6">
          {list.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 120}>
              <Link to={`/products/${p.slug}`} className="card-hover group block h-full rounded-xl border border-line bg-panel/70 p-8 relative overflow-hidden">
                <div className="flex items-start justify-between gap-4">
                  <span className={`w-14 h-14 rounded-xl border flex items-center justify-center transition-transform duration-500 group-hover:scale-110 ${p.cat === "شبکه" ? "text-teal border-teal/40 bg-teal/10" : "text-amber border-amber/40 bg-amber/10"}`}>
                    {productIcon(p.icon, "w-7 h-7")}
                  </span>
                  <div className="text-left">
                    <span className="chip">{p.cat}</span>
                    <div className="text-[11px] text-faint font-mono mt-2 tracking-wider" dir="ltr">{p.en}</div>
                  </div>
                </div>
                <h2 className="font-display text-3xl text-ink mt-6 group-hover:text-teal transition-colors" dir="ltr" style={{ textAlign: "right" }}>
                  {p.name}
                </h2>
                <p className="text-mute leading-8 mt-3">{p.tagline}</p>
                <ul className="mt-6 space-y-2.5">
                  {p.features.slice(0, 3).map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-ink/85 leading-7">
                      <ICheck className="w-4 h-4 text-teal shrink-0 mt-1.5" /> {f}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between mt-8 pt-5 border-t border-linesoft">
                  <span className="text-sm font-bold text-teal inline-flex items-center gap-2">
                    جزئیات و مشخصات <IArrow className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform" />
                  </span>
                  {p.features.length > 3 && <span className="text-xs text-faint">+ {faNum(p.features.length - 3)} مورد دیگر</span>}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 lg:px-8 pb-24">
        <Reveal variant="z">
          <div className="rounded-xl border border-amber/30 bg-gradient-to-l from-amber/10 to-transparent p-8 md:p-10 flex flex-wrap items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-2xl md:text-3xl text-ink">ترکیب شبکه و نرم‌افزار؟ تخصص اصلی ماست.</h3>
              <p className="text-mute mt-2 leading-8">بیشتر مشتریان ما هر دو بازو را با هم گرفته‌اند — یک قرارداد، یک مسئول، صفر بهانه.</p>
            </div>
            <Link to="/contact" className="btn btn-amber">درخواست ارزیابی رایگان <IArrow className="w-5 h-5" /></Link>
          </div>
        </Reveal>
      </section>
    </Shell>
  );
}
