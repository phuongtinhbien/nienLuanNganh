module.exports = function(app) {
    var User = require('../controls/khoangChatCon');
  
    // User Routes
    app.route('/khoangChat')
      .get(User.list_all_type)
      .post(User.create_a_type);
  
  
    app.route('/khoangChat/:typeId')
      .get(User.read_a_type)
      .put(User.update_a_type)
      .delete(User.delete_a_type);
      app.route("/khoangChat_search").post(User.search_a_type);
  };
  