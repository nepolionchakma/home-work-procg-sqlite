const prisma = require("../prisma");

//Get Users
exports.getPersons = async (req, res) => {
  const result = await prisma.def_persons.findMany();
  return res.json(result);
};
//Create User
exports.createPerson = async (req, res) => {
  const person = req.body;
  const result = await prisma.def_persons.create({
    data: {
      first_name: person.first_name,
      middle_name: person.middle_name,
      last_name: person.last_name,
      job_title: person.job_title,
    },
  });
  return res.json({ Person: result });
};

//Get Unique User
exports.getUniquePerson = async (req, res) => {
  const user_id = req.params.user_id;
  const result = await prisma.def_persons.findUnique({
    where: {
      user_id: Number(user_id),
    },
  });
  return res.json({ Person: result });
};
//Update User
exports.updatePerson = async (req, res) => {
  const user_id = req.params.user_id;
  const person = req.body;
  const result = await prisma.def_persons.update({
    where: {
      user_id: Number(user_id),
    },
    data: {
      user_name: person.user_name,
      first_name: person.first_name,
      middle_name: person.middle_name,
      last_name: person.last_name,
      job_title: person.job_title,
    },
  });
  return res.json({ updated: result, status: "success" });
};
//Upser many user
exports.upserPerson = async (req, res) => {
  const persons = req.body;
  const upsertResults = [];
  for (const person of persons) {
    const result = await prisma.def_persons.upsert({
      where: { user_id: person.user_id },
      update: {
        user_name: person.user_name,
        first_name: person.first_name,
        middle_name: person.middle_name,
        last_name: person.last_name,
        job_title: person.job_title,
      },
      create: {
        user_id: person.user_id,
        user_name: person.user_name,
        first_name: person.first_name,
        middle_name: person.middle_name,
        last_name: person.last_name,
        job_title: person.job_title,
      },
    });
    upsertResults.push(result);
  }
  return res.json({ upsert_persons: upsertResults, status: "success" });
};
exports.deletePerson = async (req, res) => {
  const user_id = req.params.user_id;
  const findPerson = await prisma.def_persons.findUnique({
    where: {
      user_id: Number(user_id),
    },
  });
  if (findPerson) {
    const result = await prisma.def_persons.delete({
      where: {
        user_id: Number(user_id),
      },
    });
    return res.json({ deleted: result, status: "success" });
  } else res.json({ msg: "Person not found" });
};
