const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { userRoute } = require("./routes/user.route");
const { formRoute } = require("./routes/form.route");
const { connection } = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Form Builder");
});

app.use("/user", userRoute);
app.use("/api", formRoute);

app.listen(PORT, async () => {
  await connection;
  console.log("Connected to Database");
  console.log(`Server is running on port 5000`);
});
