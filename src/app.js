require("dotenv").config();
const express = require("express");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const routes = require("./routes");
const authRoutes = require("./routes/auth.routes");
const apiRoutes = express.Router();
const dbConnect = require("./db");
const { apiLimiter, authTokenCheck, checkError } = require("./middlewares");
const { cronFunctions } = require("./utils/cron");
// Helmet
app.use(helmet());

//BODY-PARSER
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
