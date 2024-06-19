import express from "express";
import "express-async-errors";
import morgan from "morgan";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
// DB_CONNECTION
import connectDB from "./config/db.js";

// MIDDLEWARES
import errormiddleware from "./middlewares/errormiddleware.js";
// Routes
import authRoutes from "./routes/authRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import responseRoutes from "./routes/responseRoutes.js";
import dataRoutes from "./routes/userResponseRoutes.js";

dotenv.config();
connectDB();

const app = express();

// middlewares
// app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/question", questionRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/response", responseRoutes);
app.use("/api/v1/data", dataRoutes);

app.use(errormiddleware);

const PORT = process.env.PORT || 8080;
// listen
app.listen(PORT, () => {
//   console.log(`Node server running on port number ${PORT}`);
});
