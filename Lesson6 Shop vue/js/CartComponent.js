Vue.component('cart', {
    props: ['cartProducts', 'visibility'],
    template: `
        <div class="cart-block" v-show="visibility">
            <cart-item v-for="item of cartProducts" 
                :key="item.id_product" 
                :cart-item="item">
            </cart-item>
        </div>`
});

Vue.component('cart-item', {
    props: ['cartItem'],
    template: `
    <div class="cart-item">
        <div class="product-bio">
            <div class="product-title">{{ cartItem.product_name }}</div>
            <div class="product-quantity">Quantity: {{ cartItem.quantity }}</div>
            <div class="product-single-price">$ {{ cartItem.price }} each</div>
        </div>
        
        <div class="right-block">
            <div class="product-price">{{cartItem.quantity*cartItem.price}}</div>
            <button class="del-btn" @click="$root.remove(cartItem)">&times;</button>
        </div>
    </div>`
})