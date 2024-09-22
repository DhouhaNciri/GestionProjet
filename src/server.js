// Patches
const { inject, errorHandler } = require("express-custom-error");
inject(); // Patch express in order to use async / await syntax
require("dotenv").config();
// Require Dependencies

const express = require("express");
const cookieParser = require("cookie-parser"); //hedhi bech ta9relna ay 7aja jaya men cookies
// fe js 3endik zouz 7ajet tanejm declare bihom les variables mta3ik houma const w fema let a7sen testta3mil let
let bodyParser = require("body-parser"); //hedhi bech ta9relna ay 7aja jaya men body(formulaire) w ta3melou parse to json ou ay type t7eb 3lih enti
const cors = require("cors");
const helmet = require("helmet");
let bcrypt = require("bcrypt");
const logger = require("./util/logger");

const { ConnectToDataBase } = require("./Config/DbConnection.js");

// Load .env Enviroment Variables to process.env

require("mandatoryenv").load(["DB_URL", "PORT", "SECRET"]);

const { PORT } = process.env;

//import UserModel
let user = require("./models/UserModel.js");

//Routes
let UserRouter = require("./routes/UserRouter.js");
let ClientRouter = require("./routes/ClientRouter.js");
let UploadPhotProfil = require("./routes/UploadPhotoProfil.Routes.js");
let equipeRouter = require("./routes/Equipes.Routes.js");

// Instantiate an Express Application
const app = express();

// Configure Express App Instance
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Configure custom logger middleware
app.use(logger.dev, logger.combined);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cors());
app.use(helmet());

// This middleware adds the json header to every response
// app.use("*", (req, res, next) => {
//   res.setHeader("Content-Type", "application/json");
//   next();
// });

app.use(
  "/api/upload/photo_profil",
  express.static(__dirname + "/upload/photo_profil")
);
app.use(express.static("/upload/photo_profil"));
// Assign Routes

app.use("/", require("./routes/router.js"));
app.use("/api", UserRouter);
app.use("/api", ClientRouter);
app.use("/api", UploadPhotProfil);
app.use("/api", equipeRouter);
// Handle errors
app.use(errorHandler());

// Handle not valid route
// app.use("*", (req, res) => {
//   res.status(404).json({ status: false, message: "Endpoint Not Found" });
// });

let createAdmin = async () => {
  try {
    let findUser = await user.findOne({});

    if (findUser == null) {
      console.log("first", findUser);
      let password = "12345678";

      let passwordHash = await bcrypt.hash(password, 10);
      let newUser = new user({
        email: "admin@gmail.com",
        password: passwordHash,
        telephone: "53070644",
      });
      await newUser.save();
    }
  } catch (error) {
    console.log(error.message);
  }
};

// Open Server on selected Port
app.listen(PORT, () => {
  ConnectToDataBase();
  createAdmin();
  console.info("Server listening on port ", PORT);
});
