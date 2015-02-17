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
    var room = encodeURI(data.results[i].roomname);
    $messages.append('<div class="message well ' + room + '"></div>');
    var $message = $('.message:last-child');
    var text = encodeURI(data.results[i].text);
    text = text.replace(/\%20/g, ' ');
    var user = encodeURI(data.results[i].username);
    user = user.replace(/\%20/g, ' ');
    $message.append('<div class="user">'+user+': </div>');
    $message.append('<div class="text">'+text+'</div>');
  }
  filterByRoom();
  debouncedPopulateRooms(data.results);

};

var populateRooms = function(results) {
  $('option').remove();
  var allRooms = _.pluck(results, 'roomname');
  allRooms.sort();
  allRooms = _.uniq(allRooms);
  for(var i = 0; i < allRooms.length; i++) {
   var room = encodeURI(allRooms[i]);
   room = room.replace(/\%20/g, ' ');
   $('select').append('<option value=' + room + '>' + room + '</option>');
  }
};

var debouncedPopulateRooms = _.debounce(populateRooms, 10 * 1000, true);


var submit = function() {
  var username = $('.userBox').val();
  var text = $('.messageBox').val();
  $('.messageBox').val('');
  var room = $('select').val();
  if (room === null) {
    room = '';
  }
  var message = {
    'username': username,
    'text': text,
    'roomname': room
  };
  submitMessage(message);
};

var submitMessage = function(message) {
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

var filterByRoom = function() {
  var roomVal =  $('select').val();
  $('.message').show();
  if(roomVal) {
    $('.message').not('.' + roomVal).hide();
  }
}








setInterval(getMessages, 1000);


