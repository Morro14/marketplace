import { slugify } from "../utils/general";

export type Product_ = {
  name: string;
  description: string;
  price: number;
  quantity: number;
  price_unit: "unit" | "kg" | "g" | "l" | "ml" | "bunch" | "dozen";
  categories: string[];
};

export const categories = [
  "Dairy & Eggs",
  "Poultry",
  "Red Meat",
  "Farm Fresh",
  "Vegetables",
  "Herbs & Spices",
  "Fruits",
  "Seasonal",
  "Pantry",
  "Preserves",
  "Bakery",
  "Drinks",
  "Bundles",
] as const;

export const products_: Product_[] = [
  {
    name: "Free-Range Chicken",
    description:
      "Fresh whole chicken raised on the farm with plenty of outdoor space.",
    price: 7.5,
    quantity: 1,
    price_unit: "kg",
    categories: ["Poultry", "Farm Fresh"],
  },
  {
    name: "Chicken Breast",
    description: "Tender boneless chicken breast from our free-range chickens.",
    price: 11.5,
    quantity: 1,
    price_unit: "kg",
    categories: ["Poultry", "Farm Fresh"],
  },
  {
    name: "Chicken Thighs",
    description: "Juicy bone-in chicken thighs, freshly prepared on the farm.",
    price: 8.5,
    quantity: 1,
    price_unit: "kg",
    categories: ["Poultry", "Farm Fresh"],
  },
  {
    name: "Farm-Raised Turkey",
    description: "Tender turkey raised naturally on the farm.",
    price: 9.5,
    quantity: 1,
    price_unit: "kg",
    categories: ["Poultry", "Farm Fresh"],
  },
  {
    name: "Fresh Beef",
    description: "Locally raised beef from grass-fed cattle.",
    price: 14.5,
    quantity: 1,
    price_unit: "kg",
    categories: ["Red Meat", "Farm Fresh"],
  },
  {
    name: "Beef Steak",
    description: "Tender cuts of farm-raised beef, perfect for grilling.",
    price: 19.5,
    quantity: 1,
    price_unit: "kg",
    categories: ["Red Meat"],
  },
  {
    name: "Ground Beef",
    description: "Freshly ground beef made from locally raised cattle.",
    price: 12.5,
    quantity: 1,
    price_unit: "kg",
    categories: ["Red Meat", "Farm Fresh"],
  },
  {
    name: "Lamb",
    description: "Tender lamb from pasture-raised sheep.",
    price: 16.5,
    quantity: 1,
    price_unit: "kg",
    categories: ["Red Meat", "Farm Fresh"],
  },
  {
    name: "Farm Fresh Eggs",
    description: "Free-range chicken eggs collected fresh from the farm.",
    price: 2.5,
    quantity: 1,
    price_unit: "dozen",
    categories: ["Dairy & Eggs", "Farm Fresh"],
  },
  {
    name: "Whole Milk",
    description: "Fresh, full-fat cow's milk from our dairy herd.",
    price: 1.8,
    quantity: 1,
    price_unit: "l",
    categories: ["Dairy & Eggs", "Farm Fresh"],
  },
  {
    name: "Cream",
    description: "Rich, fresh dairy cream with a naturally smooth texture.",
    price: 2.2,
    quantity: 250,
    price_unit: "ml",
    categories: ["Dairy & Eggs"],
  },
  {
    name: "Fresh Tomatoes",
    description: "Ripe, juicy tomatoes grown in our fields.",
    price: 3.5,
    quantity: 1,
    price_unit: "kg",
    categories: ["Vegetables", "Farm Fresh"],
  },
  {
    name: "Cucumbers",
    description:
      "Crisp and refreshing cucumbers picked straight from the farm.",
    price: 2.8,
    quantity: 1,
    price_unit: "kg",
    categories: ["Vegetables", "Farm Fresh"],
  },
  {
    name: "Potatoes",
    description:
      "Locally grown potatoes, ideal for roasting, baking, or mashing.",
    price: 1.9,
    quantity: 1,
    price_unit: "kg",
    categories: ["Vegetables"],
  },
  {
    name: "Carrots",
    description: "Sweet, crunchy carrots harvested fresh from the soil.",
    price: 2.1,
    quantity: 1,
    price_unit: "kg",
    categories: ["Vegetables", "Farm Fresh"],
  },
  {
    name: "Red Onions",
    description: "Fresh red onions with a mild, slightly sweet flavor.",
    price: 2.4,
    quantity: 1,
    price_unit: "kg",
    categories: ["Vegetables"],
  },
  {
    name: "Garlic",
    description: "Aromatic farm-grown garlic with rich, bold flavor.",
    price: 5.5,
    quantity: 1,
    price_unit: "kg",
    categories: ["Vegetables", "Herbs & Spices"],
  },
  {
    name: "Fresh Strawberries",
    description: "Sweet seasonal strawberries picked at peak ripeness.",
    price: 6.5,
    quantity: 1,
    price_unit: "kg",
    categories: ["Fruits", "Seasonal"],
  },
  {
    name: "Apples",
    description: "Crisp and naturally sweet apples from our orchard.",
    price: 3.2,
    quantity: 1,
    price_unit: "kg",
    categories: ["Fruits", "Farm Fresh"],
  },
  {
    name: "Peaches",
    description: "Juicy, fragrant peaches harvested during the summer season.",
    price: 4.8,
    quantity: 1,
    price_unit: "kg",
    categories: ["Fruits", "Seasonal"],
  },
  {
    name: "Wildflower Honey",
    description:
      "Raw honey collected by bees from wildflowers around the farm.",
    price: 8.5,
    quantity: 500,
    price_unit: "g",
    categories: ["Pantry", "Farm Fresh"],
  },
  {
    name: "Homemade Strawberry Jam",
    description: "Small-batch jam made with our own seasonal strawberries.",
    price: 5.9,
    quantity: 250,
    price_unit: "g",
    categories: ["Pantry", "Preserves"],
  },
  {
    name: "Fresh Goat Cheese",
    description: "Soft, creamy cheese made from fresh farm-raised goat's milk.",
    price: 12.5,
    quantity: 1,
    price_unit: "kg",
    categories: ["Dairy & Eggs", "Farm Fresh"],
  },
  {
    name: "Sourdough Bread",
    description:
      "Handmade sourdough bread baked fresh with locally milled flour.",
    price: 4.5,
    quantity: 1,
    price_unit: "unit",
    categories: ["Bakery", "Farm Fresh"],
  },
  {
    name: "Fresh Basil",
    description:
      "Fragrant basil harvested fresh for salads, sauces, and cooking.",
    price: 1.8,
    quantity: 1,
    price_unit: "bunch",
    categories: ["Herbs & Spices", "Farm Fresh"],
  },
  {
    name: "Fresh Mint",
    description: "Aromatic garden mint, perfect for tea, desserts, and drinks.",
    price: 1.5,
    quantity: 1,
    price_unit: "bunch",
    categories: ["Herbs & Spices", "Farm Fresh"],
  },
  {
    name: "Apple Cider",
    description: "Naturally pressed apple cider made from our orchard apples.",
    price: 4.2,
    quantity: 1,
    price_unit: "l",
    categories: ["Drinks", "Farm Fresh"],
  },
  {
    name: "Farm Vegetable Basket",
    description:
      "A seasonal selection of freshly harvested vegetables from the farm.",
    price: 15,
    quantity: 1,
    price_unit: "unit",
    categories: ["Vegetables", "Seasonal", "Bundles"],
  },
];

export type Product = {
  id: number;
  slug: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  price_unit: "unit" | "kg" | "g" | "l" | "ml" | "bunch" | "dozen";
  categories: string[];
};
export const products = structuredClone(products_) as Product[];
products.map((p, i) => {
  p["id"] = i;
  p["slug"] = slugify(p.name);
});
