import restaurantController from "../controllers/restaurant.controller.js";

import express from "express";
const router = express.Router();
//POST http://localhost:5000/api/v1/restaurant
router.post("/", restaurantController.create);

export default router;
