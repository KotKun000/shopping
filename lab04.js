let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.totals');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'Gundam Caliban',
        image: '1.PNG',
        price: 590
    },
    {
        id: 2,
        name: 'Gundam Aerial Rebuild',
        image: '2.PNG',
        price: 690
    },
    {
        id: 3,
        name: 'Gundam Aerial',
        image: '3.PNG',
        price: 470
    },
    {
        id: 4,
        name: 'Gundam Unicorn',
        image: '4.PNG',
        price: 5900
    },
    
];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    totals.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
    
}
function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;

    listCards.forEach((value, key) => {
        totalPrice += value.price;
        count += value.quantity;

        if (value != null) {
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
            listCard.appendChild(newDiv);
        }
    });

    if (totalPrice > 1000) {
        // Apply 10% discount
        totalPrice *= 0.9;
    }

    totals.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
$(document).ready(function () {
    const $modal = $(".modal");
    const $modalContent = $(".modal-content");
    const $openShopping = $(".shopping");
    const $closeShopping = $(".closeShopping");

    // Open modal
    $openShopping.click(function () {
        $modal.fadeIn();
        $modalContent.html($(".totals").html());
    });

    // Close modal
    $closeShopping.click(function () {
        $modal.fadeOut();
    });
});

const totals = document.querySelector('.totals');
const totalcontainr = document.querySelector('.totalcontainr');
const closepopup = document.querySelector('.closepopup');

totals.onclick = () => {
    totalcontainr.classList.add('active');
}

closepopup.onclick = () => {
    totalcontainr.classList.remove('active');
}