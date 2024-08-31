module.exports = (io) => {
    io.on("connection", (socket) => {
      console.log("A user connected", socket.id);
  
      socket.on("chatMessage", ({username, message}) => {
        io.emit("chatMessage", {username, message}); 
      });
  
      socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
      });
    });
  };
  