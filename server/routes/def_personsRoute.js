const Router = require("express");
const def_personsController = require("../controllers/def_personsController");
const router = Router();
router.get("/", def_personsController.getPersons);
router.get("/:user_id", def_personsController.getUniquePerson);
router.post("/", def_personsController.createPerson);
router.post("/upsert", def_personsController.upserPerson);
router.put("/:user_id/update", def_personsController.updatePerson);
router.delete("/:user_id", def_personsController.deletePerson);

module.exports = router;
