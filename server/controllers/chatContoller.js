module.exports = (io) => {
    io.on("connection", (socket) => {
      //console.log("A user connected", socket.id);
  
      socket.on("chatMessage", ({username, message, time}) => {
        io.emit("chatMessage", {username, message, time}); 
      });
  
      socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
      });
    });
  };
  