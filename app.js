const express = require("express");
const cors = require('cors');
const session = require("express-session");
const mongoose = require("mongoose");
const routes = require("./routes");

console.log(process.argv);

var mongoURL = process.argv[4]; //'mongodb://localhost:27017/ca-db'; 'mongodb:/rm-mongodb-cluster-service-loadbalancer/database'

mongoose.connect(mongoURL, {useNewUrlParser: true}).then(()=>{  // updated the connection var for MongoDB
    const app = express();
    app.use(session({
        secret : "caAPISecret",
        saveUninitialized: false,
        resave: false
    }));
    app.use(express.json());
    app.use(cors({credentials: true, origin: [process.argv[2], process.argv[3]]})); // whitelisted the localhost ports for frontend, Karma and MongoDB (arg 2= localhost 4200, arg 3= localhost 9876 mongodb, arg 4= localhost 27017 ca-db)
    app.use("/api", routes);
    
    app.listen(3000, ()=>{
        console.log("CA API started on port 3000, test using http://localhost:3000");
    });
});