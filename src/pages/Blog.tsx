import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Reveal, SectionHead } from "../ui";
import { POSTS } from "../data";
import { productIcon, IArrow, ICalendar, IClock, IUsers } from "../icons";
import { Shell } from "../chrome";

export default function Blog() {
  const cats = useMemo(() => ["همه", ...Array.from(new Set(POSTS.map((p) => p.cat)))], []);
  const [cat, setCat] = useState("همه");
  const list = POSTS.filter((p) => cat === "همه" || p.cat === cat);
  const [featured, ...rest] = list;

  return (
    <Shell title="وبلاگ فنی | KEAC">
      <section className="relative overflow-hidden border-b border-linesoft">
        <div className="absolute inset-0 gridlines" />
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 pt-20 pb-14">
          <SectionHead
            kicker="وبلاگ KEAC"
            title="یادداشت‌هایی از خط مقدم پروژه‌ها"
            desc="اینجا خبرنامه بازاریابی نیست؛ تجربه‌های واقعی مهندسان ماست — همان چیزهایی که در جلسات فنی داخلی می‌گوییم."
          />
          <Reveal delay={150}>
            <div className="flex flex-wrap gap-3 mt-9">
              {cats.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`px-5 py-2.5 rounded-lg text-sm font-bold border transition-all duration-300 ${
                    cat === c ? "border-teal/60 bg-teal/10 text-teal" : "border-line text-mute hover:text-ink"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 lg:px-8 py-16">
        {featured && (
          <Reveal variant="z">
            <Link
              to={`/blog/${featured.slug}`}
              className="card-hover group grid md:grid-cols-5 gap-0 rounded-xl border border-line bg-panel/70 overflow-hidden mb-8"
            >
              <div className="md:col-span-2 relative bg-deep flex items-center justify-center p-10 min-h-[220px] overflow-hidden">
                <div className="absolute inset-0 gridlines" />
                <span className="absolute -bottom-8 -left-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  {productIcon(featured.icon, "w-44 h-44 text-teal")}
                </span>
                <span className="relative w-24 h-24 rounded-2xl border border-teal/40 bg-teal/10 flex items-center justify-center text-teal floaty">
                  {productIcon(featured.icon, "w-12 h-12")}
                </span>
                <span className="absolute top-5 right-5 chip !text-amber !border-amber/40">یادداشت ویژه</span>
              </div>
              <div className="md:col-span-3 p-8 md:p-10">
                <div className="flex flex-wrap items-center gap-3 text-xs text-faint">
                  <span className="chip">{featured.cat}</span>
                  <span className="flex items-center gap-1.5"><ICalendar className="w-3.5 h-3.5" /> {featured.date}</span>
                  <span className="flex items-center gap-1.5"><IClock className="w-3.5 h-3.5" /> {featured.read} مطالعه</span>
                </div>
                <h2 className="font-display text-2xl md:text-4xl text-ink leading-[1.4] mt-4 group-hover:text-teal transition-colors">
                  {featured.title}
                </h2>
                <p className="text-mute leading-8 mt-4">{featured.excerpt}</p>
                <div className="flex items-center justify-between mt-6">
                  <span className="flex items-center gap-2.5 text-sm text-ink">
                    <span className="w-9 h-9 rounded-full bg-panel2 border border-line flex items-center justify-center font-bold text-teal">
                      {featured.author.trim()[0]}
                    </span>
                    {featured.author} · {featured.role}
                  </span>
                  <span className="inline-flex items-center gap-2 text-teal font-bold text-sm">
                    خواندن <IArrow className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 120}>
              <Link to={`/blog/${p.slug}`} className="card-hover group block h-full rounded-xl border border-line bg-panel/70 p-7 relative overflow-hidden">
                <span className="absolute -top-6 -left-6 opacity-[0.07] group-hover:opacity-[0.14] transition-opacity">
                  {productIcon(p.icon, "w-32 h-32 text-teal")}
                </span>
                <div className="relative">
                  <div className="flex items-center gap-3 text-xs text-faint">
                    <span className="chip">{p.cat}</span>
                    <span>{p.date}</span>
                    <span>·</span>
                    <span>{p.read}</span>
                  </div>
                  <h2 className="font-display text-2xl text-ink leading-[1.45] mt-4 group-hover:text-teal transition-colors">{p.title}</h2>
                  <p className="text-mute text-sm leading-7 mt-3 line-clamp-3">{p.excerpt}</p>
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-linesoft">
                    <span className="flex items-center gap-2 text-xs text-mute">
                      <IUsers className="w-4 h-4 text-teal" /> {p.author}
                    </span>
                    <IArrow className="w-5 h-5 text-faint group-hover:text-teal group-hover:-translate-x-1.5 transition-all" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </Shell>
  );
}
