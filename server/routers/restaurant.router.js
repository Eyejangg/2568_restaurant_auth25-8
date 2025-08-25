import restaurantController from "../controllers/restaurant.controller.js";
import authMiddleware from "../middleware/authJwt.js";

import express from "express";
const router = express.Router();
//POST http://localhost:5000/api/v1/restaurants
router.post("/", restaurantController.create);

//GET http://localhost:5000/api/v1/restaurants
router.get("/:id", authMiddleware.verifyToken,restaurantController.getAll);
//GETBYID http://localhost:5000/api/v1/restaurants/:id
router.get("/:id", authMiddleware.verifyToken,restaurantController.getById);
//UPDATEBYID http://localhost:5000/api/v1/restaurants/:id
router.put("/:id", restaurantController.updateById);
//DELETEBYID http://localhost:5000/api/v1/restaurants/:id
router.delete("/:id", restaurantController.deleteById);
// เพิ่มตรงนี้เข้าไป // ถ้าไม่มี token จะไม่สามารถเข้าถึงข้อมูลได้
router.get(
  "/:id",
  authMiddleware.verifyToken,
  authMiddleware.isAdmin,
  restaurantController.getById
);

export default router;
