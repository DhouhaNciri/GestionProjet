let express = require("express");
let router = express.Router();
let multer = require("multer");
let fs = require("fs");
let path = require("path");

// Ensure directory exists
const uploadDir = "./src/upload/photo_profil/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // Create directory if it doesn't exist
}

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Use the upload directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

let upload = multer({
  storage: storage,
});

router.post("/photo_profil", upload.single("file"), async (req, res) => {
  try {
    let file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    res.json({ message: "Successfully uploaded file", result: file });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
