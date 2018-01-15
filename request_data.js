var request = require('request');  
var cheerio = require('cheerio');

var url = 'https://www.google.com.vn/search?ei=BZJXWtv3A5WgvQT6g6GwCg&q=c%C3%A0+r%E1%BB%91t&oq=c%C3%A0+r%E1%BB%91t&gs_l=psy-ab.3..35i39k1j0l9.10818.12162.0.12318.14.10.2.0.0.0.151.820.4j4.8.0....0...1c.1.64.psy-ab..5.9.762...0i67k1j0i131k1j0i10k1j0i22i30k1j0i22i10i30k1.0.ggQPk4rrWpk';

request(url, function(err, response, body){  
    if (!err && response.statusCode == 200) {
      var $ = cheerio.load(body);
      $('.mw').filter(function(){
          var data = $(this);
          title = data.children().first().text();
        console.log(title);

      })
    }
    else{
        console.log("Fail");
    }
  })