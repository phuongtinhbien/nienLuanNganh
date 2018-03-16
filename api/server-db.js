var express = require("express");
const bodyParser= require('body-parser');
var multer = require('multer')
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var TaskFood= require('./models/food');
var FoodCon = require('./controls/foodCon');
var routeFood = require("./routes/foodRoutes");

var TaskType = require('./models/typeFood');
var TypeCon = require('./controls/TypeFoodCon');
var routeType = require("./routes/typeFoodRoutes");

var TaskUser = require('./models/user');
var UserCon = require('./controls/userCon');
var routeUser = require("./routes/userRoutes");

var TaskKC = require('./models/khoangChat');
var KCCon = require('./controls/khoangChatCon');
var routeKC = require("./routes/khoangChatRoutes");

var TaskVitamin = require('./models/vitamin');
var vitaminCon = require('./controls/vitaminCon');
var routeVitamin= require("./routes/vitaminRoutes");





// var server = require("http").Server(app);
var net = require('net');

// main service listing to any service connection on port 8124
app.get("/connect",(req,res)=>{
    res.send("hello");
});
routeUser(app);
routeFood(app);
routeType(app);
routeVitamin(app);
routeKC(app);

app.listen(8081);





