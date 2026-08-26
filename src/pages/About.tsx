import { Link } from "react-router-dom";
import { Reveal, SectionHead, CountUp, faNum } from "../ui";
import { NOC_IMG, TIMELINE, VALUES, CERTS, STATS } from "../data";
import { IArrow, IMedal, ICompass, ILayers, IBolt } from "../icons";
import { Shell } from "../chrome";

const VALUE_ICONS: Record<string, (p: { className?: string }) => React.JSX.Element> = {
  compass: ICompass,
  medal: IMedal,
  layers: ILayers,
  bolt: IBolt,
};

export default function About() {
  return (
    <Shell title="درباره ما | کیوان ارتباطات عصر کاسپین">
      {/* داستان */}
      <section className="relative overflow-hidden border-b border-linesoft">
        <div className="absolute inset-0 gridlines" />
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 pt-16 pb-20 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <SectionHead
              kicker="درباره KEAC"
              title="از یک رک کوچک در رشت تا مرکز عملیات ۲۴ ساعته"
              desc="سال ۱۳۹۴ با سه نفر و یک عقیده شروع کردیم: مشتری نباید برای فهمیدن وضعیت شبکه‌اش به ما وابسته باشد. امروز ۲۰ نفریم، ۸۵ مشتری فعال در ۵ استان داریم و هنوز همان عقیده را داریم."
            />
            <Reveal delay={200}>
              <div className="grid grid-cols-2 gap-4 mt-10">
                {STATS.map((st) => (
                  <div key={st.label} className="rounded-xl border border-line bg-panel/60 px-5 py-5">
                    <CountUp to={st.to} decimals={(st as { decimals?: number }).decimals ?? 0} suffix={st.suffix} className="font-display text-3xl text-teal" />
                    <div className="text-xs text-mute mt-1.5">{st.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal variant="l" delay={150}>
            <div className="relative">
              <div className="rounded-xl overflow-hidden border border-line glow-teal">
                <img src={NOC_IMG} alt="مرکز عملیات شبکه KEAC" className="w-full h-[380px] md:h-[460px] object-cover" />
              </div>
              <div className="absolute -bottom-6 right-6 rounded-xl border border-teal/40 bg-abyss/90 backdrop-blur px-6 py-4 floaty">
                <div className="font-display text-3xl text-teal">{faNum(24)}/۷</div>
                <div className="text-xs text-mute">پایش زنده شبکه مشتریان</div>
              </div>
              <div className="absolute -top-5 left-6 chip !text-amber !border-amber/40 bg-abyss/80 backdrop-blur">
                مرکز عملیات — رشت، گلسار
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* خط زمان */}
      <section className="max-w-4xl mx-auto px-5 lg:px-8 py-24">
        <SectionHead kicker="مسیر ما" title="ده سال در شش ایستگاه" />
        <div className="relative mt-14 pr-8 md:pr-10">
          <span className="tl-line absolute right-[9px] md:right-[13px] top-2 bottom-2 w-px" />
          <div className="space-y-10">
            {TIMELINE.map((t, i) => (
              <Reveal key={t.year} delay={i * 90}>
                <div className="relative">
                  <span className="absolute -right-8 md:-right-10 top-1.5 w-5 h-5 rounded-full border-2 border-abyss bg-teal" />
                  <div className="flex flex-wrap items-baseline gap-4">
                    <span className="font-display text-2xl text-amber">{t.year}</span>
                    <h3 className="font-display text-xl text-ink">{t.title}</h3>
                  </div>
                  <p className="text-mute leading-8 mt-2 max-w-xl">{t.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ارزش‌ها */}
      <section className="border-y border-linesoft bg-deep/50 py-24 relative overflow-hidden">
        <div className="absolute inset-0 gridlines opacity-50 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
          <SectionHead kicker="اصول کاری" title="چیزهایی که برایشان معامله نمی‌کنیم" />
          <div className="grid sm:grid-cols-2 gap-6 mt-12">
            {VALUES.map((v, i) => {
              const I = VALUE_ICONS[v.icon];
              return (
                <Reveal key={v.title} delay={(i % 2) * 120}>
                  <div className="card-hover h-full rounded-xl border border-line bg-panel/80 p-8 flex gap-6">
                    <span className="w-14 h-14 shrink-0 rounded-xl border border-amber/40 bg-amber/10 flex items-center justify-center text-amber">
                      <I className="w-7 h-7" />
                    </span>
                    <div>
                      <h3 className="font-display text-2xl text-ink">{v.title}</h3>
                      <p className="text-mute leading-8 mt-2">{v.desc}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* گواهی‌ها + CTA */}
      <section className="max-w-7xl mx-auto px-5 lg:px-8 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHead kicker="اعتبارنامه‌ها" title="مدارکی که پشت حرف‌هایمان هستند" />
            <Reveal delay={150}>
              <div className="flex flex-wrap gap-3 mt-8">
                {CERTS.map((c) => (
                  <span key={c} className="chip !py-2.5 !px-4 !text-sm !text-ink !border-teal/30 hover:!border-teal/60 transition-colors">
                    <IMedal className="w-4 h-4 text-amber" /> {c}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal variant="l">
            <div className="rounded-xl border border-teal/30 bg-teal/5 p-9 text-center">
              <h3 className="font-display text-3xl text-ink">با تیم ما آشنا شوید</h3>
              <p className="text-mute leading-8 mt-3">آدم‌هایی که جواب تلفن ساعت ۳ صبح را می‌دهند، همان‌هایی‌اند که پروژه شما را طراحی می‌کنند.</p>
              <div className="flex flex-wrap justify-center gap-4 mt-7">
                <Link to="/team" className="btn btn-primary">اعضای شرکت <IArrow className="w-5 h-5" /></Link>
                <Link to="/contact" className="btn btn-ghost">تماس با ما</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </Shell>
  );
}
