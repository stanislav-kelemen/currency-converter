import {CurrencyClasses, ExchangeableCurrency} from "./currencyClasses.js";
import {mainCciesURLs, otherCciesURL, extraDataForCciesURL} from './links.js';

'use strict';

/* ccy === currency, ccies === currencies */


/* ---------------------- MAIN HANDLER ---------------------- */

export default async function jsonHandlers() {
  const fetchJSON = fetchJsonOrError.bind(null, document.getElementById('errorMessage'));

  const mainURLs = await Promise.all(mainCciesURLs.map(async url => await fetchJSON(url)));
  const mainCcies = mainCciesHandler(mainURLs);

  const otherCcies = otherCciesHandler(await fetchJSON(otherCciesURL));

  extraDataForCciesHandler(await fetchJSON(extraDataForCciesURL), [mainCcies, otherCcies]);

  return [mainCcies, otherCcies];
}


/* ---------------------- SUB HANDLERS ---------------------- */

function mainCciesHandler(mainCciesArrays) {
  const [nb, cash, cashless] = mainCciesArrays.map(arr => {
    return toCciesObject(arr, [
      {code: 'BTC', action: 'delete'},
      {code: 'RUR', action: 'rename', newCode: 'RUB'}
    ]);
  });

  return Object.fromEntries(
    Object.entries(nb).map(([key, value]) => {
      let ccy = new ExchangeableCurrency(value.buy);

      ccy.addRate(cash[key]);
      ccy.addRateCl(cashless[key])

      return [key, ccy];
    })
  );
}

function otherCciesHandler(otherCciesArray) {
  const otherNb = toCciesObject(otherCciesArray, [
    {code: 'BTC', action: 'delete'},
    {code: 'PLZ', action: 'rename', newCode: 'PLN'}
  ]);

  return Object.fromEntries(
    Object.entries(otherNb).map(([key, value]) => {
      return [key, new CurrencyClasses(value.buy)];
    })
  );
}

function extraDataForCciesHandler(extraData, ccyTypesArr) {
  ccyTypesArr.forEach(ccyType => {
    Object.keys(ccyType).forEach(key => {
      ccyType[key].addNameSign(extraData[key]);
    });
  });
}


/* ------------------- RESPONSE TO OBJECT ------------------- */

function toCciesObject(fetchedArr, fixActions) {
  return Object.fromEntries(
    fetchedArr.reduce((arr, ccyObj) => {
      let deleted = false;
      let code = ccyObj.ccy;

      fixActions.forEach(fixObj => {
        if (fixObj.code === ccyObj.ccy) {
          if (fixObj.action === 'rename') code = fixObj.newCode;
          if (fixObj.action === 'delete') deleted = true;
        }
      });

      return deleted && arr || arr.push([code, ccyObj]) && arr;
    }, [])
  );
}


/* ------------------------- FETCH -------------------------- */


async function fetchJsonOrError(errContainer, url)  {
  try {
    let response = await fetch(url);

    if (response.ok)
      return await response.json();
  } catch (error) {
    errContainer.innerHTML = error;

    throw error;
  }
}