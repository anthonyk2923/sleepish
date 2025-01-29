console.clear();

const express = require("express");
const app = express();
require("dotenv").config();
require("colors");

const cors = require("cors");
const db = require("./config/db.js");
const initializeSocketServer = require("./socket.io/socketIo.js");
const http = require("http");

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

db.connectDb();

const server = http.createServer(app);
const io = initializeSocketServer(server);

app.use("/api/user/", require("./routes/userRoute.js"));
app.use("/api/message/", require("./routes/messageRoute.js")(io));

(async () => {
  try {
    const { handler } = await import("../frontend/build/handler.js");
    app.use(handler);
    console.log("✅ SvelteKit handler loaded successfully.");
  } catch (error) {
    console.error("⚠️ Could not load SvelteKit handler. Have you built the frontend? (`npm run build` in frontend)");
    console.error(error);
  }

  server.listen(PORT, () => {
    console.log(`🚀 App listening on port ${PORT}`.magenta.underline);
  });
})();
