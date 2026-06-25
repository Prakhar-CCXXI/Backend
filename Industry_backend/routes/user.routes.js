import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"

const router = Router();

//router.route("/register").post(registerUser);
//router.route("/login").post(registerLogin);

router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 }
  ]),registerUser
  // (req, res) => {
  //   console.log("BODY:", req.body);
  //   console.log("FILES:", req.files);

  //   res.json({
  //     body: req.body,
  //     files: req.files
  //   });
  // }
);

// router.route("/register").post(
//   upload.fields([
//     {
//       name: "avatar",
//       maxCount: 1
//     },
//     {
//       name: "coverImage",
//       maxCount: 1
//     }
//   ]),
//   registerUser
// );

export default router;
