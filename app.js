let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mood = "create";
let ptr;
// get total---------------------------

function getTotal() {
  if (price.value != "") {
    let result = (+price.value + +taxes.value + +ads.value) - discount.value;
    total.innerHTML = result;

    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "#a00d02";
  }
}

//-------------------------- create product---------------------------
let datePro;
if (localStorage.product != null) {
  datePro = JSON.parse(localStorage.product);
} else {
  datePro = [];
}

submit.onclick = function () {
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  // save localStorage**********************
  // count
  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    count.value < 100
    // ads.value != "" &&
  ) {
    if (mood === "create") {
      if (newPro.count > 1) {
        for (let i = 1; i <= newPro.count; i++) {
          datePro.push(newPro);
        }
      } else {
        datePro.push(newPro);
      }
      localStorage.setItem("product", JSON.stringify(datePro));
    } else {
      datePro[ptr] = newPro;
      mood = "create";
      submit.innerHTML = "Create";
      count.style.display = "block";
      clearData();
    }
  }

  showData();
};

// clear inputs----------

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  count.value = "";
  total.innerHTML = "";
  category.value = "";
}

// read----------------------

function showData() {
  let table = "";
  for (let i = 0; i < datePro.length; i++) {
    table += `<tr>
        <td>${i + 1}</td>
        <td>${datePro[i].title}</td>
        <td>${datePro[i].price}</td>
        <td>${datePro[i].taxes}</td>
        <td>${datePro[i].ads}</td>
        <td>${datePro[i].discount}</td>
        <td>${datePro[i].total.innerHTML}</td>
        <td>${datePro[i].count}</td>
        <td>${datePro[i].category}</td>

        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteItems(${i})" id="delete">delete</button></td>
      </tr>`;
    getTotal();
  }
  document.getElementById("tbody").innerHTML = table;
  let btnDelete = document.getElementById("deleteAll");
  if (datePro.length > 0) {
    btnDelete.innerHTML = `<button onclick="DeleteAll()">delete All (${datePro.length})</button>`;
  } else {
    btnDelete.innerHTML = "";
  }
}
showData();

// delete*************************
function deleteItems(i) {
  datePro.splice(i, 1);
  localStorage.product = JSON.stringify(datePro);
  showData();
}
function DeleteAll() {
  localStorage.clear();
  datePro.splice(0);
  showData();
}
// update-----------------------

function updateData(i) {
  title.value = datePro[i].title;
  price.value = datePro[i].price;
  taxes.value = datePro[i].taxes;
  ads.value = datePro[i].ads;
  discount.value = datePro[i].discount;
  category.value = datePro[i].category;
  getTotal();
  count.style.display = "none";
  submit.innerHTML = "update";
  mood = "Update";
  ptr = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// search
let Search = document.getElementById("search");
let searchMood = "title";
function getSearch(id) {
  if (id == "searchTitle") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  Search.placeholder = "Search by " + searchMood;
  Search.focus();
  Search.value = "";
  showData();
}

function searchData(value) {
  let table = "";
  if (searchMood == "title") {
    for (let i = 0; i < datePro.length; i++) {
      if (datePro[i].title.includes(value.toLowerCase())) {
        table += `<tr>
        <td>${i}</td>
        <td>${datePro[i].title}</td>
        <td>${datePro[i].price}</td>
        <td>${datePro[i].taxes}</td>
        <td>${datePro[i].ads}</td>
        <td>${datePro[i].discount}</td>
        <td>${datePro[i].total.innerHTML}</td>
        <td>${datePro[i].count}</td>
        <td>${datePro[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteItems(${i})" id="delete">delete</button></td>
      </tr>`;
      }
    }
  } else {
    for (let i = 0; i < datePro.length; i++) {
      if (datePro[i].category.includes(value.toLowerCase())) {
        table += `<tr>
        <td>${i}</td>
        <td>${datePro[i].title}</td>
        <td>${datePro[i].price}</td>
        <td>${datePro[i].taxes}</td>
        <td>${datePro[i].ads}</td>
        <td>${datePro[i].discount}</td>
        <td>${datePro[i].total.innerHTML}</td>
        <td>${datePro[i].count}</td>
        <td>${datePro[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteItems(${i})" id="delete">delete</button></td>
      </tr>`;
      }
    }
  }

  document.getElementById("tbody").innerHTML = table;
}

// clean data
