import { MenuItem } from '@/store/cartStore';

export const categories = [
  { id: 'all', name: 'All', icon: '🍽️' },
  { id: 'starters', name: 'Starters', icon: '🥗' },
  { id: 'mains', name: 'Main Course', icon: '🍛' },
  { id: 'pizza', name: 'Pizza', icon: '🍕' },
  { id: 'desserts', name: 'Desserts', icon: '🍰' },
  { id: 'beverages', name: 'Beverages', icon: '🥤' },
];

export const menuItems: MenuItem[] = [
  // Starters
  {
    id: '1',
    name: 'Truffle Arancini',
    description: 'Crispy risotto balls filled with mozzarella and black truffle, served with saffron aioli',
    price: 320,
    category: 'starters',
    imageUrl: 'https://images.unsplash.com/photo-1541014741259-de529411b96a?w=600&q=80',
    isVeg: true,
    has3D: true,
    modelUrl: 'https://res.cloudinary.com/dtqr4puey/image/upload/v1769810935/butterchicken_juqhtg.glb',
    calories: 280,
    ingredients: ['Arborio rice', 'Mozzarella', 'Black truffle', 'Saffron'],
  },
  {
    id: '2',
    name: 'Butter Chicken Tikka',
    description: 'Succulent chicken pieces marinated in yogurt and spices, grilled to perfection',
    price: 380,
    category: 'starters',
    imageUrl: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80',
    isVeg: false,
    has3D: true,
    modelUrl: 'https://res.cloudinary.com/dtqr4puey/image/upload/v1769810935/butterchicken_juqhtg.glb',
    calories: 350,
    ingredients: ['Chicken', 'Yogurt', 'Garam masala', 'Kashmiri chili'],
  },
  {
    id: '3',
    name: 'Paneer Tikka',
    description: 'Marinated cottage cheese cubes grilled with bell peppers and onions',
    price: 320,
    category: 'starters',
    imageUrl: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600&q=80',
    isVeg: true,
    has3D: true,
    modelUrl: 'https://res.cloudinary.com/dtqr4puey/image/upload/v1769810935/butterchicken_juqhtg.glb',
    // modelUrl: '/models/butterchicken.glb', // Reverting to relative path for later
    calories: 290,
    ingredients: ['Paneer', 'Bell peppers', 'Yogurt', 'Tandoori spices'],
  },

  // Main Course
  {
    id: '4',
    name: 'Dal Makhani',
    description: 'Slow-cooked black lentils in creamy tomato gravy, a timeless classic',
    price: 280,
    category: 'mains',
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80',
    isVeg: true,
    has3D: true,
    modelUrl: 'https://res.cloudinary.com/dtqr4puey/image/upload/v1769889899/thalimodel1_lc1sn0.glb',
    calories: 420,
    ingredients: ['Black lentils', 'Butter', 'Cream', 'Tomatoes'],
  },
  {
    id: '5',
    name: 'Lamb Rogan Josh',
    description: 'Tender lamb slow-cooked in aromatic Kashmiri spices and yogurt',
    price: 520,
    category: 'mains',
    imageUrl: 'https://images.unsplash.com/photo-1545247181-516773cae754?w=600&q=80',
    isVeg: false,
    has3D: true,
    modelUrl: 'https://res.cloudinary.com/dtqr4puey/image/upload/v1769889899/thalimodel1_lc1sn0.glb',
    calories: 580,
    ingredients: ['Lamb', 'Kashmiri chili', 'Yogurt', 'Fennel'],
  },
  {
    id: '6',
    name: 'Butter Paneer',
    description: 'Cottage cheese in rich tomato and cashew gravy with aromatic spices',
    price: 340,
    category: 'mains',
    imageUrl: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&q=80',
    isVeg: true,
    has3D: true,
    modelUrl: 'https://res.cloudinary.com/dtqr4puey/image/upload/v1769889899/thalimodel1_lc1sn0.glb',
    calories: 450,
    ingredients: ['Paneer', 'Tomatoes', 'Cashews', 'Cream'],
  },
  {
    id: '7',
    name: 'Prawn Malabari',
    description: 'Coastal prawns cooked in coconut milk with curry leaves and mustard',
    price: 480,
    category: 'mains',
    imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80',
    isVeg: false,
    has3D: true,
    modelUrl: 'https://res.cloudinary.com/dtqr4puey/image/upload/v1769889899/thalimodel1_lc1sn0.glb',
    calories: 380,
    ingredients: ['Prawns', 'Coconut milk', 'Curry leaves', 'Tamarind'],
  },

  // Pizza
  {
    id: '8',
    name: 'Truffle Mushroom Pizza',
    description: 'Wild mushrooms, truffle oil, mozzarella, and fresh thyme on artisan crust',
    price: 580,
    category: 'pizza',
    imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80',
    isVeg: true,
    has3D: true,
    modelUrl: 'https://res.cloudinary.com/dtqr4puey/image/upload/v1769890180/pizzamodel_kplmql.glb',
    calories: 680,
    ingredients: ['Wild mushrooms', 'Truffle oil', 'Mozzarella', 'Thyme'],
  },
  {
    id: '9',
    name: 'Pepperoni Supreme',
    description: 'Double pepperoni, mozzarella, Italian herbs, and spicy tomato sauce',
    price: 520,
    category: 'pizza',
    imageUrl: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&q=80',
    isVeg: false,
    has3D: true,
    modelUrl: 'https://res.cloudinary.com/dtqr4puey/image/upload/v1769890180/pizzamodel_kplmql.glb',
    calories: 780,
    ingredients: ['Pepperoni', 'Mozzarella', 'Tomato sauce', 'Italian herbs'],
  },
  {
    id: '10',
    name: 'Margherita Classica',
    description: 'San Marzano tomatoes, fresh mozzarella, basil, and extra virgin olive oil',
    price: 420,
    category: 'pizza',
    imageUrl: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=600&q=80',
    isVeg: true,
    has3D: true,
    modelUrl: 'https://res.cloudinary.com/dtqr4puey/image/upload/v1769890180/pizzamodel_kplmql.glb',
    calories: 550,
    ingredients: ['San Marzano tomatoes', 'Fresh mozzarella', 'Basil', 'Olive oil'],
  },

  // Desserts
  {
    id: '11',
    name: 'Tiramisu',
    description: 'Classic Italian dessert with espresso-soaked ladyfingers and mascarpone cream',
    price: 280,
    category: 'desserts',
    imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80',
    isVeg: true,
    has3D: true,
    calories: 380,
    ingredients: ['Mascarpone', 'Espresso', 'Ladyfingers', 'Cocoa'],
  },
  {
    id: '12',
    name: 'Gulab Jamun',
    description: 'Soft milk solids dumplings soaked in rose and cardamom infused sugar syrup',
    price: 180,
    category: 'desserts',
    imageUrl: 'https://images.unsplash.com/photo-1666190094768-a18dc0d27980?w=600&q=80',
    isVeg: true,
    has3D: true,
    calories: 320,
    ingredients: ['Milk solids', 'Rose water', 'Cardamom', 'Saffron'],
  },
  {
    id: '13',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with molten center, served with vanilla gelato',
    price: 320,
    category: 'desserts',
    imageUrl: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=600&q=80',
    isVeg: true,
    has3D: true,
    calories: 480,
    ingredients: ['Belgian chocolate', 'Butter', 'Eggs', 'Vanilla gelato'],
  },

  // Beverages
  {
    id: '14',
    name: 'Mango Lassi',
    description: 'Creamy yogurt smoothie blended with Alphonso mangoes and cardamom',
    price: 180,
    category: 'beverages',
    imageUrl: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=600&q=80',
    isVeg: true,
    has3D: true,
    modelUrl: 'https://res.cloudinary.com/dtqr4puey/image/upload/v1769891141/moktailmodel_zgtsca.glb',
    calories: 220,
    ingredients: ['Yogurt', 'Alphonso mango', 'Cardamom', 'Sugar'],
  },
  {
    id: '15',
    name: 'Masala Chai',
    description: 'Traditional spiced tea with ginger, cardamom, and cinnamon',
    price: 120,
    category: 'beverages',
    imageUrl: 'https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=600&q=80',
    isVeg: true,
    has3D: true,
    modelUrl: 'https://res.cloudinary.com/dtqr4puey/image/upload/v1769891141/moktailmodel_zgtsca.glb',
    calories: 80,
    ingredients: ['Assam tea', 'Ginger', 'Cardamom', 'Cinnamon'],
  },
  {
    id: '16',
    name: 'Virgin Mojito',
    description: 'Refreshing lime and mint mocktail with a hint of passion fruit',
    price: 160,
    category: 'beverages',
    imageUrl: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600&q=80',
    isVeg: true,
    has3D: true,
    modelUrl: 'https://res.cloudinary.com/dtqr4puey/image/upload/v1769891141/moktailmodel_zgtsca.glb',
    calories: 120,
    ingredients: ['Lime', 'Mint', 'Passion fruit', 'Soda'],
  },
];

export const getMenuItemsByCategory = (category: string): MenuItem[] => {
  if (category === 'all') return menuItems;
  return menuItems.filter((item) => item.category === category);
};

export const getMenuItemById = (id: string): MenuItem | undefined => {
  return menuItems.find((item) => item.id === id);
};

export const getMenuItemBySlug = (slug: string): MenuItem | undefined => {
  const normalizedSlug = slug.toLowerCase().replace(/-/g, ' ');
  return menuItems.find(
    (item) => item.name.toLowerCase() === normalizedSlug
  );
};
