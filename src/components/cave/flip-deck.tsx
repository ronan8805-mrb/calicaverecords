import { useCallback, useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue } from "framer-motion";
import { flushSync } from "react-dom";
import { SLIDES, type PanelId } from "@/data/roster";
import { Panels } from "@/components/cave/panels";
import { SlideFace } from "@/components/cave/slide-face";

type YtPlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  destroy: () => void;
  cueVideoById: (options: { videoId: string; startSeconds?: number }) => void;
};

type YtWindow = Window & {
  YT?: {
    Player: new (
      element: HTMLElement,
      options: {
        width?: string;
        height?: string;
        videoId?: string;
        playerVars?: Record<string, number | string>;
        events?: { onReady?: (event: { target: YtPlayer }) => void };
      },
    ) => YtPlayer;
  };
  onYouTubeIframeAPIReady?: () => void;
};

const FLIP_EASE: [number, number, number, number] = [0.76, 0, 0.18, 1];
const FLIP_SECONDS = 1.08;

function waitFrames(count: number) {
  return new Promise<void>((resolve) => {
    const step = (left: number) => {
      if (left <= 0) resolve();
      else requestAnimationFrame(() => step(left - 1));
    };
    step(count);
  });
}

export function FlipDeck() {
  const [index, setIndex] = useState(0);
  const [incoming, setIncoming] = useState(0);
  const [locked, setLocked] = useState(false);
  const [panel, setPanel] = useState<PanelId | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [reduce, setReduce] = useState(false);
  const rotateY = useMotionValue(0);
  const indexRef = useRef(0);
  const panelRef = useRef<PanelId | null>(null);
  const busy = useRef(false);
  const live = useRef(true);
  const reduceRef = useRef(false);
  const audioHost = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YtPlayer | null>(null);
  const readyRef = useRef(false);
  const pendingPlay = useRef(false);

  useEffect(() => {
    live.current = true;
    return () => {
      live.current = false;
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      reduceRef.current = media.matches;
      setReduce(media.matches);
    };
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    for (const slide of SLIDES) {
      const img = new Image();
      img.src = slide.image;
    }
  }, []);

  useEffect(() => {
    panelRef.current = panel;
  }, [panel]);

  useEffect(() => {
    const theme = document.querySelector('meta[name="theme-color"]');
    if (theme) theme.setAttribute("content", SLIDES[index]?.theme ?? "#68e0b5");
  }, [index]);

  const goTo = useCallback(
    async (target: number, force = false) => {
      const total = SLIDES.length;
      const next = ((target % total) + total) % total;
      if (busy.current) return;
      if (panelRef.current && !force) return;
      if (next === indexRef.current) return;

      pendingPlay.current = false;
      playerRef.current?.pauseVideo();
      setPlayingId(null);

      const forward = (next - indexRef.current + total) % total;
      const backward = (indexRef.current - next + total) % total;
      const direction: 1 | -1 = forward <= backward ? 1 : -1;

      busy.current = true;
      setLocked(true);
      try {
        if (reduceRef.current) {
          indexRef.current = next;
          flushSync(() => {
            setIndex(next);
            setIncoming(next);
          });
          return;
        }

        flushSync(() => setIncoming(next));
        await waitFrames(2);
        if (!live.current) return;

        await animate(rotateY, direction * 180, {
          duration: FLIP_SECONDS,
          ease: FLIP_EASE,
        });
        if (!live.current) return;

        indexRef.current = next;
        // Commit the new front face while the flipped side is still showing, then snap.
        flushSync(() => {
          setIndex(next);
          setIncoming(next);
        });
        rotateY.set(0);
      } finally {
        busy.current = false;
        if (live.current) setLocked(false);
      }
    },
    [rotateY],
  );

  const onNext = useCallback(() => {
    void goTo(indexRef.current + 1);
  }, [goTo]);

  const onPrev = useCallback(() => {
    void goTo(indexRef.current - 1);
  }, [goTo]);

  const onHome = useCallback(() => {
    if (indexRef.current === 0) return;
    void goTo(0);
  }, [goTo]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable='true']")) return;
      if (event.key === "Escape") {
        setPanel(null);
        return;
      }
      if (panelRef.current) return;
      if (["ArrowDown", "ArrowRight", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        onNext();
      } else if (["ArrowUp", "ArrowLeft", "PageUp"].includes(event.key)) {
        event.preventDefault();
        onPrev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onNext, onPrev]);

  useEffect(() => {
    let acc = 0;
    const onWheel = (event: WheelEvent) => {
      if (panelRef.current) return;
      event.preventDefault();
      if (busy.current) {
        acc = 0;
        return;
      }
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      acc += delta;
      if (Math.abs(acc) < 70) return;
      const direction = acc > 0 ? 1 : -1;
      acc = 0;
      void goTo(indexRef.current + direction);
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [goTo]);

  useEffect(() => {
    let startX = 0;
    let startY = 0;
    let active = false;
    const onStart = (event: TouchEvent) => {
      if (panelRef.current) return;
      const touch = event.changedTouches[0];
      if (!touch) return;
      startX = touch.clientX;
      startY = touch.clientY;
      active = true;
    };
    const onEnd = (event: TouchEvent) => {
      if (!active) return;
      active = false;
      const touch = event.changedTouches[0];
      if (!touch || panelRef.current) return;
      const dx = touch.clientX - startX;
      const dy = touch.clientY - startY;
      if (Math.abs(dx) < 48 && Math.abs(dy) < 48) return;
      if (Math.abs(dx) > Math.abs(dy)) void goTo(indexRef.current + (dx < 0 ? 1 : -1));
      else void goTo(indexRef.current + (dy < 0 ? 1 : -1));
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    };
  }, [goTo]);

  const current = SLIDES[index] ?? SLIDES[0];

  useEffect(() => {
    const track = SLIDES[index]?.track;
    readyRef.current = false;
    if (!track || !audioHost.current) return;

    let dead = false;
    const start = track.start ?? 0;

    const mount = () => {
      const yt = (window as YtWindow).YT;
      if (dead || !yt?.Player || !audioHost.current) return;
      const node = document.createElement("div");
      audioHost.current.replaceChildren(node);
      try {
        playerRef.current?.destroy();
      } catch {
        /* player already removed */
      }
      playerRef.current = new yt.Player(node, {
        width: "240",
        height: "135",
        videoId: track.youtubeId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          rel: 0,
          playsinline: 1,
          modestbranding: 1,
          start,
        },
        events: {
          onReady: (event: { target: YtPlayer }) => {
            if (dead) return;
            readyRef.current = true;
            if (pendingPlay.current) {
              event.target.seekTo(start, true);
              event.target.playVideo();
            } else {
              event.target.cueVideoById({ videoId: track.youtubeId, startSeconds: start });
            }
          },
        },
      });
    };

    const win = window as YtWindow;
    if (win.YT?.Player) mount();
    else {
      const previous = win.onYouTubeIframeAPIReady;
      win.onYouTubeIframeAPIReady = () => {
        previous?.();
        mount();
      };
      if (!document.getElementById("yt-iframe-api")) {
        const script = document.createElement("script");
        script.id = "yt-iframe-api";
        script.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(script);
      }
    }

    return () => {
      dead = true;
      readyRef.current = false;
      try {
        playerRef.current?.destroy();
      } catch {
        /* player already removed */
      }
      playerRef.current = null;
    };
  }, [index]);

  return (
    <main className={`relative h-dvh w-full overflow-hidden ${current.bg}`}>
      <p className="sr-only" aria-live="polite">
        {current.kind === "home" ? "Calicave Records" : current.imageAlt}, slide {index + 1} of{" "}
        {SLIDES.length}
      </p>
      <div className="cave-scene h-full w-full">
        <motion.div
          className={`preserve-3d relative h-full w-full ${locked ? "pointer-events-none" : ""}`}
          style={{ rotateY }}
        >
          <div className="face face-back pointer-events-none" aria-hidden="true">
            <SlideFace
              index={incoming}
              onNext={onNext}
              onPrev={onPrev}
              onHome={onHome}
              onOpen={setPanel}
            />
          </div>
          <div className="face">
            <SlideFace
              index={index}
              onNext={onNext}
              onPrev={onPrev}
              onHome={onHome}
              onOpen={(id) => {
                pendingPlay.current = false;
                playerRef.current?.pauseVideo();
                setPlayingId(null);
                setPanel(id);
              }}
              playing={playingId === current.id}
              onToggleTrack={() => {
                const track = current.track;
                if (!track) return;
                if (playingId === current.id) {
                  pendingPlay.current = false;
                  playerRef.current?.pauseVideo();
                  setPlayingId(null);
                  return;
                }
                pendingPlay.current = true;
                const start = track.start ?? 0;
                if (readyRef.current && playerRef.current) {
                  playerRef.current.seekTo(start, true);
                  playerRef.current.playVideo();
                }
                setPlayingId(current.id);
              }}
            />
          </div>
        </motion.div>
      </div>
      <div ref={audioHost} className="track-audio" />
      <Panels
        panel={panel}
        reduce={reduce}
        onClose={() => setPanel(null)}
        onOpen={setPanel}
        onJump={(target) => {
          panelRef.current = null;
          setPanel(null);
          void goTo(target, true);
        }}
      />
    </main>
  );
}
