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
var cellQuery = ['checked', 'name', 'price', 'count', 'id'];
var isSelectAllChecked = false;

for (var index = 0; index < carProducts.length; index++) {
  // var newRow = createRow('shopping-list');
  var cellIndex = 0;
  var newRow = createRow(shoppingList);
  newRow.setAttribute('row-id', carProducts[index]['id']);
  for (var iter = 0, max = Object.getOwnPropertyNames(carProducts[index]).length; iter < max; iter++) {
    cellIndex++;
    var newCell = createCell(newRow);
    fillCell(newCell, cellIndex, carProducts[index][cellQuery[iter]]);
    // newCell.setAttribute('class', carProducts[index]['id']+' '+cellName[iter]);
    newCell.setAttribute('class', cellName[iter]);
  }
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
  // var quantityCell = document.createElement('div');
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
  if (isSelectAllChecked === true) {
    selectAll.setAttribute('checked', 'checked');
  }
  else {
    selectAll.removeAttribute('checked');
  }
}

function setGoodCheckStatus() {
  var checkBoxEls = document.getElementsByClassName(cellQuery[0]);
  for (var ind = 0; ind < checkBoxEls.length; ind++) {
    // console.log(carProducts[checkBoxEls[ind].parentElement.getAttribute("row-id")-1]["checked"]);
    if (carProducts[checkBoxEls[ind].parentElement.getAttribute("row-id") - 1]["checked"] === true) {
      checkBoxEls[ind].firstChild.setAttribute('checked', 'checked');
    }
    else {
      checkBoxEls[ind].firstChild.removeAttribute('checked');
    }
  }
}

function setItemCost() {
  var rowEls = shoppingList.children;
  for (var index = 0; index < rowEls.length; index++) {
    var rowId = rowEls[index].getAttribute('row-id');
    rowEls[index].getElementsByClassName(cellName[4])[0].textContent =
      carProducts[rowId - 1][cellQuery[2]] * carProducts[rowId - 1][cellQuery[3]];
  }
}

function setGoodCost() {
  var rowEls = shoppingList.children;
  for (var index = 0; index < rowEls.length; index++) {
    var rowId = rowEls[index].getAttribute('row-id');
    rowEls[index].getElementsByClassName(cellName[4])[0].textContent =
      carProducts[rowId - 1][cellQuery[2]] * carProducts[rowId - 1][cellQuery[3]];
  }
}

function setGoodCount() {
  var rowEls = shoppingList.children;
  var sum = 0;
  for (var index = 0; index < rowEls.length; index++) {
    var rowId = rowEls[index].getAttribute('row-id');
    if (carProducts[rowId - 1][cellQuery[0]] === true) {
      sum += carProducts[rowId - 1][cellQuery[3]];
    }
  }
  goodCount.textContent = sum;
}

function setTotalCost() {
  var goodCostEls = document.getElementsByClassName(cellName[4]);
  var sum = 0;
  for (var index = 0; index < goodCostEls.length; index++) {
    var rowId = goodCostEls[index].parentElement.getAttribute('row-id');
    if (carProducts[rowId - 1][cellQuery[0]] === true) {
      sum += (+goodCostEls[index].textContent);
    }
  }
  totalCost.textContent = sum;
}

function updateList() {
  setSelectAllCheckStatus();
  setGoodCheckStatus();
  setGoodCost();
  setTotalCost()
  setGoodCount();
}

updateList();
shoppingTable.addEventListener('click',clickHandle);
function clickHandle(event) {
  var currentClass = event.target.getAttribute('class')
    || event.target.parentElement.getAttribute('class')
    || event.target.parentElement.parentElement.getAttribute('class');
  var rowId = event.target.parentElement.getAttribute('row-id')
    || event.target.parentElement.parentElement.getAttribute('row-id')
    || event.target.parentElement.parentElement.parentElement.getAttribute('row-id');
  console.log(event.target);
    console.log(currentClass);
  console.log(rowId);
  switch (currentClass) {
    case 'select-all':
      onClickSelectAll();
      break;
    case 'checked':
      onClickGoodChecked(rowId);
      break;
    case 'math-icon':
      onClickMathIcon(event.target.innerHTML,rowId,event.target);
      break;
  }
  updateList();
}

function onClickSelectAll() {
  if (isSelectAllChecked === false) {
    isSelectAllChecked = true;
  }
  else {
    isSelectAllChecked = false;
  }
  var rowEls = shoppingList.children;
  for (var index = 0; index < rowEls.length; index++) {
    carProducts[index][cellName[0]] = isSelectAllChecked;
    
  }
  var checkBoxEls=document.getElementsByClassName(cellName[0]);
  for (var index = 0; index < checkBoxEls.length; index++) {
    checkBoxEls[index].removeChild(checkBoxEls[index].firstChild);
    checkBoxEls[index].appendChild(createCheckBox());
  }
}

function onClickGoodChecked(rowId, checkBoxEl) {
  if (carProducts[rowId - 1][cellName[0]] === false) {
    carProducts[rowId - 1][cellName[0]] = true;
  } else {
    carProducts[rowId - 1][cellName[0]] = false;
    renewSelectAllCheckBox();
  }
}

function renewSelectAllCheckBox(){
  isSelectAllChecked = false;
  var selectAllParentEl = selectAll.parentElement;
  selectAllParentEl.removeChild(selectAll);
  selectAll = createCheckBox();
  selectAllParentEl.appendChild(selectAll);
  selectAll.setAttribute('class', 'select-all');
}

function onClickMathIcon(operator,rowId,target){
  if (operator === '+'){
    event.target.parentElement.getElementsByClassName('quantity-box')[0].innerHTML=++carProducts[rowId - 1][cellName[3]];
  } else{
    event.target.parentElement.getElementsByClassName('quantity-box')[0].innerHTML=--carProducts[rowId - 1][cellName[3]];
    if (carProducts[rowId - 1][cellName[3]] <= 0)
    {
      shoppingList.removeChild(target.parentElement.parentElement)
    }
  }
}
//删除商品时要取消选中