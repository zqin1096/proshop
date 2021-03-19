import express from "express";
import multer from 'multer';
import path from 'path';

const uploadRouter = express.Router();

// Multer is used for uploading files.
// Store files to disk.
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        const fileTypes = /jpg|jpeg|png/;
        const ext = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mime = fileTypes.test(file.mimetype);
        if (ext && mime) {
            cb(null, true);
        } else {
            cb('Please upload an image!', false);
        }
    }
});

// Accept a single file with the name 'image'. The single file will be stored in req.file.
uploadRouter.post('/', upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`);
});

export default uploadRouter;

