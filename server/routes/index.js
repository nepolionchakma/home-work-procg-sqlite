const tenantsRoutes = require("./def_tenantRoute");
const usersRoutes = require("./def_usersRoute");
const personsRoutes = require("./def_personsRoute");
const user_credentialsRoutes = require("./def_user_credentialsRoute");
const widget_attributes = require("./def_widget_attributes");
const authentication = require("./authenticationRoutes");
const Router = require("express");

const routes = Router();

routes.use("/def-tenants", tenantsRoutes);
routes.use("/def-users", usersRoutes);
routes.use("/def-persons", personsRoutes);
routes.use("/def-user-credentials", user_credentialsRoutes);
routes.use("/def-widget-attributes", widget_attributes);
routes.use("/login", authentication);

module.exports = routes;
