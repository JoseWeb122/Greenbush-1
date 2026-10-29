export const SITE = {
  name: "Greenbush Twins & Company",
  email: "carrieingalls1974@gmail.com",
  address: "30765 Pacific Coast Hwy #187, Malibu, CA",
  logo: "https://greenbushtwins.com/wp-content/uploads/2025/11/Greenbush-White-Logo.0.png",
  socials: [
    { name: "Instagram", href: "https://www.instagram.com/greenbushtwins/" },
    { name: "Facebook", href: "https://www.facebook.com/people/Greenbush-Twins-Company/61583196106948/" },
    { name: "YouTube", href: "https://www.youtube.com/channel/UCyQHbSLs_RtV-RCYe2RoCKg" },
  ],
  mission:
    "We use creativity, imagination, and art to connect with people of all ages — fostering social change, encouraging individual agency, promoting understanding, and building a deep sense of belonging within our Greenbush Twins & Company community.",
};

export type Story = {
  slug: string;
  kind: "Artist" | "Community" | "Event" | "Brand";
  title: string;
  excerpt: string;
  body: string[];
  image: string;
  date?: string; // ISO start date for events
  endDate?: string;
  location?: string;
  shopQuery?: string;
};

export const STORIES: Story[] = [
  {
    slug: "little-house-cast-reunion-nashville",
    kind: "Event",
    title: "Little House on the Prairie Cast Reunion",
    excerpt:
      "Join Sidney Robyn Greenbush in Nashville to share memories, meet the cast, and celebrate the timeless Little House family.",
    body: [
      "The Greenbush Twins are excited to reunite with friends, cast members, and Little House fans for a very special Little House on the Prairie Cast Reunion in Nashville, Tennessee, September 11–13, 2026.",
      "Come share memories, meet the cast, take photos, enjoy special events, and celebrate the timeless Little House family that has brought so much joy to generations of fans. We hope to see you there!",
    ],
    image: "/images/story.jpg",
    date: "2026-09-11",
    endDate: "2026-09-13",
    location: "Nashville, Tennessee",
  },
  {
    slug: "seven-sisters-the-lantern-of-humanity",
    kind: "Brand",
    title: "Seven Sisters: The Lantern of Humanity",
    excerpt:
      "The first book in an enchanting new series by Sidney Greenbush — a lyrical tale of kindness, courage, and the light we carry within.",
    body: [
      "Seven Sisters – The Lantern of Humanity is a magical, beautifully illustrated hardcover storybook designed to inspire young hearts through storytelling and imagination.",
      "In a world guided by hope, seven sisters serve as guardians of the Lantern of Humanity, each embodying one of the seven angelic virtues. The story promotes empathy, kindness, unity, and charity, teaching children that their own inner light can illuminate even the darkest moments.",
      "Recommended for children ages 2–9. Limited-edition copies are autographed by Sidney Greenbush.",
    ],
    image: "https://greenbushtwins.com/wp-content/uploads/2025/12/Book-IMG-1-1-600x450.webp",
    shopQuery: "seven sisters",
  },
  {
    slug: "celebrating-family-craftsmanship",
    kind: "Community",
    title: "Celebrating Family, Craftsmanship & the Beauty of Slowing Down",
    excerpt:
      "Go behind the scenes of a community where families, conscious consumers, and independent artisans come together.",
    body: [
      "Every story has a heart, and every creation carries a piece of the person who made it. We invite you behind the scenes to experience the spirit of our community — a space where families, conscious consumers, and independent artisans come together.",
      "From timeless memories to thoughtful, sustainable goods for your home and heart, discover how we’re continuing a legacy of warmth, creativity, and purposeful living. Take a moment to connect and explore what it means to live with intention, support small creators, and keep kindness at the heart of everything we do.",
    ],
    image: "/images/community.jpg",
  },
  {
    slug: "deserae-catherin",
    kind: "Artist",
    title: "Deserae Catherin",
    excerpt: "Affirmation artwork with gentle, encouraging messages — “Be the Moon,” “Never Stop Growing,” and more.",
    body: [
      "Deserae Catherin’s pieces carry simple, encouraging words meant to be seen every day: Be Who You Are, I Am Strong, Grow in All Places, and A Thousand Pages Yet to Read.",
      "Her collection is available in the Greenbush Twins shop.",
    ],
    image: "",
    shopQuery: "Deserae Catherin",
  },
  {
    slug: "pioneer-polly",
    kind: "Artist",
    title: "Pioneer Polly",
    excerpt: "A prairie-inspired character celebrated on mugs and keepsakes — “Tea Is Life’s Delight.”",
    body: [
      "Pioneer Polly brings a little prairie charm to everyday rituals. Find her on the “Tea Is Life’s Delight” mugs in white, red, and pink.",
    ],
    image: "",
    shopQuery: "Pioneer Polly",
  },
  {
    slug: "carries-prairie",
    kind: "Artist",
    title: "Carrie’s Prairie",
    excerpt: "A tribute to Carrie Ingalls Swanzey and the open plains of Independence, Kansas.",
    body: [
      "Carrie’s Prairie is inspired by the plains of Independence, Kansas, and the birth of Baby Carrie. The collection brings the scent of the Kansas landscape — fresh grass, citrus, moss, and lemongrass — into your home.",
      "Explore the hand-poured soy candle, soap bar, room and linen spray, car diffuser, body butter, and foaming hand soap.",
    ],
    image: "",
    shopQuery: "Carrie's Prairie",
  },
];

export const VALUES = [
  { title: "Shared Values", text: "We believe in kindness, integrity, and mindful living — values that connect us and guide every recommendation we make." },
  { title: "Authentic Voices", text: "Our community is built on real experiences and trusted insights from people who genuinely care." },
  { title: "Meaningful Choices", text: "Every product we share has been thoughtfully selected because it adds value to your home and heart." },
  { title: "Together, We Grow", text: "Join a circle of people making mindful decisions — one product, one story, one connection at a time." },
];

export function eventStatus(s: Story, now = new Date()) {
  if (!s.date) return null;
  const end = new Date((s.endDate ?? s.date) + "T23:59:59");
  return end < now ? "past" : "upcoming";
}

export const formatDate = (iso: string) =>
  new Date(iso + "T12:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
