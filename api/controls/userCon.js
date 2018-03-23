var mongoose = require('mongoose'),
Type = mongoose.model('User');
var bcrypt = require('bcrypt');

exports.list_all_type = function(req, res) {
  Type.find({}, function(err, type) {
    if (err)
      res.send(err);
    res.json(type);
  });
};

exports.create_a_type = function(req, res) {
  var new_type = new Type(req.body);
  console.log(req.body);
  if (req.body.admin == 'on')
    new_type.admin = true;
    else
    new_type.admin = false;
    console.log(new_type);
  new_type.save(function(err, type) {
    if (err)
      res.send(err);
    res.json(type);
  });
};

exports.read_a_type = function(req, res) {
  Type.findOne({username: req.params.username}, function(err, type) {
    if (err)
      res.send(err);
    res.json(type);
  });
};

exports.update_a_type = function(req, res) {
  Type.findOneAndUpdate({_id: req.params.typeId}, req.body, {new: true}, function(err, type) {
    if (err)
      res.send(err);
    res.json(type);
  });
};

exports.log_in = function(req, res){
  console.log(req.body);
    Type.findOne({username: req.body.InputEmail}, function(err, type){
      if (err) throw err;
      console.log(type);
      type.comparePassword(req.body.InputPassword, function(err, isMatch){
        
        if (err) throw err;
          if (isMatch){
            console.log(isMatch);
           req.session.username = req.body.InputEmail;

            
            res.redirect("/signin") ;
            
          }
          else{
            res.redirect("/admin");
          }
      });
    });
  }

exports.delete_a_type = function(req, res) {

  Type.remove({
    _id: req.params.typeId
  }, function(err, type) {
    if (err)
      res.send(err);
    res.json({ message: 'Type successfully deleted' });
  });
};

