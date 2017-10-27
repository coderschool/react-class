$('#tweetInput').on('change', function(e) {
  console.log('test');
});

$('#tweetButton').on('click', function() {
  // Problem 1: I have to know about selectors on other things.
  let tweet = $('#tweetInput').val();
  // Problem 2: I have a templating problem here.
  $('#tweetsList').append("<p>" + tweet + "</p>");
  $('#tweetInput').val('')
})
