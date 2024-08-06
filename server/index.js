const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(express.json());

const options = [
  "http://localhost:8000",
  "http://localhost:5173",
  "http://192.168.0.169:8000",
];
app.use(
  cors({
    origin: options,
  })
);

app.get("/", (req, res) => {
  res.send(`Test Server running port ${port}`);
});

app.use(require("./routes/index"));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
