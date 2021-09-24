import Group from "../models/group";
import User from "../models/user";
import Notification from "../models/notification";
import io from "../utils/socketUtil";

exports.allGroups = (req, res) =>
  Group.all(results => {
    res.send(results);
  });

exports.groupInfo = (req, res) => {
  var groupId = req.params.id;
  console.log(groupId);
  Group.info(groupId, results => {
    res.send(results);
  });
};

exports.createGroup = (req, res) => {
  var creatorId = req.session.userId;
  var name = req.body.name;
  var description = req.body.description;
  console.log(
    "creator id: " +
      creatorId +
      " name: " +
      name +
      " description: " +
      description
  );
  Group.create(creatorId, name, description, () => {
    console.log("create ok");

    Group.findGroup(name, results => {
      var groupId = results[0].id;
      console.log("creatorId: " + creatorId + "  groupId: " + groupId);
      Group.addGroupMember(creatorId, groupId, () => {});
    });
    User.all(users => {
      let user;
      for (user of users) {
        if (user.id != creatorId) {
          Notification.create(creatorId, user.id, "group", name, () => {
            console.log("Notification created successfully.");
          });
        }
      }
    });
    io.sendNotificationToAll(creatorId);
    res.send("Group created successfully.");
  });
};

exports.getGroupMembers = (req, res) => {
  var groupId = req.params.id;
  Group.findMembers(groupId, results => {
    res.send(results);
  });
};

exports.joinGroup = (req, res) => {
  var groupId = req.params.id;
  var userId = req.session.userId;
  Group.addGroupMember(userId, groupId, () => {
    res.send("Joined group successfully.");
  });
};

exports.exitGroup = (req, res) => {
  var groupId = req.params.id;
  var userId = req.session.userId;
  Group.deleteGroupMember(userId, groupId, () => {
    res.send("Exited group successfully.");
  });
};

exports.getGroupMessages = (req, res) => {
  var groupId = req.params.id;
  Group.getMessages(groupId, results => {
    res.send(results);
  });
};

exports.getGroupMessageInfo = (req, res) => {
  var groupId = req.params.id;
  var messageId = req.params.messageId;

  Group.messageInfo(groupId, messageId, results => {
    res.send(results);
  });
};

exports.createGroupMessage = (req, res) => {
  var groupId = req.params.id;
  var creatorId = req.session.userId;
  var content = req.body.content;
  Group.createMessage(creatorId, groupId, content, () => {
    res.send("Message created successfully.");
  });
};
