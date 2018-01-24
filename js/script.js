// CORS prefix

var prefix = "https://cors-anywhere.herokuapp.com/";

// variable declaration

var tweetLink = "https://twitter.com/intent/tweet?text=";
var quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";

// download a random quote

function getQuote() {
	$.getJSON(prefix + quoteUrl, createTweet);
	$.ajaxSetup({ cache: false });
}

// create tweet

function createTweet(input) {
	var data = input[0];


	var quoteText = $(data.content).text().trim();
	var quoteAuthor = data.title;

	if (!quoteAuthor.length) {
		quoteAuthor = "Unknown author";
	}

	// generating tweet content

	var tweetText = "Quote of the day - " + quoteText + "Author: " + quoteAuthor;

	// check if we dont have more than 140 text signs

	if (tweetText.length > 140) {
		getQuote();
	} else {
		var tweet = tweetLink + encodeURIComponent(tweetText);
		$('.quote').text(quoteText);
		$('.author').text("Author: " + quoteAuthor);
		$('.tweet').attr('href', tweet);
	}
}

// generate random quote when site is onload

$(document).ready(function() {
	getQuote();
	$('.trigger').click(function() {
		getQuote();
	});
});


