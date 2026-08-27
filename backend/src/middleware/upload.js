import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      const error = new Error("Only PDF files are allowed");
      error.statusCode = 400;
      cb(error, false);
    }
  },
});

export default upload;
