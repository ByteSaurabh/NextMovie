import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/user.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/user', userRoutes);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// ...existing code...

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
