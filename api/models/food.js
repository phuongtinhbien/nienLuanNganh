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
    giaTriDinhDuong: {type: number, default:100},
    calo: {type: number, required:true},
    lipid:  {type: number, default:0},
    Cholesterol: {type: number, default:0},
    Natri: {type: number, default:0},
    Kali: {type: number, default:0},
    Cacbohydrat: {type: number, default:0},
    chatXo: {type: number, default:0},
    duong: {type: number, default:0},
    protein: {type: number, default:0},
    vitaminA: {type: number, default:0},
    vitaminC: {type: number, default:0},
    vitaminD: {type: number, default:0},
    vitaminB12: {type: number, default:0},
    vitaminB6: {type: number, default:0},
    canxi: {type: number, default:0},
    sat: {type: number, default:0},
    magie: {type: number, default:0},
    chatBeoChuyenHoa: {type: number, default:0}
});


var thucPham = mongoose.model("ThucPham", userSchema);
module.exports = thucPham;