const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads'); // Adjust the destination path
    },
    filename: (req, file, callback) => {
        const filename = `image-${Date.now()}-${file.originalname}`;
        callback(null, filename);
    }
});

const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        callback(null, true);
    } else {
        callback(null, false);
        return callback(new Error("Only png, jpeg, jpg files are allowed!"));
    }
};

// Create a multer instance
const multerInstance = multer({
    storage,
    fileFilter
});

// Use the array method on the multer instance
const multerConfig = multerInstance.array('images', 10); // 'images' is the field name for the array of images, and 10 is the maximum number of files allowed.

module.exports = multerConfig;
