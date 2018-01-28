const poker = require('./poker.js');
const defaultData = "poker-hands.txt"
var command = process.argv[2];

var content;
var playerOneScore = 0,
  playerTwoScore = 0;
const fs = require('fs');
var filename;

if (command) {
  filename = command;
} else {

  filename = "./" + defaultData;
}

var input = fs.createReadStream(filename);
readLines(input, func);

function readLines(input, func) {
  var remaining = '';
  input.on('data', function(data) {
    remaining += data;
    var index = remaining.indexOf('\n');
    while (index > -1) {
      var line = remaining.substring(0, index);
      remaining = remaining.substring(index + 1);
      func(line);
      index = remaining.indexOf('\n');
    }
  });

  input.on('end', function() {
    if (remaining.length > 0) {
      func(remaining);
    }
    console.log("Player 1: ", playerOneScore);
    console.log("Player 2: ", playerTwoScore);
  });


}

function func(data) {
  var PlayerOneHand = data.substring(0, 14);
  var PlayerTwoHand = data.substring(15, 29);
  var cardsOne = new poker.PokerHand(createArray(PlayerOneHand));
  var cardsTwo = new poker.PokerHand(createArray(PlayerTwoHand));

  if (cardsOne.rank > cardsTwo.rank) {
    //console.log('player 1 wins');
    playerOneScore++;
  } else if (cardsOne.rank < cardsTwo.rank) {
    //console.log('player 2 wins');
    playerTwoScore++;
  } else if (cardsOne.rank == cardsTwo.rank && cardsOne.rank == 1) {
    for (var i = 4; i > -1; i--) {
      if (cardsOne.cards[i].rank > cardsTwo.cards[i].rank) {
        //console.log('player 1 wins');
        playerOneScore++;
        i = -1;
      } else if (cardsOne.cards[i].rank < cardsTwo.cards[i].rank) {
        //console.log('player 2 wins');
        playerTwoScore++;
        i = -1;
      }
    }


  } else {
    if (cardsOne.highestcard > cardsTwo.highestcard) {
      //console.log('player 1 wins');
      playerOneScore++;

    } else if (cardsOne.highestcard < cardsTwo.highestcard) {
      //console.log('player 2 wins');
      playerTwoScore++;

    } else { //tie
      for (var i = 4; i > -1; i--) {
        if (cardsOne.cards[i].rank > cardsTwo.cards[i].rank) {
          //console.log('player 1 wins');
          playerOneScore++;
          i = -1;
        } else if (cardsOne.cards[i].rank < cardsTwo.cards[i].rank) {
          //console.log('player 2 wins');
          playerTwoScore++;
          i = -1;
        }
      }
    }
  }
}

function createArray(strCards) {
  var arr = [];
  var index = strCards.length;
  while (index > 0) {
    arr.push(strCards.substring(0, 2));
    strCards = strCards.substring(3, index);
    index = strCards.length;
  }
  return arr
}
