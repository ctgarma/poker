const values = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
var pairs = 0;
var threes = 0;
var fours = 0;
var highestCard = 0;
var compare = new Array(13);
const _ = require("lodash");


function PokerHand(cards1) {
  this.cards = createhand(cards1);
  PairThreeFours(this.cards);
  if (isRoyalFlush(this.cards)) {
    //console.log('rank:royal flush ', 10, ' highest card :', highestCard);
    this.rank = 10;
    this.highestcard = highestCard;
  } else if (isStraightFlushes(this.cards)) {
    //console.log('rank: straigh flushes ', 9, ' highest card :', highestCard);
    this.rank = 9;
    this.highestcard = highestCard;
  } else if (isFourOfaKind(this.cards)) {
    //console.log('rank: four of a kind ', 8, ' highest card :', highestCard);
    this.rank = 8;
    this.highestcard = highestCard;
  } else if (isFullhouse()) {
    //console.log('rank: full house ', 7, ' highest card :', highestCard);
    this.rank = 7;
    this.highestcard = highestCard;
  } else if (isFlushes(this.cards)) {
    //console.log('rank: flashes ', 6, ' highest card :', highestCard);
    this.rank = 6;
    this.highestcard = highestCard;
  } else if (isStraight(this.cards)) {
    //console.log('rank: straight ', 5, ' highest card :', highestCard);
    this.rank = 5;
    this.highestcard = highestCard;
  } else if (isThreeOfaKind()) {
    //console.log('rank: 3 of a kind ', 4, ' highest card :', highestCard);
    this.rank = 4;
    this.highestcard = highestCard;
  } else if (isTwoPairs()) {
    //console.log('rank: 2 pairs ', 3, ' highest card :', highestCard);
    this.rank = 3;
    this.highestcard = highestCard;
  } else if (isPair()) {
    //console.log('rank: 1 pair ', 2, ' highest card :', highestCard);
    this.rank = 2;
    this.highestcard = highestCard;
  } else {
    HighCardValue(this.cards);
    //console.log('rank: highest card ', 1, ' highest card :', highestCard);
    this.rank = 1;
    this.highestcard = highestCard;
  }
}



function createhand(cards1) {
  hand = [];
  cards1.forEach((card) => {
    hand.push({
      suit: card[card.length - 1],
      rank: values.indexOf(card[0]) + 1,
      info: card
    });
  });
  hand = _.orderBy(hand, ['rank']);
  return hand;
}

function isRoyalFlush(newHand) {
  //var newHand = createhand(cards1);
  if (isFlushes(newHand) && (newHand[0].rank + newHand[1].rank + newHand[2].rank + newHand[3].rank + newHand[4].rank) == 55) {
    highestCard = 13;
    return true;
  } else {
    return false;
  }
}

function isStraight(newHand) {
  //var newHand = createhand(cards1);
  var highestCard = newHand[4].rank;
  for (i = 0; i < 4; i++) {
    var diff = newHand[i].rank - newHand[i + 1].rank;
    if (diff != -1) {
      return false;
    }
  }
  return true;
}

function HighCardValue(newHand) {
  //var newHand = createhand(cards1);
  highestCard = newHand[4].rank;
}

function isFlushes(newHand) {
  //var newHand = createhand(cards1);
  highestCard = newHand[4].rank;
  var suits = _.map(newHand, 'suit');
  return _.uniq(suits).length === 1;
}

function isFullhouse() {
  if (pairs == 1 && threes == 1) {
    highestCard = compare.indexOf(3) + 1;
    return true;
  } else {
    return false;
  }
}

function isThreeOfaKind() {
  if (threes == 1) {
    highestCard = compare.indexOf(3) + 1;
    return true;
  } else {
    return false;
  }
}


function isFourOfaKind() {
  if (fours == 1) {
    highestCard = compare.indexOf(4) + 1;
    return true;
  } else {
    return false;
  }
}

function isPair() {
  if (pairs == 1) {
    highestCard = compare.indexOf(2) + 1;
    return true;
  } else {
    return false;
  }
}

function isTwoPairs() {
  if (pairs == 2) {
    highestCard = compare.lastIndexOf(2) + 1;
    return true;
  } else {
    return false;
  }
}

function isStraightFlushes(newHand) {
  if (isFlushes(newHand) && isStraight(newHand)) {
    return true;
  } else {
    return false;
  }
}

function PairThreeFours(newHand) {
  pairs = 0;
  fours = 0;
  threes = 0;
  //var newHand = createhand(cards1);
  compare.fill(0);
  //console.log(newHand);
  for (var i = 0; i < 5; i++) {
    compare[newHand[i].rank - 1 % 13]++;
  }

  compare.forEach((item) => {
    if (item == 2) {
      pairs++;
    }
    if (item == 3) {
      threes++;
    }
    if (item == 4) {
      fours++;
    }
  });

}


module.exports.PokerHand = PokerHand;
