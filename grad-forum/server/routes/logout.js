import express from "express";
import userController from "../controllers/userController";

const logout = express();
logout.get("/", userController.logOutUser);

export default logout;
