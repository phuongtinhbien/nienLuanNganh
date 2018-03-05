module.exports = function(app) {
    var User = require('../controls/foodCon');
  
    // User Routes
    app.route('/food')
      .get(User.list_all_type)
      .post(User.create_a_type);
  
  
    app.route('/food/:name')
      .get(User.read_a_type)
      .put(User.update_a_type)
      .delete(User.delete_a_type);
  };
  