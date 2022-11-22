const app = require("../app");

app.io = require("socket.io")({
  cors: {
    origin: "*",
  },
});

app.io.on("connection", (socket) => {
  socket.on("shareScrapContent", (data) => {
    socket.broadcast.emit("shareScrapContent", data);
  });
});

module.exports = app.io;
