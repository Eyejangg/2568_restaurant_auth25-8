import express from "express";
const app = express();
import dotenv from "dotenv";
import restaurantRouter from "./routers/restaurant.router.js";
import authRouter from "./routers/auth.router.js";
dotenv.config();
const PORT = process.env.PORT || 3000;
import cors from "cors";
app.use(
  cors({
    origin: ["http://localhost:5173", "127.0.0.1:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "x-access-token"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import db from "./models/index.js";

const role = db.Role;

const innitRole = () => {
  role.create({ id: 1, name: "user" });
  role.create({ id: 2, name: "moderator" });
  role.create({ id: 3, name: "admin" });
};

// db.sequelize.sync({ force: false }).then(() => {
//   innitRole();
//   console.log("Drop and Sync");
// });

app.get("/", (req, res) => {
  res.send("Restaurant Restful API");
});

//use router
app.use("/api/v1/restaurants", restaurantRouter);
app.use("/api/v1/auth", authRouter);

app.listen(PORT, () => {
  console.log("Listening to http://localhost:" + PORT);
});
