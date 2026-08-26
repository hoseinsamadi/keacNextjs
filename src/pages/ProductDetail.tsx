import { Link, useParams } from "react-router-dom";
import { Reveal, faNum } from "../ui";
import { PRODUCTS } from "../data";
import { productIcon, IArrow, ICheck, IPhone } from "../icons";
import { Shell } from "../chrome";

export default function ProductDetail() {
  const { slug } = useParams();
  const p = PRODUCTS.find((x) => x.slug === slug);

  if (!p) {
    return (
      <Shell title="محصول یافت نشد | KEAC">
        <div className="max-w-3xl mx-auto px-5 py-32 text-center">
          <h1 className="font-display text-5xl text-ink">این محصول وجود ندارد!</h1>
          <p className="text-mute mt-4">شاید نشانی اشتباه است؛ سری به فهرست محصولات بزنید.</p>
          <Link to="/products" className="btn btn-primary mt-8">بازگشت به محصولات <IArrow className="w-5 h-5" /></Link>
        </div>
      </Shell>
    );
  }

  const related = PRODUCTS.filter((x) => x.cat === p.cat && x.slug !== p.slug).slice(0, 2);
  const accent = p.cat === "شبکه" ? "text-teal border-teal/40 bg-teal/10" : "text-amber border-amber/40 bg-amber/10";

  return (
    <Shell title={`${p.name} — ${p.tagline} | KEAC`}>
      <section className="relative border-b border-linesoft overflow-hidden">
        <div className="absolute inset-0 gridlines" />
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 pt-16 pb-12">
          <Reveal>
            <nav className="text-sm text-faint flex items-center gap-2">
              <Link to="/" className="hover:text-teal transition-colors">خانه</Link>
              <span>/</span>
              <Link to="/products" className="hover:text-teal transition-colors">محصولات</Link>
              <span>/</span>
              <span className="text-mute">{p.name}</span>
            </nav>
          </Reveal>
          <div className="flex flex-wrap items-center gap-6 mt-8">
            <Reveal variant="z">
              <span className={`w-20 h-20 rounded-2xl border flex items-center justify-center ${accent}`}>
                {productIcon(p.icon, "w-10 h-10")}
              </span>
            </Reveal>
            <div className="flex-1">
              <Reveal>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="chip">{p.cat}</span>
                  <span className="text-xs text-faint font-mono tracking-wider" dir="ltr">{p.en}</span>
                </div>
                <h1 className="font-display text-4xl md:text-6xl text-ink mt-3" dir="ltr" style={{ textAlign: "right" }}>{p.name}</h1>
                <p className="text-mute text-lg mt-2">{p.tagline}</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 lg:px-8 py-16 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7">
          <Reveal>
            <h2 className="font-display text-2xl text-ink mb-4">درباره محصول</h2>
            <p className="text-mute leading-9 text-[17px]">{p.desc}</p>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="font-display text-2xl text-ink mt-12 mb-5">امکانات کلیدی</h2>
            <ul className="space-y-3.5">
              {p.features.map((f, i) => (
                <li key={f} className="flex items-start gap-3.5 rounded-lg border border-line bg-panel/60 px-5 py-4">
                  <span className={`w-7 h-7 shrink-0 rounded-md border flex items-center justify-center text-xs font-bold ${accent}`}>
                    {faNum(i + 1)}
                  </span>
                  <span className="text-ink/90 leading-7 pt-0.5">{f}</span>
                  <ICheck className="w-5 h-5 text-teal mr-auto shrink-0 mt-1" />
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <Reveal delay={150}>
            <div className="rounded-xl border border-line bg-panel/70 overflow-hidden">
              <div className="px-6 py-4 border-b border-linesoft bg-deep/60">
                <h3 className="font-display text-xl text-ink">مشخصات فنی</h3>
              </div>
              <dl>
                {p.specs.map(([k, v]) => (
                  <div key={k} className="flex items-start justify-between gap-4 px-6 py-4 border-b border-linesoft last:border-0">
                    <dt className="text-sm text-faint shrink-0 pt-0.5">{k}</dt>
                    <dd className="text-sm font-bold text-ink text-left leading-7">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
          <Reveal delay={250}>
            <div className="rounded-xl border border-teal/30 bg-teal/5 p-7">
              <div className="flex items-center gap-3 mb-3">
                <IPhone className="w-6 h-6 text-teal" />
                <h3 className="font-display text-xl text-ink">مشاوره قبل از خرید</h3>
              </div>
              <p className="text-mute text-sm leading-7">
                مطمئن نیستید این محصول برای سازمان شما مناسب است؟ کارشناس ما در ۳۰ دقیقه تماس، بدون تعهد راهنمایی‌تان می‌کند.
              </p>
              <Link to="/contact" className="btn btn-primary w-full justify-center mt-5 !py-3 text-sm">
                درخواست تماس <IArrow className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-5 lg:px-8 pb-24">
          <Reveal>
            <h2 className="font-display text-2xl text-ink mb-6">محصولات هم‌خانواده</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-6">
            {related.map((r, i) => (
              <Reveal key={r.slug} delay={i * 120}>
                <Link to={`/products/${r.slug}`} className="card-hover group flex items-center gap-5 rounded-xl border border-line bg-panel/70 p-6">
                  <span className={`w-12 h-12 shrink-0 rounded-lg border flex items-center justify-center ${r.cat === "شبکه" ? "text-teal border-teal/40 bg-teal/10" : "text-amber border-amber/40 bg-amber/10"}`}>
                    {productIcon(r.icon, "w-6 h-6")}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block font-display text-xl text-ink group-hover:text-teal transition-colors" dir="ltr" style={{ textAlign: "right" }}>{r.name}</span>
                    <span className="text-sm text-mute line-clamp-1">{r.tagline}</span>
                  </span>
                  <IArrow className="w-5 h-5 text-faint group-hover:text-teal group-hover:-translate-x-1.5 transition-all shrink-0" />
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </Shell>
  );
}
