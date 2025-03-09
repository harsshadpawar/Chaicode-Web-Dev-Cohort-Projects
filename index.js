import express from "express";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import db from "./utils/db.js";

//import all routes
import userRoutes from "./routes/user.routes.js";

const app = express();
//console.log(process.env.PORT); //4000 , 5000, 5173, 8080, 8000
const port = process.env.PORT || 4000;

//tell express what is my frontend in - cors logic
app.use(
  cors({
    origin: process.env.BASE_URL,
    credentials: true,
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

//tell backend to accept json and latest url encoding format
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Cohort!"); // actual logic written is sending string.
});
app.get("/harsshad", (req, res) => {
  res.send("Welcome Harsshad!");
});

app.get("/yojana", (req, res) => {
  res.send("Welcoem Yojana!");
});

// connect to db
db();

//userRoutes
app.use("/api/v1/users", userRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
