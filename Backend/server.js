require("dotenv").config({ path: "./Backend/.env" });
const path = require("path");
const express = require("express");
const cors = require("cors");



const app = express();

// Connect to MongoDB
const { connectToMongoose } = require("./config/db");

// Middleware to parse JSON
app.use(express.json());

// Dynamic CORS configuration
const { corsDevOptions, corsProOptions } = require("./config/corsConfig");
const isProduction = process.env.NODE_ENV === "production";
app.use(cors(isProduction ? corsProOptions : corsDevOptions));

// Rate limiter middleware for API routes
const {
  apiLimiter,
} = require("./middlewares/rateLimitMiddleware/rateLimitMiddleware");
app.use("/api", apiLimiter);

// Users route
const usersRoute = require("./routes/usersRoutes");
app.use("/api/users", usersRoute);

// Admins route
const adminsRoute = require("./routes/adminRoutes");
app.use("/api/admins", adminsRoute);

// Account route
const accountRoute = require("./routes/accountRoutes");
app.use("/api/account", accountRoute);

// Account request route
const accountRequestRoute = require("./routes/accountRequestRoutes");
app.use("/api/request", accountRequestRoute);

// Serve frontend (production only)
if (isProduction) {
  app.use(express.static(path.join(__dirname, "../Frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "Frontend", "dist", "index.html")
    )
  );
}

// Start server after MongoDB connection
connectToMongoose()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log("Connected to Mongoose Through 127.0.0.1");
      console.log("server is running");
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
