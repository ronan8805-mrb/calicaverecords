import { useId } from "react";
import { ArrowLeft, ArrowRight, Menu, Play, Square } from "lucide-react";
import { BELFAST_SHOWS, NAV, SLIDES, TOUR_DATES, pad, type PanelId, type Tone } from "@/data/roster";

type Props = {
  index: number;
  onNext: () => void;
  onPrev: () => void;
  onHome: () => void;
  onOpen: (panel: PanelId) => void;
  playing?: boolean;
  onToggleTrack?: () => void;
};

function chipClass(tone: Tone) {
  return tone === "paper"
    ? "border-paper/70 text-paper hover:bg-paper hover:text-blood"
    : "border-ink/70 text-ink hover:bg-ink hover:text-mint";
}

export function SlideFace({ index, onNext, onPrev, onHome, onOpen, playing, onToggleTrack }: Props) {
  const slide = SLIDES[index] ?? SLIDES[0];
  const total = SLIDES.length;
  const next = SLIDES[(index + 1) % total];
  const isHome = slide.kind === "home";
  const isTour = slide.kind === "tour";
  const isShow = slide.kind === "show";
  const ringId = `ring-${useId().replace(/:/g, "")}`;

  return (
    <article className={`relative flex h-full w-full flex-col ${slide.bg} ${slide.fg}`}>
      {slide.kind === "artist" ? (
        <img
          src={slide.image}
          alt={slide.imageAlt}
          draggable={false}
          className={`artist-photo${slide.id === "mist" ? " artist-photo-mist" : ""}${
            slide.id === "meekz" ? " artist-photo-meekz" : ""
          }${slide.id === "reggie" ? " artist-photo-reggie" : ""}`}
        />
      ) : null}
      <div className="grain" aria-hidden="true" />

      <header
        className={`relative z-20 flex h-16 shrink-0 items-center gap-3 px-4 md:px-8 ${
          isHome ? "justify-end" : "justify-between"
        }`}
      >
        {isHome ? null : (
          <button
            type="button"
            onClick={onHome}
            className="flex items-center gap-2.5"
            aria-label="Calicave Records, home"
          >
            <img
              src={slide.id === "mazza" ? "/media/wordmark-ink.png" : "/media/wordmark.png"}
              alt=""
              className="h-9 w-auto"
              draggable={false}
            />
          </button>
        )}
        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {NAV.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onOpen(item.id)}
              className="text-sm font-medium tracking-wide"
            >
              {item.label}
            </button>
          ))}
        </nav>
        <button
          type="button"
          className="grid size-11 place-items-center md:hidden"
          aria-label="Open menu"
          onClick={() => onOpen("menu")}
        >
          <Menu className="size-6" />
        </button>
      </header>

      <div className="relative z-10 flex min-h-0 flex-1 flex-col px-5 md:px-8 xl:px-14">
        {isHome ? (
          <img
            src={slide.image}
            alt={slide.imageAlt}
            draggable={false}
            className="home-hero"
          />
        ) : null}

        <div
          className={`flex flex-1 flex-col pb-2 ${
            isHome
              ? "justify-end xl:justify-center xl:items-end"
              : isTour || isShow
                ? "min-h-0 justify-start"
                : "justify-end xl:justify-center"
          }`}
        >
          {isHome ? (
            <div className="home-lead xl:w-[48%] xl:max-w-xl">
              <p className="text-xs font-medium tracking-brand uppercase">Calicave Records</p>
              <h1 className="wave-title mt-1 font-display text-[1.65rem] leading-[0.82] font-black uppercase md:text-display">
                <span className="block">
                  <span className="wave-word" style={{ animationDelay: "0s" }}>
                    Where
                  </span>{" "}
                  <span className="wave-word" style={{ animationDelay: "0.12s" }}>
                    the
                  </span>
                </span>
                <span className="block">
                  <span className="wave-word" style={{ animationDelay: "0.24s" }}>
                    next
                  </span>{" "}
                  <span className="wave-word" style={{ animationDelay: "0.36s" }}>
                    wave
                  </span>
                </span>
                <span className="block">
                  <span className="wave-word" style={{ animationDelay: "0.48s" }}>
                    lives
                  </span>
                </span>
              </h1>
              <p className="mt-1.5 max-w-md text-[0.8rem] leading-snug font-medium md:mt-5 md:text-lg">
                Hottest Artists In The World Signed To Calicave Records
              </p>
              <div className="mt-2 max-w-md">
                <p className="text-[0.58rem] font-semibold tracking-brand uppercase">
                  Extra dates added · Tickets on sale now
                </p>
                <p className="mt-0.5 font-display text-[1.35rem] leading-none font-black uppercase">
                  Mazza live in Belfast
                </p>
                <p className="mt-0.5 text-[0.68rem] font-semibold tracking-wide uppercase">Mandela Hall</p>
                <ul className="mt-1 space-y-0 text-[0.68rem] leading-tight font-medium">
                  <li>Thu 19 Nov — Over 18s, 7.30pm–12am</li>
                  <li>Fri 20 Nov — Over 18s, 7.30pm–12am</li>
                </ul>
                <a
                  href="https://linktr.ee/TheCaliCaveRecords"
                  target="_blank"
                  rel="noreferrer"
                  className="ticket-link mt-2"
                >
                  Tickets
                </a>
              </div>
            </div>
          ) : isTour ? (
            <div className="tour-copy">
              <div className="tour-glass">
                <img src={slide.image} alt={slide.imageAlt} draggable={false} />
              </div>
              <p className="mt-2 text-[0.62rem] font-medium tracking-brand uppercase">
                Calicave Records presents
              </p>
              <h1 className="mt-1 font-display text-[2.05rem] leading-[0.84] font-black uppercase">
                The Takeover Tour
              </h1>
              <p className="mt-1.5 max-w-md text-[0.75rem] leading-snug font-light text-paper/80">
                CaliCave Records presents Meekz and Mist on their first joint tour. Starting in the
                UK and Ireland, finishing in Thailand. December 2026 – January 2027.
              </p>
              <ul className="tour-dates">
                {TOUR_DATES.map((stop) => (
                  <li key={stop.city}>
                    <span className="tour-city">{stop.city}</span>
                    <span className="tour-meta">
                      {stop.when} · {stop.where}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : isShow ? (
            <div className="tour-copy">
              <div className="tour-glass">
                <img src={slide.image} alt={slide.imageAlt} draggable={false} />
              </div>
              <p className="mt-2 text-[0.62rem] font-medium tracking-brand uppercase">
                Calicave Records presents
              </p>
              <h1 className="mt-1 font-display text-[2.05rem] leading-[0.84] font-black uppercase">
                Mazza live
                <br />
                in Belfast
              </h1>
              <p className="mt-1.5 text-[0.75rem] leading-snug font-light text-paper/80">
                Mandela Hall, Belfast. Extra dates added. Tickets on sale now.
              </p>
              <a
                href="https://linktr.ee/TheCaliCaveRecords"
                target="_blank"
                rel="noreferrer"
                className="ticket-link ticket-link-solid mt-3"
              >
                Tickets
              </a>
              <ul className="tour-dates belfast-dates">
                {BELFAST_SHOWS.map((show) => (
                  <li key={show.detail}>
                    <span className="tour-city">{show.when}</span>
                    <span className="tour-meta">{show.detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div
              className={`artist-copy max-w-xl xl:max-w-lg ${
                slide.id === "mist" ? "artist-copy-light" : ""
              } ${slide.id === "mazza" ? "artist-copy-adapt" : ""} ${
                slide.id === "reggie" ? "artist-copy-reggie" : ""
              }`}
            >
              <h1 className="artist-name font-display text-poster font-black uppercase">
                {slide.nameLines?.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h1>
              <p className="artist-genre mt-4 text-xs font-semibold tracking-brand">{slide.genre}</p>
              <p className="artist-bio mt-4 max-w-prose text-sm leading-relaxed font-light opacity-90 md:text-base">
                {slide.bio}
              </p>
            </div>
          )}
        </div>
      </div>

      <footer
        className={`safe-bottom relative z-20 flex flex-col gap-4 px-5 pt-3 sm:flex-row sm:items-end sm:justify-between md:px-8 xl:px-14 ${slide.bg}`}
      >
        <div className="min-w-0">
          {slide.track ? (
            <button type="button" className="track-play" onClick={onToggleTrack}>
              {playing ? <Square className="size-3.5 fill-current" /> : <Play className="size-3.5 fill-current" />}
              {playing ? "Stop" : slide.track.title}
            </button>
          ) : null}
          <p className="font-display text-2xl leading-none tabular-nums md:text-3xl">
            {pad(index + 1)}
            <span className="opacity-45"> / {pad(total)}</span>
          </p>
          <button
            type="button"
            onClick={onNext}
            className={`next-link mt-2 flex items-center gap-3 text-left font-display font-black uppercase ${
              isHome ? "text-enter" : "text-3xl md:text-5xl"
            }`}
          >
            {isHome ? "Enter the cave" : `Next · ${next.short}`}
            <ArrowRight className={`next-arrow ${isHome ? "size-8 md:size-12" : "size-7 md:size-9"}`} />
          </button>
          <p className="mt-2 hidden text-xs tracking-wide opacity-70 xl:block">
            Scroll, swipe, or use the arrow keys
          </p>
        </div>
        <div className="flex shrink-0 items-center justify-end gap-2 md:gap-3">
          <button
            type="button"
            onClick={onPrev}
            aria-label="Previous slide"
            className={`cave-ctrl grid size-12 place-items-center rounded-full border transition-colors ${chipClass(slide.tone)}`}
          >
            <ArrowLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={onNext}
            aria-label={isHome ? "Enter the cave" : `Next, ${next.short}`}
            className={`cave-ctrl relative grid size-20 place-items-center rounded-full border md:size-28 ${chipClass(slide.tone)}`}
          >
            <svg viewBox="0 0 100 100" className="cave-spin absolute inset-1" aria-hidden="true">
              <defs>
                <path
                  id={ringId}
                  d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0"
                />
              </defs>
              <text
                fill="currentColor"
                fontSize="8.5"
                letterSpacing="2.4"
                fontFamily="Outfit, sans-serif"
              >
                <textPath href={`#${ringId}`}>
                  CALICAVE · NEXT · CALICAVE · NEXT ·
                </textPath>
              </text>
            </svg>
            <ArrowRight className="size-5 md:size-6" />
          </button>
        </div>
      </footer>
    </article>
  );
}
