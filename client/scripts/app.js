// YOUR CODE HERE:

var getMessages = function() {
  $.ajax({
    // always use this url
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    contentType: 'application/json',
    data: {
      limit: 1000,
      order: '-createdAt'
    },
    success: success,
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};

var success = function(data) {
  var $messages = $('.messages');
   $('.message').remove();
  for(var i = data.results.length - 1; i > -1; i--) {
    $messages.append('<div class=message></div>');
    var $message = $('.message:last-child');
    var text = encodeURI(data.results[i].text);
    text = text.replace(/\%20/g, ' ');
    var user = encodeURI(data.results[i].username);
    user = user.replace(/\%20/g, ' ');
    $message.append('<div class="user">'+user+': </div>');
    $message.append('<div class="text">'+text+'</div>');
  }
  console.log(data);
};

var submit = function() {
  var username = $('.userBox').val();
  var text = $('.messageBox').val();
  $('.messageBox').val('');
  var message = {
    'username': username,
    'text': text,
    'roomname': ''
  };
  submitMessage(message);
};

var submitMessage = function(message) {
  debugger;
  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message');
    }
  });
};









setInterval(getMessages, 5000);


