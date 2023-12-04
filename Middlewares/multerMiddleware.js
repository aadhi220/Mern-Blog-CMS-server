const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads"); 
  },
  filename: (req, file, callback) => {
    const filename = `image-${Date.now()}-${file.originalname}`;
    callback(null, filename);
  },
});

const fileFilter = (req, file, callback) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/webp"
  ) {
    callback(null, true);
  } else {
    callback(null, false);
    return callback(new Error("Only png, jpeg, jpg, and webp files are allowed!"));
  }
};

// Create a multer instance
const multerInstance = multer({
  storage,
  fileFilter,
});


const multerConfig = multerInstance.array("images", 10);
module.exports = multerConfig;
