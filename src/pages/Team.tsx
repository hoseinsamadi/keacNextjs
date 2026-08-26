import { Link } from "react-router-dom";
import { Reveal, SectionHead } from "../ui";
import { TEAM } from "../data";
import { ILinkedin, ITelegram, IMail, IArrow, IUsers } from "../icons";
import { Shell } from "../chrome";
import NetworkBg from "../components/NetworkBg";

export default function Team() {
  return (
    <Shell title="اعضای شرکت | KEAC">
      <section className="relative overflow-hidden border-b border-linesoft">
        <div className="absolute inset-0 gridlines" />
        <NetworkBg density={24} />
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 pt-20 pb-14">
          <SectionHead
            kicker="اعضای شرکت"
            title="آدم‌های پشت uptime"
            desc="تیم ۲۰ نفره KEAC ترکیبی از مهندسان شبکه با خاک رک‌خورده و توسعه‌دهندگانی است که شب‌ها پای دیپلوی می‌مانند. این‌ها شش نفری‌اند که مسئولیت فنی شرکت روی دوششان است."
          />
          <Reveal delay={150}>
            <div className="flex flex-wrap gap-3 mt-8">
              {["۲۰ نفر تیم تخصصی", "۶ مدرک بین‌المللی فعال", "شیفت شب مستقر NOC", "میانگین سابقه ۹ سال"].map((c) => (
                <span key={c} className="chip !text-teal !border-teal/30">
                  <IUsers className="w-3.5 h-3.5" /> {c}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {TEAM.map((m, i) => (
            <Reveal key={m.name} delay={(i % 3) * 130}>
              <article className="card-hover group rounded-xl border border-line bg-panel/70 overflow-hidden h-full flex flex-col">
                <div className="relative overflow-hidden aspect-[4/5]">
                  <img
                    src={m.img}
                    alt={m.name}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.04] transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/10 to-transparent" />
                  <div className="absolute top-4 left-4 flex gap-2 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    {[ILinkedin, ITelegram, IMail].map((I, j) => (
                      <a
                        key={j}
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="w-9 h-9 rounded-lg bg-abyss/80 backdrop-blur border border-line flex items-center justify-center text-mute hover:text-teal hover:border-teal/60 transition-colors"
                        aria-label={`ارتباط با ${m.name}`}
                      >
                        <I className="w-4 h-4" />
                      </a>
                    ))}
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-5">
                    <h2 className="font-display text-2xl text-ink">{m.name}</h2>
                    <p className="text-amber text-sm font-bold mt-0.5">{m.role}</p>
                    <p className="text-[11px] text-faint font-mono tracking-wider" dir="ltr" style={{ textAlign: "right" }}>{m.en}</p>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <p className="text-mute text-sm leading-7 flex-1">{m.bio}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {m.skills.map((s) => (
                      <span key={s} className="chip !text-[11px]">{s}</span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 lg:px-8 pb-24">
        <Reveal variant="z">
          <div className="relative overflow-hidden rounded-xl border border-line bg-deep p-8 md:p-12">
            <div className="absolute inset-0 gridlines opacity-60" />
            <div className="relative flex flex-wrap items-center justify-between gap-6">
              <div>
                <h3 className="font-display text-3xl text-ink">جایی برای نفر هفتم هست</h3>
                <p className="text-mute mt-2 leading-8 max-w-xl">
                  همیشه دنبال مهندس شبکه و توسعه‌دهنده‌ایم که مستندات را دوست داشته باشد و ساعت ۳ صبح، گوشی‌اش روشن باشد.
                </p>
              </div>
              <Link to="/contact" className="btn btn-primary">
                ارسال رزومه <IArrow className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </Shell>
  );
}
