const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");

// Routes
const user = require("./Routes/userRoutes");
const score = require("./Routes/scoreRoutes");
const passages = require("./Routes/passagesRoutes");
const lobby = require("./Routes/lobbyRoutes");
const { LobbySockets } = require("./sockets/sockets");
const http = require("http");

// Config
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
app.use("/lobby", lobby);


app.get("/", (req, res) =>
    res.send(
        `<h1>Hello From Server </h1>`
    )
);

app.listen(process.env.PORT || 4000, () => {
    console.log(`Server is UP on PORT ${process.env.PORT}`)
});

const httpServer = http.createServer(app);
const server = httpServer.listen(5000);

const io = require("socket.io")(server, {
    cors: {
        origin: "*",
    },
});

LobbySockets(io);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message, data });
});
