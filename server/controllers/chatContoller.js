module.exports = (io) => {
    io.on("connection", (socket) => {
      console.log("A user connected", socket.id);
  
      socket.on("chatMessage", (msg) => {
        io.emit("chatMessage", msg); 
      });
  
      socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
      });
    });
  };
  