import express from "express";
import userController from "../controllers/userController";
import multer from "multer";

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    console.log(__dirname + "./");
    cb(null, __dirname + "/../uploads");
  },
  filename: function(req, file, cb) {
    let ext = file.originalname.substring(
      file.originalname.lastIndexOf("."),
      file.originalname.length
    );
    cb(null, "user_profile_photo" + "_" + Date.now() + ext);
  }
});

const upload = multer({ storage: storage });

const users = express();
users.get("/", userController.users_list);

users.get("/:id", userController.user_info);
users.post("/:id", upload.single("profile_photo"), userController.updateUser);
users.post("/", userController.createUser);

users.get("/:id/groups", userController.getUserGroups);

users.post("/:id/verify", userController.verifyUser);

export default users;
