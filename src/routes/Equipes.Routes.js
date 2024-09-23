let router = require("express").Router();
let EquipeCtrl = require("../controllers/EquipeCtrl");
let auth = require("../middleware/auth");
let authAdmin = require("../middleware/authUser");
router.post(
  "/equipe",
  auth.authUser,
  authAdmin.RoleAdmin,
  EquipeCtrl.createEquipe
);
router.get(
  "/equipe",
  auth.authUser,
  authAdmin.RoleAdmin,
  EquipeCtrl.getAllEquipe
);
router.get(
  "/equipe/:id",
  auth.authUser,
  authAdmin.RoleAdmin,
  EquipeCtrl.getEquipeById
);

router.put(
  "/equipe/:id",
  auth.authUser,
  authAdmin.RoleAdmin,
  EquipeCtrl.updateEquipe
);

module.exports = router;
