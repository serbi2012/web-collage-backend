const app = require("../app");

app.io = require("socket.io")({
  cors: {
    origin: "*",
  },
});

app.io.on("connection", (socket) => {
  socket.on("user-send", async (data) => {});
});

module.exports = app.io;
