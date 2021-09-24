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
const register = express();
register.get("/", (req, res) => {
  res.send(`
    <h1>Register</h1>
    <form method = 'post' action='/api/register'>
    <input name= 'username' placeholder = 'Username' />
    <input name= 'password' placeholder = 'Password' />
    <input name= 'email' placeholder = 'Email' />
    <input name= 'first_name' placeholder = 'First Name' />
    <input name= 'last_name' placeholder = 'Last Name' />
    <input name= 'profile_photo' placeholder = 'Profile Photo' />
    <input type = 'submit'/>
    </form>
  `);
});
register.post("/", upload.single("profile_photo"), userController.createUser);

export default register;
