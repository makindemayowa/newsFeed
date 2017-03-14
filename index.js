var prompt = require('prompt');

console.log ("Please type the newspaper service you'll like to receive news from");
console.log ("You can only select from [cnn, buzzfeed, cnbc, espn, independent, national-geographic, time] ");
var properties = [
	{
	  name: 'news_service', 
	  validator: /^[a-zA-Z\s\-]+$/,
	  warning: 'Newspaper must be only letters, spaces, or dashes'
	}
];

prompt.start();

prompt.get(properties, function (err, result) {
  if (err) {
  	console.log(err);
  	return 1;
  }
  console.log('  Newspaper name: ',  result.news_service);
  var request = require("request");
// request from HTTP
  request("https://newsapi.org/v1/articles?source=" + result.news_service + "&apiKey=fb871fdecf994d7d908d9947b4111bf3", function(error, response, body) {
  	var resultObj = JSON.parse(body);
  	var articles = resultObj.articles;
  	for (var i = 0; i < articles.length; i++) {
  		var article = articles[i];
  		console.log('\x1b[36m', 'AUTHOR:\t\t\t\t' ,'\x1b[0m'+ (article.author || 'anonymous'));
  		console.log('\x1b[36m', 'TITLE:\t\t\t\t' ,'\x1b[0m' + article.title);
  		console.log('\x1b[36m', 'DESCRIPTION:\t\t\t\t' ,'\x1b[0m' + article.description);
  		console.log('\x1b[36m', 'DATE:\t\t\t\t' ,'\x1b[0m' + article.publishedAt);
  		console.log('\x1b[36m', 'URL:\t\t\t\t' ,'\x1b[0m' + article.url);
  		console.log('\n\n\n\n');
  	}
  });

});
