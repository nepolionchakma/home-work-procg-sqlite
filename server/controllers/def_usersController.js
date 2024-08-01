const prisma = require("../prisma");
//Time convert
const formatDate = (date) => {
  // Extract components
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getUTCDate()).padStart(2, "0");

  // Convert hours and minutes to 12-hour format with AM/PM
  let hours = date.getUTCHours();
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // Hour '0' should be '12'
  const formattedHours = String(hours).padStart(2, "0");

  // Return the formatted date and time string
  return `${year}-${month}-${day} ${formattedHours}:${minutes}${ampm} UTC+0`;
};

//Get Users
exports.getUsers = async (req, res) => {
  const result = await prisma.def_users.findMany();
  return res.json(result);
};
//Create User
exports.createUser = async (req, res) => {
  const user = req.body;
  const now = new Date();
  const result = await prisma.def_users.create({
    data: {
      user_name: user.user_name,
      user_type: user.user_type,
      email_addresses: user.email_addresses,
      created_by: user.created_by,
      created_on: formatDate(now),
      last_updated_by: user.last_updated_by,
      last_updated_on: formatDate(now),
      tenant_id: user.tenant_id,
    },
  });
  return res.json({ User: result });
};

//Get Unique User
exports.getUniqueUser = async (req, res) => {
  const user_id = req.params.user_id;
  const result = await prisma.def_users.findUnique({
    where: {
      user_id: Number(user_id),
    },
  });
  return res.json({ User: result });
};
//Update User
exports.updateUser = async (req, res) => {
  const user_id = req.params.user_id;
  const user = req.body;
  const result = await prisma.def_users.update({
    where: {
      user_id: Number(user_id),
    },
    data: {
      user_name: user.user_name,
      user_type: user.user_type,
      email_addresses: user.email_addresses,
      created_by: user.created_by,
      created_on: user.created_on,
      last_updated_by: user.last_updated_by,
      last_updated_on: user.last_updated_on,
      tenant_id: user.tenant_id,
    },
  });
  return res.json({ updated: result, status: "success" });
};
//Upser many user
exports.upserUsers = async (req, res) => {
  const users = req.body;
  const upsertResults = [];
  for (const user of users) {
    const result = await prisma.def_users.upsert({
      where: { user_id: user.user_id },
      update: {
        user_name: user.user_name,
        user_type: user.user_type,
        email_addresses: user.email_addresses,
        created_by: user.created_by,
        created_on: user.created_on,
        last_updated_by: user.last_updated_by,
        last_updated_on: user.last_updated_on,
        tenant_id: user.tenant_id,
      },
      create: {
        user_id: user.user_id,
        user_name: user.user_name,
        user_type: user.user_type,
        email_addresses: user.email_addresses,
        created_by: user.created_by,
        created_on: user.created_on,
        last_updated_by: user.last_updated_by,
        last_updated_on: user.last_updated_on,
        tenant_id: user.tenant_id,
      },
    });
    upsertResults.push(result);
  }
  return res.json({ upsert_users: upsertResults, status: "success" });
};
exports.deleteUser = async (req, res) => {
  const user_id = req.params.user_id;
  const result = await prisma.def_users.delete({
    where: {
      user_id: Number(user_id),
    },
  });
  return res.json({ deleted: result, status: "success" });
};
