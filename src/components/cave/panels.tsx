import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { NAV, NEWS, RELEASES, SLIDES, pad, type PanelId } from "@/data/roster";

type Props = {
  panel: PanelId | null;
  reduce: boolean;
  onClose: () => void;
  onOpen: (panel: PanelId) => void;
  onJump: (index: number) => void;
};

export function Panels({ panel, reduce, onClose, onOpen, onJump }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (panel) closeRef.current?.focus();
  }, [panel]);

  return (
    <AnimatePresence>
      {panel ? (
        <motion.div
          key={panel}
          className="fixed inset-0 z-50 overflow-y-auto bg-ink text-paper"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: reduce ? 0.15 : 0.45, ease: [0.76, 0, 0.18, 1] }}
          role="dialog"
          aria-modal="true"
          aria-label={panel === "menu" ? "Menu" : panel}
        >
          <div className="mx-auto flex min-h-dvh w-full max-w-6xl flex-col px-5 py-5 md:px-10">
            <header className="flex items-center justify-between gap-4">
              <button type="button" onClick={onClose} className="flex items-center gap-2.5">
                <img src="/media/logo-nav.png" alt="" className="size-11 rounded-full" />
                <span className="font-display text-2xl leading-none tracking-wide">CALICAVE</span>
              </button>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="grid size-12 place-items-center rounded-full border border-paper/40"
                aria-label="Close"
              >
                <X className="size-5" />
              </button>
            </header>

            <nav className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm" aria-label="Sections">
              {NAV.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onOpen(item.id)}
                  className={panel === item.id ? "text-mint" : "text-paper/70"}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="flex-1 py-10">
              {panel === "menu" ? <MenuBody onOpen={onOpen} /> : null}
              {panel === "artists" ? <ArtistsBody onJump={onJump} /> : null}
              {panel === "releases" ? <ReleasesBody onJump={onJump} /> : null}
              {panel === "news" ? <NewsBody onJump={onJump} /> : null}
              {panel === "about" ? <AboutBody /> : null}
              {panel === "contact" ? <ContactBody /> : null}
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function MenuBody({ onOpen }: { onOpen: (panel: PanelId) => void }) {
  return (
    <ul className="flex flex-col">
      {NAV.map((item, i) => (
        <li key={item.id} className="border-t border-paper/15">
          <button
            type="button"
            onClick={() => onOpen(item.id)}
            className="flex w-full items-baseline justify-between py-5 text-left"
          >
            <span className="font-display text-6xl font-black uppercase md:text-8xl">
              {item.label}
            </span>
            <span className="font-display text-2xl text-mint tabular-nums">{pad(i + 1)}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}

function ArtistsBody({ onJump }: { onJump: (index: number) => void }) {
  const artists = SLIDES.filter((slide) => slide.kind === "artist");
  return (
    <div>
      <p className="text-xs tracking-brand text-mint uppercase">The roster</p>
      <h2 className="mt-3 font-display text-6xl font-black uppercase md:text-8xl">Artists</h2>
      <ul className="mt-10 flex flex-col gap-4">
        {artists.map((slide) => {
          const index = SLIDES.findIndex((item) => item.id === slide.id);
          return (
            <li key={slide.id}>
              <button
                type="button"
                onClick={() => onJump(index)}
                className={`grid w-full overflow-hidden text-left md:grid-cols-[1.1fr_0.9fr] ${slide.bg} ${slide.fg}`}
              >
                <span className="flex flex-col justify-between gap-6 p-6 md:p-8">
                  <span className="font-display text-xl tabular-nums opacity-70">{pad(index + 1)}</span>
                  <span>
                    <span className="block font-display text-6xl font-black uppercase md:text-7xl">
                      {slide.nameLines?.join(" ")}
                    </span>
                    <span className="mt-3 block text-xs font-semibold tracking-brand">{slide.genre}</span>
                  </span>
                </span>
                <img
                  src={slide.image}
                  alt=""
                  className="h-56 w-full object-cover object-[80%_center] md:h-full md:min-h-64"
                />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function ReleasesBody({ onJump }: { onJump: (index: number) => void }) {
  return (
    <div>
      <p className="text-xs tracking-brand text-mint uppercase">Catalogue</p>
      <h2 className="mt-3 font-display text-6xl font-black uppercase md:text-8xl">Releases</h2>
      <ul className="mt-10">
        {RELEASES.map((release, i) => {
          const index = SLIDES.findIndex((slide) => slide.id === release.artistId);
          return (
            <li key={release.title} className="border-t border-paper/15">
              <button
                type="button"
                onClick={() => onJump(index)}
                className="grid w-full gap-3 py-6 text-left md:grid-cols-[4rem_1fr_auto] md:items-baseline md:gap-8"
              >
                <span className="font-display text-2xl text-mint tabular-nums">{pad(i + 1)}</span>
                <span>
                  <span className="block font-display text-4xl font-black uppercase md:text-5xl">
                    {release.title}
                  </span>
                  <span className="mt-1 block text-sm text-paper/70">
                    {release.artist} — {release.tracks.join(" · ")}
                  </span>
                </span>
                <span className="text-xs font-semibold tracking-brand text-mint">{release.note}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function NewsBody({ onJump }: { onJump: (index: number) => void }) {
  return (
    <div>
      <p className="text-xs tracking-brand text-mint uppercase">From the cave</p>
      <h2 className="mt-3 font-display text-6xl font-black uppercase md:text-8xl">News</h2>
      <ul className="mt-10">
        {NEWS.map((item) => {
          const index = SLIDES.findIndex((slide) => slide.id === item.artistId);
          return (
            <li key={item.title} className="border-t border-paper/15">
              <button
                type="button"
                onClick={() => onJump(index)}
                className="grid w-full gap-3 py-6 text-left md:grid-cols-[7rem_1fr] md:gap-8"
              >
                <span className="text-xs font-semibold tracking-brand text-mint uppercase">
                  {item.date}
                </span>
                <span>
                  <span className="block font-display text-4xl font-black uppercase md:text-5xl">
                    {item.title}
                  </span>
                  <span className="mt-2 block max-w-2xl text-sm leading-relaxed font-light text-paper/75 md:text-base">
                    {item.body}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function AboutBody() {
  return (
    <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-end">
      <div>
        <p className="text-xs tracking-brand text-mint uppercase">The label</p>
        <h2 className="mt-3 font-display text-6xl font-black uppercase md:text-8xl">
          Two coasts.
          <br />
          One roster.
        </h2>
      </div>
      <div className="max-w-xl space-y-4 text-base leading-relaxed font-light text-paper/85 md:text-lg">
        <p>
          Calicave Records is where the next wave lives. The badge carries a California bear and a
          Thai flag — sun on one side, a second home on the other — wrapped around one roster.
        </p>
        <p>
          MIST put Birmingham on the map. MEEKZ came out of Manchester with his face covered and
          the charts open. MAZZA L20 turned Liverpool drill into a national record. Hottest artists
          in the world, signed to Calicave.
        </p>
        <p className="text-sm tracking-wide text-mint">Where the next wave lives.</p>
      </div>
    </div>
  );
}

function ContactBody() {
  const [href, setHref] = useState<string | null>(null);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    if (!name || !email || !message) return;
    const next = `mailto:hello@calicave.records?subject=${encodeURIComponent(
      `Calicave — ${name}`,
    )}&body=${encodeURIComponent(`${message}\n\n${name}\n${email}`)}`;
    setHref(next);
    window.location.href = next;
  }

  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div>
        <p className="text-xs tracking-brand text-mint uppercase">A&R · press · bookings</p>
        <h2 className="mt-3 font-display text-6xl font-black uppercase md:text-8xl">
          Talk to
          <br />
          the cave.
        </h2>
        <a
          href="mailto:hello@calicave.records"
          className="mt-6 inline-block text-lg text-mint underline decoration-mint/40 underline-offset-4"
        >
          hello@calicave.records
        </a>
      </div>
      {href ? (
        <p className="self-end text-lg leading-relaxed">
          Your mail app should be open. If it isn’t,{" "}
          <a href={href} className="text-mint underline underline-offset-4">
            send the note again
          </a>
          .
        </p>
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col gap-5 self-end">
          <Field label="Name" name="name" type="text" autoComplete="name" />
          <Field label="Email" name="email" type="email" autoComplete="email" />
          <label className="flex flex-col gap-2 text-xs tracking-brand uppercase">
            Message
            <textarea
              name="message"
              required
              rows={4}
              className="border-b border-paper/30 bg-transparent py-2 font-sans text-base tracking-normal normal-case outline-none"
            />
          </label>
          <button
            type="submit"
            className="mt-2 h-12 bg-mint px-6 font-display text-2xl font-black tracking-wide text-ink uppercase"
          >
            Send
          </button>
        </form>
      )}
    </div>
  );
}

function Field({
  label,
  name,
  type,
  autoComplete,
}: {
  label: string;
  name: string;
  type: string;
  autoComplete: string;
}) {
  return (
    <label className="flex flex-col gap-2 text-xs tracking-brand uppercase">
      {label}
      <input
        name={name}
        type={type}
        required
        autoComplete={autoComplete}
        className="border-b border-paper/30 bg-transparent py-2 font-sans text-base tracking-normal normal-case outline-none"
      />
    </label>
  );
}
