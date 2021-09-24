import Notification from "../models/notification";

exports.allNotifications = (req, res) => {
  var user_id = req.session.userId;
  Notification.all(user_id, results => {
    console.log("Notifications fetched successfully");
    console.log(results);

    Notification.markAsRead(() => {
      console.log("Notifications marked as read successfully!");
    });
    res.send(results);
  });
};
