import multer, { StorageEngine, Multer } from "multer";
import { Request, Express } from "express";
import path from "path";

const UPLOAD_FOLDER: string = "./public/project-images/";

// define the storage
const storage: StorageEngine = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, UPLOAD_FOLDER);
   },
   filename: (req: Request, file: Express.Multer.File, cb) => {
      const fileExt = path.extname(file.originalname);
      const fileName =
         file.originalname
            .replace(fileExt, "")
            .toLowerCase()
            .split(" ")
            .join("-") +
         "-" +
         Date.now();

      cb(null, fileName + fileExt);
   },
});

// preapre the final multer upload object
export const upload: Multer = multer({
   storage: storage,
   limits: {
      fileSize: 1000000 * 3, // 1MB
   },
   fileFilter: (req: Request, file: Express.Multer.File, cb) => {
      if (
         file.mimetype === "image/png" ||
         file.mimetype === "image/jpg" ||
         file.mimetype === "image/jpeg"
      ) {
         cb(null, true);
      } else {
         cb(new Error("Only .jpg, .png or .jpeg format allowed!"));
      }
   },
});
