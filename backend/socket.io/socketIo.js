const { Server } = require("socket.io");
const decode = require("../middleware/jwtDecode.js");
const User = require("../models/userModel.js");
const time = require("../config/time.js")

const getCurrentNtpTime = async () => {
  try {
    return await time.time()
  }
  catch {
    return 'e'
  }
}
const initializeSocketServer = (server) => {
  try {
    let users = [];
    const io = new Server(server, {
      cors: {
        origin: "*",
      },
    });

    io.on("connection", async (socket) => {
      try {
        const time = await getCurrentNtpTime()
        socket.emit('setTime', { time: time })
        const token = socket.handshake.query.token;

        // Handle missing token
        if (!token) {
          console.log("No JWT provided. Disconnecting client.");
          return socket.disconnect(true);
        }

        // Decode the token
        const userToken = decode(token)?.id;
        if (!userToken) {
          console.log("Invalid or missing token. Disconnecting client.");
          return socket.disconnect(true);
        }

        // Fetch the user from the database
        const user = await User.findById(userToken).catch((err) => {
          console.error("Database error:", err.message);
          return null;
        });
        if (!user) {
          console.log("No user found with the provided token. Disconnecting client.");
          return socket.disconnect(true);
        }

        // Check if the user is already in the list
        let existingUser = users.find((u) => u._id.toString() === user._id.toString());
        if (!existingUser) {
          // If the user is not in the list, add them
          existingUser = {
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
            socketIDs: [socket.id], // Track multiple socketIDs for the user
          };
          users.push(existingUser);
        } else {
          // If the user is already in the list, add the new socketID
          existingUser.socketIDs.push(socket.id);
        }

        io.emit("newUsers", users);
        socket.on("disconnect", () => {
          existingUser.socketIDs = existingUser.socketIDs.filter((id) => id !== socket.id);

          if (existingUser.socketIDs.length === 0) {
            users = users.filter((u) => u._id.toString() !== user._id.toString());
          }

          io.emit("newUsers", users);
        });
      } catch (err) {
        console.error("Socket error:", err.message);
        socket.disconnect(true);
      }
    });
    setInterval(async () => {
      const time = await getCurrentNtpTime();
      io.emit("newTime", { time: time });
    }, 5000);
    return io;
  } catch (e) {
    console.error("Error initializing Socket.IO server:", e.message);
  }
};


module.exports = initializeSocketServer;
