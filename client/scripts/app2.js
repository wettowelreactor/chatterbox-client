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
  idAttribute: 'objectId',
  parse: function(response) {
    response.username = response.username || null;
    response.roomname = response.roomname || null;
    response.text = response.text || null;
    return response;
  }
});

var TweetView = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.model, "change", this.render);
  },
  template: _.template('<div class="message"><div class="user"><%- username %></div><div class="text"><%- text %></div><div><%- createdAt %></div></div>'),
  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this.$el;
  }
});

var Tweets = Backbone.Collection.extend({
  model: Tweet,
  url: 'https://api.parse.com/1/classes/chatterbox',
  parse: function(response) {
    return response.results;
  }
});

var TweetsView = Backbone.View.extend({
  className: 'messages',
  initialize: function() {
    this.listenTo(this.collection, 'change', this.render);
    this.listenTo(this.collection, 'fetch', this.render);
    this.listenTo(this.collection, 'sync', this.render);
  },
  render: function() {
    this.$el.prepend(
      this.collection.map(function(tweet) {
        var tweetView = new TweetView({model: tweet});
        return tweetView.render().html();
      })
    );
    return this.$el;
  }
});
var tweets = new Tweets();
var tweetsView = new TweetsView({collection: tweets});


setInterval(function(){
  tweets.fetch({data: {
      limit: 50,
      order: '-createdAt'
    }});
}, 1000);

$(function(){
  $('body').append(tweetsView.render());
});
