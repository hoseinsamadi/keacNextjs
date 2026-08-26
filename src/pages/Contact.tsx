import { useState } from "react";
import { Reveal, SectionHead } from "../ui";
import { IPhone, IMail, IPin, IClock, ISend, ICheck, IChevron, IBolt } from "../icons";
import { Shell } from "../chrome";
import NetworkBg from "../components/NetworkBg";

const FAQS = [
  {
    q: "اولین جلسه مشاوره واقعاً رایگان است؟",
    a: "بله؛ جلسه بررسی نیاز (حضوری در رشت یا آنلاین) بدون هیچ هزینه و تعهدی برگزار می‌شود و خروجی‌اش یک صفحه پیشنهاد فنی است — حتی اگر ادامه ندهید.",
  },
  {
    q: "پشتیبانی بعد از تحویل پروژه چگونه است؟",
    a: "همه محصولات شبکه ۱۸ ماه و محصولات نرم‌افزاری ۱۲ ماه گارانتی دارند. بعد از آن می‌توانید قرارداد مانیتورینگ و نگهداری ماهانه (KEAC Monitor) ببندید.",
  },
  {
    q: "آیا خارج از گیلان هم پروژه می‌گیرید؟",
    a: "دفتر ما در رشت است ولی پروژه‌های فعال در مازندران، گلستان، اردبیل، قزوین و تهران داریم. بخش نرم‌افزار کاملاً ریموت‌فرندلی است.",
  },
];

const SUBJECTS = ["مشاوره محصولات شبکه", "مشاوره توسعه نرم‌افزار", "پشتیبانی و خرابی", "همکاری / استخدام", "سایر موضوعات"];

export default function Contact() {
  const [form, setForm] = useState({ name: "", contact: "", subject: SUBJECTS[0], msg: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [faq, setFaq] = useState<number | null>(0);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (form.name.trim().length < 3) errs.name = "نام را کامل وارد کنید.";
    const okPhone = /^۰۹\d{9}$|^09\d{9}$/.test(form.contact.replace(/\s/g, ""));
    const okMail = form.contact.includes("@");
    if (!okPhone && !okMail) errs.contact = "شماره موبایل (۰۹xxxxxxxxx) یا ایمیل معتبر وارد کنید.";
    if (form.msg.trim().length < 10) errs.msg = "کمی بیشتر توضیح دهید (حداقل ۱۰ کاراکتر).";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setState("sending");
    setTimeout(() => setState("done"), 1100);
  };

  const field =
    "w-full bg-panel border rounded-lg px-4 py-3 text-ink placeholder:text-faint focus:outline-none transition-colors text-sm";

  return (
    <Shell title="تماس با ما | KEAC">
      <section className="relative overflow-hidden border-b border-linesoft">
        <div className="absolute inset-0 gridlines" />
        <NetworkBg density={22} />
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 pt-20 pb-14">
          <SectionHead
            kicker="تماس با ما"
            title="حرف‌تان را بزنید؛ بقیه‌اش با ما"
            desc="فرم، تلفن یا ایمیل — هر راهی که راحت‌ترید. در ساعات اداری زیر ۲ ساعت پاسخ می‌دهیم؛ خارج از ساعات، صبح اولین روز کاری."
          />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 lg:px-8 py-16 grid lg:grid-cols-12 gap-10">
        {/* فرم */}
        <Reveal className="lg:col-span-7">
          {state === "done" ? (
            <div className="rounded-xl border border-teal/40 bg-teal/5 p-12 text-center h-full flex flex-col items-center justify-center">
              <span className="w-20 h-20 rounded-full border-2 border-teal flex items-center justify-center text-teal mx-auto">
                <ICheck className="w-10 h-10" />
              </span>
              <h2 className="font-display text-3xl text-ink mt-7">پیام شما رسید!</h2>
              <p className="text-mute leading-8 mt-3 max-w-md">
                ممنون {form.name} عزیز؛ کارشناس مربوط به «{form.subject}» حداکثر تا ۲ ساعت کاری با شما تماس می‌گیرد.
              </p>
              <button
                className="btn btn-ghost mt-8 !py-2.5 text-sm"
                onClick={() => {
                  setForm({ name: "", contact: "", subject: SUBJECTS[0], msg: "" });
                  setState("idle");
                }}
              >
                ارسال پیام جدید
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="rounded-xl border border-line bg-panel/70 p-8 md:p-10" noValidate>
              <h2 className="font-display text-2xl text-ink mb-7">فرم درخواست</h2>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-mute mb-2">نام و نام خانوادگی *</label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="مثلاً: رضا کاظمی"
                    className={`${field} ${errors.name ? "border-[#e0604f]" : "border-line focus:border-teal/60"}`}
                  />
                  {errors.name && <p className="text-[#e0604f] text-xs mt-1.5">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm text-mute mb-2">موبایل یا ایمیل *</label>
                  <input
                    value={form.contact}
                    onChange={(e) => setForm({ ...form, contact: e.target.value })}
                    placeholder="۰۹۱۲xxxxxxx یا you@mail.ir"
                    className={`${field} ${errors.contact ? "border-[#e0604f]" : "border-line focus:border-teal/60"}`}
                  />
                  {errors.contact && <p className="text-[#e0604f] text-xs mt-1.5">{errors.contact}</p>}
                </div>
              </div>
              <div className="mt-5">
                <label className="block text-sm text-mute mb-2">موضوع</label>
                <select
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className={`${field} border-line focus:border-teal/60 appearance-none cursor-pointer`}
                >
                  {SUBJECTS.map((s) => (
                    <option key={s} value={s} className="bg-panel">
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-5">
                <label className="block text-sm text-mute mb-2">توضیح درخواست *</label>
                <textarea
                  rows={5}
                  value={form.msg}
                  onChange={(e) => setForm({ ...form, msg: e.target.value })}
                  placeholder="اندازه سازمان، وضعیت فعلی و چیزی که لازم دارید را بنویسید…"
                  className={`${field} resize-none ${errors.msg ? "border-[#e0604f]" : "border-line focus:border-teal/60"}`}
                />
                {errors.msg && <p className="text-[#e0604f] text-xs mt-1.5">{errors.msg}</p>}
              </div>
              <button type="submit" className="btn btn-primary w-full justify-center mt-7 !py-3.5" disabled={state === "sending"}>
                {state === "sending" ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-[#052722] border-t-transparent rounded-full animate-spin" /> در حال ارسال…
                  </span>
                ) : (
                  <>
                    ارسال پیام <ISend className="w-5 h-5 -scale-x-100" />
                  </>
                )}
              </button>
            </form>
          )}
        </Reveal>

        {/* اطلاعات تماس */}
        <div className="lg:col-span-5 space-y-5">
          {[
            { I: IPin, t: "نشانی دفتر مرکزی", v: "رشت، بلوار گلسار، برج کاسپین، طبقه ۵، واحد ۵۰۴" },
            { I: IPhone, t: "تلفن ثابت", v: "۰۱۳-۳۳۵۵۶۶۷۷", ltr: true },
            { I: IMail, t: "ایمیل", v: "info@keac.ir", ltr: true },
            { I: IClock, t: "ساعات کاری", v: "شنبه تا چهارشنبه ۸ تا ۱۷ · پنجشنبه ۸ تا ۱۳" },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 100}>
              <div className="card-hover flex items-center gap-5 rounded-xl border border-line bg-panel/70 p-5">
                <span className="w-12 h-12 shrink-0 rounded-xl border border-teal/40 bg-teal/10 flex items-center justify-center text-teal">
                  <c.I className="w-6 h-6" />
                </span>
                <div>
                  <div className="text-xs text-faint">{c.t}</div>
                  <div className="font-bold text-ink mt-1" dir={c.ltr ? "ltr" : undefined} style={c.ltr ? { textAlign: "right" } : undefined}>
                    {c.v}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
          <Reveal delay={400}>
            <div className="rounded-xl border border-amber/40 bg-amber/5 p-6">
              <div className="flex items-center gap-3">
                <IBolt className="w-6 h-6 text-amber" />
                <h3 className="font-display text-xl text-ink">خط اضطراری NOC</h3>
              </div>
              <p className="text-mute text-sm leading-7 mt-2">
                مشتریان دارای قرارداد پشتیبانی، در هر ساعت از شبانه‌روز با شماره اختصاصی خودشان تماس بگیرند — میانگین پاسخ
                زیر ۱۵ دقیقه.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* سوالات */}
      <section className="max-w-4xl mx-auto px-5 lg:px-8 pb-24">
        <Reveal>
          <h2 className="font-display text-2xl md:text-3xl text-ink mb-8">سوالاتی که زیاد می‌پرسند</h2>
        </Reveal>
        <div className="space-y-3.5">
          {FAQS.map((f, i) => (
            <Reveal key={i} delay={i * 100}>
              <button
                onClick={() => setFaq(faq === i ? null : i)}
                className={`w-full text-right rounded-xl border px-6 py-5 transition-colors ${
                  faq === i ? "border-teal/50 bg-panel" : "border-line bg-panel/50 hover:border-teal/30"
                }`}
              >
                <span className="flex items-center justify-between gap-4">
                  <span className="font-bold text-ink">{f.q}</span>
                  <IChevron className={`w-5 h-5 text-teal shrink-0 transition-transform duration-300 ${faq === i ? "rotate-180" : ""}`} />
                </span>
                <span
                  className={`block overflow-hidden transition-all duration-500 ${
                    faq === i ? "max-h-40 opacity-100 mt-3" : "max-h-0 opacity-0"
                  }`}
                >
                  <span className="text-mute text-sm leading-8">{f.a}</span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </section>
    </Shell>
  );
}
