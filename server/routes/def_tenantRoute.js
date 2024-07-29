const Router = require("express");
const def_tenantController = require("../controllers/def_tenantController");
const {
  validateTenantData,
  validateTenantsData,
} = require("../controllers/def_tenantValidation");
const router = Router();
router.get("/", def_tenantController.getTenants);
router.get("/:id", def_tenantController.getUniqueTenant);
router.post("/", validateTenantData, def_tenantController.createTenant);
router.post("/upsert", validateTenantsData, def_tenantController.upsertTenant);
router.put("/:tenant_id", def_tenantController.updateTenant);
router.delete("/:id", def_tenantController.deleteTenant);

module.exports = router;
