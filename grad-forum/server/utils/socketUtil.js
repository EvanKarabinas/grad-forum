import Socket from "../models/socket";

var io = require("socket.io").listen(5000);

module.exports.startSocketsIo = function() {
  io.on("connection", function(socket) {
    console.log("connected:", socket.client.id);

    socket.on("join", function(userId) {
      console.log("Message from client userId : " + userId);
      Socket.create(userId, socket.client.id, () => {
        console.log(
          "Added socket user_id: " + userId + " socket_id: " + socket.client.id
        );
      });
    });
    // Socket.create(userInfo.id, socket.client.id, () => {
    //   req.session.socketId = socket.client.id;

    //   console.log(
    //     "Added socket user_id: " +
    //       userInfo.id +
    //       " socket_id: " +
    //       req.session.socketId
    //   );

    // });

    // socket.on("disconnect", function() {
    //   Socket.delete(socket.client.id, () => {
    //     console.log(
    //       "Socket with id: " + socket.client.id + " deleted successfully."
    //     );
    //   });
    //   socket.removeAllListeners();
    // });
  });
};

module.exports.sendNotificationToAll = function(sender_id) {
  console.log("utils ok!!!");
  Socket.all(sockets => {
    let socket;
    for (socket of sockets) {
      if (socket.user_id != sender_id) {
        io.to(socket.socket_id).emit("clientEvent", "new notification!");
        console.log("Send notification to " + socket.socket_id);
      }
    }
  });
};

module.exports.sendNotificationToUser = function(sender_id, receiver_id) {
  console.log("utils ok!!!");
  Socket.all(sockets => {
    let socket;
    for (socket of sockets) {
      if (socket.user_id === receiver_id && sender_id != receiver_id) {
        io.to(socket.socket_id).emit("clientEvent", "new notification!");
        console.log("Send notification to " + socket.socket_id);
      }
    }
  });
};
