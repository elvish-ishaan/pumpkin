import multer from "multer";
import { s3 } from "../configs/s3.js";
import multerS3 from 'multer-s3'

export const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET as string,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, file.filename)
    }
  })
})