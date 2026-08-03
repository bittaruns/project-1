import { CardData,CategoryData } from "@/type";

export const UNSPLASH_IMAGES: CardData[] = [
  { id: 1,  title: 'Happy Birthday Wishes',     category: 'Birthday',     image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=500&fit=crop&auto=format', downloads: 4821, height: 280 },
  { id: 2,  title: 'Diwali Festival of Lights',  category: 'Diwali',       image: 'https://images.unsplash.com/photo-1605289355680-75fb41239154?w=400&h=350&fit=crop&auto=format', downloads: 6340, height: 240 },
  { id: 3,  title: 'Good Morning Sunshine',      category: 'Good Morning', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=450&fit=crop&auto=format', downloads: 3102, height: 320 },
  { id: 4,  title: 'Motivational Monday',        category: 'Motivation',   image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=400&h=400&fit=crop&auto=format', downloads: 5511, height: 260 },
  { id: 5,  title: 'Anniversary Celebration',    category: 'Anniversary',  image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=520&fit=crop&auto=format', downloads: 2987, height: 300 },
  { id: 6,  title: 'Holi Colors of Joy',         category: 'Holi',         image: 'https://images.unsplash.com/photo-1576021182211-9ea8dced3690?w=400&h=380&fit=crop&auto=format', downloads: 7203, height: 250 },
  { id: 7,  title: 'Love and Warmth',            category: 'Love',         image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=460&fit=crop&auto=format', downloads: 4455, height: 290 },
  { id: 8,  title: 'Christmas Magic',            category: 'Christmas',    image: 'https://images.unsplash.com/photo-1545622783-b3e021430fee?w=400&h=340&fit=crop&auto=format', downloads: 8901, height: 220 },
  { id: 9,  title: 'Rise and Shine',             category: 'Good Morning', image: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=400&h=480&fit=crop&auto=format', downloads: 3344, height: 310 },
  { id: 10, title: 'Dream Big Always',           category: 'Motivation',   image: 'https://images.unsplash.com/photo-1533228100845-08145b01de14?w=400&h=360&fit=crop&auto=format', downloads: 6120, height: 240 },
  { id: 11, title: 'Friendship Forever',         category: 'Friendship',   image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=420&fit=crop&auto=format', downloads: 2760, height: 270 },
  { id: 12, title: 'New Year New Beginnings',    category: 'New Year',     image: 'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=400&h=500&fit=crop&auto=format', downloads: 9234, height: 330 },
];

export const CATEGORIES: CategoryData[] = [
  { name: 'Birthday',     count: 1240, image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=260&fit=crop&auto=format' },
  { name: 'Diwali',       count: 890,  image: 'https://images.unsplash.com/photo-1605289355680-75fb41239154?w=400&h=260&fit=crop&auto=format' },
  { name: 'Good Morning', count: 2100, image: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=400&h=260&fit=crop&auto=format' },
  { name: 'Motivation',   count: 1560, image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=400&h=260&fit=crop&auto=format' },
  { name: 'Anniversary',  count: 670,  image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=260&fit=crop&auto=format' },
  { name: 'Christmas',    count: 1890, image: 'https://images.unsplash.com/photo-1545622783-b3e021430fee?w=400&h=260&fit=crop&auto=format' },
  { name: 'Love',         count: 980,  image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=260&fit=crop&auto=format' },
  { name: 'Holi',         count: 445,  image: 'https://images.unsplash.com/photo-1576021182211-9ea8dced3690?w=400&h=260&fit=crop&auto=format' },
];

export const SEARCH_CHIPS = ['Birthday', 'Diwali', 'Holi', 'Christmas', 'Anniversary', 'Good Morning', 'Love', 'Quotes', 'Motivation'];