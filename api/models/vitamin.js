var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uri = "mongodb://phuongtinhbien:phuongEa5AnbNL@cluster0-shard-00-00-ifmcb.mongodb.net:27017,cluster0-shard-00-01-ifmcb.mongodb.net:27017,cluster0-shard-00-02-ifmcb.mongodb.net:27017/TrophicDB?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin"
mongoose.connect(uri);
mongoose.Promise = global.Promise;
var db = mongoose.connection;

var vitaminSchema = new Schema({
    name:{type: String, required: true, unique:true},
    key:{type: String, required: true, unique:true},
    content: {type: String, required: true},
    donVi:{type:Array, required:true},
    ncc: {type: String, required: true}
});

vitaminSchema.index({name:"text"});
var vitamin = mongoose.model("vitamin", vitaminSchema);

module.exports = vitamin;