import express from "express";
import notificationsController from "../controllers/notificationsController";

const notifications = express();

notifications.get("/", notificationsController.allNotifications);

export default notifications;
