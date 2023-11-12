let name = document.getElementById('name');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let createBtn = document.getElementById('create');
let search = document.getElementById('search');
let searchByNameBtn = document.getElementById('search-by-name');
let searchByCategoryBtn = document.getElementById('search-by-category');
let deleteAllBtn = document.getElementById('delete-all');
let updateBtn = document.getElementById('update');

let mood = 'create';
let searchMood = 'name';
let tmp ;

// get total
price.onkeyup = getTotal;
taxes.onkeyup = getTotal;
ads.onkeyup = getTotal;
discount.onkeyup = getTotal;

function getTotal() {
    if (price.value != '') {
        let result = +price.value - (+price.value * +discount.value / 100) + +taxes.value + +ads.value;
        total.innerHTML = Math.round(result) ;
        total.style.backgroundColor = 'green';
    }
    else {
        total.innerHTML = '';
        total.style.backgroundColor = 'rgb(250, 27, 27)';
    }
}
// creatt product
let productsData;
if (localStorage.product != null) {
    productsData = JSON.parse(localStorage.product);
}
else {
    productsData = [];
}

createBtn.onclick = function () {
    // count
    let newpro = {
        name: name.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        category: category.value.toLowerCase()
    }
    if(taxes.value == ''){
        newpro.taxes = 0;
    }
    if (ads.value == ''){
        newpro.ads = 0;
    }
    if (discount.value == ''){
        newpro.discount = 0;
    }
    if(name.value != '' && price.value != '' && category.value != '' && count.value < 100 ){
        if(mood == 'create'){
            if(count.value > 1){
                for(let i = 0 ; i<count.value ; i++ ){
                productsData.push(newpro);
            }
            }
            else{
                productsData.push(newpro);
            }
        }
        else{
            productsData[tmp] = newpro;
            mood = 'create';
            createBtn.innerHTML = 'Create';
            count.style.display = 'block';
        }
        // save localstorage
        localStorage.setItem('product', JSON.stringify(productsData));
        // clear inputs
        name.value = '';
        price.value = '';
        taxes.value = '';
        ads.value = '';
        discount.value = '';
        total.innerHTML = '';
        count.value = '';
        category.value = '';
        total.style.backgroundColor = 'rgb(250, 27, 27)';
    }
    showData()
}
// read

function showData() {
    let table = '';
    let tbody = document.getElementById('tbody');
    for (let i = 0; i < productsData.length; i++) {
        table += `
        <tr>
        <td>${i+1}</td>
        <td>${productsData[i].name}</td>
        <td>${productsData[i].price}</td>
        <td>${productsData[i].taxes}</td>
        <td>${productsData[i].ads}</td>
        <td>${productsData[i].discount} %</td>
        <td>${productsData[i].total}</td>
        <td>${productsData[i].category}</td>
        <td><button type="button" onclick="updatePro(${i})" id="update">Update</button></td>
        <td><button type="button" onclick="deletePro(${i})" id="delete">Delete</button></td>
        </tr>
        `
    }
    tbody.innerHTML = table;
    if(productsData.length == 0 ){
        deleteAllBtn.style.display = 'none';
    }
    else{
        deleteAllBtn.style.display = 'block';
    }
    deleteAllBtn.innerHTML = `Delete All (${productsData.length})`;
}
showData()
// delete
function deletePro(i) {
    productsData.splice(i,1);
    localStorage.product = JSON.stringify(productsData);
    showData()
}
function deleteAll(){
    productsData.splice(0);
    localStorage.clear();
    showData();
}
// update
function updatePro(i){
    name.value = productsData[i].name  ;
    price.value = productsData[i].price  ;
    taxes.value = productsData[i].taxes  ;
    ads.value = productsData[i].ads  ;
    discount.value = productsData[i].discount  ;
    category.value = productsData[i].category  ;
    getTotal()
    count.style.display = 'none';
    createBtn.innerHTML = 'Update';
    mood = 'update';
    tmp = i ;
    scroll({
        top : 0 ,
        behavior: "smooth"
    })
}
// search
function getSearchMood(id){
    if(id == 'search-by-name'){
        searchMood = 'name';

    }else{
        searchMood = 'category';
    }
    search.placeholder = 'search by '+ searchMood;
    search.value = '';
    search.focus()
    showData();
}
function searchData(value){
    let table = '';
    for(let i = 0 ; i < productsData.length ; i++){
        if(searchMood == 'name'){
            if(productsData[i].name.includes(value.toLowerCase()))
            {
            table += `
        <tr>
        <td>${i+1}</td>
        <td>${productsData[i].name}</td>
        <td>${productsData[i].price}</td>
        <td>${productsData[i].taxes}</td>
        <td>${productsData[i].ads}</td>
        <td>${productsData[i].discount} %</td>
        <td>${productsData[i].total}</td>
        <td>${productsData[i].category}</td>
        <td><button type="button" onclick="updatePro(${i})" id="update">Update</button></td>
        <td><button type="button" onclick="deletePro(${i})" id="delete">Delete</button></td>
        </tr>
        `
        }
        }else{
            if(productsData[i].category.includes(value.toLowerCase()))
            {
            table += `
        <tr>
        <td>${i+1}</td>
        <td>${productsData[i].name}</td>
        <td>${productsData[i].price}</td>
        <td>${productsData[i].taxes}</td>
        <td>${productsData[i].ads}</td>
        <td>${productsData[i].discount} %</td>
        <td>${productsData[i].total}</td>
        <td>${productsData[i].category}</td>
        <td><button type="button" onclick="updatePro(${i})" id="update">Update</button></td>
        <td><button type="button" onclick="deletePro(${i})" id="delete">Delete</button></td>
        </tr>
        `
        }
    }
    tbody.innerHTML = table;
}
}
// clean data