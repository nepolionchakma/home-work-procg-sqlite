const Router = require("express");
const def_widgetAttributesController = require("../controllers/def_widget_attributesController");
const router = Router();
router.get("/", def_widgetAttributesController.getWidgetAttributes);
router.get(
  "/:user_id",
  def_widgetAttributesController.getUniqueWidgetAttribute
);
router.post("/", def_widgetAttributesController.createWidgetAttribute);
router.post("/upsert", def_widgetAttributesController.upsertWidgetAttributes);
router.put("/:user_id", def_widgetAttributesController.updateWidgetAttribute);
router.delete(
  "/:user_id",
  def_widgetAttributesController.deleteWidgetAttribute
);
module.exports = router;
