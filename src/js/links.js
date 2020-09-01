'use strict';

/* ccy === currency, ccies === currencies */


// USD, EUR, RUB National Bank rates
const mainCciesNbURL = 'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=3';
// USD, EUR, RUB cash rates
const mainCciesURL = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';
// USD, EUR, RUB cashless rates
const mainCciesClURL = 'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11';


export const mainCciesURLs = [mainCciesNbURL, mainCciesURL, mainCciesClURL];

//  other currencies National Bank rates
export const otherCciesURL = 'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=4';

// json with names and symbols for currencies
export const extraDataForCciesURL = 'src/json/currenciesData.json';

