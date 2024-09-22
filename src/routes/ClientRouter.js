let router = require("express").Router();

let ClientCtrl = require("../controllers/ClientCtrl");
let auth = require("../middleware/auth");
let authAdmin = require("../middleware/authUser");

router.post("/loginClient", ClientCtrl.loginClient);
router.post(
  "/inscritClient",
  auth.authUser,
  authAdmin.RoleAdmin,
  ClientCtrl.inscrit
);

router.get(
  "/clients",
  auth.authUser,
  authAdmin.RoleAdmin,
  ClientCtrl.getAllClient
);


router.get(
  "/client/:id",
  auth.authUser,
  authAdmin.RoleAdmin,
  ClientCtrl.getClientById
);
module.exports = router;
