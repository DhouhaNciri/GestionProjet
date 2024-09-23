let mongoose = require("mongoose");

let EquipeSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    unique: true,
  },
  membres: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
});

module.exports = mongoose.model("equipe", EquipeSchema);
