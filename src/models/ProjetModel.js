let mongoose = require("mongoose");

let ProjetSchema = new mongoose.Schema({
  nom: { type: String, required: true },

  description: {
    type: String,
    required: false,
  },

  dateDebut: {
    type: String,
    required: true,
  },

  dateFin: {
    type: String,
    required: true,
  },

  budget: {
    type: Number,
    required: true,
  },

  document: {
    type: String,
    required: false,
    default: "",
  },
  equipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "equipe",
  },
  taches: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tache",
    },
  ],
  etat: {
    type: String,
    required: true,
    default:"En attente"
  },

});
module.exports = mongoose.model("projet", ProjetSchema);
