const express = require("express");
const cors = require("cors");
require('dotenv').config();
const genreRoute = require("./Routes/genres");
const movieRoute = require("./Routes/movie");
const userRoute=require("./Routes/user");
const connectDb = require("./config/db");

const app = express();
connectDb();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use("/api/genres", genreRoute);
app.use("/", movieRoute);
app.use("/api/users",userRoute );

const PORT = 3007;
app.listen(PORT, console.log(`http://localhost:${PORT}`));
