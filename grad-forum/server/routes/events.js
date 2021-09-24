import express from "express";
import eventController from "../controllers/eventController";

const events = express();

events.get("/", eventController.allEvents);

events.get("/:id", eventController.eventInfo);

events.post("/", eventController.createEvent);
events.get("/:id/attendees", eventController.getEventAttendees);

events.post("/:id/attendees", eventController.joinEvent);
events.delete("/:id/attendees", eventController.leaveEvent);

events.get("/:id/comments", eventController.getEventComments);
events.post("/:id/comments", eventController.createEventComment);

export default events;
