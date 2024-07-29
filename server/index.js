const express = require("express");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(express.json());
// Use the CORS middleware
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.get("/", (req, res) => {
  res.send(`Test Server running port ${port}`);
});

app.use(require("./routes/index"));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
