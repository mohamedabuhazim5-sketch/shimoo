import { Category, Product } from "@/types";

export const storeConfig = {
  name: "shemoo",
  slogan: "كل تفاصيل الخطوبة والفرح في مكان واحد",
  whatsapp: "201515351143",
  whatsappMessage: "مرحبًا، أريد الاستفسار عن منتجات متجر shemoo",
  facebook: "",
};

export const romanticLines = [
  "لمسة حب لكل مناسبة مميزة",
  "لأن فرحتك تستحق أجمل التفاصيل",
  "من أول الخطوبة لليلة الفرح… shemoo معاكِ",
  "تفاصيل ناعمة تحكي فرحتك",
  "صمّمنا الجمال ليكمل يومك الكبير",
];

export const categories: Category[] = [
  {
    id: "1",
    name: "صواني الخطوبة",
    slug: "engagement-trays",
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1200&auto=format&fit=crop",
    description: "صواني أنيقة بستايل رومانسي ولمسات فخمة.",
  },
  {
    id: "2",
    name: "ورد الأفراح",
    slug: "wedding-flowers",
    image:
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1200&auto=format&fit=crop",
    description: "تنسيقات ورد ناعمة تناسب الخطوبة والفرح.",
  },
  {
    id: "3",
    name: "مستلزمات العروسة",
    slug: "bride-essentials",
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop",
    description: "كل ما يخص العروسة من تجهيزات ولمسات خاصة.",
  },
  {
    id: "4",
    name: "هدايا المناسبات",
    slug: "occasion-gifts",
    image:
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0ff?q=80&w=1200&auto=format&fit=crop",
    description: "هدايا وعلب أنيقة للمناسبات الخاصة.",
  },
  {
    id: "5",
    name: "ديكورات الفرح",
    slug: "wedding-decor",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
    description: "تفاصيل وديكورات تعطي الفرح لمسة مميزة.",
  },
  {
    id: "6",
    name: "بوكسات وتجهيزات",
    slug: "boxes-and-preparations",
    image:
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1200&auto=format&fit=crop",
    description: "بوكسات خاصة وتجهيزات شيك للمناسبات.",
  },
];

export const products: Product[] = [
  {
    id: "1",
    name: "صينية خطوبة فخمة بالورد",
    slug: "luxury-engagement-tray",
    description: "صينية خطوبة راقية بتفاصيل أنيقة ولمسات ورد رومانسية.",
    price: 850,
    oldPrice: 990,
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1200&auto=format&fit=crop",
    category: "صواني الخطوبة",
    stock: 10,
    featured: true,
    bestSeller: true,
    badge: "الأكثر طلبًا",
  },
  {
    id: "2",
    name: "بوكيه ورد أفراح رومانسي",
    slug: "romantic-wedding-bouquet",
    description: "تنسيق ورد ناعم يضيف لمسة جميلة على يومك المميز.",
    price: 620,
    oldPrice: 700,
    image:
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1200&auto=format&fit=crop",
    category: "ورد الأفراح",
    stock: 14,
    featured: true,
    badge: "جديد",
  },
  {
    id: "3",
    name: "بوكس تجهيزات عروسة",
    slug: "bride-preparation-box",
    description: "بوكس أنيق يحتوي على لمسات ناعمة وتجهيزات مميزة للعروسة.",
    price: 1100,
    oldPrice: 1290,
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop",
    category: "مستلزمات العروسة",
    stock: 8,
    featured: true,
    badge: "مميز",
  },
  {
    id: "4",
    name: "بوكس هدية مناسبات",
    slug: "occasion-gift-box",
    description: "هدية بتغليف فاخر تناسب الخطوبة والمناسبات الخاصة.",
    price: 540,
    oldPrice: 650,
    image:
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0ff?q=80&w=1200&auto=format&fit=crop",
    category: "هدايا المناسبات",
    stock: 20,
    bestSeller: true,
    badge: "عرض خاص",
  },
  {
    id: "5",
    name: "ديكور ورد لطاولة الفرح",
    slug: "wedding-table-floral-decor",
    description: "تنسيق ديكوري وردي أنيق لطاولات الفرح والمناسبات.",
    price: 780,
    oldPrice: 930,
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
    category: "ديكورات الفرح",
    stock: 12,
    featured: true,
    badge: "جديد",
  },
  {
    id: "6",
    name: "علبة شبكة فخمة",
    slug: "luxury-shabka-box",
    description: "علبة شبكة أنيقة بتصميم ناعم ولمسة فخمة.",
    price: 720,
    oldPrice: 840,
    image:
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1200&auto=format&fit=crop",
    category: "بوكسات وتجهيزات",
    stock: 11,
    featured: true,
    bestSeller: true,
    badge: "الأكثر طلبًا",
  },
];