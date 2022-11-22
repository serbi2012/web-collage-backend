const app = require("../app");

app.io = require("socket.io")({
  cors: {
    origin: "*",
  },
});

app.io.on("connection", (socket) => {
  socket.on("user-send", (data) => {
    socket.broadcast.emit("user-send", data);
  });
});

module.exports = app.io;
