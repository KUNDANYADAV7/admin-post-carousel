import express from "express";
import { 
  createCarouselItem, 
  getAllCarouselItems, 
  getCarouselItem, 
  updateCarouselItem, 
  deleteCarouselItem 
} from "../controller/carousel.controller.js";
import { isAdmin, isAuthenticated } from "../middleware/authUser.js";

const router = express.Router();

router.post("/create-carousel",isAuthenticated, isAdmin("admin") ,createCarouselItem);
router.get("/all-carousels", getAllCarouselItems);
router.get("/single-carousel/:id",isAuthenticated , getCarouselItem);
router.put("/update-carousel/:id", updateCarouselItem);
router.delete("/delete-carousel/:id", isAuthenticated, isAdmin("admin") ,deleteCarouselItem);

export default router;

