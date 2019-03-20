Vue.component('product', {
  props: ['image_url_of_prod',
          'title_of_prod',
          'valuerating_of_prod',
          'reviews_of_prod',
          'price_of_product',
          "weight", "calorie",
          "fats",
          "squirrels",
          'carbohydrates' ],
  template: `
            <v-card flat>
              <v-img :src="image_url_of_prod" height="200px">
                <v-card-title primary-title>
                  <div style="background: rgba(0, 0, 0, 0.4); padding: 15px; border-radius:5px;">
                    <div class="headline" style="text-shadow: 2px 2px 5px black">{{title_of_prod}}</div>
                    <template>
                      <v-layout row wrap>
                        <v-rating class="ml-1" :value="valuerating_of_prod" dense small readonly background-color="orange" color="orange" half-increments></v-rating>
                        <span class="ml-1">{{ valuerating_of_prod }}</span>
                        <span class="ml-1">({{ reviews_of_prod }})</span>
                      </v-layout>
                    </template>
                  </div>
                </v-card-title>
              </v-img>
              <v-layout row wrap class=" ml-1 mr-1" fill-height align-center >
                <v-dialog v-model="dialog" width="500">
                  <template v-slot:activator="{ on }">

                    <v-flex xs12 md6 >
                      <v-btn block @click="hidden = !hidden" flat large color="orange" style="background-color:rgba(255, 160, 0, 0.1)">
                          <span>Цена: &nbsp</span>
                          <span>{{price_of_product}}</span>
                          <v-avatar size="28px">
                            <v-icon size="12">fa-ruble-sign</v-icon>
                          </v-avatar>
                      </v-btn>
                    </v-flex>
                    <v-flex xs12 md6>
                      <v-btn block flat large v-on="on" color="orange" @click="bpm=0" style="background-color:rgba(255, 160, 0, 0.1)">
                        <span>Подробнее</span>
                      </v-btn>
                    </v-flex>

                  </template>

                  <v-card>
                    <v-card-title class="headline" primary-title>
                      {{title_of_prod}}
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                      <v-layout row wrap>
                        <v-flex xs5 md6>
                          <v-card flat>
                            <span>Вес</span>
                          </v-card>
                        </v-flex>
                        <v-flex xs5 md6 text-xs-right>
                          <v-card flat>
                            <span>{{weight}}</span>
                          </v-card>
                        </v-flex>
                      </v-layout>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-text>
                      <v-layout row wrap>
                        <v-flex xs5 md6>
                          <v-card flat>
                            <span>Калорийность</span>
                          </v-card>
                        </v-flex>
                        <v-flex xs5 md6 text-xs-right>
                          <v-card flat>
                            <span>{{calorie}}</span>
                          </v-card>
                        </v-flex>
                      </v-layout>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-text>
                      <v-layout row wrap>
                        <v-flex xs5 md6>
                          <v-card flat>
                            <span>Жиры</span>
                          </v-card>
                        </v-flex>
                        <v-flex xs5 md6 text-xs-right>
                          <v-card flat>
                            <span>{{fats}}</span>
                          </v-card>
                        </v-flex>
                      </v-layout>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-text>
                      <v-layout row wrap>
                        <v-flex xs5 md6>
                          <v-card flat>
                            <span>Белки</span>
                          </v-card>
                        </v-flex>
                        <v-flex xs5 md6 text-xs-right>
                          <v-card flat>
                            <span>{{squirrels}}</span>
                          </v-card>
                        </v-flex>
                      </v-layout>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-text>
                      <v-layout row wrap>
                        <v-flex xs5 md6>
                          <v-card flat>
                            <span>Углеводы</span>
                          </v-card>
                        </v-flex>
                        <v-flex xs5 md6 text-xs-right>
                          <v-card flat>
                            <span>{{carbohydrates}}</span>
                          </v-card>
                        </v-flex>
                      </v-layout>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-text >
                      <v-layout row wrap>
                        <v-flex md12 xs12 text-xs-center>
                          <v-card flat>
                            <span>Количество: </span>
                            <span>{{price_of_product}}</span>
                            <v-avatar size="10px">
                              <v-icon size="12">fa-ruble-sign</v-icon>
                            </v-avatar>
                            <span>*</span>
                            <span class="" v-text="bpm"></span>
                            <span>шт&nbsp=</span>
                            <span v-text="total_price" min="349" max="3490"></span>

                            <v-slider step="1" ticks="always" tick-size="2" v-model="bpm" always-dirty min="0" max="10" color="orange">
                                    <template v-slot:prepend>
                                      <v-btn small fab dark @click="decrement">
                                        <v-icon>
                                          fa-minus
                                        </v-icon>
                                      </v-btn>
                                    </template>

                                    <template v-slot:append>
                                        <v-btn fab dark @click="increment"  small>
                                        <v-icon size="12">
                                          fa-plus
                                        </v-icon>
                                      </v-btn>
                                    </template>
                            </v-slider>

                            <v-btn block @click="add_dish_to_cart(); dialog = false; if (bpm>0) $emit('on_show_snackbar', {message:'добавлено в корзину', bpm:bpm})" >
                              положить в корзину
                            </v-btn>
                            <v-flex md12 xs12 text-xs-center>

                            </v-flex>
                          </v-card>
                        </v-flex>
                      </v-layout>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-btn color="orange" flat >
                        Оформить заказ сразу
                      </v-btn>
                      <v-spacer></v-spacer>
                      <v-btn color="error" flat @click="dialog = false; bpm=0;">
                        Закрыть
                      </v-btn>
                    </v-card-actions>
                  </v-card>

                </v-dialog>
              </v-layout>
            </v-card>



  `,

  data: () => ({
    //Вывод Диалоговых окон
    //окно-диалог
    dialog: false,

    //Цена товара n - в диалоге при удваивании цены
    bpm: 0,
    n: 349,
    //провека для того чтобы не пушить нулевой элемент
    zero: true,
  }),

  computed: {
    total_price: function (){
      return this.bpm * this.price_of_product;
    }
  },

  methods: {
    decrement () {
      this.bpm--
    },
    increment () {
      this.bpm++
    },
    add_dish_to_cart: function (){
      data = {
        title: this.title_of_prod,
        n: this.n,
        count: this.bpm,
        price: this.bpm * this.price_of_product,

      };
      if (this.bpm == 0){
        this.zero = false
      }else{
        this.zero = true;
        this.$emit('on_add_dish_to_cart', data);
      }
    },

  }
  });



new Vue({
  el: '#app',
  data: () => ({
    snackbar_message: "",
    drawer: false,
    //---Содержимое блока товара
    //Наименование товара
    name_of_product: "Крем-суп из томата",
    //Блок данных из Рейтинга
    valuerating: 4,
    reviews: 421,
    //Блок для hover
    hidden: false,
    //Вывод Диалоговых окон
    //окно-диалог
    dialog: false,

    //Цена товара n - в диалоге при удваивании цены
    bpm: 0,
    n: 349,
    //Snakbar при нажатии на копку - добавить в корзину
    snackbar_is_visible: false,
    y: 'top',
    x: 'bottom',
    mode: '',
    timeout: 1500,
    text: 'Блюдо добавлено в корзину',

    //О товаре
    weight: "100г",
    calorie: "43к",
    fats: "20г",
    squirrels: "15г",
    carbohydrates: "10г",
    dialog1: false,

    // Список блюд
    product: [
      {
        "image_url_of_prod": "https://www.gastronom.ru/binfiles/images/20161019/b4e889a6.jpg",
        "title_of_prod": "Крем-суп из томата как дела лол кек большой",
        "valuerating_of_prod": 5,
        "reviews_of_prod": "432",
        "price_of_product": "122",
      },
      {
        "image_url_of_prod": "https://www.gastronom.ru/binfiles/images/20161019/b4e889a6.jpg",
        "title_of_prod": "Кек из томата",
        "valuerating_of_prod": 2,
        "reviews_of_prod": "12",
        "price_of_product": "522",
      },
    ],

    cart_items: [],
  }),

  computed: {
    cart_size: function (){
      return this.cart_items.length;
    }
  },

  props: {
    source: String
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
    }
  }

})
