var mongoose = require('mongoose'),
  Type = mongoose.model('khoangChat');

exports.list_all_type = function(req, res) {
  Type.find({}, function(err, type) {
    if (err)
      res.send(err);
    res.json(type);
  });
};

exports.create_a_type = function(req, res) {
  var new_type = new Type(req.body);
  new_type.save(function(err, type) {
    if (err)
      res.send(err);
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

exports.read_a_type = function(req, res) {
  Type.find({key:req.params.typeId}, function(err, type) {
    if (err)
      res.send(err);
    res.json(type);
  });
};


exports.update_a_type = function(req, res) {
  Type.findOneAndUpdate({key: req.params.typeId}, req.body, {new: true}, function(err, type) {
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


