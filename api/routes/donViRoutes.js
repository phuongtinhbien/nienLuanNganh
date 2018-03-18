module.exports = function(app) {
    var User = require('../controls/donViCon');
  
    // User Routes
    app.route('/donVi')
      .get(User.list_all_type)
      .post(User.create_a_type);
  
  
    app.route('/donVi/:typeId')
      .get(User.read_a_type)
      .put(User.update_a_type)
      .delete(User.delete_a_type);
  };
  