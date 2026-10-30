export type PanelId = "menu" | "artists" | "releases" | "news" | "about" | "contact";

export type Tone = "ink" | "paper";

export type Slide = {
  id: "home" | "tour" | "mist" | "meekz" | "mazza" | "reggie";
  kind: "home" | "tour" | "artist";
  bg: string;
  fg: string;
  tone: Tone;
  theme: string;
  image: string;
  imageAlt: string;
  nameLines?: string[];
  genre?: string;
  bio?: string;
  short: string;
  track?: { title: string; youtubeId: string; start?: number };
  /** Kept in the roster, hidden until the signing is announced. */
  held?: boolean;
};

export const ALL_SLIDES: Slide[] = [
  {
    id: "home",
    kind: "home",
    bg: "bg-home",
    fg: "text-ink",
    tone: "ink",
    theme: "#6cd4af",
    image: "/media/home-hero.jpg",
    imageAlt: "Calicave Records logo",
    short: "Calicave",
  },
  {
    id: "mist",
    kind: "artist",
    bg: "bg-cyan",
    fg: "text-ink",
    tone: "ink",
    theme: "#2fc7c8",
    image: "/media/mist.jpg",
    imageAlt: "MIST",
    nameLines: ["MIST"],
    genre: "UK RAP / GRIME — BIRMINGHAM",
    bio: "Birmingham rapper. After time inside he turned to music, signed to Warner with his Sickmade imprint, and put the Midlands on the map. Diamond in the Dirt hit the UK Top 5. Hits include “So High” (feat. Fredo), “Karla’s Back” and “Game Changer”.",
    short: "Mist",
    track: { title: "So High", youtubeId: "V3yf1AHwxGc", start: 30 },
  },
  {
    id: "meekz",
    kind: "artist",
    bg: "bg-blood",
    fg: "text-paper",
    tone: "paper",
    theme: "#cf0105",
    image: "/media/meekz.jpg",
    imageAlt: "MEEKZ",
    nameLines: ["MEEKZ"],
    genre: "UK RAP — MANCHESTER",
    bio: "Masked Manchester rapper. Broke through with “Hoods Hottest” and the Can’t Stop Won’t Stop EP. Respect the Come Up and TRU both hit the UK Top 15. Known for “Like Me”, “Fresh Out the Bank” (feat. Dave) and always performing with his face covered.",
    short: "Meekz",
    track: { title: "Like Me", youtubeId: "hm-MOdLU21M" },
  },
  {
    id: "tour",
    kind: "tour",
    bg: "bg-ink",
    fg: "text-paper",
    tone: "paper",
    theme: "#101513",
    image: "/media/takeover.jpg",
    imageAlt: "The Takeover Tour poster",
    short: "Tour",
  },
  {
    id: "mazza",
    kind: "artist",
    bg: "bg-paper",
    fg: "text-ink",
    tone: "ink",
    theme: "#ffffff",
    image: "/media/mazza.jpg",
    imageAlt: "MAZZA L20",
    nameLines: ["MAZZA", "L20"],
    genre: "UK DRILL — LIVERPOOL",
    bio: "Liverpool drill rapper. Recorded tracks while serving time and broke out with the viral hit “Murdaside”, which reached the UK Top 20. Known for raw Scouse drill storytelling and projects like Against All Odds and Different Times.",
    short: "Mazza L20",
    track: { title: "Murdaside", youtubeId: "tPPETe8hoyk" },
    held: true,
  },
  {
    id: "reggie",
    kind: "artist",
    bg: "bg-gold",
    fg: "text-ink",
    tone: "ink",
    theme: "#fbc203",
    image: "/media/reggie.jpg",
    imageAlt: "REGGIE",
    nameLines: ["REGGIE"],
    genre: "IRISH RAP / DRILL — DUNDALK",
    bio: "Dundalk rapper who helped pioneer Irish drill. Broke out with “Talk of the Town”, which went global after a Fred again.. & Sammy Virji remix that hit millions of streams and charted in Ireland and the UK. Known for repping his hometown hard and blending drill with more commercial sounds.",
    short: "Reggie",
    track: { title: "Talk of the Town", youtubeId: "JbmYfMVGv3M" },
    held: true,
  },
];

export const SLIDES = ALL_SLIDES.filter((slide) => !slide.held);

export const TOUR_DATES = [
  { when: "Dec 2026", city: "Liverpool", where: "England" },
  { when: "Dec 2026", city: "Manchester", where: "England" },
  { when: "Dec 2026", city: "Cardiff", where: "Wales" },
  { when: "TBA", city: "Belfast", where: "Telegraph" },
  { when: "10 Dec", city: "Cork", where: "Cypress Avenue" },
  { when: "17 Dec", city: "Dublin", where: "Soho" },
  { when: "Jan", city: "Ko Samui", where: "Ark Bar" },
  { when: "Jan", city: "Phuket", where: "Kandy Beach Club" },
] as const;

export const NAV: { id: Exclude<PanelId, "menu">; label: string }[] = [
  { id: "artists", label: "Artists" },
  { id: "releases", label: "Releases" },
  { id: "news", label: "News" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export type NewsItem = {
  date: string;
  title: string;
  body: string;
  artistId: Slide["id"];
};

export const ALL_NEWS: NewsItem[] = [
  {
    date: "Just announced",
    title: "The Takeover Tour",
    body: "Meekz and Mist hit the road together. It starts in the UK and Ireland in December 2026 and finishes in Thailand in January 2027. Dates are up. Tickets soon.",
    artistId: "tour",
  },
  {
    date: "Now",
    title: "Reggie signs to the cave",
    body: "Dundalk rapper Reggie joins Calicave. Talk of the Town, and the Fred again.. & Sammy Virji remix, is the record that took Irish drill worldwide.",
    artistId: "reggie",
  },
  {
    date: "Roster",
    title: "Murdaside still moving",
    body: "MAZZA L20’s Murdaside reached the UK Top 20. Against All Odds and Different Times are the projects sitting behind it.",
    artistId: "mazza",
  },
  {
    date: "Roster",
    title: "MEEKZ stays masked",
    body: "Respect the Come Up and TRU both hit the UK Top 15. Like Me and Fresh Out the Bank, with Dave, are the ones people ask for.",
    artistId: "meekz",
  },
  {
    date: "Roster",
    title: "Midlands on the map",
    body: "MIST’s Diamond in the Dirt hit the UK Top 5. So High with Fredo, Karla’s Back and Game Changer are the records that did it.",
    artistId: "mist",
  },
];

export const NEWS = ALL_NEWS.filter((item) => SLIDES.some((slide) => slide.id === item.artistId));

export type Release = {
  artistId: Slide["id"];
  artist: string;
  title: string;
  note: string;
  tracks: string[];
};

export const ALL_RELEASES: Release[] = [
  {
    artistId: "mist",
    artist: "MIST",
    title: "Diamond in the Dirt",
    note: "UK Top 5",
    tracks: ["So High (feat. Fredo)", "Karla’s Back", "Game Changer"],
  },
  {
    artistId: "meekz",
    artist: "MEEKZ",
    title: "Respect the Come Up",
    note: "UK Top 15",
    tracks: ["Hoods Hottest", "Like Me", "Fresh Out the Bank (feat. Dave)"],
  },
  {
    artistId: "meekz",
    artist: "MEEKZ",
    title: "TRU",
    note: "UK Top 15",
    tracks: ["Can’t Stop Won’t Stop"],
  },
  {
    artistId: "mazza",
    artist: "MAZZA L20",
    title: "Murdaside",
    note: "UK Top 20",
    tracks: ["Against All Odds", "Different Times"],
  },
  {
    artistId: "reggie",
    artist: "REGGIE",
    title: "Talk of the Town",
    note: "Ireland & UK",
    tracks: ["Fred again.. & Sammy Virji remix"],
  },
];

export const RELEASES = ALL_RELEASES.filter((release) =>
  SLIDES.some((slide) => slide.id === release.artistId),
);

export function pad(n: number) {
  return String(n).padStart(2, "0");
}
