var Tweet = Backbone.Model.extend({
  createdAt: function() {
      return this.get('createdAt');
  },
  roomname: function() {
    return this.get('roomname');
  },
  text: function() {
    return this.get('text');
  },
  updatedAt: function() {
    return this.get('updatedAt');
  },
  username: function() {
    return this.get('username');
  },
  idAttribute: 'objectId'
});

var Tweets = Backbone.Collection.extend({
  model: Tweet,
  url: 'https://api.parse.com/1/classes/chatterbox',
  parse: function(response) {
    return response.results;
  }
});
