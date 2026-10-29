export type PanelId = "menu" | "artists" | "releases" | "about" | "contact";

export type Tone = "ink" | "paper";

export type Slide = {
  id: "home" | "mist" | "meekz" | "mazza";
  kind: "home" | "artist";
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
};

export const SLIDES: Slide[] = [
  {
    id: "home",
    kind: "home",
    bg: "bg-mint",
    fg: "text-ink",
    tone: "ink",
    theme: "#68e0b5",
    image: "/media/home.jpg",
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
  },
];

export const NAV: { id: Exclude<PanelId, "menu">; label: string }[] = [
  { id: "artists", label: "Artists" },
  { id: "releases", label: "Releases" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export type Release = {
  artistId: Slide["id"];
  artist: string;
  title: string;
  note: string;
  tracks: string[];
};

export const RELEASES: Release[] = [
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
];

export function pad(n: number) {
  return String(n).padStart(2, "0");
}
