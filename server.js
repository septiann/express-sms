const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 8000;
const mysql2 = require('mysql2');

const coursesRoute = require("./src/routes/courses.route");
const classesRoute = require("./src/routes/classes.route");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();

// Database
const db = require("./src/models");
db.sequelize.sync()
.then(() => {
    console.log("Synced db.");
})
.catch((err) => {
    console.log("Failed to sync db: " + err.message);
});

/* db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
}); */

// Log
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// Routes
app.use('/api/v1/course', coursesRoute);
app.use('/api/v1/class', classesRoute);

app.listen(PORT, () => {
    console.log(`School Management System App listening at http://localhost:${PORT}`);
});
