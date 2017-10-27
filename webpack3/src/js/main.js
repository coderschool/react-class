$(document).ready(function(){
  $.get('http://localhost:5000/tweets', {}, function(data) {
    console.log(data)
  });
});

function tweetTempl(tweetObj) {
  return "<p>" + tweetObj.text + "</p>";
}

$('#tweetInput').on('input', function(e) {
  let tweetLength = e.target.value.length;
  if (tweetLength > 140) {
    $('#tweetWarning').html("<p>Overflow: " + (140 - tweetLength) + "</p>");
    $('#tweetButton').prop('disabled', true);
  } else {
    $('#tweetWarning').empty();
    $('#tweetButton').prop('disabled', false);
  }
});

$('#tweetButton').on('click', function() {
  // Problem 1: I have to know about selectors on other things.
  let tweet = $('#tweetInput').val();

  $.post('http://localhost:5000/tweets', {
    'text': tweet
  }, function(data) {
    console.log(data)
  })

  // Problem 2: I have a templating problem here.
  $('#tweetsList').append(tweetTempl(tweet));
  // Problem 3: Additional logic leaking in here.
  $('#tweetInput').val('')
})
