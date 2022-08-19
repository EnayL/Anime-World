const express = require("express");
const router = express.Router();

const StudioControllers = require("../controllers/studio");
const checkAuth = require("../middleware/checkAuth");

//////////////////////////--------------------/////////////////////////////////////
// to add image in the controllers

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  //reject file if it dont correspond
  if (file.mimetype === "image/jpg/jpeg" || file.mimetype === "image/png") {
    cb(null, false);
  } else {
    cb(null, true);
  }
};
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter,
});

//////////////////////////--------------------/////////////////////////////////////

// GET ALL STUDIO
router.get("/", StudioControllers.studio_get_all);

// find a Studio with his ID
router.get("/:studioId", StudioControllers.studio_get_id);

// Create a studio
// upload image is for adding an image
router.post(
  "/",
  checkAuth,
  upload.single("studioImage"),
  StudioControllers.studio_create_studio
);

// to Patch the Studio (change something)
router.patch("/:studioId", StudioControllers.studio_patch);

// to delete
router.delete("/:studioId", StudioControllers.studio_delete);

module.exports = router;
