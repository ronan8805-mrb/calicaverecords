import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ARTICLES, articleBySlug, articleUrl, type Article } from "@/data/articles";

export const Route = createFileRoute("/news/$slug")({
  loader: ({ params }) => {
    const article = articleBySlug(params.slug);
    if (!article) throw notFound();
    return article;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — Calicave Records` },
          { name: "description", content: loaderData.excerpt },
        ]
      : [{ title: "News — Calicave Records" }],
  }),
  component: ArticlePage,
});

function ArticlePage() {
  const article = Route.useLoaderData();
  return <ArticleView article={article} />;
}

export function ArticleView({ article }: { article: Article }) {
  const url = articleUrl(article.slug);
  const [likes, setLikes] = useState(article.likes);
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(`calicave-like-${article.slug}`);
    if (saved === "1") {
      setLiked(true);
      setLikes(article.likes + 1);
    }
  }, [article.likes, article.slug]);

  function onLike() {
    const next = !liked;
    setLiked(next);
    setLikes(article.likes + (next ? 1 : 0));
    window.localStorage.setItem(`calicave-like-${article.slug}`, next ? "1" : "0");
  }

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  const shares = [
    {
      label: "f",
      name: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      label: "𝕏",
      name: "Share on X",
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(article.title)}`,
    },
    {
      label: "t",
      name: "Share on Tumblr",
      href: `https://www.tumblr.com/widgets/share/tool?canonicalUrl=${encodeURIComponent(url)}&title=${encodeURIComponent(article.title)}`,
    },
    {
      label: "p",
      name: "Share on Pinterest",
      href: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(`https://calicavephuket.com${article.image}`)}&description=${encodeURIComponent(article.title)}`,
    },
  ];

  return (
    <article className="h-dvh overflow-y-auto bg-paper text-ink">
      <div className="mx-auto w-full max-w-3xl px-5 py-6 md:px-8 md:py-10">
        <header className="flex items-center justify-between gap-4">
          <Link to="/" className="shrink-0">
            <img src="/media/wordmark-ink.png" alt="Calicave Records" className="h-9 w-auto" />
          </Link>
          <Link to="/" className="text-xs font-semibold tracking-brand uppercase">
            Back
          </Link>
        </header>

        <p className="mt-10 text-xs font-semibold tracking-brand text-[#9a3b2f] uppercase">
          {article.category}
          <span className="ml-4 tracking-normal text-ink/50 normal-case">{article.date}</span>
        </p>
        <h1 className="mt-4 font-display text-5xl leading-[0.9] font-black uppercase md:text-7xl">
          {article.title}
        </h1>

        {article.body.map((paragraph) => (
          <p key={paragraph.slice(0, 24)} className="mt-6 text-lg leading-relaxed font-light">
            {paragraph}
          </p>
        ))}

        <p className="mt-8 text-sm font-semibold tracking-brand uppercase">By {article.author}</p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {shares.map((share) => (
            <a
              key={share.name}
              href={share.href}
              target="_blank"
              rel="noreferrer"
              aria-label={share.name}
              className="grid size-11 place-items-center border border-ink text-sm font-semibold lowercase"
            >
              {share.label}
            </a>
          ))}
          <button
            type="button"
            onClick={onCopy}
            className="grid h-11 place-items-center border border-ink px-3 text-xs font-semibold tracking-wide uppercase"
          >
            {copied ? "Copied" : "+"}
          </button>
          <button
            type="button"
            onClick={onLike}
            aria-pressed={liked}
            className="ml-auto flex items-center gap-2 border border-ink px-3 py-2 text-sm font-semibold"
          >
            <span aria-hidden="true">{liked ? "♥" : "♡"}</span>
            {likes}
          </button>
        </div>

        <img src={article.image} alt={article.imageAlt} className="mt-8 w-full" />
        <p className="mt-3 text-sm text-ink/60">{article.caption}</p>

        <p className="mt-8 break-all text-sm text-ink/70">
          <a href={url} className="underline">
            {url}
          </a>
        </p>

        <ul className="mt-10 border-t border-ink/15">
          {ARTICLES.filter((item) => item.slug !== article.slug).map((item) => (
            <li key={item.slug} className="border-b border-ink/15 py-4">
              <Link to="/news/$slug" params={{ slug: item.slug }} className="block">
                <span className="text-xs font-semibold tracking-brand uppercase">{item.date}</span>
                <span className="mt-1 block font-display text-3xl font-black uppercase">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
