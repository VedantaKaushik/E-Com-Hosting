import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import cloudinary from "cloudinary";
import fileupload from "express-fileupload";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middlewares
dotenv.config({ path: "./config.env" });
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "https://voltsfr.onrender.com",
  })
);
app.use(fileupload());
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

// Routes
import AuthRoutes from "./routes/AuthRoutes.js";
app.use("/api", AuthRoutes);

import FeatureRoutes from "./routes/FeaturesRoutes.js";
app.use("/api", FeatureRoutes);

import ProductRoues from "./routes/ProductRoute.js";
app.use("/api", ProductRoues);

import OrderRoutes from "./routes/OrderRoutes.js";
app.use("/api", OrderRoutes);

// Db Config
import { ConnectToDb } from "./Db.js";
ConnectToDb();

// Cloudinery
cloudinary.config({
  cloud_name: process.env.Cloud_Name,
  api_key: process.env.Api_Key,
  api_secret: process.env.Api_Sec,
  secure: true,
});

// Server
app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
