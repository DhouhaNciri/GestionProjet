let router = require("express").Router();

let UserCtrl = require("../controllers/UserCtrl");
let auth = require("../middleware/auth");
let authAdmin = require("../middleware/authUser");

router.post("/login", UserCtrl.login);

router.post("/inscrit", auth.authUser, authAdmin.RoleAdmin, UserCtrl.inscrit);

router.get("/users", auth.authUser, authAdmin.RoleAdmin, UserCtrl.getAllUsers);
router.get("/user/:id", auth.authUser, authAdmin.RoleAdmin, UserCtrl.findUser);
router.put(
  "/user/:id",
  auth.authUser,
  authAdmin.RoleAdmin,
  UserCtrl.UpdateUser
);
router.delete(
  "/user/:id",
  auth.authUser,
  authAdmin.RoleAdmin,
  UserCtrl.DeleteUser
);
module.exports = router;
