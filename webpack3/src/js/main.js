function likeTweet(tweetId) {
  $.post('http://localhost:5000/tweets/' + tweetId + '/like', {

  },function(data) {
    let selector = '#tweet-' + data.id + ' .liked';
    $(selector).html(data.likes);;    
  });
}

function tweetTempl(tweetObj) {
  return "<p id='tweet-"+ tweetObj.id +"'>" + tweetObj.text + "<button onclick='likeTweet("+ tweetObj.id + ")'>Like: <span class='liked'>" + tweetObj.likes + "</span></button></p>";
}

$(document).ready(function(){
  $.get('http://localhost:5000/tweets', {}, function(data) {
    data.items.forEach(function(item) {
      $('#tweetsList').append(tweetTempl(item));
    });
  });
});

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
    // Problem 2: I have a templating problem here.
    $('#tweetsList').prepend(tweetTempl(data));
  })

  // Problem 3: Additional logic leaking in here.
  $('#tweetInput').val('')
})
