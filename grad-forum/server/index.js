import app from "./app";

var server = app.listen(4000, () => {
  console.log("Running on port 4000...");
});

// var io = require("socket.io")(server, { path: "/api/notifications" });

// app.set("socketio", io);
