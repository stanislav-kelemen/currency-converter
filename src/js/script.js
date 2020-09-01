import {default as fetchCcies} from './fetch.js'

'use strict';

/* ccy === currency, ccies === currencies */

let mainTable = document.getElementById('mainTable');
let additionalTable = document.getElementById('additionalTable');
const converter = document.querySelector('.converter');

const mainCurrencies = document.querySelector('.mainCurrencies');
const otherCurrencies = document.querySelector('.otherCurrencies');

let stylingObj;

let baseCcy = 'UAH';


fetchCcies().then(function ([mainCcies, otherCcies]) {
  try {
    insertTable(mainCcies, mainTable);
    insertTable(otherCcies, additionalTable);

    selectCcies(mainTable, additionalTable);
  } catch(error) {
    console.log(error);
  }
}).catch(console.log);


function selectCcies (tableMain, tableExtra) {
  document.addEventListener('click', (event) => {
    const target = event.target;

    if (!target.closest('td')) return;

    const cellIndex = target.cellIndex;

    if (cellIndex === 0) {
      if (target.hasAttribute('data-base-currency')) return;

      target.setAttribute('data-base-currency', '');

      let currentTable = target.closest('table');
      let currentRow = target.closest('tr');

      baseCcy = currentRow.cells[1].dataset.code;

      let rowIndex = currentRow.sectionRowIndex;


      [tableMain, tableExtra].forEach(table => {
        Array.from(table.tBodies[0].rows).forEach((row, index) => {
          if (index === rowIndex && table === currentTable) return;
          row.cells[0].removeAttribute('data-base-currency');
        })
      });

    } else if (cellIndex === 1) {
      if (target.hasAttribute('data-selected')) {
        deleteCcy(target);
        return;
      }

      addCcy(target, target.dataset.code, target.dataset.sign, 2);
    } else if (cellIndex > 1 ) {
      let targetRow = target.closest('tr').cells;
      let ccyInRow = targetRow[1];

      if (!ccyInRow.hasAttribute('data-selected')) {
        addCcy(ccyInRow, ccyInRow.dataset.code, ccyInRow.dataset.sign, cellIndex);
        return;
      }

      if (+ccyInRow.dataset.selectedRateCell === cellIndex) {
        deleteCcy(ccyInRow);
        console.log(ccyInRow);
        return;
      }

      setRate(target, targetRow, ccyInRow, cellIndex);
    }
  })

}



function addCcy(clickedElem, code, sign, cellIndex) {
  let buttonsForm = document.querySelector('form[name="currencies"]');

  buttonsForm.insertAdjacentHTML('beforeend', `
    <button type="button" name="${code}" value="${sign}">${sign}</button>
  `);

  stylingObj.highlightCcy(clickedElem);
  clickedElem.setAttribute('data-selected', '');

  const cell = clickedElem.closest('tr').cells[cellIndex];

  clickedElem.dataset.selectedRateCell = cellIndex;

  stylingObj.highlightRate(cell);
}

function deleteCcy(selectedElem) {
  let buttonsForm = document.querySelector('form[name="currencies"]');

  Array.from(buttonsForm.children).some(button => {
    if (button.name === selectedElem.dataset.code) {
      button.remove();
      return true;
    }
  })

  stylingObj.resetStyle(selectedElem);

  let cell = selectedElem.closest('tr').cells[selectedElem.dataset.selectedRateCell];
  stylingObj.resetStyle(cell);

  selectedElem.removeAttribute('data-selected');
  selectedElem.removeAttribute('data-selected-rate-cell');
}

function setRate(rateCell, row, rowCcy, indexCell) {
  let selectedCellInRow = row[rowCcy.dataset.selectedRateCell];
  stylingObj.resetStyle(selectedCellInRow);

  rowCcy.dataset.selectedRateCell = indexCell;

  stylingObj.highlightRate(rateCell);
}


stylingObj = {
  resetStyle(cell)  {
    cell.style.backgroundColor = '';
    cell.style.color = '';

    return cell;
  },

  highlightRate (cell) {
    cell.style.backgroundColor = '#d2872b';
    cell.style.color = 'white';

    return cell;
  },

  highlightCcy(cell) {
    cell.style.backgroundColor = '#3f5b10';
    cell.style.color = 'white';

    return cell;
  }
}


function insertTable(ccies, tableElem) {
  let table = tableElem;
  let tbody = table.tBodies[0];

  Object.entries(ccies).forEach(([code, ccy]) => {
    let tr = document.createElement('tr');

    let html = `<td></td>`;

    if (table.id === 'mainTable') {
      html += `
        <td title="${ccy.name}" data-code="${code}" data-sign="${ccy.sign}">${code} (${ccy.sign})</td>
        <td>${ccy.nb}</td>
        <td>${ccy.buy}</td>
        <td>${ccy.sale}</td>
        <td>${ccy.buyCL}</td>
        <td>${ccy.saleCL}</td>
      `
    }

    if (table.id === 'additionalTable') {
      html += `
        <td title="${ccy.name}"  data-code="${code}" data-sign="${ccy.sign}">${code} (${ccy.sign})</td>
        <td>${ccy.nb}</td>
      `
    }

    tr.insertAdjacentHTML('afterbegin', html);

    tbody.append(tr);
  });

  document.body.style.gridTemplateColumns = `auto ${mainTable.offsetWidth - 2}px auto`;
  converter.style.display = '';
  mainCurrencies.style.display = '';
  otherCurrencies.style.display = '';
}
