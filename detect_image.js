var mongoose = require("mongoose"),
  Type = mongoose.model("ThucPham");
var result = new Array();
var fs = require("fs");
const Clarifai = require("clarifai");
// initialize with your api key. This will also work in your browser via http://browserify.org/

exports.detect_image = function detect(req, res) {
  const detect = new Clarifai.App({
    apiKey: "f49977393476475e997aae32d4a8532b"
  });
  var fileInfo;

  fileInfo = {
    originalName: req.file.originalName,
    size: req.file.size,
    b64: new Buffer(fs.readFileSync(req.file.path)).toString("base64")
  };
  fs.unlinkSync(req.file.path);

  detect.models.predict(Clarifai.FOOD_MODEL, fileInfo.b64).then(
    function(response) {
      var re = response.outputs[0].data.concepts;
      for (var i = 0; i < re.length; i++) {
        result.push(re[i].name);
      }
      console.log(result);
      Type.find({ en_name: { $in: result } }).exec(function(err, type) {
        var i = type.length;
        console.log(type);
        if (err) res.send(err);
        var data = { title: req.body.name, len: i, data: type };
        res.render("list_search", data);
      });
    },
    function(err) {}
  );
};
exports.detect_image1 = function detect(req, res) {
    const detect = new Clarifai.App({
      apiKey: "f49977393476475e997aae32d4a8532b"
    });
    var fileInfo;
  
    fileInfo = {
      originalName: req.file.originalName,
      size: req.file.size,
      b64: new Buffer(fs.readFileSync(req.file.path)).toString("base64")
    };
    fs.unlinkSync(req.file.path);
  
    detect.models.predict(Clarifai.FOOD_MODEL, fileInfo.b64).then(
      function(response) {
        var re = response.outputs[0].data.concepts;
        for (var i = 0; i < re.length; i++) {
          result.push(re[i].name);
        }
        console.log(result);
        Type.find({ en_name: { $in: result } }).exec(function(err, type) {
          var i = type.length;
          console.log(type);
          if (err) res.send(err);
          var data = { title: req.body.name, len: i, data: type };
          res.render("tonghop_thucPham",data);
        });
      },
      function(err) {}
    );
  };
