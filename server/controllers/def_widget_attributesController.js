const prisma = require("../prisma");

//Get Users
exports.getWidgetAttributes = async (req, res) => {
  const result = await prisma.def_widget_attributes.findMany();
  return res.json(result);
};
//Create User
exports.createWidgetAttribute = async (req, res) => {
  const user = req.body;
  const result = await prisma.def_widget_attributes.create({
    data: {
      user_id: user.user_id,
      widget_position: user.widget_position,
      widget_state: user.widget_state,
    },
  });
  return res.json({ User: result });
};

//Get Unique User
exports.getUniqueWidgetAttribute = async (req, res) => {
  const user_id = req.params.user_id;
  const result = await prisma.def_widget_attributes.findUnique({
    where: {
      user_id: Number(user_id),
    },
  });
  return res.json({ User: result });
};
//Update User
exports.updateWidgetAttribute = async (req, res) => {
  const user_id = req.params.user_id;
  const user = req.body;
  const result = await prisma.def_widget_attributes.update({
    where: {
      user_id: Number(user_id),
    },
    data: {
      widget_position: user.widget_position,
      widget_state: user.widget_state,
    },
  });
  return res.json({ updated: result, status: "success" });
};
//Upser many user
exports.upsertWidgetAttributes = async (req, res) => {
  // Check if users is an array
  const widgets = req.body.widgets || req.body;
  if (!Array.isArray(widgets)) {
    console.error("Invalid data format:", widgets);
    return res
      .status(400)
      .json({ error: "Invalid input: 'widgets' should be an array" });
  }

  const upsertResults = [];
  for (const widget of widgets) {
    const result = await prisma.def_widget_attributes.upsert({
      where: { user_id: widget.user_id },
      update: {
        widget_position: widget.widget_position,
        widget_state: widget.widget_state,
      },
      create: {
        user_id: widget.user_id,
        widget_position: widget.widget_position,
        widget_state: widget.widget_state,
      },
    });
    upsertResults.push(result);
  }

  return res.json({ upsert_Widgets: upsertResults, status: "success" });
};

exports.deleteWidgetAttribute = async (req, res) => {
  const user_id = req.params.user_id;
  const findUser = await prisma.def_widget_attributes.findUnique({
    where: {
      user_id: Number(user_id),
    },
  });

  if (findUser) {
    const result = await prisma.def_widget_attributes.delete({
      where: {
        user_id: Number(user_id),
      },
    });
    return res.json({ deleted: result, status: "success" });
  } else res.json({ msg: "Widget not found" });
};
