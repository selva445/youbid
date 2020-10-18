const express = require("express");
const app = express();

const connectDB = require("./Server/config/db");

require('dotenv').config();
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());

app.use(
    bodyParser.urlencoded({
      extended: false,
    })
  );
  app.use(bodyParser.json());
  const port = process.env.PORT || 6500;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

  connectDB();
  app.use("/api/register", require("./Server/routes/register"));
