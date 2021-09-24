import Event from "../models/event";
import Notification from "../models/notification";
import User from "../models/user";
import io from "../utils/socketUtil";

exports.allEvents = (req, res) =>
  Event.all(results => {
    console.log("Events fetched successfully: ");
    console.log(results);
    res.send(results);
  });

exports.eventInfo = (req, res) => {
  var eventId = req.params.id;

  Event.info(eventId, results => {
    res.send(results);
  });
};

exports.createEvent = (req, res) => {
  var creatorId = req.session.userId;
  var title = req.body.title;
  var description = req.body.description;
  var place = req.body.place;
  var eventDate = req.body.event_date;
  console.log(
    "creator id: " +
      creatorId +
      " title: " +
      title +
      " description: " +
      description +
      "place: " +
      place +
      "event date: " +
      eventDate
  );
  Event.create(creatorId, title, description, place, eventDate, () => {
    console.log("Event created successfully");
    User.all(users => {
      let user;
      for (user of users) {
        if (user.id != creatorId) {
          Notification.create(creatorId, user.id, "event", title, () => {
            console.log("Notification created successfully.");
          });
        }
      }
    });
    io.sendNotificationToAll(creatorId);
    res.send("Event created successfully");
  });

  // res.redirect("/api/events");
};

exports.getEventAttendees = (req, res) => {
  var eventId = req.params.id;
  Event.findAttendees(eventId, results => {
    console.log(
      "Fetching attendees for event : [" + eventId + "] successfull:\n"
    );
    console.log(results);
    res.send(results);
  });
};

exports.joinEvent = (req, res) => {
  var eventId = req.params.id;
  var userId = req.session.userId;
  Event.addEventAttendee(userId, eventId, () => {
    console.log("Joined event successfully.");
    res.send("Joined event successfully.");
  });
};

exports.leaveEvent = (req, res) => {
  var eventId = req.params.id;
  var userId = req.session.userId;
  Event.deleteEventAttendee(userId, eventId, () => {
    console.log("Left event successfully.");
    res.send("Left event successfully.");
  });
};

exports.createEventComment = (req, res) => {
  var creator_id = req.session.userId;
  var event_id = req.params.id;
  var content = req.body.content;
  Event.createComment(creator_id, event_id, content, () => {
    Event.updateCommentsCount(event_id, () => {
      Event.info(event_id, events => {
        if (creator_id != events[0].creator_id) {
          Notification.create(
            creator_id,
            events[0].creator_id,
            "event-comment",
            events[0].title,
            () => {
              console.log("Notification created successfully.");
            }
          );
          io.sendNotificationToUser(creator_id, events[0].creator_id);
        }
      });
      res.send("Comment created successfully.");
    });
  });
};

exports.getEventComments = (req, res) => {
  var event_id = req.params.id;
  Event.getComments(event_id, results => {
    res.send(results);
  });
};
