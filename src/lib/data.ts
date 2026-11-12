import ethiopia from "@/assets/product-ethiopia.jpg";
import colombia from "@/assets/product-colombia.jpg";
import noir from "@/assets/product-noir.jpg";
import sunrise from "@/assets/product-sunrise.jpg";

export type Product = {
  slug: string;
  name: string;
  origin: string;
  category: "Single Origin" | "Signature Blend" | "Limited";
  notes: string[];
  roast: number; // 1 (light) – 5 (dark)
  price: number;
  altitude: string;
  process: string;
  image: string;
  tone: string;
  blurb: string;
};

export const products: Product[] = [
  {
    slug: "yirgacheffe-ember",
    name: "Yirgacheffe Ember",
    origin: "Gedeo, Ethiopia",
    category: "Single Origin",
    notes: ["Bergamot", "Apricot", "Wild honey"],
    roast: 2,
    price: 24,
    altitude: "2,100 m",
    process: "Washed",
    image: ethiopia,
    tone: "var(--tone-terracotta)",
    blurb: "Floral and luminous — a cup that tastes like the first warm hour of morning.",
  },
  {
    slug: "huila-verde",
    name: "Huila Verde",
    origin: "Huila, Colombia",
    category: "Single Origin",
    notes: ["Red apple", "Panela", "Cocoa nib"],
    roast: 3,
    price: 22,
    altitude: "1,750 m",
    process: "Honey",
    image: colombia,
    tone: "var(--tone-forest)",
    blurb: "Juicy, round and endlessly drinkable. Grown on terraced slopes by the Ortega family.",
  },
  {
    slug: "midnight-noir",
    name: "Midnight Noir",
    origin: "Brazil · Sumatra",
    category: "Signature Blend",
    notes: ["Dark chocolate", "Molasses", "Smoked cedar"],
    roast: 5,
    price: 20,
    altitude: "1,200 m",
    process: "Natural / Wet-hulled",
    image: noir,
    tone: "var(--tone-noir)",
    blurb: "Our house espresso. Velvet body, a long bittersweet finish, built for milk and midnight.",
  },
  {
    slug: "first-light",
    name: "First Light",
    origin: "Kenya · Guatemala",
    category: "Limited",
    notes: ["Blackcurrant", "Brown sugar", "Jasmine"],
    roast: 1,
    price: 28,
    altitude: "1,900 m",
    process: "Washed",
    image: sunrise,
    tone: "var(--tone-ivory)",
    blurb: "A seasonal release roasted in tiny batches. Bright, sparkling and gone by spring.",
  },
];

export type MenuItem = { name: string; desc: string; price: string; tag?: string };
export const menu: Record<string, MenuItem[]> = {
  Espresso: [
    { name: "Espresso", desc: "Midnight Noir, 18g in / 36g out", price: "3.5" },
    { name: "Cortado", desc: "Equal parts espresso & silky milk", price: "4.2" },
    { name: "Flat White", desc: "Double ristretto, micro-foam", price: "4.8" },
    { name: "Nocturne Latte", desc: "Burnt-honey, sea salt, oat milk", price: "5.9", tag: "Signature" },
    { name: "Cappuccino", desc: "Classic thirds, cocoa dust", price: "4.6" },
  ],
  "Slow Bar": [
    { name: "V60 Pour Over", desc: "Rotating single origin, 4 min brew", price: "6.0" },
    { name: "Chemex for Two", desc: "Shared carafe, tasting notes card", price: "11.0" },
    { name: "Siphon Theatre", desc: "Vacuum-brewed at your table", price: "9.5", tag: "Experience" },
    { name: "Aeropress", desc: "Bright & clean, inverted method", price: "5.5" },
  ],
  Cold: [
    { name: "18-Hour Cold Brew", desc: "Huila Verde, slow steeped", price: "5.2" },
    { name: "Espresso Tonic", desc: "Yuzu tonic, Ethiopian shot", price: "6.2", tag: "Signature" },
    { name: "Velvet Iced Latte", desc: "Cream float, vanilla bean", price: "5.8" },
    { name: "Nitro Noir", desc: "Nitrogen-infused, stout-like", price: "5.6" },
  ],
  Bakery: [
    { name: "Butter Croissant", desc: "72-hour laminated dough", price: "3.8" },
    { name: "Cardamom Bun", desc: "Swedish-style, pearl sugar", price: "4.2", tag: "Fan favourite" },
    { name: "Espresso Canelé", desc: "Caramelised crust, custard heart", price: "3.9" },
    { name: "Dark Chocolate Tart", desc: "70% cacao, coffee crème", price: "6.5" },
  ],
};

export type Store = {
  city: string;
  name: string;
  address: string;
  hours: { days: string; time: string }[];
  phone: string;
  note: string;
  coords: { x: number; y: number };
};

export const stores: Store[] = [
  {
    city: "Lisbon",
    name: "Nocturne Príncipe Real",
    address: "Rua da Escola Politécnica 42, 1250-102 Lisboa",
    hours: [
      { days: "Mon – Fri", time: "7:00 – 22:00" },
      { days: "Sat – Sun", time: "8:00 – 23:00" },
    ],
    phone: "+351 21 000 4242",
    note: "Our flagship roastery & slow bar.",
    coords: { x: 46, y: 38 },
  },
  {
    city: "Kyoto",
    name: "Nocturne Gion",
    address: "Hanamikoji-dori 14, Higashiyama, Kyoto",
    hours: [
      { days: "Daily", time: "8:00 – 21:00" },
    ],
    phone: "+81 75 000 1122",
    note: "Siphon bar in a restored machiya.",
    coords: { x: 84, y: 40 },
  },
  {
    city: "Brooklyn",
    name: "Nocturne Williamsburg",
    address: "118 Wythe Ave, Brooklyn, NY 11249",
    hours: [
      { days: "Mon – Fri", time: "6:30 – 20:00" },
      { days: "Sat – Sun", time: "7:30 – 21:00" },
    ],
    phone: "+1 718 000 7788",
    note: "Late-night espresso & vinyl Fridays.",
    coords: { x: 26, y: 37 },
  },
  {
    city: "Karachi",
    name: "Nocturne Clifton",
    address: "Block 4, Clifton, Karachi 75600",
    hours: [
      { days: "Daily", time: "9:00 – 01:00" },
    ],
    phone: "+92 21 000 3344",
    note: "Rooftop terrace overlooking the sea.",
    coords: { x: 66, y: 46 },
  },
];
