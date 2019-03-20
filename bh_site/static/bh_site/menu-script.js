Vue.component('category', {
  props: ['image_category', 'name_category', 'count_category'],
  template: `

        <v-hover>
            <v-card slot-scope="{ hover }" class="mx-auto" color="grey lighten-4" max-width="600">
              <v-img :src="image_category" height="200px">
                <v-expand-transition>
                  <a v-if="hover" @click="go_to('/product')" class="d-flex transition-fast-in-fast-out orange v-card--reveal display-3 white--text mb1"   style="height: 100%;"></a>
                </v-expand-transition>
                <v-card-title primary-title>
                  <div style="background: rgba(0, 0, 0, 0.4); padding: 15px; border-radius:5px;">
                    <div class="headline" style="text-shadow: 2px 2px 5px black">{{ name_category }}</div>
                    <span class="white--text" style="text-shadow: 2px 2px 5px black">{{ count_category }} блюд</span>
                  </div>
                </v-card-title>
              </v-img>
            </v-card>
          </v-hover>


  `,
  methods: {
    go_to: function(path){
      app1.currentRoute = path
    },
  },
  data: function(){
    return {}
  },

});

Vue.component('menu-app', {
  // el: '#app',
  template: `
  <!-- START - CONTENT-->
  <v-content>
    <!-- START - поле, где хранятся категории блюд -->
    <template>
      <div>
        <v-container grid-list-md>
          <v-layout row wrap>

            <v-flex xs12>

              <v-container grid-list-md>

                <span class="headline mb-2">Категории:</span>

                <v-layout row wrap>
                  <v-flex xs12 md6 v-for="item in category">
                    <category
                      :image_category="item.image_category"
                      :name_category="item.name_category"
                      :count_category="item.count_category"

                    ></category>
                  </v-flex>
                </v-layout>

              </v-container>
            </v-flex>

          </v-layout>
        </v-container>
      </div>
    </template>
    <!-- END - поле, где хранятся категории блюд -->
  </v-content>
  `,
  data: () => ({
    drawer: false,
    //Наименования столовых
    name_canteen: "Столовая №",
    number_canteen: "1",

    //Наименования категорий (блюда, напитки и т.д)
    //--Данные в "Первые блюда"
    name_category_first: "Первые блюда",
    count_category_first: "12",
    //--Данные в "Вторые блюда"
    name_category_second: "Вторые блюда",
    count_category_second: "8",
    //--Данные в "Салаты"
    name_category_salad: "Салаты",
    count_category_salad: "14",
    //--Данные в "Напитки"
    name_category_drink: "Напитки",
    count_category_drink: "5",

    category: [
      {
        "image_category": "https://www.gastronom.ru/binfiles/images/20161019/b4e889a6.jpg",
        "name_category": "Первые блюда",
        "count_category": "8",
      },
    ]

  }),
  methods: {

  },
  props: {
    source: String
  }

})
