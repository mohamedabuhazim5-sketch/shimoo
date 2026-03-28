export type Category = {
  id: string;
  name: string;
  slug: string;
  image: string;
  description?: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  oldPrice?: number;
  image: string;
  images?: string[];
  category: string;
  stock: number;
  featured?: boolean;
  bestSeller?: boolean;
  badge?: string;
};