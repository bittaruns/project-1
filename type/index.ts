export interface CardData {
  id: number;
  title: string;
  category: string;
  image: string;
  downloads: number;
  height: number;
}

export interface CategoryData {
  name: string;
  count: number;
  image: string;
}