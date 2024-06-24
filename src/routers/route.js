const express = require("express");
const router = new express.Router();
const adminController = require("../controllers/adminController");
const uploadProfile = require("../middleware/uploadProfileMulter");
const verifyToken = require("../middleware/verifyToken");
const bodyParser = require("body-parser");

var urlencodedParser = bodyParser.urlencoded({ extended: false });

// Get Logo Page
router.get("/", verifyToken, adminController.getLogoPage);


// get login page
router.get("/login", adminController.getLoginPage);

// check admin login data
router.post("/login", urlencodedParser, adminController.checkLogin);

// get register page
router.get("/register", adminController.getRegisterPage);

// Register Admin into database
router.post("/register", uploadProfile.single("profileImage"), adminController.registerAdmin);

// Get dashboard page
router.get("/dashboard", verifyToken, adminController.getDashboardPage);

// Get Map page
router.get("/map", verifyToken, adminController.getMapPage);

// Get Messages Page
router.get("/messages", verifyToken, adminController.getMessagesPage);

// Get Guidelines Page
router.get("/guidelines", verifyToken, adminController.getGuidelinesPage);

// Set Guidelines in database
router.post("/guidelines",urlencodedParser, verifyToken, adminController.setGuidelinesPage);

// logout from device
router.get("/logout", verifyToken, adminController.logoutAdmin);

// Display error
router.get("/error", verifyToken, adminController.errorPage);


router.get("/getUserData",verifyToken, adminController.getUserData);


module.exports = router;
