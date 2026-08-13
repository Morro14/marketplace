export type Product = {
  name: string;
  description: string;
  price: number;
  unit:
    | "unit"
    | "kg"
    | "500g"
    | "250g"
    | "500ml"
    | "g"
    | "l"
    | "ml"
    | "250ml"
    | "bunch"
    | "dozen";
};

export const products: Product[] = [
  {
    name: "Farm Fresh Eggs",
    description: "Free-range chicken eggs collected fresh from the farm.",
    price: 2.5,
    unit: "dozen",
  },
  {
    name: "Whole Milk",
    description: "Fresh, full-fat cow's milk from our dairy herd.",
    price: 1.8,
    unit: "l",
  },
  {
    name: "Cream",
    description: "Rich, fresh dairy cream with a naturally smooth texture.",
    price: 2.2,
    unit: "250ml",
  },
  {
    name: "Fresh Tomatoes",
    description: "Ripe, juicy tomatoes grown in our fields.",
    price: 3.5,
    unit: "kg",
  },
  {
    name: "Cucumbers",
    description:
      "Crisp and refreshing cucumbers picked straight from the farm.",
    price: 2.8,
    unit: "kg",
  },
  {
    name: "Potatoes",
    description:
      "Locally grown potatoes, ideal for roasting, baking, or mashing.",
    price: 1.9,
    unit: "kg",
  },
  {
    name: "Carrots",
    description: "Sweet, crunchy carrots harvested fresh from the soil.",
    price: 2.1,
    unit: "kg",
  },
  {
    name: "Red Onions",
    description: "Fresh red onions with a mild, slightly sweet flavor.",
    price: 2.4,
    unit: "kg",
  },
  {
    name: "Garlic",
    description: "Aromatic farm-grown garlic with rich, bold flavor.",
    price: 5.5,
    unit: "kg",
  },
  {
    name: "Fresh Strawberries",
    description: "Sweet seasonal strawberries picked at peak ripeness.",
    price: 6.5,
    unit: "kg",
  },
  {
    name: "Apples",
    description: "Crisp and naturally sweet apples from our orchard.",
    price: 3.2,
    unit: "kg",
  },
  {
    name: "Peaches",
    description: "Juicy, fragrant peaches harvested during the summer season.",
    price: 4.8,
    unit: "kg",
  },
  {
    name: "Wildflower Honey",
    description:
      "Raw honey collected by bees from wildflowers around the farm.",
    price: 8.5,
    unit: "500g",
  },
  {
    name: "Homemade Strawberry Jam",
    description: "Small-batch jam made with our own seasonal strawberries.",
    price: 5.9,
    unit: "250g",
  },
  {
    name: "Fresh Goat Cheese",
    description: "Soft, creamy cheese made from fresh farm-raised goat's milk.",
    price: 12.5,
    unit: "kg",
  },
  {
    name: "Sourdough Bread",
    description:
      "Handmade sourdough bread baked fresh with locally milled flour.",
    price: 4.5,
    unit: "unit",
  },
  {
    name: "Fresh Basil",
    description:
      "Fragrant basil harvested fresh for salads, sauces, and cooking.",
    price: 1.8,
    unit: "bunch",
  },
  {
    name: "Fresh Mint",
    description: "Aromatic garden mint, perfect for tea, desserts, and drinks.",
    price: 1.5,
    unit: "bunch",
  },
  {
    name: "Apple Cider",
    description: "Naturally pressed apple cider made from our orchard apples.",
    price: 4.2,
    unit: "l",
  },
  {
    name: "Farm Vegetable Basket",
    description:
      "A seasonal selection of freshly harvested vegetables from the farm.",
    price: 15,
    unit: "unit",
  },
];
