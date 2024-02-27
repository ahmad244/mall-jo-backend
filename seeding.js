const mongoose = require("mongoose");
const User = require("./models/User"); // Require the User model
const Product = require("./models/Product"); // Require the User model

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
      title: "Women's Trench Coat",
      desc: "A classic and versatile trench coat for women",
      img: "https://images.unsplash.com/photo-1624747752634-1f1f24b0a0c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFybyx3aXx8dHJlbmNoJTI0Y29hdCUyMG9mJTI0d29tZW4!&auto=format&fit=crop&w=500&q=60",
      categories: ["women", "coat"],
      size: ["XS", "S", "M", "L", "XL"],
      color: ["Beige", "Khaki", "Black"],
      price: 99.99,
    },
    {
      title: "Women's Skinny Jeans",
      desc: "High-waisted skinny jeans for women",
      img: "https://images.unsplash.com/photo-1604030403300-4378f2279d42?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFybyx3aXx8d29tZW4ncyUyMHNlcnZpbnxlbnwwfHx8fA&auto=format&fit=crop&w=500&q=60",
      categories: ["women", "jeans"],
      size: ["24", "26", "28", "30", "32"],
      color: ["Blue", "Black", "Gray"],
      price: 49.99,
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
