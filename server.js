//INITITIAL
var express = require("express");
const bodyParser= require('body-parser');
var app = express();
var multer = require('multer')
//GET DATA FROM #FORM


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

app.listen(3000, () => {
    //NOTIFICATON CONNECT SUCCESSFULLY
    console.log("SUCCESSFULLY......");
});
//DATABASE
const uri = "mongodb://guest:phuong12@cluster0-shard-00-00-ifmcb.mongodb.net:27017,cluster0-shard-00-01-ifmcb.mongodb.net:27017,cluster0-shard-00-02-ifmcb.mongodb.net:27017?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin"
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

//BRAND
app.get("/brand", function(req,res){
    res.sendFile(__dirname + '/assets/brand/brand.png');
});

app.get("/thucPham_img/:id",function(req,res){
    var id = req.params.id;
    res.sendFile(__dirname+"/assets/"+id+".png");
})

//SIGN IN
app.post ("/signin",function(req,res){
    var email = req.body.InputEmail;
    var pass = req.body.InputPassword;
    var uri = "mongodb://"+email+":"+pass+"@cluster0-shard-00-00-ifmcb.mongodb.net:27017,cluster0-shard-00-01-ifmcb.mongodb.net:27017,cluster0-shard-00-02-ifmcb.mongodb.net:27017?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin"
    MongoClient.connect(uri,(err)=>{
        if (err) return console.log(err);
        else{
            res.render("admin");
        }
    });
    
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
