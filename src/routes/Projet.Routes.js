let router = require("express").Router();

let ProjetCtrl = require("../controllers/ProjetCtrl");
let auth = require("../middleware/auth");
let authAdmin = require("../middleware/authUser");

router.get(
  "/projet",
  auth.authUser,
  authAdmin.RoleAdmin,
  ProjetCtrl.getAllProject
);
router.post(
  "/projet",
  auth.authUser,
  authAdmin.RoleAdmin,
  ProjetCtrl.CreateProjet
);
router.get(
  "/projet/:id",
  auth.authUser,
  authAdmin.RoleAdmin,
  ProjetCtrl.getProjetById
);
router.put(
  "/projet/:id",
  auth.authUser,
  authAdmin.RoleAdmin,
  ProjetCtrl.UpdateProjet
);
router.delete(
  "/projet/:id",
  auth.authUser,
  authAdmin.RoleAdmin,
  ProjetCtrl.DeleteProjet
);
router.get("/projetbychef", auth.authUser, ProjetCtrl.getprojetByChef);

module.exports = router;
