const prisma = require("../prisma");
const crypto = require("crypto");
//------------Hash Password Start
const saltLength = "16";
const iterations = 1000;
const keyLength = 64;
const digest = "sha256";
// Hash password
function hashPassword(password) {
  // const salt = crypto.randomBytes(saltLength).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, saltLength, iterations, keyLength, digest)
    .toString("hex");
  return `${hash}`;
}
//-------------------------Hash Password End
//Get Users
exports.getUser_credentials = async (req, res) => {
  const result = await prisma.def_user_credentials.findMany();
  return res.json(result);
};
//Create User
exports.createUser_credential = async (req, res) => {
  try {
    // Validation  START/---------------------------------/
    const user_data = req.body;
    // const findDefUserId = await prisma.def_user_credentials.findUnique({
    //   where: {
    //     user_id: user_data.user_id,
    //   },
    // });
    // if (findDefUserId) {
    //   return res
    //     .status(408)
    //     .json({ message: "User Credential Id already exist." });
    // } else {
    //   const result = await prisma.def_user_credentials.create({
    //     data: {
    //       user_id: user_data.user_id,
    //       password: hashPassword(user_data.password),
    //     },
    //   });
    //   return res.status(200).json({ result });
    // }
    const result = await prisma.def_user_credentials.create({
      //for auto incriment user_id
      data: {
        password: hashPassword(user_data.password),
      },
    });
    return res.status(200).json({ result });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//Get Unique User
exports.getUniqueUser_credential = async (req, res) => {
  const user_id = req.params.user_id;
  const result = await prisma.def_user_credentials.findUnique({
    where: {
      user_id: Number(user_id),
    },
  });
  return res.json({ User: result });
};
//Update User
exports.updateUser_credential = async (req, res) => {
  const user_id = req.params.user_id;
  const user = req.body;
  const result = await prisma.def_user_credentials.update({
    where: {
      user_id: Number(user_id),
    },
    data: {
      password: user.password,
    },
  });
  return res.json({ updated: result, status: "success" });
};
//Upser many user
exports.upserUser_credentials = async (req, res) => {
  const users = req.body;
  const upsertResults = [];
  for (const user of users) {
    const result = await prisma.def_user_credentials.upsert({
      where: { user_id: user.user_id },
      update: {
        password: user.password,
      },
      create: {
        user_id: user.user_id,
      },
    });
    upsertResults.push(result);
  }
  return res.json({ upsert_users: upsertResults, status: "success" });
};
exports.deleteUser_credential = async (req, res) => {
  const user_id = req.params.user_id;
  const result = await prisma.def_user_credentials.delete({
    where: {
      user_id: Number(user_id),
    },
  });
  return res.json({ deleted: result, status: "success" });
};
