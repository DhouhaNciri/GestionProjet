let mongoose = require("mongoose");

let UserSchema = new mongoose.Schema({
  nom: {
    type: String,
  },

  prenom: {
    type: String,
  },
  email: {
    type: String,
    unique: true, //unique ma3neha ma lazemch tet3awed marra o5ra
    required: true, //champ obligatoire
  },
  password: {
    type: String,
    required: true,
    //fel password ma najmouch n7otou unique 5ater unajem 2 user 3endhom mem mdp
  },
  telephone: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
    default: "",
  },

  role: {
    type: String,
    enum: ["Admin", "ChefProjet", "Employe"],
    default: "Admin",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("user", UserSchema);

//Schema hiya 3ibara ka war9a bech neketbou 3elha data mta3na hiya bech ta3mil beha chnouwa bech t7ot ka champs fel bdd
