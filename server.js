//INITITIAL
var express = require("express");
const bodyParser= require('body-parser');
var multer = require('multer');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
var TaskFood = require('./api/models/food');
var foodCon = require('./api/controls/foodCon');
var TaskUser = require('./api/models/user');
var userCon = require('./api/controls/userCon');
var session = require('express-session');
var bcrypt = require('bcrypt');
var io = require('socket.io');

var routeUser = require("./api/routes/userRoutes");
var routeFood = require("./api/routes/foodRoutes");
app.listen(3000)

    //NOTIFICATON CONNECT SUCCESSFULLY
    console.log("SUCCESSFULLY......");

//GET DATA FROM #FORM
var uri = "mongodb://phuongtinhbien:phuongEa5AnbNL@cluster0-shard-00-00-ifmcb.mongodb.net:27017,cluster0-shard-00-01-ifmcb.mongodb.net:27017,cluster0-shard-00-02-ifmcb.mongodb.net:27017/TrophicDB?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin"

//LUU FILE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      //var code = JSON.parse(req.body.model).empCode;
      var dest = './uploads/';
      mkdirp(dest, function (err) {
          if (err) cb(err, dest);
          else cb(null, dest);
      });
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+'-'+file.originalname);
    }
  });
  
  var upload = multer({ storage: storage });
  
app.post('/upload', upload.single("anh"), function(req , res){
      console.log(req.body);
      res.redirect("/food");
});
var upload = multer({storage:storage});
//DATABASE
const Mongo = require('mongodb').MongoClient;
app.set("view engine","ejs");
app.set("views", "./views")

//ADMIN
app.get("/admin_bg",function(req,res){
    res.sendFile(__dirname+"/assets/bg_admin_login.png")
})
app.get("/admin",function(req,res){
    if (req.session) return res.render("admin");
    else
        return res.render("signin")
});
routeUser(app);
routeFood(app);

//HOME
app.get("/", function(req,res){
    Mongo.connect(uri, (err, db)=>{
        if (err) throw err;
        var dbo = db.db('TrophicDB')
        dbo.collection('loaiThucPham').find().toArray(
            function(err,result){
                if (err) throw err;
                console.log(result);
                        res.render("index", {result:result});

                });
            });
        
 });
    


app.get("/home", function(req,res){
    res.redirect("/");
});

//BACKGROUND HEADER
app.get("/header", function(req,res){
    res.sendFile(__dirname + '/assets/Path1.png');
});
app.get("/head1", function(req,res){
    res.sendFile(__dirname + '/assets/head1.png');
});

app.get("/css",(req, res)=>{
    res.sendFile(__dirname+"/css/styles.css");
})

//BRAND
app.get("/brand", function(req,res){
    res.sendFile(__dirname + '/assets/brand/brand.png');
});
app.get("/nutri", function(req,res){
    res.sendFile(__dirname + '/assets/nutrition-icon.png');
});
app.get("/buaAnDinhDuong", function(req,res){
    res.sendFile(__dirname + '/assets/buaAnDinhDuong.png');
});

app.get("/thucPham_img/:id",function(req,res){
    var id = req.params.id;
    res.sendFile(__dirname+"/assets/"+id+".png");
})
app.get("/food_img/:id",(req,res)=>{
    var id = req.params.id;
    res.sendFile(__dirname+"/assets/uploads/"+id);
})


app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false
  }));

//SIGN IN

app.get('/logout', function(req, res, next) {
    if (req.session) {
      // delete session object
      req.session.destroy(function(err) {
        if(err) {
          return next(err);
        } else {
          return res.redirect('/admin');
        }
      });
    }
});

//THUC PHAM
app.get("/thucPham/:id",function(req,res){
    var id = req.params.id;
    Mongo.connect(uri, (err, db)=>{
        if (err) throw err;
        var dbo = db.db('TrophicDB')
        dbo.collection('loaiThucPham').find({key:id}).toArray(
            function(err,result){
                if (err) throw err;
                console.log(result);
                dbo.collection("thucphams").find({loaiThucPham: id}).toArray(
                    function(err, result1){
                        if (err) throw err;
                        res.render("thucPham",{listThucPham:result1,info:result[0]});
                    }
                )
               
                
            }
        );
        
    });
});

app.get("/add_thucPham",(req,res)=>{
    res.render("add_ThucPham");
});
app.get("/add_vitaminkc",(req,res)=>{
    res.render("add_vitamin&kc");
});
//DINH DUONG
app.get("/dinhDuong/:id",function(req,res){
    var id = req.params.id;
    Mongo.connect(uri, (err, db)=>{
        if (err) throw err;
        var dbo = db.db('TrophicDB')
        dbo.collection('dinhDuong').find({key:id}).toArray(
            function(err,result){
                if (err) throw err;
                console.log(result);
                res.render("thucPham",result[0],(err,html)=>{
                    if(err){res.redirect("/home");}
                    
                });
            }
        );
        
    });
});

//THONG TIN THEM
app.get("/thongTinThem",function(req,res){
    res.render("thongTinThem");
});
app.get("/social/:id",function(req,res){
    var id = req.params.id;
    res.sendFile(__dirname+"/assets/social/"+id+".png");
});

//TINH DINH DUONG
app.get("/tinhDinhDuong",(req,res)=>{
    res.render("tinhDinhDuong");
});
