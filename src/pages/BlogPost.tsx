import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Reveal } from "../ui";
import { POSTS, TEAM } from "../data";
import { productIcon, IArrow, ICalendar, IClock, ILink, ITelegram, ILinkedin, IQuote, ICheck } from "../icons";
import { Shell } from "../chrome";

export default function BlogPost() {
  const { slug } = useParams();
  const post = POSTS.find((p) => p.slug === slug);
  const [copied, setCopied] = useState(false);

  if (!post) {
    return (
      <Shell title="پست یافت نشد | KEAC">
        <div className="max-w-3xl mx-auto px-5 py-32 text-center">
          <h1 className="font-display text-5xl text-ink">این یادداشت وجود ندارد!</h1>
          <p className="text-mute mt-4">شاید نشانی اشتباه است؛ سری به وبلاگ بزنید.</p>
          <Link to="/blog" className="btn btn-primary mt-8">بازگشت به وبلاگ <IArrow className="w-5 h-5" /></Link>
        </div>
      </Shell>
    );
  }

  const author = TEAM.find((m) => m.name === post.author);
  const related = POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {
      /* clipboard در دسترس نبود */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <Shell title={`${post.title} | وبلاگ KEAC`}>
      <section className="relative border-b border-linesoft overflow-hidden">
        <div className="absolute inset-0 gridlines" />
        <div className="absolute -top-20 left-0 opacity-[0.05] pointer-events-none">
          {productIcon(post.icon, "w-[380px] h-[380px] text-teal")}
        </div>
        <div className="relative max-w-4xl mx-auto px-5 lg:px-8 pt-14 pb-12">
          <Reveal>
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-mute hover:text-teal transition-colors">
              <IArrow className="w-4 h-4 rotate-180" /> بازگشت به وبلاگ
            </Link>
            <div className="flex flex-wrap items-center gap-3 mt-7">
              <span className="chip !text-teal !border-teal/40">{post.cat}</span>
              <span className="text-xs text-faint flex items-center gap-1.5"><ICalendar className="w-3.5 h-3.5" /> {post.date}</span>
              <span className="text-xs text-faint flex items-center gap-1.5"><IClock className="w-3.5 h-3.5" /> {post.read} مطالعه</span>
            </div>
            <h1 className="font-display text-3xl md:text-5xl text-ink leading-[1.45] mt-5">{post.title}</h1>
            <p className="text-mute text-lg leading-9 mt-5">{post.excerpt}</p>
            <div className="flex flex-wrap items-center gap-4 mt-8">
              {author?.img ? (
                <img src={author.img} alt={post.author} className="w-12 h-12 rounded-full object-cover border-2 border-teal/50" />
              ) : (
                <span className="w-12 h-12 rounded-full bg-panel2 border border-line flex items-center justify-center font-display text-xl text-teal">
                  {post.author.trim()[0]}
                </span>
              )}
              <div>
                <div className="font-bold text-ink">{post.author}</div>
                <div className="text-xs text-faint">{post.role} — KEAC</div>
              </div>
              <button onClick={copy} className="btn btn-ghost !py-2 !px-4 text-xs ms-auto">
                {copied ? <><ICheck className="w-4 h-4 text-teal" /> کپی شد!</> : <><ILink className="w-4 h-4" /> کپی لینک</>}
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-5 lg:px-8 py-14">
        <Reveal>
          <article className="prose-fa">
            {post.content.map((b, i) => {
              if (b.t === "h2") return <h2 key={i}>{b.text}</h2>;
              if (b.t === "quote")
                return (
                  <blockquote key={i} className="relative">
                    <IQuote className="w-7 h-7 text-amber/60 absolute -top-3 right-3" />
                    {b.text}
                  </blockquote>
                );
              if (b.t === "list")
                return (
                  <ul key={i}>
                    {b.items!.map((it, j) => (
                      <li key={j}>{it}</li>
                    ))}
                  </ul>
                );
              return <p key={i}>{b.text}</p>;
            })}
          </article>
        </Reveal>

        <Reveal delay={100}>
          <div className="flex flex-wrap items-center gap-3 mt-12 pt-8 border-t border-linesoft">
            <span className="text-sm text-mute">به اشتراک بگذارید:</span>
            <a href="#/" onClick={(e) => e.preventDefault()} className="w-10 h-10 rounded-lg border border-line flex items-center justify-center text-mute hover:text-teal hover:border-teal/60 hover:-translate-y-1 transition-all" aria-label="تلگرام">
              <ITelegram className="w-5 h-5" />
            </a>
            <a href="#/" onClick={(e) => e.preventDefault()} className="w-10 h-10 rounded-lg border border-line flex items-center justify-center text-mute hover:text-teal hover:border-teal/60 hover:-translate-y-1 transition-all" aria-label="لینکدین">
              <ILinkedin className="w-5 h-5" />
            </a>
            <button onClick={copy} className="w-10 h-10 rounded-lg border border-line flex items-center justify-center text-mute hover:text-teal hover:border-teal/60 hover:-translate-y-1 transition-all" aria-label="کپی لینک">
              {copied ? <ICheck className="w-5 h-5 text-teal" /> : <ILink className="w-5 h-5" />}
            </button>
          </div>
        </Reveal>

        {author && (
          <Reveal delay={150}>
            <div className="mt-10 rounded-xl border border-line bg-panel/70 p-7 flex flex-wrap items-center gap-6">
              <img src={author.img} alt={author.name} className="w-20 h-20 rounded-xl object-cover grayscale" />
              <div className="flex-1 min-w-[220px]">
                <div className="text-xs text-teal font-bold">نویسنده</div>
                <div className="font-display text-2xl text-ink mt-1">{author.name}</div>
                <div className="text-sm text-mute">{author.role}</div>
              </div>
              <Link to="/team" className="btn btn-ghost !py-2.5 text-sm">همه اعضا <IArrow className="w-4 h-4" /></Link>
            </div>
          </Reveal>
        )}
      </section>

      <section className="max-w-4xl mx-auto px-5 lg:px-8 pb-24">
        <Reveal>
          <h2 className="font-display text-2xl text-ink mb-6">مطالعه بیشتر</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-6">
          {related.map((r, i) => (
            <Reveal key={r.slug} delay={i * 120}>
              <Link to={`/blog/${r.slug}`} className="card-hover group block h-full rounded-xl border border-line bg-panel/70 p-6">
                <div className="flex items-center gap-3 text-xs text-faint">
                  <span className="chip">{r.cat}</span>
                  <span>{r.read}</span>
                </div>
                <h3 className="font-bold text-ink leading-7 mt-3 group-hover:text-teal transition-colors">{r.title}</h3>
                <span className="inline-flex items-center gap-2 mt-4 text-sm font-bold text-teal">
                  خواندن <IArrow className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </Shell>
  );
}
