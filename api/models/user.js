var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var uri = "mongodb://phuongtinhbien:phuongEa5AnbNL@cluster0-shard-00-00-ifmcb.mongodb.net:27017,cluster0-shard-00-01-ifmcb.mongodb.net:27017,cluster0-shard-00-02-ifmcb.mongodb.net:27017/TrophicDB?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin"
mongoose.connect(uri);
mongoose.Promise = global.Promise;
var db = mongoose.connection;


var userSchema = new Schema({
    name: String,
    email:{type:String, required:true, unique:true},
    username:{type:String, required:true, unique:true},
    password:{type: String, required: true},
    admin: Boolean,
    created_at: {type: Date, default:Date.now},
    updated_at: {type: Date, default:Date.now}
});

userSchema.methods.getName = function(){
    return this.name;
}

userSchema.methods.getUID = function(){
    return this.uid;
}

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(this.password,candidatePassword, function(err, isMatch) {
        if (err) return cb(err);
        else return cb(null, isMatch);
    });
};
userSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash){
      if (err) {
        return next(err);
      }
      user.password = hash;
      console.log(user);
      
      next();
    })
  });


var user = mongoose.model("User", userSchema);
module.exports = user;