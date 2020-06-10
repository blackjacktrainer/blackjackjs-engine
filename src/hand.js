const GameObject = require('./game-object');
const Utils = require('./utils');

module.exports = class Hand extends GameObject {
  constructor(cards = []) {
    super();
    this.cards = cards;
  }

  takeCard(card) {
    this.cards.push(card);
    this.emit('change');
  }

  removeCards() {
    const cards = this.cards.slice();
    this.cards = [];
    this.emit('change');
    return cards;
  }

  get visibleCards() {
    return this.cards.filter((c) => c.visible);
  }

  get busted() {
    return this.cardTotal > 21;
  }

  get blackjack() {
    return this.cards.length === 2 && this.cardTotal === 21;
  }

  get cardTotal() {
    let total = Utils.arraySum(this.visibleCards.map((c) => c.value));
    let acesCount = this.cards.filter((c) => c.rank === 'A').length;

    // Aces can count as 1 or 11. Assume the smaller value until we run out of
    // aces or the total goes below 22.
    while (total > 21 && acesCount > 0) {
      total -= 10;
      acesCount -= 1;
    }

    return total;
  }

  get hasPairs() {
    return this.cards.length === 2 && this.cards[0].rank === this.cards[1].rank;
  }
};