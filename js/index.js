// 商品列表 JSON 数据
var carProducts = [
  {
    "id": 1,
    "name": "英雄牌 钢笔",
    "count": 1,
    "price": 69,
    "checked": false
  },
  {
    "id": 2,
    "name": "晨光牌 铅字笔",
    "count": 2,
    "price": 5.5,
    "checked": true
  },
  {
    "id": 3,
    "name": "晨光牌 铅笔",
    "count": 1,
    "price": 2,
    "checked": false
  },
  {
    "id": 4,
    "name": "狗熊牌 橡皮擦",
    "count": 1,
    "price": 1,
    "checked": false
  },
  {
    "id": 5,
    "name": "瑞士牌 双肩书包",
    "count": 1,
    "price": 199,
    "checked": true
  },
  {
    "id": 6,
    "name": "晨光牌 作业本",
    "count": 5,
    "price": 2.5,
    "checked": false
  }
]

var shoppingTable = document.getElementsByClassName("shopping-table")[0];
var shoppingList = document.getElementsByClassName("shopping-list")[0];
var goodCount = document.getElementsByClassName("good-count")[0];
var totalCost = document.getElementsByClassName("total-cost")[0];
var selectAll = document.getElementsByClassName("select-all")[0];
var cellName = ['checked', 'name', 'price', 'count', 'good-cost'];
var isSelectAllChecked = false;

initialList();
updateList();
shoppingTable.addEventListener('click', clickHandle);

function initialList() {
  for (var index = 0; index < carProducts.length; index++) {
    var cellIndex = 0;
    var newRow = createRow(shoppingList);
    var cellQuery = ['checked', 'name', 'price', 'count', 'id'];
    newRow.setAttribute('row-id', carProducts[index]['id']);
    for (var iter = 0, max = Object.getOwnPropertyNames(carProducts[index]).length; iter < max; iter++) {
      cellIndex++;
      var newCell = createCell(newRow);
      fillCell(newCell, cellIndex, carProducts[index][cellQuery[iter]]);
      newCell.setAttribute('class', cellName[iter]);
    }
  }
}

function updateList() {
  setSelectAllCheckStatus();
  setGoodCheckStatus();
  setGoodCost();
  goodCount.textContent = setGoodCount();
  totalCost.textContent = setTotalCost()
}

function clickHandle(event) {
  var currentClass = event.target.getAttribute('class')
    || event.target.parentElement.getAttribute('class')
    || event.target.parentElement.parentElement.getAttribute('class');
  var rowId = event.target.parentElement.getAttribute('row-id')
    || event.target.parentElement.parentElement.getAttribute('row-id')
    || event.target.parentElement.parentElement.parentElement.getAttribute('row-id');
  switch (currentClass) {
    case 'select-all':
      onClickSelectAll();
      break;
    case 'checked':
      onClickGoodChecked(rowId);
      break;
    case 'math-icon':
      onClickMathIcon(rowId, event.target);
      break;
  }
  updateList();
}

function createRow(tbodyNode) {
  var newRow = document.createElement('tr');
  tbodyNode.appendChild(newRow);
  return newRow;
}

function createCell(rowNode) {
  var newCell = document.createElement('td');
  rowNode.appendChild(newCell);
  return newCell;
}

function fillCell(cellNode, index, JSONContent) {
  switch (index) {
    case 1:
      cellNode.appendChild(createCheckBox());
      break;
    case 4:
      cellNode.appendChild(createMinusIcon());
      cellNode.appendChild(createQuantityBox(JSONContent));
      cellNode.appendChild(createPlusIcon());
      break;
    case 5:
      break;
    default:
      cellNode.textContent = JSONContent;
  }
}

function createCheckBox() {
  var checkBox = document.createElement('input');
  checkBox.setAttribute('type', 'checkbox');
  return checkBox;
}

function createMinusIcon() {
  var minusIcon = document.createElement('div');
  minusIcon.textContent = '-';
  minusIcon.setAttribute('class', 'math-icon');
  return minusIcon;
}

function createPlusIcon() {
  var plusIcon = document.createElement('div');
  plusIcon.textContent = '+';
  plusIcon.setAttribute('class', 'math-icon');
  return plusIcon;
}

function createQuantityBox(content) {
  var quantityBox = document.createElement('div');
  quantityBox.textContent = content;
  quantityBox.setAttribute('class', 'quantity-box');
  return quantityBox;
}

function setSelectAllCheckStatus() {
  if (true === isSelectAllChecked) {
    selectAll.setAttribute('checked', 'checked');
  } else {
    selectAll.removeAttribute('checked');
  }
}

function setGoodCheckStatus() {
  var checkBoxEls = document.getElementsByClassName(cellName[0]);
  for (var index = 0; index < checkBoxEls.length; index++) {
    if (true === carProducts[checkBoxEls[index].parentElement.getAttribute("row-id") - 1][cellName[0]]) {
      checkBoxEls[index].firstChild.setAttribute('checked', 'checked');
    } else {
      checkBoxEls[index].firstChild.removeAttribute('checked');
    }
  }
}

function setGoodCost() {
  var rowEls = shoppingList.children;
  for (var index = 0; index < rowEls.length; index++) {
    var rowId = rowEls[index].getAttribute('row-id');
    rowEls[index].getElementsByClassName(cellName[4])[0].textContent =
      carProducts[rowId - 1][cellName[2]] * carProducts[rowId - 1][cellName[3]];
  }
}

function setGoodCount() {
  var rowEls = shoppingList.children;
  var sum = 0;
  for (var index = 0; index < rowEls.length; index++) {
    var rowId = rowEls[index].getAttribute('row-id');
    if (true === carProducts[rowId - 1][cellName[0]]) {
      sum += carProducts[rowId - 1][cellName[3]];
    }
  }
  return sum;
}

function setTotalCost() {
  var goodCostEls = document.getElementsByClassName(cellName[4]);
  var sum = 0;
  for (var index = 0; index < goodCostEls.length; index++) {
    var rowId = goodCostEls[index].parentElement.getAttribute('row-id');
    if (true === carProducts[rowId - 1][cellName[0]]) {
      sum += (+goodCostEls[index].textContent);
    }
  }
  return sum;
}

function onClickSelectAll() {
  if (false === isSelectAllChecked) {
    isSelectAllChecked = true;
  }
  else {
    isSelectAllChecked = false;
  }
  resetGoodCheckBox();
}

function resetGoodCheckBox() {
  var rowEls = shoppingList.children;
  for (var index = 0; index < carProducts.length; index++) {
    carProducts[index][cellName[0]] = isSelectAllChecked;
  }
  var checkBoxEls = document.getElementsByClassName(cellName[0]);
  for (var index = 0; index < checkBoxEls.length; index++) {
    checkBoxEls[index].removeChild(checkBoxEls[index].firstChild);
    checkBoxEls[index].appendChild(createCheckBox());
  }
}

function onClickGoodChecked(rowId, checkBoxEl) {
  if (false === carProducts[rowId - 1][cellName[0]]) {
    carProducts[rowId - 1][cellName[0]] = true;
  } else {
    carProducts[rowId - 1][cellName[0]] = false;
    resetSelectAllCheckBox();
  }
}

function resetSelectAllCheckBox() {
  isSelectAllChecked = false;
  var selectAllParentEl = selectAll.parentElement;
  selectAllParentEl.removeChild(selectAll);
  selectAll = createCheckBox();
  selectAllParentEl.appendChild(selectAll);
  selectAll.setAttribute('class', 'select-all');
}

function onClickMathIcon(rowId, target) {
  if (target.innerHTML === '+') {
    target.parentElement.getElementsByClassName('quantity-box')[0].innerHTML
      = ++carProducts[rowId - 1][cellName[3]];
  } else {
    target.parentElement.getElementsByClassName('quantity-box')[0].innerHTML
      = --carProducts[rowId - 1][cellName[3]];
    if (carProducts[rowId - 1][cellName[3]] <= 0) {
      shoppingList.removeChild(target.parentElement.parentElement);
    }
  }
}