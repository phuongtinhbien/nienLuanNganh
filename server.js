//INITITIAL
var express = require("express");
const bodyParser= require('body-parser');
var multer = require('multer')
var app = express();
var Task = require('./api/models/user');
var userCon = require('./api/controls/userCon');
var session = require('express-session');
var bcrypt = require('bcrypt');
var io = require('socket.io');
var server = require('http').createServer(app);
io = io.listen('8080', '192.168.28.101');

var rou = require("./api/routes/userRoutes");
app.listen(80, "192.168.28.101", () => {
    //NOTIFICATON CONNECT SUCCESSFULLY
    console.log("SUCCESSFULLY......");
});
//GET DATA FROM #FORM
var uri = "mongodb://phuongtinhbien:phuongEa5AnbNL@cluster0-shard-00-00-ifmcb.mongodb.net:27017,cluster0-shard-00-01-ifmcb.mongodb.net:27017,cluster0-shard-00-02-ifmcb.mongodb.net:27017/TrophicDB?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin"

//LUU FILE
var storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, './upload')
    },
    filename: function(req,file,cb){
        cb(null,file.orginalname)
    }
});
var upload = multer({storage:storage});
//DATABASE
const Mongo = require('mongodb').MongoClient;
app.set("view engine","ejs");
app.set("views", "./views")
app.use(bodyParser.urlencoded({extended: true}));
//ADMIN
app.get("/admin_bg",function(req,res){
    res.sendFile(__dirname+"/assets/bg_admin_login.png")
})
app.get("/admin",function(req,res){

    res.render("signin")
});
rou(app)
// app.get("/admin/:id", function(req,res){

// });
//HOME
app.get("/", function(req,res){
    res.sendFile(__dirname + '/index.html');
});


app.get("/home", function(req,res){
    res.sendFile(__dirname + '/index.html');
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

app.get("/thucPham_img/:id",function(req,res){
    var id = req.params.id;
    res.sendFile(__dirname+"/assets/"+id+".png");
})

app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false
  }));

//SIGN IN

app.post ("/signin",function(req,res){
    if (req.session) res.render("admin");
    else{
        var email = req.body.InputEmail;
        var pass = req.body.InputPassword;
       
    }
});
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
                res.render("thucPham",result[0],(err)=>{
                    if (err) return res.redirect("/");
                    else
                        res.render("thucPham",result[0]);

                });
            }
        );
        
    });
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
