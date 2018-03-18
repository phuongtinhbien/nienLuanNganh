var mongoose = require('mongoose'),
Type = mongoose.model('ThucPham');
var bcrypt = require('bcrypt');
var multer = require('multer');


exports.list_all_type = function(req, res) {
  Type.find({}, function(err, type) {
    if (err)
      res.send(err);
    res.json(type);
  });
};

exports.create_a_type = function(req, res) {
  var new_type = new Type(req.body);
  console.log(req.file);
  new_type.anh = req.file.originalname;
  new_type.save(function(err, type) {
    if (err)
    res.render("error_add_update");
    res.json(type);
  });
};

exports.search_a_type = function(req, res) {
  Type.find(
    { $text : { $search : req.body.name } }, 
    { score : { $meta: "textScore" } }
)
.sort({ score : { $meta : 'textScore' } })
.exec(function(err, type) {
  
  var i = type.length;
    console.log(type);
    if (err) res.send(err);
    var data = {title:req.body.name,len: i,data: type};
    res.render("list_search",data);
});
};

exports.tongHop_a_type = function(req, res) {
  Type.find(
    { $text : { $search : req.body.name } }, 
    { score : { $meta: "textScore" } }
)
.sort({ score : { $meta : 'textScore' } })
.exec(function(err, type) {
  
  var i = type.length;
    console.log(type);
    if (err) res.send(err);
    var data = {title:req.body.name,len: i,data: type};
    res.render("tonghop_thucPham",data);
});
};
exports.read_a_type = function(req, res) {
  Type.find({_id:req.params.name}).exec(function(err, type) {
  console.log(type);
    if (err) res.send(err);
    var result = type[0];
    Type.find({loaiThucPham:result.loaiThucPham},(err,type1)=>{
      if (err) res.send(err);
      var data = {data: result, list:type1};
      res.render("info_thucPham",data);
    })
    
});
};
exports.update_a_type = function(req, res) {
  Type.findOneAndUpdate({_id: req.params.typeId}, req.body, {new: true}, function(err, type) {
    if (err)
      res.send(err);
    res.json(type);
  });
};


exports.delete_a_type = function(req, res) {

  Type.remove({
    _id: req.params.typeId
  }, function(err, type) {
    if (err)
      res.send(err);
    res.json({ message: 'Type successfully deleted' });
  });
};

