import express from "express";
const app = express();
import dotenv from "dotenv";
import restaurantRouter from "./routers/restaurant.router.js";
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Restaurant Restful API");
});

//use router
app.use("/api/v1/restaurants", restaurantRouter);
app.listen(PORT, () => {
  console.log("Listening to http://localhost:" + PORT);
});
