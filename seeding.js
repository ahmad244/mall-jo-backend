import mongoose from "mongoose";
// import User from "./models/User.js"; // Import the User model
import Product from "./models/Product.js"; // Import the Product model

// Connect to your MongoDB instance using your connection string
mongoose.connect("mongodb+srv://DatabaseUser:qQvu3dmsyHLSreOH@clustername.j3h8ypm.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.error(err));

// Define sample data for each model
const users = [
  {
    username: "johndoe",
    email: "john.doe@example.com",
    password: "hashed_password", // Replace with a securely hashed password
    isAdmin: false,
  },
  {
    username: "janedoe",
    email: "jane.doe@example.com",
    password: "hashed_password", // Replace with a securely hashed password
    isAdmin: false,
  },
];

const products = [
  {
    title: "Women's Dress",
    desc: "Beautiful dress for women",
    img: "https://t3.ftcdn.net/jpg/01/38/94/62/360_F_138946263_EtW7xPuHRJSfyl4rU2WeWmApJFYM0B84.jpg",
    categories: ["women", "coat"],
    productSpecs: {
      color: ["Red", "Blue", "Black"],
      size: ["XS", "S", "M", "L", "XL"],
    },
    price: 49.99,
    inStock: true,
  },
  {
    title: "Men's Shirt",
    desc: "Stylish shirt for men",
    img: "https://st.depositphotos.com/1085342/1888/i/450/depositphotos_18885485-stock-photo-nothing-to-wear-concept-young.jpg",
    categories: ["women", "jeans"],
    productSpecs: {
      color: ["White", "Black", "Gray"],
      size: ["S", "M", "L", "XL", "XXL"],
    },
    price: 29.99,
    inStock: true,
  },

  {
    title: "Women's Dress",
    desc: "Beautiful dress for women",
    img: "https://t3.ftcdn.net/jpg/01/38/94/62/360_F_138946263_EtW7xPuHRJSfyl4rU2WeWmApJFYM0B84.jpg",
    categories: [, "coat"],
    productSpecs: {
      color: ["Red", "Blue", "Black"],
      size: ["XS", "S", "M", "L", "XL"],
    },
    price: 49.99,
    inStock: true,
  },
  {
    title: "Men's Shirt",
    desc: "Stylish shirt for men",
    img: "https://st.depositphotos.com/1085342/1888/i/450/depositphotos_18885485-stock-photo-nothing-to-wear-concept-young.jpg",
    categories: ["women", ],
    productSpecs: {
      color: ["White", "Black", "Gray"],
      size: ["S", "M", "L", "XL", "XXL"],
    },
    price: 56.99,
    inStock: true,
  },
  
];

// Function to seed data for a specific model
const seedData = async (model, data) => {
  try {
    await model.deleteMany({}); // Clear existing data (optional)
    await model.insertMany(data);
    console.log(`${model.modelName} collection seeded successfully!`);
  } catch (err) {
    console.error(`Error seeding ${model.modelName} collection:`, err);
  }
};

// Seed data for each model sequentially
 seedData(Product, products)
  .then(() => {
    console.log("Seeding complete!");
    mongoose.connection.close(); // Close connection after seeding
  })
  .catch((err) => console.error("Error during seeding:", err));
