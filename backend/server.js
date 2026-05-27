require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const logger = require("./middleware/logger");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(logger);

// 🔥 MUST CONNECT FIRST
connectDB();

// routes AFTER DB connection
app.use("/auth", require("./routes/authRoutes"));
app.use("/meetings", require("./routes/meetingRoutes"));

app.listen(PORT, () => {
    console.log(`Server Started on port ${PORT}`);
});