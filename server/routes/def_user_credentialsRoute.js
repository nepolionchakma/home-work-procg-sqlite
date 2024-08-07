const Router = require("express");
const def_user_credentialsController = require("../controllers/def_user_credentialsController");
const router = Router();
router.get("/", def_user_credentialsController.getUser_credentials);
router.get(
  "/:user_id",
  def_user_credentialsController.getUniqueUser_credential
);
router.post("/", def_user_credentialsController.createUser_credential);
router.post("/upsert", def_user_credentialsController.upsertUser_credentials);
router.put("/:user_id", def_user_credentialsController.updateUser_credential);
router.delete(
  "/:user_id",
  def_user_credentialsController.deleteUser_credential
);
module.exports = router;
