const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        filterField: '',
        cartProducts: [],
        filteredProducts: [],
        products: [],

        catalogUrl: '/catalogData.json',
        cartUrl: '/getBasket.json',
        img: 'https://via.placeholder.com/200x150',

        showCart: false,
        error: false
    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => console.log(error))
        },

        addToCart(item){
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if(data.result === 1){
                       let find = this.cartProducts.find(el => el.id_product === item.id_product);
                       if(find){
                           find.quantity++;
                       } else {
                           const prod = Object.assign({quantity: 1}, item);в
                           this.cartProducts.push(prod)
                       }
                    }
                })
        },

        removeFromCart(item){
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if(item.quantity>1){
                            item.quantity--;
                        } else {
                            this.cartProducts.splice(this.cartProducts.indexOf(item), 1);
                        }
                    }
                })
        },
        
        filter(){
            let regexp = new RegExp(this.filterField, 'i');
            this.filteredProducts =  this.products.filter(el => regexp.test(el.product_name));
        },
    },
    
    mounted(){
        this.getJson(`${API + this.cartUrl}`)
            .then(products => {
                for (let product of products.contents){
                    this.cartProducts.push(product);
                }
            });

        this.getJson(`${API + this.catalogUrl}`)
            .then(products => {
                for (let product of products){
                    this.$data.products.push(product);
                    this.$data.filteredProducts.push(product);
                }
            });

    }

});