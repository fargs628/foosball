var scores = new Meteor.Collection('scores');

if (Meteor.isClient) {

  $(document).keyup(function(e) {
    if (e.keyCode == 87) {
      var doc = scores.findOne({team:1});
      scores.update({_id:doc._id},{$set:{score:doc.score + 1}});
    } else if (e.keyCode == 73) {
      var doc = scores.findOne({team:2});
      scores.update({_id:doc._id},{$set:{score:doc.score + 1}});
    }
  });

  Template.scores.helpers({
    currentScore: function() {
      if (scores.find().count() > 0) {
        var scoreOne = scores.findOne({team:1}).score;
        var scoreTwo = scores.findOne({team:2}).score;
        return scoreOne + ' to ' + scoreTwo;
      } else {
        return 'Start a game!';
      }
    }
  });
}
