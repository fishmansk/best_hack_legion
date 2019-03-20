const Admin = {
  template:'<main-app><admin-app></admin-app></main-app>',
}

const Menu = {
  template:`<main-app><menu-app></menu-app></main-app>

  `,
}

const NotFound = {
   template: '<p>страница не найдена!</p>'
}
const Product = {
   template: `  <main-app ><product-app></product-app></main-app>

`
}
const Korzina = {
   template: `
    <main-app><cart-app></cart-app></main-app>
   `
}

var BH_cart_items = [];
var global = this;
Vue.component('main-app', {
  data: function(){
    return {
        drawer: false,
        cart_items: [],
        canteens: [
          // {
          //   "id": "1",
          //   "name": "Canteen 1",
          //   "description": "description",
          // }
        ],
        
    }
  },
  computed: {
    
    cart_size: function (){
      return this.$store.state.cart_items.length;
    }
  },
  created: function(){
    var self = this;
    canteens_load_handler = function(data){
      console.log(data)
      // for (i in data){
        // self.canteens.push(data[0])
      // }
      self.canteens = data
    }
    get_canteens(canteens_load_handler)
  },
  methods: {
    show_snackbar: function(info){
      this.snackbar_message =  info.bpm.toString() +"+  " + info.message;
      this.snackbar_is_visible = true;
    },

    hide_snackbar: function (){

    },
    add_dish_to_cart: function(data) {
      for (var i = 0; i < data.count; i++){
        var item = Object.assign({}, data)
        delete item.count;
        this.cart_items.push(item);
      }
      console.log(this.cart_items)
      // this.cart_items.push(data)
    },
    go_to: function(path){
      app1.currentRoute = path
    },
    change_location: function(path){
        location.pathname = path
    },
    change_canteen_id: function(id){
      this.$store.commit('set_canteen_id', id)
      console.log(this.$store.state.canteen_id)
    }
  },
  template: `
  <v-app id="inspire" dark>
    <!-- START - Меню навигации (отображение списка столовых) -->
    <v-navigation-drawer clipped fixed v-model="drawer" app>
      <v-list>
        <div class="" style="height:50px; display: flex; align-items: center;">
          <span>&nbsp&nbspСписок столовых:</span>
        </div>
        <v-divider></v-divider>
        <div class="" style="height:20px"></div>
        <div v-for="canteen in canteens">
          <v-list-tile @click="change_canteen_id(canteen.id); go_to('/menu');">
            <v-list-tile-action>
              <v-icon>business</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title> {{ canteen.name }}</v-list-tile-title>
              
            </v-list-tile-content>
          </v-list-tile>
          <v-card-text style="background-color:#00000011; margin-left: 10px;">{{ canteen.description }}</v-card-text>
        </div>
        

      </v-list>
      <!-- END - список столовых -->
    </v-navigation-drawer>

      <!-- START - TOOLBAR(header) -->
      <v-toolbar app fixed clipped-left>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-layout row wrap align-self-center>
          <v-layout row wrap>

            <v-flex md1 xs4 align-self-center>
              <v-toolbar-title><v-btn flat @click="go_to('/menu')">Меню</v-btn></v-toolbar-title>
            </v-flex>

            <v-flex md10 xs6 align-self-center>
                <span style="display: flex; justify-content: center; margin-right:30px;">
                Столовая №1
                <a v-if="this.$store.state.is_manage" @click="go_to('/admin')" style="color:orange">&nbspуправление</a>
                 </span>
            </v-flex>

            <!-- START - иконка корзины и количество товаров  -->
            <v-flex md1 xs1 align-self-center>
              <v-badge overlap color="orange" style="margin-top:14px;" >
                    <template v-slot:badge >
                      <span> {{ cart_size }}</span>
                    </template>

                    <v-avatar>
                    <v-btn icon @click="go_to('/cart')">
                      <v-icon small>fa-cart-plus</v-icon>
                    </v-btn>
                    </v-avatar>
              </v-badge>
            </v-flex>
            <!-- START - иконка корзины и количество товаров  -->

          </v-layout>
        </v-layout>
      </v-toolbar>
      <!-- END - TOOLBAR(header) -->

      <slot></slot>

      <!-- <div id="main_app"></div> -->
      <!-- START - FOOTER -->
      <v-footer app fixed dark>
        <span style="margin-left:20px">&copy; 2017</span>
        <v-spacer></v-spacer>
        <v-btn flat @click="change_location('/admin/')">Войти в админ панель</v-btn>
      </v-footer>
      <!-- END - FOOTER -->

    </v-app>
  `,


})





const routes = {
  // 'C:/Users/kamych1916/Desktop/хакатон/итоговое/столовая/конечная2/роутинг/menu.html': Menu,
  '/menu': Menu,
  '/product': Product,
  '/cart': Korzina,
  '/admin': Admin
}

Vue.use(Vuex)

var store = new Vuex.Store({
  state: {
    cart_items: [],
    cart_item_index: 0,
    is_manage: false,
    canteen_id: 1,
    category_id: 1,
  },
  getters: {
    get_new_id: state => {

      return state.cart_item_index;
    },
  },
  mutations: {
    increment_id: function(state){
        state.cart_item_index = state.cart_item_index + 1;
    },
    add_dish_to_cart: function(state, data){
      for (var i = 0; i < data.count; i++){
          var item = Object.assign({}, data)
          delete item.count;
          this.commit("increment_id");
          item.id =  state.cart_item_index;

          state.cart_items.push(item);
      }
    },
    set_manage: function(state, data){
        state.is_manage = data;
    },
    set_canteen_id: function(state, value){
      state.canteen_id = value;
    },
    
    set_category_id: function(state, value){
      state.category_id = value;
    },
    

  },
})


var app1 = new Vue({
  el: '#app',
  store,
  data: {
    currentRoute: window.location.pathname,

    // category: [],
  },
  created: function (){
    this.currentRoute = '/menu';
  },
  methods: {
    go_to: function(path){
      this.currentRoute = path;
    }
  },
  computed: {
    category: function(){
      alert('kk')
      console.log(this.menu_app.category)
      return this.menu_app.category;
    },
    ViewComponent () {

      return routes[this.currentRoute] || NotFound
    }
  },
  render (h) { return h(this.ViewComponent) }
})


// app1.$mount('#app1')
// menu_app.$mount("#main_app")
