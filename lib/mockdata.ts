export interface CardData {
  id: string;
  title: string;
  category: string;
  image: string;
  tags: string[];
  downloads: number;
}

export interface CategoryData {
  name: string;
  count: number;
  image: string;
}

// Helper function to dynamically build the local file database
const generateCards = (
  folder: string,
  prefix: string,
  start: number,
  end: number,
  category: string,
  baseTags: string[]
): CardData[] => {
  const cards: CardData[] = [];
  for (let i = start; i <= end; i++) {
    cards.push({
      id: `${folder}-${i}`,
      title: `${category} Greeting ${i}`,
      category: category,
      // Matches the exact paths in your public/Cards folder
      image: `/Cards/${folder}/${prefix}-${i}.jpg`,
      tags: [...baseTags, category.toLowerCase()],
      downloads: Math.floor(Math.random() * 5000) + 100, // Mock download count
    });
  }
  return cards;
};

// Compile all local images into a single database array
export const LOCAL_CARDS: CardData[] = [
  ...generateCards('4thofjuly', '4th july', 2, 20, '4th of July', ['independence day', 'america', 'july 4', 'fireworks']),
  ...generateCards('christmas', 'christmas', 1, 20, 'Christmas', ['xmas', 'merry christmas', 'winter', 'holiday']),
  ...generateCards('diwali', 'Diwali', 1, 10, 'Diwali', ['deepavali', 'festival of lights', 'india', 'diya']),
  ...generateCards('easter', 'Easter', 1, 10, 'Easter', ['bunny', 'eggs', 'spring', 'sunday']),
  ...generateCards('eid', 'Eid', 1, 10, 'Eid', ['mubarak', 'ramadan', 'islamic', 'moon']),
  ...generateCards('fathers_day', 'father_s day', 2, 20, "Father's Day", ['dad', 'father', 'parent', 'love']),
  ...generateCards('halloween', 'Halloween', 1, 20, 'Halloween', ['spooky', 'october 31', 'pumpkin', 'scary']),
  ...generateCards('hannukah', 'Hanukkah', 1, 10, 'Hanukkah', ['chanukah', 'jewish', 'menorah', 'festival of lights']),
  ...generateCards('holi', 'Holi', 1, 10, 'Holi', ['colors', 'festival of colors', 'india', 'spring']),
  ...generateCards('mothers_day', 'mother_s day', 1, 20, "Mother's Day", ['mom', 'mother', 'parent', 'love']),
  ...generateCards('st.patricksday', 'St. Patrick_s Day', 1, 10, "St. Patrick's Day", ['irish', 'lucky', 'clover', 'march 17']),
  ...generateCards('thanksgiving', 'thanksgiving', 1, 20, 'Thanksgiving', ['turkey', 'fall', 'autumn', 'grateful']),
  ...generateCards('valentines_day', 'Valentines', 1, 20, "Valentine's Day", ['love', 'romance', 'february 14', 'heart']),
];

// Generate the category list dynamically based on the cards
export const CATEGORIES: CategoryData[] = [
  { name: '4th of July', count: 19, image: '/Cards/4thofjuly/4th july-2.jpg' },
  { name: 'Christmas', count: 20, image: '/Cards/christmas/christmas-1.jpg' },
  { name: 'Diwali', count: 10, image: '/Cards/diwali/Diwali-1.jpg' },
  { name: 'Easter', count: 10, image: '/Cards/easter/Easter-1.jpg' },
  { name: 'Eid', count: 10, image: '/Cards/eid/Eid-1.jpg' },
  { name: "Father's Day", count: 19, image: '/Cards/fathers_day/father_s day-2.jpg' },
  { name: 'Halloween', count: 20, image: '/Cards/halloween/Halloween-1.jpg' },
  { name: 'Hanukkah', count: 10, image: '/Cards/hannukah/Hanukkah-1.jpg' },
  { name: 'Holi', count: 10, image: '/Cards/holi/Holi-1.jpg' },
  { name: "Mother's Day", count: 20, image: '/Cards/mothers_day/mother_s day-1.jpg' },
  { name: "St. Patrick's Day", count: 10, image: '/Cards/st.patricksday/St. Patrick_s Day-1.jpg' },
  { name: 'Thanksgiving', count: 20, image: '/Cards/thanksgiving/thanksgiving-1.jpg' },
  { name: "Valentine's Day", count: 20, image: '/Cards/valentines_day/Valentines-1.jpg' },
];

export const SEARCH_CHIPS = ['Birthday', 'Diwali', 'Holi', 'Christmas', 'Anniversary', 'Good Morning', 'Love', 'Quotes', 'Motivation'];