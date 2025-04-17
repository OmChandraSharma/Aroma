const multer = require('multer');
const path = require('path');

// Define where to store files and how to name them
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Folder to save images 
    // it refers to the uploads folder relative to where you run your server.
    // cb stands for callback 
  },
  filename: function (req, file, cb) {
    // Unique filename: timestamp.extension
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

module.exports = upload;

// multer helps us accept image files via form-data
// diskStorage lets us store the file on our server
// uploads/ is the folder where images go
