import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Reveal, SectionHead, faNum } from "../ui";
import { ACTIVITIES, ACTIVITY_CATS, CAT_COLOR } from "../data";
import { ISearch, IArrow, ICalendar, IClock, IBolt, ICheck } from "../icons";
import { Shell } from "../chrome";
import NetworkBg from "../components/NetworkBg";

function LiveClock({ big = false }: { big?: boolean }) {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const time = new Intl.DateTimeFormat("fa-IR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(now);
  const date = new Intl.DateTimeFormat("fa-IR", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(now);
  return (
    <div className="text-left">
      <div className={`font-display text-teal text-glow tabular-nums ${big ? "text-5xl md:text-7xl" : "text-3xl"}`} dir="ltr">{time}</div>
      <div className={`text-mute mt-2 ${big ? "text-base" : "text-xs"}`}>{date}</div>
    </div>
  );
}

const STATUS_STYLE: Record<string, string> = {
  "انجام‌شده": "!text-teal !border-teal/40 bg-teal/5",
  "در جریان": "!text-amber !border-amber/40 bg-amber/5",
  "برنامه‌ریزی‌شده": "!text-faint !border-line",
};

export default function Activities() {
  const [cat, setCat] = useState<string>("همه");
  const [q, setQ] = useState("");

  const filtered = useMemo(
    () =>
      ACTIVITIES.filter(
        (a) =>
          (cat === "همه" || a.cat === cat) &&
          (q.trim() === "" || (a.title + a.desc + a.owner).includes(q.trim()))
      ),
    [cat, q]
  );

  const groups = useMemo(() => {
    const order: string[] = [];
    const map = new Map<string, typeof ACTIVITIES>();
    for (const a of filtered) {
      if (!map.has(a.day)) {
        map.set(a.day, []);
        order.push(a.day);
      }
      map.get(a.day)!.push(a);
    }
    return order.map((day) => ({ day, date: map.get(day)![0].date, items: map.get(day)! }));
  }, [filtered]);

  const done = ACTIVITIES.filter((a) => a.status === "انجام‌شده").length;
  const ongoing = ACTIVITIES.filter((a) => a.status === "در جریان").length;
  const today = ACTIVITIES.filter((a) => a.day === "امروز").length;

  return (
    <Shell title="فعالیت روزانه شرکت | KEAC">
      {/* سربرگ با ساعت زنده */}
      <section className="relative overflow-hidden border-b border-linesoft">
        <div className="absolute inset-0 gridlines" />
        <NetworkBg density={24} />
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 pt-16 pb-12">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <Reveal>
                <div className="chip mb-5 !text-teal !border-teal/30">
                  <span className="w-2 h-2 rounded-full bg-teal dot-live" />
                  گزارش شفاف · به‌روزرسانی هر روز کاری
                </div>
                <h1 className="font-display text-4xl md:text-6xl leading-[1.25] text-ink">
                  امروز در شرکت <span className="text-amber">چه می‌گذرد؟</span>
                </h1>
                <p className="text-mute leading-9 mt-5 max-w-xl">
                  فعالیت روزانه تیم KEAC — از پیکربندی فایروال تا دیپلوی نرم‌افزار — همین‌جا ثبت می‌شود تا مشتریانمان دقیقاً
                  بدانند بابت چه چیزی پول می‌دهند.
                </p>
              </Reveal>
            </div>
            <Reveal variant="l" delay={150}>
              <div className="rounded-xl border border-line bg-abyss/70 backdrop-blur p-7">
                <div className="flex items-center justify-between gap-6">
                  <div>
                    <div className="chip !text-[10px] mb-3"><IClock className="w-3.5 h-3.5" /> به وقت تهران</div>
                    <LiveClock big />
                  </div>
                  <div className="hidden sm:block w-px h-24 bg-linesoft" />
                  <div className="hidden sm:grid gap-3 text-sm">
                    <div className="flex items-center gap-2 text-mute"><ICheck className="w-4 h-4 text-teal" /> {faNum(done)} مورد انجام‌شده</div>
                    <div className="flex items-center gap-2 text-mute"><IBolt className="w-4 h-4 text-amber" /> {faNum(ongoing)} مورد در جریان</div>
                    <div className="flex items-center gap-2 text-mute"><ICalendar className="w-4 h-4 text-[#7fd0ff]" /> {faNum(today)} فعالیت امروز</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* فیلترها */}
      <section className="max-w-7xl mx-auto px-5 lg:px-8 pt-12">
        <Reveal>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex flex-wrap gap-2.5">
              {ACTIVITY_CATS.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold border transition-all duration-300 flex items-center gap-2 ${
                    cat === c ? "border-teal/60 bg-teal/10 text-teal" : "border-line text-mute hover:text-ink"
                  }`}
                >
                  {c !== "همه" && <span className="w-2 h-2 rounded-full" style={{ background: CAT_COLOR[c] }} />}
                  {c}
                </button>
              ))}
            </div>
            <div className="relative ms-auto w-full sm:w-72">
              <ISearch className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-faint" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="جستجو در فعالیت‌ها…"
                className="w-full bg-panel border border-line rounded-lg py-2.5 pr-10 pl-4 text-sm text-ink placeholder:text-faint focus:outline-none focus:border-teal/60 transition-colors"
              />
            </div>
          </div>
        </Reveal>
      </section>

      {/* تایم‌لاین */}
      <section className="max-w-7xl mx-auto px-5 lg:px-8 py-12 pb-20">
        {groups.length === 0 && (
          <div className="text-center py-24 border border-dashed border-line rounded-xl">
            <p className="font-display text-2xl text-ink">چیزی پیدا نشد!</p>
            <p className="text-mute mt-2 text-sm">عبارت جستجو یا دسته را تغییر دهید.</p>
          </div>
        )}

        <div className="space-y-14">
          {groups.map((g, gi) => (
            <Reveal key={g.day} delay={Math.min(gi * 80, 240)}>
              <div className="flex items-center gap-4 mb-6">
                <h2 className="font-display text-2xl md:text-3xl text-ink">{g.day}</h2>
                <span className="text-xs text-faint">{g.date}</span>
                <span className="chip !text-[11px]">{faNum(g.items.length)} فعالیت</span>
                <span className="h-px flex-1 bg-linesoft" />
              </div>
              <div className="relative pr-7 md:pr-9">
                <span className="tl-line absolute right-[7px] md:right-[11px] top-2 bottom-2 w-px" />
                <div className="space-y-4">
                  {g.items.map((a) => (
                    <div key={a.id} className="relative">
                      <span
                        className="absolute -right-7 md:-right-9 top-6 w-[15px] h-[15px] rounded-full border-2 border-abyss"
                        style={{ background: CAT_COLOR[a.cat] }}
                      />
                      <div className="card-hover rounded-xl border border-line bg-panel/70 p-5 md:p-6">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="font-mono text-xs text-faint border border-line rounded px-2 py-1 bg-deep" dir="ltr">{a.time}</span>
                          <span className="chip !text-[11px]" style={{ color: CAT_COLOR[a.cat], borderColor: `${CAT_COLOR[a.cat]}55` }}>
                            {a.cat}
                          </span>
                          <span className={`chip !text-[11px] ms-auto ${STATUS_STYLE[a.status]}`}>{a.status}</span>
                        </div>
                        <h3 className="font-bold text-lg text-ink mt-3">{a.title}</h3>
                        <p className="text-mute text-sm leading-7 mt-1.5">{a.desc}</p>
                        <p className="text-xs text-faint mt-3 flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-panel2 border border-line flex items-center justify-center text-[9px] font-bold text-teal">
                            {a.owner.trim()[0]}
                          </span>
                          مسئول: {a.owner}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100}>
          <div className="mt-16 rounded-xl border border-amber/30 bg-amber/5 p-6 md:p-8 flex flex-wrap items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <span className="w-12 h-12 rounded-xl border border-amber/40 bg-amber/10 flex items-center justify-center text-amber">
                <IBolt className="w-6 h-6" />
              </span>
              <div>
                <h3 className="font-display text-xl text-ink">نیاز فوری پیش آمده؟</h3>
                <p className="text-mute text-sm mt-1">خط اضطراری NOC برای مشتریان قرارداددار، ۲۴ ساعته پاسخگوست.</p>
              </div>
            </div>
            <Link to="/contact" className="btn btn-amber !py-2.5 text-sm">
              تماس با پشتیبانی <IArrow className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>
      </section>
    </Shell>
  );
}
