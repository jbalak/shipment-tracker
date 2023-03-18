require("dotenv").config();
const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const routes = require("./routes");
const authRoutes = require("./routes/auth.routes");
const apiRoutes = express.Router();
const dbConnect = require("./db");
const {
  apiLimiter,
  authTokenCheck,
  checkError,
  logs,
  combinedLogs,
  skipLogs,
} = require("./middlewares");
const { cronFunctions } = require("./utils/cron");
// Helmet
app.use(helmet());

//BODY-PARSER
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//MORGAN LOGS
// log only 4xx and 5xx responses to console
app.use(morgan("combined"));
app.use(
  morgan("dev", {
    skip: function (req, res) {
      return res.statusCode < 200;
    },
  })
);

// log all requests to access.log
app.use(
  morgan("short", {
    stream: fs.createWriteStream(
      path.join(`${__dirname}/../`, "logs", "access.log"),
      {
        flags: "a",
      }
    ),
  })
);

//CORS
app.use(cors());

//db connect
dbConnect();

// cron functions
cronFunctions();

// api limit
apiRoutes.use(apiLimiter);

apiRoutes.use("/auth", authRoutes);

// //Auth token verification
apiRoutes.use(authTokenCheck);

apiRoutes.use("/users", routes);

app.use("/api", apiRoutes);

// // Error Handler
app.use(checkError);

module.exports = app;
