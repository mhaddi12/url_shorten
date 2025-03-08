const express = require("express");
const app = express();
const connectDB = require("./configs/db");
const userRoutes = require("./routes/user.routes");
const urlRoutes = require("./routes/urlRoutes");
const cors = require("cors");
require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/user", userRoutes);
app.use("/", urlRoutes);

connectDB();

app.listen(process.env.PORT, () =>
  console.log(`server started on http://localhost:${process.env.PORT}`)
);
