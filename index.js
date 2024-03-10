import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/user.js";
import authRoute from "./routes/auth.js";
import productRoute from "./routes/product.js";
import cartRoute from "./routes/cart.js";
import orderRoute from "./routes/order.js";
import stripeRoute from "./routes/stripe.js";
import cors from "cors";

const app = express();
const corsOptions = {
  origin: process.env.ORIGIN_URL, // Replace with your client-side origin
  credentials: true, // Allow cookies for authenticated requests
  allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
  methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
};

// console.log("mongo url ", process.env.MONGO_URL);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
  console.log("corsOptions ---->", corsOptions); 

});
