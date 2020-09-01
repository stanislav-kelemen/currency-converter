'use strict';

export class CurrencyClasses {
  constructor(nb) {
    this.nb = nb;
  }

  addNameSign(obj) {
    this.name = obj.name;
    this.sign = obj.symbol;
  }
}

export class ExchangeableCurrency extends CurrencyClasses {
  constructor(nb) {
    super(nb);
  }

  addRate(obj) {
    this.buy = obj.buy;
    this.sale = obj.sale;
  }

  addRateCl(obj) {
    this.buyCL = obj.buy;
    this.saleCL = obj.sale;
  }
}