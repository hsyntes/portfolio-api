const express = require("express");
const compression = require("compression");
const cors = require("cors");
const expressRateLimit = require("express-rate-limit");
const expressMongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const hpp = require("hpp");
const xss = require("xss-clean");
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const articleRoutes = require("./routes/articleRoutes");
const iconRoutes = require("./routes/iconsRoutes");
const documentRoutes = require("./routes/documentRoutes");
const errorController = require("./controllers/errorController");

// * Express
const app = express();

app.use(compression());

// * Cors configuration
const allowedOrigins = [
  "https://www.hsyntes.com",
  "https://hsyntes.com",
  "https://hsyntes.vercel.app",
];

app.use(
  cors({
    origin: function (origin, cb) {
      if (allowedOrigins.includes(origin) || !origin) cb(null, true);
      else cb(new Error("Not allowed by CORS."));
    },
    credentials: true,
  })
);

// * API Limit
const limit = expressRateLimit({
  max: 9999999999999999999999999999,
  windowsMs: 60 * 60 * 1000,
  message: "Too many requests.",
  standartHeaders: true,
  legacyHeaders: false,
});

app.use(express.json({ limit }));

// * Security
app.use(expressMongoSanitize());
app.use(helmet());
app.use(hpp());
app.use(xss());

// * Root route
app.get("/", (req, res) => res.redirect("https://hsyntes.com"));

// * Routes
app.use("/hsyntes/users", userRoutes);
app.use("/hsyntes/projects", projectRoutes);
app.use("/hsyntes/articles", articleRoutes);
app.use("/hsyntes/icons", iconRoutes);
app.use("/hsyntes/documents", documentRoutes);

// * Global error handling
app.use(errorController);

module.exports = app;
