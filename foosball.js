var scores = new Meteor.Collection('scores');

if (Meteor.isClient) {

  $(document).keyup(function(e) {
    if (e.keyCode == 87) {
      incrementScore(1);
    } else if (e.keyCode == 73) {
      incrementScore(2);
    }
  });

  function incrementScore(team) {
    var doc = scores.findOne({team:team});
    scores.update({_id:doc._id},{$set:{score:doc.score + 1}});
  }

  function getScore(team) {
    var score = scores.findOne({team:team});
    return score ? score.score : 0;
  }

  Template.scores.helpers({
    currentScore: function() {
        return getScore(1) + ' to ' + getScore(2);
    }
  });

  Template.controls.events({
    'click #start': function() {
      Meteor.call('resetScores');
    }
  });
}

if (Meteor.isServer) {
  Meteor.methods({
    'resetScores': function() {
      scores.remove({});
      scores.insert({team:1, score:0});
      scores.insert({team:2, score:0});
    }
  });
}
