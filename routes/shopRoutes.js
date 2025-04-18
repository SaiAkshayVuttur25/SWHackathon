import express from "express";

const router = express.Router();

import {
  getCategoryShops,
  LoginUSer,
  LogoutUser,
  LoginVendor,
  LogoutVendor,
  getProductsofVendor,
  DisplayCart,
  AddToCart,
  filterByLocation,
  BuyProduct
} from "../controllers/shopRoutes.js";

// Routes
router.get("/getprdts/:category", getCategoryShops);

router.post("/loginuser", LoginUSer);
router.post("/logoutuser", LogoutUser); 

router.post("/loginvendor", LoginVendor);
router.post("/logoutvendor", LogoutVendor);

router.get("/getVendorProducts/:id", getProductsofVendor);

router.get("/displayCart/:customer_id", DisplayCart);
router.post("/addToCart", AddToCart);

router.get("/filter/:id", filterByLocation); 

router.post("/buyproduct",BuyProduct);

export default router;
