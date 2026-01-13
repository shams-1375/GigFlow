import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import gigRoutes from "./routes/gigs.js";
import bidRoutes from "./routes/bids.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();



app.use(cors({
  origin: "https://gigflow-frontend-iya8.onrender.com",
  credentials: true,                                   
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch(err => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api/gigs", gigRoutes);
app.use("/api/bids", bidRoutes);

app.listen(PORT, () => console.log(`Server running on ${PORT}`));

