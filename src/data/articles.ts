export type Article = {
  slug: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  body: string[];
  image: string;
  imageAlt: string;
  caption: string;
  author: string;
  likes: number;
};

export const SITE = "https://calicavephuket.com";

export const ARTICLES: Article[] = [
  {
    slug: "mist-collabs",
    date: "05/11/2026",
    category: "Record labels",
    title: "MOBO Award-Winning MIST Partners with CaliCave Records for Upcoming Collabs",
    excerpt:
      "UK rap powerhouse MIST is linking up with CaliCave Records for new music.",
    body: [
      "UK rap powerhouse MIST is linking up with CaliCave Records for new music. The Birmingham MC — MOBO winner with over 500 million streams and a UK Top 5 EP under his belt — will drop a couple of collaborative singles through the Ireland-based label, building on his history of standout features with the likes of MoStack, Nines, Fredo (“So High”) and more.",
    ],
    image: "/media/news/mist-collabs.jpg",
    imageAlt: "MIST",
    caption: "MIST collaborating with CaliCave Records. Photo: online",
    author: "Ronan Buckley",
    likes: 312,
  },
  {
    slug: "reggie-belfast",
    date: "06/11/2026",
    category: "Record labels",
    title: "CaliCave Records Announces Dundalk Rapper Reggie B Joins MAZZA Belfast Tour",
    excerpt:
      "Reggie B joins MAZZA L20 as special guest for the Belfast shows at Mandela Hall.",
    body: [
      "Dundalk’s Irish drill pioneer Reggie B, whose track Talk of the Town was remixed by Fred again.. and Sammy Virji and peaked at No. 4 on the Irish charts, joins MAZZA L20 as special guest for the Belfast shows at Mandela Hall on 19th and 20th November, marking a major homecoming moment for the rising Irish artist.",
    ],
    image: "/media/news/reggie-belfast.jpg",
    imageAlt: "Reggie B",
    caption: "Reggie B joins MAZZA L20 for the Belfast tour. Photo: online",
    author: "Ronan Buckley",
    likes: 186,
  },
  {
    slug: "mazza-mist-deals",
    date: "06/11/2026",
    category: "Record labels",
    title: "CaliCave Records Secures Landmark Multi-Track Deals with MAZZA L20 and MIST",
    excerpt:
      "A 5-track deal with MAZZA L20 and a 3-track feature deal with MIST.",
    body: [
      "CaliCave Records has signed a major 5-track deal with MAZZA L20 and a 3-track feature deal with MIST, including five high-profile collaborations between the two artists and some of the biggest names at the top of the UK rap game, marking a major expansion for the Ireland-based label.",
    ],
    image: "/media/news/mazza-mist.jpg",
    imageAlt: "MAZZA L20 and MIST",
    caption: "MAZZA L20 and MIST, the artists behind the new multi-track deals. Photo: online",
    author: "Ronan Buckley",
    likes: 428,
  },
];

export function articleBySlug(slug: string) {
  return ARTICLES.find((article) => article.slug === slug);
}

export function articleUrl(slug: string) {
  return `${SITE}/news/${slug}`;
}
