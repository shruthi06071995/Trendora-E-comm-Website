const dotenv = require("dotenv");
const connectDB = require("./config/db");
const User = require("./models/User");
const Product = require("./models/Product");
const Order = require("./models/Order");

dotenv.config();
connectDB();

const users = [
  { name: "Admin User", email: "admin@famms.com", password: "123456", isAdmin: true },
  { name: "John Doe", email: "john@famms.com", password: "123456" },
];

const products = [
  {
    name: "Wireless Headphones",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    description: "Premium wireless headphones with noise cancellation",
    brand: "SoundMax",
    category: "Electronics",
    price: 2499,
    countInStock: 15,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: "Running Shoes",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
    description: "Lightweight running shoes for daily training",
    brand: "SprintX",
    category: "Footwear",
    price: 1899,
    countInStock: 20,
    rating: 4.2,
    numReviews: 8,
  },
  {
    name: "Smart Watch",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    description: "Fitness tracking smart watch with heart rate monitor",
    brand: "TimeTech",
    category: "Electronics",
    price: 3499,
    countInStock: 10,
    rating: 4.7,
    numReviews: 20,
  },
  {
    name: "Leather Backpack",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80",
    description: "Stylish leather backpack for daily commute and travel",
    brand: "UrbanCarry",
    category: "Accessories",
    price: 2199,
    countInStock: 12,
    rating: 4.4,
    numReviews: 15,
  },
  {
    name: "Sunglasses",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80",
    description: "UV-protected polarized sunglasses with classic frame",
    brand: "SunStyle",
    category: "Accessories",
    price: 899,
    countInStock: 25,
    rating: 4.1,
    numReviews: 9,
  },
  {
    name: "Bluetooth Speaker",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80",
    description: "Portable waterproof Bluetooth speaker with deep bass",
    brand: "SoundMax",
    category: "Electronics",
    price: 1599,
    countInStock: 18,
    rating: 4.6,
    numReviews: 22,
  },
  {
    name: "Men's Denim Jacket",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80",
    description: "Classic blue denim jacket, unisex fit, durable stitching",
    brand: "UrbanThread",
    category: "Fashion",
    price: 1799,
    countInStock: 22,
    rating: 4.3,
    numReviews: 11,
  },
  {
    name: "Women's Floral Dress",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80",
    description: "Lightweight summer floral dress, breathable cotton fabric",
    brand: "BloomWear",
    category: "Fashion",
    price: 1299,
    countInStock: 30,
    rating: 4.5,
    numReviews: 18,
  },
  {
    name: "Ceramic Coffee Mug Set",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500&q=80",
    description: "Set of 2 handcrafted ceramic mugs, microwave safe",
    brand: "HomeCraft",
    category: "Home & Kitchen",
    price: 599,
    countInStock: 40,
    rating: 4.4,
    numReviews: 14,
  },
  {
    name: "Scented Candle Set",
    image: "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?w=500&q=80",
    description: "Set of 3 aromatherapy soy candles - lavender, vanilla, citrus",
    brand: "GlowHome",
    category: "Home & Kitchen",
    price: 749,
    countInStock: 35,
    rating: 4.7,
    numReviews: 26,
  },
  {
    name: "Herbal Face Serum",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80",
    description: "Vitamin C face serum for glowing, even-toned skin",
    brand: "PureGlow",
    category: "Beauty",
    price: 449,
    countInStock: 50,
    rating: 4.2,
    numReviews: 33,
  },
  {
    name: "Wireless Mechanical Keyboard",
    image: "https://images.unsplash.com/photo-1595044426077-d36d9236d54a?w=500&q=80",
    description: "RGB backlit mechanical keyboard with wireless connectivity",
    brand: "TechMax",
    category: "Electronics",
    price: 2999,
    countInStock: 14,
    rating: 4.6,
    numReviews: 19,
  },
];

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // insertMany() skips password-hashing, so use create() in a loop instead
    const createdUsers = [];
    for (const u of users) {
      const created = await User.create(u);
      createdUsers.push(created);
    }
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((p) => ({ ...p, user: adminUser }));
    await Product.insertMany(sampleProducts);

    console.log("✅ Data Imported Successfully!");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log("🗑️ Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
