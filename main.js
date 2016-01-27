var notifier = require('node-notifier');
var q = require('q');
var request = require( 'request' );

var matchId;//India's match Id.
request('http://cricscore-api.appspot.com/csa', function (error, response, body) {
  var matchIds = JSON.parse( body ); // all matches Ids
  matchIds.forEach( function( val ) {
    if( val.t2 == 'India' || val.t1 == 'India' ) {
      matchId = val['id'];
    }
  });
  // console.log( matchId );return false;
  cricInterval( matchId );

});
function cricInterval( ) {
  setInterval( function() {
    getCricScore()
      .then( function( data ) {
        notifier.notify({
          'title': 'Match score',
          'message': data
        });

      })  
  }, 10000) 
}



function getCricScore() {
  var d = q.defer();
  console.log( matchId );
  request('http://cricscore-api.appspot.com/csa?id=' + matchId, function( err, response, body ) {
    // console.log( response );
    // console.log( body );
    var matchScore = JSON.parse( body );
    console.log( matchScore[0]['de'] );
    d.resolve( matchScore[0]['de'] );
  })
  return d.promise;
}


var express = require('express');
var app = express();

app.listen( 3000, function() {
  console.log('listening on port 3000');
})

