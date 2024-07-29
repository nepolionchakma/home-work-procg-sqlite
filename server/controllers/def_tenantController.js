const prisma = require("../prisma");

//Get Tenants
exports.getTenants = async (req, res) => {
  const result = await prisma.def_tenants.findMany();
  return res.json(result);
};

//Create Tenant
exports.createTenant = async (req, res) => {
  const tenant = req.body;
  const result = await prisma.def_tenants.create({
    data: {
      tenant_id: req.body.tenant_id,
      tenant_name: req.body.tenant_name,
    },
  });
  return res.json({ tenant: result });
};

//Get Unique Tenant
(exports.getUniqueTenant = async (req, res) => {
  const paramId = req.params.id;
  const result = await prisma.def_tenants.findUnique({
    where: {
      tenant_id: Number(paramId),
    },
  });
  return res.json(result);
}),
  // Update Tenant
  (exports.updateTenant = async (req, res) => {
    const { tenant_name } = req.body;
    const paramId = req.params.tenant_id;
    try {
      // Check if tenant with given ID exists
      const existingTenant = await prisma.def_tenants.findUnique({
        where: { tenant_id: Number(paramId) },
      });

      if (!existingTenant) {
        return res
          .status(404)
          .json({ error: `Tenant with ID '${Number(paramId)}' not found` });
      }

      // Check if the new tenant_name already exists for another tenant
      const otherTenantWithSameName = await prisma.def_tenants.findFirst({
        where: {
          tenant_id: { not: Number(paramId) }, // Exclude the current tenant from the check
          tenant_name: tenant_name,
        },
      });

      if (otherTenantWithSameName) {
        return res.status(400).json({
          error: `Tenant with name '${tenant_name}' already exists`,
        });
      }

      // Update the tenant
      const result = await prisma.def_tenants.update({
        where: {
          tenant_id: Number(paramId),
        },
        data: {
          tenant_name: req.body.tenant_name,
        },
      });
      return res.json({ update: result });
    } catch (error) {
      console.error("Error updating tenant:", error);
      return res.status(500).json({ error: "Failed to update tenant" });
    }
  });

//Upsert Tenant
exports.upsertTenant = async (req, res) => {
  const tenants = req.body;
  try {
    const upsertResults = [];
    for (const tenant of tenants) {
      const result = await prisma.def_tenants.upsert({
        where: { tenant_id: tenant.tenant_id },
        update: {
          tenant_name: tenant.tenant_name,
        },
        create: {
          tenant_id: tenant.tenant_id,
          tenant_name: tenant.tenant_name,
        },
      });
      upsertResults.push(result);
    }

    return res.json({ tenants: upsertResults });
  } catch (error) {
    return res.status(500).json({ error: "Failed to upsert tenants" });
  }
};

//Delete Tenant
exports.deleteTenant = async (req, res) => {
  const paramId = req.params.id;
  const result = await prisma.def_tenants.delete({
    where: {
      tenant_id: Number(paramId),
    },
  });
  return res.json({ result: "Tenant Delete Success ." });
};

///test work

// import { Request, Response } from "express";

// const prisma = require("../prisma/index");
// exports.createTenant =  exports.(req: Request, res: Response) => {
//   try {
//     const result = await prisma.def_tenants.create({
//       data: {

//       },
//     });
//     return res.json(result);
//   } catch (error) {
//     throw new Error("error");
//   }
// };

// /
