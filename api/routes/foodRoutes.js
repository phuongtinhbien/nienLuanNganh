module.exports = function(app) {
    var User = require('../controls/foodCon');
    var multer = require('multer');
    var mkdirp = require('mkdirp');
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      //var code = JSON.parse(req.body.model).empCode;
      var dest = './assets/uploads/';
      mkdirp(dest, function (err) {
        console.log(err);
          if (err) cb(err, dest);
          else cb(null, dest);
      });
    },
    filename: function (req, file, cb) {
      cb(null,file.originalname);
    }
  });

  var upload = multer({ storage: storage });
  
    // User Routes
    app.route('/food')
      .get(User.list_all_type);

     app.post("/addfood",upload.single("anh"),User.create_a_type);
  
  
    app.route('/food/:name')
      .get(User.read_a_type)
      .put(User.update_a_type)
      .delete(User.delete_a_type);

    app.route("/food_search").post(User.search_a_type);
    app.route("/food_tongHop").post(User.tongHop_a_type);
};
