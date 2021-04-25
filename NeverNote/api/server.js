const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const noteRoute = require("./routes/note.route");
const userRoute = require("./routes/user.route");
const config = require("./database/database");

const port = 3000;
const app = express();

//Database
mongoose.connect(config.db,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>{
        console.log("Connected to the database");
    });

//Middleware
app.use(bodyParser.json());
app.use(cors());

//Routes
app.use("/notes",noteRoute);
app.use("/users",userRoute);

app.listen(port,()=>{
    console.log("Listening on port "+port);
});