const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Product = require("./models/Product");

dotenv.config();

const products = [
  {
    slug: "iphone-17-pro",
    name: "iPhone 17 Pro",
    brand: "Apple",
    category: "Phone",
    colors: [
      {
        name: "Silver",
        hex: "#D8D8D4",
        image: "/products/iphone/silver.png",
      },
      {
        name: "Pink",
        hex: "#E7C5C7",
        image: "/products/iphone/pink.png",
      },
      {
        name: "Orange",
        hex: "#D97845",
        image: "/products/iphone/orange.png",
      },
    ],
    variants: [
      { label: "256GB", price: 134900, mrp: 139900 },
      { label: "512GB", price: 154900, mrp: 159900 },
      { label: "1TB", price: 174900, mrp: 179900 },
    ],
    emiPlans: [
      { months: 3, interestRate: 0 },
      { months: 6, interestRate: 0 },
      { months: 12, interestRate: 10.5 },
    ],
  },

  {
    slug: "galaxy-s25-ultra",
    name: "Galaxy S25 Ultra",
    brand: "Samsung",
    category: "Phone",
    colors: [
      {
        name: "Titanium Black",
        hex: "#303030",
        image: "/products/samsung/black.png",
      },
      {
        name: "Titanium Gray",
        hex: "#8E8E89",
        image: "/products/samsung/gray.png",
      },
      {
        name: "Titanium Silverblue",
        hex: "#A9B8C2",
        image: "/products/samsung/silverblue.png",
      },
    ],
    variants: [
      { label: "256GB", price: 129999, mrp: 134999 },
      { label: "512GB", price: 141999, mrp: 146999 },
      { label: "1TB", price: 159999, mrp: 164999 },
    ],
    emiPlans: [
      { months: 3, interestRate: 0 },
      { months: 6, interestRate: 0 },
      { months: 12, interestRate: 9.5 },
    ],
  },

  {
    slug: "pixel-10-pro",
    name: "Pixel 10 Pro",
    brand: "Google",
    category: "Phone",
    colors: [
      {
        name: "Obsidian",
        hex: "#292929",
        image: "/products/pixel/black.png",
      },
      {
        name: "Gray",
        hex: "#A7A7A3",
        image: "/products/pixel/gray.png",
      },
      {
        name: "Moonstone",
        hex: "#71808C",
        image: "/products/pixel/moonstone.png",
      },
    ],
    variants: [
      { label: "128GB", price: 109999, mrp: 114999 },
      { label: "256GB", price: 119999, mrp: 124999 },
      { label: "512GB", price: 139999, mrp: 144999 },
    ],
    emiPlans: [
      { months: 3, interestRate: 0 },
      { months: 6, interestRate: 0 },
      { months: 12, interestRate: 10 },
    ],
  },

  {
    slug: "macbook-air",
    name: "MacBook Air",
    brand: "Apple",
    category: "Laptop",
    colors: [
      {
        name: "Silver",
        hex: "#D2D2D2",
        image: "/products/macbook/silver.jpg",
      },
      {
        name: "Sky Blue",
        hex: "#AAB8C1",
        image: "/products/macbook/skyblue.jpg",
      },
    ],
    variants: [
      { label: "16GB / 256GB", price: 99900, mrp: 104900 },
      { label: "16GB / 512GB", price: 119900, mrp: 124900 },
      { label: "24GB / 512GB", price: 139900, mrp: 144900 },
    ],
    emiPlans: [
      { months: 3, interestRate: 0 },
      { months: 6, interestRate: 0 },
      { months: 12, interestRate: 8.5 },
    ],
  },

  {
    slug: "asus-vivobook",
    name: "ASUS Vivobook",
    brand: "ASUS",
    category: "Laptop",
    colors: [
      {
        name: "Midnight",
        hex: "#303237",
        image: "/products/asus/midnight.webp",
      },
      {
        name: "Silver",
        hex: "#BFC1C2",
        image: "/products/asus/silver.webp",
      },
    ],
    variants: [
      { label: "8GB / 512GB", price: 54990, mrp: 59990 },
      { label: "16GB / 512GB", price: 64990, mrp: 69990 },
      { label: "16GB / 1TB", price: 74990, mrp: 79990 },
    ],
    emiPlans: [
      { months: 3, interestRate: 0 },
      { months: 6, interestRate: 0 },
      { months: 12, interestRate: 8 },
    ],
  },
];

const seedProducts = async () => {
  try {
    await connectDB();

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log("Products seeded successfully");
    process.exit();
  } catch (error) {
    console.error("Seed error:", error.message);
    process.exit(1);
  }
};

seedProducts();