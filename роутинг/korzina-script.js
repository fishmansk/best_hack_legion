
Vue.component('cart-item', {
  props: ['id', 'image_url', 'title', 'calories', 'count', 'price', "delete_func"],
  template: `

    <v-card class="mt-3 pt-3 pb-3 pl-3 pr-3">
      <v-layout row wrap>
        <v-flex md5 xs12>
          <v-img :src="image_url"></v-img>
        </v-flex>

        <v-flex md5 xs10 align-self-center>
              <span style="height:70px; display: flex; align-items: center;"><span style="color:rgb(255, 165, 0)">{{title}}</span></span>
              <span style="height:30px; display: flex; align-items: center;">Коллорийность: <span style="color:rgb(255, 165, 0)">&nbsp{{calories}}</span></span>
              <span style="height:30px; display: flex; align-items: center;">Цена: <span style="color:rgb(255, 165, 0)">&nbsp{{price}}</span></span>
        </v-flex>

        <v-flex md1 xs12 class="ml-2" align-self-center>
          <v-layout row wrap align-content-center justify-center>
          <v-btn fab small color="error" style="justify-content: center;" @click="delete_func(id)">
              <v-avatar size="28px">
                <v-icon size="12">fa-times</v-icon>
              </v-avatar>
            </v-btn>
          </v-layout>
        </v-flex>

      </v-layout>
    </v-card>

  `,
  data: function(){
    return {}
  },
  methods: {

  }
});

Vue.component('cart', {
  props: ['conclusion_price', 'conclusion_calories'],
  template: `
  <div>
    <v-container grid-list-md>

      <v-layout row wrap>

        <v-flex xs12 md8 class="mx-auto" >

        <v-container grid-list-md>
            <span class="headline mb-2">Корзина:</span>
          <v-layout row wrap>
            <v-flex xs12 md12>
              <v-flex xs12 md12>

                <slot></slot>

                <!-- Итоговая цена -->
                <template>
                  <v-card class=" mt-3 pt-3 pb-3 pl-3 pr-3">
                    <v-layout row wrap class="pb-3 mx-auto" >

                    <v-layout row wrap mt-3>
                      <v-flex md4 xs12 >

                        <span style="background:rgba(255, 82, 82,0.4);height:50px; display: flex; align-items: center; justify-content: center; ">Коллорийность:&nbsp&nbsp<h3>{{conclusion_calories}} к</h3></span>

                      </v-flex>
                      <v-flex md4 xs12 >

                        <span style="background:rgba(255, 82, 82,0.4);height:50px; display: flex; align-items: center; justify-content: center;">Итоговая цена:&nbsp&nbsp<h3>{{conclusion_price}} р</h3></span>

                      </v-flex>
                      <v-flex md4 xs12  >

                         <span style="background:rgba(255, 165, 0 ,0.4); height:50px; display: flex; align-items: center; justify-content: center;">Оформить заказ</span>

                      </v-flex>
                    </v-layout>


                    </v-layout>
                  </v-card>
                </template>
                <!-- Итоговая цена -->

              </v-flex>
            </v-flex>
          </v-layout>
          </v-container>
          </v-flex>
          </v-layout>
        </v-container>


  </div>

  `,
  data: function(){
    return {

    }
  },
  // methods: {
  //
  // }

});

Vue.component('cart-app', {
  template: `
  <!-- START - CONTENT-->
  <v-content>
    <!-- START - Отображение товаров в корзине -->
    <cart  :conclusion_price="conclusion_price()" :conclusion_calories="conclusion_calories()">
      <div v-for="(item, index) in cart_items">
          <cart-item
            :id="item.id"
            :image_url="item.image_url"
            :title="item.title"
            :calories="item.calories"
            :price="item.price"
            :delete_func="delete_cart_item"
          ></cart-item>
      </div>
    </cart>
    <!-- END - Отображение товаров в корзине -->
  </v-content>
  <!-- END - CONTENT-->
  `,
  data: () => ({
    drawer: false,

    //Содержимое блока который в конце продуктов
    general_calorie: 86,
    general_price: 1400,
    //содержимое в продуктах
    // cart_items: [
    //   {
    //     "id": 1,
    //     "image_url": "https://www.gastronom.ru/binfiles/images/20161019/b4e889a6.jpg",
    //     "title": "Щи",
    //     "calories": 400,
    //     "price": 45,
    //   },
    //   {
    //     "id": 2,
    //     "image_url": "https://www.gastronom.ru/binfiles/images/20161019/b4e889a6.jpg",
    //     "title": "Борщ",
    //     "calories": 250,
    //     "price": 32,
    //   },
    //
    // ]
  }),

  computed: {
    cart_items: function(){
      return this.$store.state.cart_items;
    }
  },

  props: {
    source: String
  },

  methods: {
    //функция - удаляет продукт
    delete_cart_item: function(id){
      var item_id = this.cart_items.findIndex(x => x.id == id);
      this.cart_items.splice(item_id, 1);
    },
    //функция - возвращает итоговую цену
    conclusion_price: function() {
      var sum = 0;
      for (var i = 0; i < this.cart_items.length; i++){
        sum += this.cart_items[i].price;
      }
      return sum;
    },
    conclusion_calories: function() {
      var sum = 0;
      for (var i = 0; i < this.cart_items.length; i++){
        sum += this.cart_items[i].calories;
      }
      return sum;
    },
  },
})
