const express = require("express");
const router = express.Router();

const WorkControllers = require("../controllers/work");

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
// GET ALL WORKS
router.get("/", WorkControllers.work_get_all);

// DISPLAY WORK BY ID
router.get("/:workId", WorkControllers.work_get_id);

// route CREATION OF WORKS
// upload image is for adding an image
router.post("/", upload.single("workImage"), WorkControllers.work_create_work);

// work to change information
router.patch("/:workId", WorkControllers.work_patch);

// delete work
router.delete("/:workId", WorkControllers.work_delete);

module.exports = router;
