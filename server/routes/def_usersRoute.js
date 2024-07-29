const Router = require("express");
const def_usersController = require("../controllers/def_usersController");
const router = Router();
router.get("/", def_usersController.getUsers);
router.get("/:user_id", def_usersController.getUniqueUser);
router.post("/", def_usersController.createUser);
router.post("/upsert", def_usersController.upserUsers);
router.put("/:user_id", def_usersController.updateUser);
router.delete("/:user_id", def_usersController.deleteUser);
module.exports = router;
