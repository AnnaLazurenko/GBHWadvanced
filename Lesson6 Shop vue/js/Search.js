Vue.component('search', {
    data() {
        return {
            filterField: ''
          }
    },
    template: `<form action="#" class="search-form" @submit.prevent="$parent.filter">
    <input type="text" class="search-field" v-model="$parent.filterField">
    <button type="submit" class="btn-search">
        <i class="fas fa-search"></i>
    </button>
</form>`
})