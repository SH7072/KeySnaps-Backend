const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");

// Routes
const user = require("./Routes/userRoutes");
const score = require("./Routes/scoreRoutes");
const passages = require("./Routes/passagesRoutes");


dotenv.config({
    path: "./Config/config.env",
});
const app = express();

//DB connection
require("./Config/dbConnection.js");

// CORS
app.use(
    cors({
        origin: "*",
        credentials: false,
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);


// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// adding Routes
app.use("/user", user);
app.use("/score", score);
app.use("/paragraph", passages);


app.get("/", (req, res) =>
    res.send(
        `<h1>Hello From Server </h1>`
    )
);

app.listen(process.env.PORT, () => {
    console.log(`Server runs on port ${process.env.PORT}`);
});
