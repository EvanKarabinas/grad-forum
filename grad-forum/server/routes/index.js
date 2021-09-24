import express from "express";
import users from "./users";
import login from "./login";
import session from "express-session";
import posts from "./posts";
import register from "./register";
import groups from "./groups";
import events from "./events";
import jobOffers from "./jobOffers";
import notifications from "./notifications";
import logout from "./logout";
import Socket from "../models/socket";
import io from "../utils/socketUtil";

const routes = express();

const SESS_NAME = "sid";
const SESS_SECRET = "-]9^3ajswPP+eHwt";

routes.use(
  session({
    name: SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie: {
      sameSite: true,
      secure: false,
      httpOnly: false
    }
  })
);

const redirectLogin = (req, res, next) => {
  if (!req.session.userId) {
    res.send(500, { error: "hi, there was an error" });
  } else {
    next();
  }
};

routes.use("/uploads", express.static(__dirname + "/../uploads"));

routes.get("/", (req, res) => {
  res.send("Welcome to the graduate forum API :)");
  console.log(req.session);
  console.log("session id: " + req.session.userId);
});

routes.get("/session", (req, res) => {
  if (req.session.userId) {
    res.send("" + req.session.userId);
  } else {
    res.send(400, { error: "There is no active session." });
  }
});

// console.log("session id: " + req.session.userId);
// var io = require("socket.io").listen(5000);
io.startSocketsIo();

routes.use("/login", login);

routes.use("/logout", redirectLogin, logout);
routes.use("/register", register);

routes.get("/error", (req, res) => {
  res.send("Log in error.");
});

routes.use("/users", redirectLogin, users);
routes.use("/posts", redirectLogin, posts);
routes.use("/groups", redirectLogin, groups);
routes.use("/events", redirectLogin, events);
routes.use("/jobOffers", redirectLogin, jobOffers);
routes.use("/notifications", redirectLogin, notifications);

export default routes;
