var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uri = "mongodb://phuongtinhbien:phuongEa5AnbNL@cluster0-shard-00-00-ifmcb.mongodb.net:27017,cluster0-shard-00-01-ifmcb.mongodb.net:27017,cluster0-shard-00-02-ifmcb.mongodb.net:27017/TrophicDB?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin"
mongoose.connect(uri);
mongoose.Promise = global.Promise;
var db = mongoose.connection;

var donViSchema = new Schema({
    name:{ type: String, required:true, unique: true, index:true},
    kiHieu:{type: String, required:true},
    key:{type: String, default:"dv_"+kiHieu}
});

var donVi = mongoose.model("donVi", donViSchema);
module.exports = donVi;