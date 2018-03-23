var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uri = "mongodb://phuongtinhbien:phuongEa5AnbNL@cluster0-shard-00-00-ifmcb.mongodb.net:27017,cluster0-shard-00-01-ifmcb.mongodb.net:27017,cluster0-shard-00-02-ifmcb.mongodb.net:27017/TrophicDB?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin"
mongoose.connect(uri);
mongoose.Promise = global.Promise;
var db = mongoose.connection;

var typeFoodSchema = new Schema({
    name:{type: String, required: true, unique:true},
    key:{type: String, required: true, unique:true},
    img:{type: String, required: true, unique:true},
    bg:{type: String, required: true, unique:true},
    intro: {type: String, required: true},
    content: {type: String, required: true}
});

typeFoodSchema.index({name:"text"});
var typeFood = mongoose.model("loaiThucPham", typeFoodSchema);

module.exports = typeFood;