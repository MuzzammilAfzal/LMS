import multer from "multer";

// use memory storage instead of disk
const storage = multer.memoryStorage();

const upload = multer({ storage });

export default upload;