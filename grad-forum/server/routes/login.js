import express from "express";
import userController from "../controllers/userController";

const login = express();
login.get("/", (req, res) => {
  res.send(`
    <h1>Login</h1>
    <form method = 'post' action='/api/login'>
    <input name= 'username' placeholder = 'Username' required/>
    <input name= 'password' placeholder = 'Password' required/>
    <input type = 'submit'/>
    </form>
  `);
});
login.post("/", userController.authUser);

export default login;
