//   import multer from 'multer';

//  const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'Industry_backend/public')
//   },
//   filename: function (req, file, cb) {
//    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     cb(null, file.originalname)
//   }
// })

// export const upload = multer({ storage: storage })


import multer from "multer";
import path from "path";
import fs from "fs";

const uploadPath = "./public/tmp";

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("Multer destination hit");
    cb(null, "./public/tmp");
  },
  filename: function (req, file, cb) {
    console.log("Multer filename hit");
    cb(null, file.originalname);
  }
});

export const upload = multer({ storage });




