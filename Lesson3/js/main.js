const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class Cart {
    constructor(container = '.cart_items') {
        this.container = container;
        this.products = [];
       
        this.fetchCart()
            .then(result => {
                this.products = [...result.contents];
                this.render()
            });
    }

    fetchCart() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
    }

    getSum() {
        return this.products.reduce((s, item) => s += item.price, 0);
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.products) {
            const item = new CartItem(product);  
            block.insertAdjacentHTML('beforeend', item.render());
        }

        let sum = this.getSum();
        block.insertAdjacentHTML('beforeend', `Общая сумма товаров корзины: ${sum}`);

    }

    
}

class CartItem {
    constructor(item) {
        this.id = item.id_product;
        this.name = item.product_name;
        this.price = item.price;
        this.quantity = item.quantity;
    }
    render() {
        return `<div class="cart_item" data-id="${this.id}">
                <h3 class="name">${this.name}</h3>
                <div class="cart_item_price">
                <span class="price">$${this.price} x ${this.quantity}</span>
                <span class="price">$${this.quantity * this.price}</span>
                </div>
                <hr>
            </div>`
    }
}

class ProductsList {
    constructor(container = '.products'){
        this.container = container;
        this.goods = [];
        this._getProducts()
            .then(data => { 
                 this.goods = data;
                 this.render()
            });
    }

    _getProducts(){
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
       
    }
    calcSum(){
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render(){
        const block = document.querySelector(this.container);
        for (let product of this.goods){
            const productObj = new ProductItem(product);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
    }
}


class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150'){
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    render(){
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}

let list = new ProductsList();
let cart = new Cart();


