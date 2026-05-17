import type { MenuItem } from "./store/menuStore";

export const mockMenuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Салат с авокадо Салат с авокадо',
    url: 'https://example.com/1',
    recipe: 'Нарезать овощи и смешать.',
    favorites: true,
    photo_url:
      'https://dnakypyhphezayboqmdv.supabase.co/storage/v1/object/public/menu/photo_2026-05-13_23-53-59%20(2).jpg',
    category: {
      id: 1,
      name: 'Салаты',
    },
  },
  {
    id: 2,
    name: 'Тыквенный суп',
    url: 'https://example.com/2',
    recipe: 'Сварить тыкву и измельчить блендером.',
    favorites: false,
    photo_url:
      'https://dnakypyhphezayboqmdv.supabase.co/storage/v1/object/public/menu/photo_2026-05-13_23-54-00.jpg',
    category: {
      id: 2,
      name: 'Супы',
    },
  },
  {
    id: 3,
    name: 'Лосось с лимоном',
    url: 'https://example.com/3',
    recipe: 'Запечь лосось с лимоном.',
    favorites: true,
    photo_url:
      'https://dnakypyhphezayboqmdv.supabase.co/storage/v1/object/public/menu/photo_2026-05-13_23-53-59%20(3).jpg',
    category: {
      id: 3,
      name: 'Горячее',
    },
  },
  {
    id: 4,
    name: 'Брускетта',
    url: 'https://example.com/4',
    recipe: 'Поджарить хлеб и добавить томаты.',
    favorites: false,
    photo_url:
      'https://dnakypyhphezayboqmdv.supabase.co/storage/v1/object/public/menu/photo_2026-05-13_23-53-59%20(2).jpg',
    category: {
      id: 4,
      name: 'Закуски',
    },
  },
  {
    id: 5,
    name: 'Шоколадный торт',
    url: 'https://example.com/5',
    recipe: 'Испечь шоколадный бисквит.',
    favorites: true,
    photo_url:
      'https://dnakypyhphezayboqmdv.supabase.co/storage/v1/object/public/menu/photo_2026-05-13_23-54-00.jpg',
    category: {
      id: 5,
      name: 'Десерты',
    },
  },
  {
    id: 6,
    name: 'Лимонад',
    url: 'https://example.com/6',
    recipe: 'Смешать лимон, мяту и воду.',
    favorites: false,
    photo_url:
      'https://dnakypyhphezayboqmdv.supabase.co/storage/v1/object/public/menu/photo_2026-05-13_23-53-59%20(3).jpg',
    category: {
      id: 6,
      name: 'Напитки',
    },
  },
  {
    id: 7,
    name: 'Паста Карбонара',
    url: 'https://example.com/7',
    recipe: 'Сварить пасту и добавить соус.',
    favorites: true,
    photo_url:
      'https://dnakypyhphezayboqmdv.supabase.co/storage/v1/object/public/menu/photo_2026-05-13_23-53-59%20(2).jpg',
    category: {
      id: 3,
      name: 'Горячее',
    },
  },
  {
    id: 8,
    name: 'Цезарь',
    url: 'https://example.com/8',
    recipe: 'Смешать салат и соус.',
    favorites: false,
    photo_url:
      'https://dnakypyhphezayboqmdv.supabase.co/storage/v1/object/public/menu/photo_2026-05-13_23-54-00.jpg',
    category: {
      id: 1,
      name: 'Салаты',
    },
  },
  {
    id: 9,
    name: 'Мисо суп',
    url: 'https://example.com/9',
    recipe: 'Сварить бульон мисо.',
    favorites: true,
    photo_url:
      'https://dnakypyhphezayboqmdv.supabase.co/storage/v1/object/public/menu/photo_2026-05-13_23-53-59%20(3).jpg',
    category: {
      id: 2,
      name: 'Супы',
    },
  },
  {
    id: 10,
    name: 'Стейк',
    url: 'https://example.com/10',
    recipe: 'Обжарить мясо.',
    favorites: false,
    photo_url:
      'https://dnakypyhphezayboqmdv.supabase.co/storage/v1/object/public/menu/photo_2026-05-13_23-53-59%20(2).jpg',
    category: {
      id: 3,
      name: 'Горячее',
    },
  },
  {
    id: 11,
    name: 'Круассан',
    url: 'https://example.com/11',
    recipe: 'Испечь тесто.',
    favorites: false,
    photo_url:
      'https://dnakypyhphezayboqmdv.supabase.co/storage/v1/object/public/menu/photo_2026-05-13_23-54-00.jpg',
    category: {
      id: 4,
      name: 'Выпечка',
    },
  },
  {
    id: 12,
    name: 'Мохито',
    url: 'https://example.com/12',
    recipe: 'Добавить лед и лайм.',
    favorites: true,
    photo_url:
      'https://dnakypyhphezayboqmdv.supabase.co/storage/v1/object/public/menu/photo_2026-05-13_23-53-59%20(3).jpg',
    category: {
      id: 6,
      name: 'Напитки',
    },
  },
  {
    id: 13,
    name: 'Омлет',
    url: 'https://example.com/13',
    recipe: 'Взбить яйца и пожарить.',
    favorites: false,
    photo_url:
      'https://dnakypyhphezayboqmdv.supabase.co/storage/v1/object/public/menu/photo_2026-05-13_23-53-59%20(2).jpg',
    category: {
      id: 7,
      name: 'Завтраки',
    },
  },
  {
    id: 14,
    name: 'Панкейки',
    url: 'https://example.com/14',
    recipe: 'Смешать тесто и обжарить.',
    favorites: true,
    photo_url:
      'https://dnakypyhphezayboqmdv.supabase.co/storage/v1/object/public/menu/photo_2026-05-13_23-54-00.jpg',
    category: {
      id: 7,
      name: 'Завтраки',
    },
  },
  {
    id: 15,
    name: 'Суши',
    url: 'https://example.com/15',
    recipe: 'Скатать роллы.',
    favorites: true,
    photo_url:
      'https://dnakypyhphezayboqmdv.supabase.co/storage/v1/object/public/menu/photo_2026-05-13_23-53-59%20(3).jpg',
    category: {
      id: 8,
      name: 'Японская кухня',
    },
  },
  {
    id: 16,
    name: 'Пицца Маргарита',
    url: 'https://example.com/16',
    recipe: 'Испечь пиццу.',
    favorites: false,
    photo_url:
      'https://dnakypyhphezayboqmdv.supabase.co/storage/v1/object/public/menu/photo_2026-05-13_23-53-59%20(2).jpg',
    category: {
      id: 9,
      name: 'Фастфуд',
    },
  },
  {
    id: 17,
    name: 'Чизкейк',
    url: 'https://example.com/17',
    recipe: 'Охладить десерт.',
    favorites: true,
    photo_url:
      'https://dnakypyhphezayboqmdv.supabase.co/storage/v1/object/public/menu/photo_2026-05-13_23-54-00.jpg',
    category: {
      id: 5,
      name: 'Десерты',
    },
  },
  {
    id: 18,
    name: 'Рамен',
    url: 'https://example.com/18',
    recipe: 'Сварить лапшу.',
    favorites: false,
    photo_url:
      'https://dnakypyhphezayboqmdv.supabase.co/storage/v1/object/public/menu/photo_2026-05-13_23-53-59%20(3).jpg',
    category: {
      id: 2,
      name: 'Супы',
    },
  },
  {
    id: 19,
    name: 'Бургер',
    url: 'https://example.com/19',
    recipe: 'Собрать бургер.',
    favorites: true,
    photo_url:
      'https://dnakypyhphezayboqmdv.supabase.co/storage/v1/object/public/menu/photo_2026-05-13_23-53-59%20(2).jpg',
    category: {
      id: 9,
      name: 'Фастфуд',
    },
  },
  {
    id: 20,
    name: 'Греческий салат',
    url: 'https://example.com/20',
    recipe: 'Смешать овощи и сыр.',
    favorites: false,
    photo_url:
      'https://dnakypyhphezayboqmdv.supabase.co/storage/v1/object/public/menu/photo_2026-05-13_23-54-00.jpg',
    category: {
      id: 1,
      name: 'Салаты',
    },
  },
];