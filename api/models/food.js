var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var uri = "mongodb://phuongtinhbien:phuongEa5AnbNL@cluster0-shard-00-00-ifmcb.mongodb.net:27017,cluster0-shard-00-01-ifmcb.mongodb.net:27017,cluster0-shard-00-02-ifmcb.mongodb.net:27017/TrophicDB?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin"
mongoose.connect(uri);
mongoose.Promise = global.Promise;
var db = mongoose.connection;

var thucPhamSchema = new Schema({

    name:{ type: String, required:true, unique: true},
    loaiThucPham:{type:String, required:true},
    info:{type: String, required:true},
    giaTriDinhDuong: {type:Number, default:100},
    anh:{type:String,required: true},
    calo: {type: Number, required:true},
    lipid:  {type: Number, default:0},
    Cholesterol: {type: Number, default:0},
    Natri: {type: Number, default:0},
    Kali: {type: Number, default:0},
    Cacbohydrat: {type: Number, default:0},
    chatXo: {type: Number, default:0},
    duong: {type: Number, default:0},
    protein: {type: Number, default:0},
    vitaminA: {type: Number, default:0},
    vitaminC: {type: Number, default:0},
    vitaminD: {type: Number, default:0},
    vitaminB12: {type: Number, default:0},
    vitaminB6: {type: Number, default:0},
    canxi: {type: Number, default:0},
    sat: {type: Number, default:0},
    magie: {type: Number, default:0},
    chatBeoChuyenHoa: {type: Number, default:0}
});


var thucPham = mongoose.model("ThucPham", thucPhamSchema);
module.exports = thucPham;