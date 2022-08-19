const express = require("express");
const router = express.Router();

const UserControllers = require("../controllers/user");

// display all users
router.get("/", UserControllers.user_get_all);
// create a user
router.post("/signup", UserControllers.signup);

// to logg with the user creaated
router.post("/login", UserControllers.signin);

// to patch something as it happen email adress here
router.patch("/:patchId", UserControllers.user_patch);

// to delete a user
router.delete("/:deleteUserId", UserControllers.user_delete);

module.exports = router;
