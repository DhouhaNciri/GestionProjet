let mongoose = require("mongoose");

let ProjetSchema = new mongoose.Schema({
  nom: { type: String, required: true },

  description: {
    type: String,
    required: false,
  },

  dateDebut: {
    type: Date,
    required: true,
  },

  dateFin: {
    type: Date,
    required: true,
  },

  budget: {
    type: String,
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
});
module.exports = mongoose.model("projet", ProjetSchema);
