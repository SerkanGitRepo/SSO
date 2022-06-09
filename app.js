const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");

const params = require("./params/params");


const app=express();

app.set("port", process.env.PORT || 3000);

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");


app.use("/", require("./routes/web"));  
app.use("/api", require("./routes/api")); 

app.use(session({
    secret:"345tert5635rt",
    resave:false,
    saveUninitialized:false
}))

app.listen(app.get("port"),function(){
    console.log("Server started on port " + app.get("port"));
});
