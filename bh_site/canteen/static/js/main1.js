Vue.component('bh-image-uploader', {
    props: ['label'],

    data: () => {
        return {
            title: "Image Upload",
            dialog: false,
            imageName: '',
            imageUrl: '',
            imageFile: '',
        }
    },
    template: `
    <v-content >
        <v-container fluid>
            <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
                <img :src="imageUrl" height="150" v-if="imageUrl"/>
                <v-text-field :label="label" @click='pickFile' v-model='imageName' prepend-icon='attach_file'></v-text-field>
                <input
                    type="file"
                    style="display: none"
                    ref="image"
                    accept="image/*"
                    @change="onFilePicked"
                >
            </v-flex>
            <v-dialog v-model="dialog" max-width="290">
                <v-card>
                    <v-card-title class="headline">Hello World!</v-card-title>
                    <v-card-text>Image Upload Script in VUE JS
                        <hr>Yubaraj Shrestha
                        <br>http://yubarajshrestha.com.np/</v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="green darken-1" flat="flat" @click.native="dialog = false">Close</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-container>
    </v-content>
    `,

    methods: {
        pickFile() {
            this.$refs.image.click()
        },

        onFilePicked(e) {
            const files = e.target.files
            if (files[0] !== undefined) {
                this.imageName = files[0].name
                if (this.imageName.lastIndexOf('.') <= 0) {
                    return
                }
                const fr = new FileReader()
                fr.readAsDataURL(files[0])
                fr.addEventListener('load', () => {
                    this.imageUrl = fr.result
                    this.imageFile = files[0] // this is an image file that can be sent to server...
                })
            } else {
                this.imageName = ''
                this.imageFile = ''
                this.imageUrl = ''
            }
        }
    }
});


Vue.component('add-category-dialog', {
    props: ["rest_url", "rest_method", "dialog_title", "new", "id", "canteen_id"],
    template: `
    <div>
   
    <div v-if="this.new">
    <v-btn  fab dark color="indigo" @click="is_add_new_category_dialog = true">
    
        <v-icon dark>add</v-icon>
    </v-btn>
    </div>
    <v-btn v-else fab dark small color="orange" @click="is_add_new_category_dialog = true">
        <v-icon orange>edit</v-icon>

    </v-btn>
    <v-dialog v-model="is_add_new_category_dialog" max-width="500px" attach="#app-container">
        
        <v-card>
            <v-card-title>
                <div class="display-1"> {{ dialog_title }}</div>
                <v-btn v-if="!this.new" color="red" flat @click="delete_category()">Удалить</v-btn>
            </v-card-title>
            <v-card-text>
                <v-layout column wrap>

                    <v-flex xs12 sm6>
                        <v-text-field id="kek" v-model="category_name"  label="Название" box></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <bh-image-uploader label="Название изображения" ref="image_upload_field"></bh-image-uploader>
                    </v-flex>
                </v-layout>
            </v-card-text>
            <v-card-actions>
                <v-layout row wrap>
                    <v-flex align-self-start>
                        <v-btn color="primary" flat @click="close_add_category_dialog">Закрыть</v-btn>
                    </v-flex>
                    
                    <v-flex align-self-end offset-md5 offset-xs0>
                    
                        <v-btn color="green" @click="add_new_category()">
                        <div v-if="this.new">
                        Добавить                        
                        </div>
                        <div v-else>
                        Сохранить
                        </div>
                        
                        </v-btn>
                    </v-flex>

                </v-layout>

            </v-card-actions>
        </v-card>
    </v-dialog>
    </div>
    `,
    data: () => {
        return {
            category_name: "",
            image_filename: "",
            is_add_new_category_dialog: false,
        }
    },
    methods: {
        close_add_category_dialog: function() {
            this.is_add_new_category_dialog = false;
            this.category_name = "";
            this.image_filename = "";
            this.$refs.image_upload_field.imageName = "";
            this.$refs.image_upload_field.imageFile = "";
            this.$refs.image_upload_field.imageUrl = "";
        },
        // update_category: function(){
        //     var self = this;
        //     etch("http://127.0.0.1:8000/patch_categories/", {
        //         method: "DELETE",
        //         body: JSON.stringify({
        //             id: this.id,
        //         })
        //     }).then(function (r){               

        //         return r.json()
        //     }).then(function(json){
        //         if (r.status == 200){
        //             self.$emit("on_update_category", json)
        //             self.close_add_category_dialog();
        //         }
        //     })
        // },
        delete_category: function (){
            // alert(this.id)
            var self = this;
            fetch("http://127.0.0.1:8000/delete_categories/", {
                method: "DELETE",
                body: JSON.stringify({
                    id: this.id,
                })
            }).then(function (r){
                if (r.status == 200){
                    self.$emit("on_delete_category", {id:self.id})
                    self.close_add_category_dialog();
                }

                return r.json()
            }).then(function(json){

            })
        },
        add_new_category: function(){
            var self = this;
            if (this.new){
                data = {
                    image_name: this.$refs.image_upload_field.imageName,
                    image: this.$refs.image_upload_field.imageUrl,
                    name: this.category_name,
                    canteen: this.canteen_id,
                }
                body = JSON.stringify(data)
                var self = this
                fetch('http://127.0.0.1:8000/post_categories/', {
                    body:body,
                    method: "POST",
                }).then(function(response){
                    
                    return response.json()
                }).then(function(json){

                    if ((json.name) && (json.id)){
                        self.close_add_category_dialog();
                        self.$emit("on_new_category", json )
                        
                        // console.log("Hello")
                        
                    }
                    // console.log(json)
                })
            }
            else{
                data = {
                    image_name: this.$refs.image_upload_field.imageName,
                    image: this.$refs.image_upload_field.imageUrl,
                    name: this.category_name,
                    canteen: this.canteen_id,
                    id: self.id,
                }
                body = JSON.stringify(data)
                var self = this
                fetch('http://127.0.0.1:8000/patch_categories/', {
                    body:body,
                    method: "POST",
                }).then(function(response){
                    
                    return response.json()
                }).then(function(json){

                    if ((json.name) && (json.id)){
                        self.close_add_category_dialog();
                        self.$emit("on_update_category", json)
                        
                        // console.log("Hello")
                        
                    }
                    // console.log(json)
                })
            }
            

        },
    }
})



Vue.component('category-block', {
    props: ['name', "image_url", "id", "canteen_id", "delete_handler", "update_handler"],
    data: () => {
        return {

        }
    },
    methods: {

    },

    template: `
    <v-flex xs6 sm4 md3 pt-1 pl-1 pb-1 pr-1>
    
        <v-card>
            <v-img class="white--text" height="200px" :src="image_url">
                <v-container fill-height fluid>
                    <v-layout fill-height fill-width row wrap>
                        <v-flex xs8 md10 align-end flexbox>
                            <span class="headline" style="text-shadow: 1px 1px #000;"> {{ name }}</span>
                        </v-flex>
                        <v-flex xs4 md2 flexbox>
                            <v-layout row justify-end>
                                <add-category-dialog 
                                rest_url="http://127.0.0.1:8000/add_category/"
                                dialog_title="Изменить категорию"
                                rest_method="PATCH"
                                :new="false"
                                :id="id"
                                :canteen_id="canteen_id"
                                v-on:on_delete_category="delete_handler($event)"
                                v-on:on_update_category="update_handler($event)"
                                >
                                </add-category-dialog>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-img>


        </v-card>
    </v-flex>
    `,

})


Vue.component('product-block', {
    props: ['name', "category_name", "price", "mass", "description", "calories", "proteins", "fats", "carbohydrates", "image_url", "id", "canteen_id", "delete_handler", "category_info", "update_handler"],
    data: () => {
        return {

        }
    },
    methods: {

    },

    template: `
    <v-flex xs12 sm6 md4 pt-1 pl-1 pb-1 pr-1>
    
        <v-card>
            <v-img class="" height="200px" :src="image_url" style="color: #fff;"> 
                <v-container fill-height fluid>
                    <v-layout fill-height fill-width row wrap>
                        <v-flex xs8 md9 align-end flexbox>
                            <v-layout wrap column>
                                <v-flex>
                                    <span class="headline" style="text-shadow: 1px 1px 10px #000, 0px 0px 10px #fff;"> {{ name }}</span>
                                </v-flex>
                                <v-flex>
                                    <span class="caption" style="text-shadow: 1px 1px 10px #000, 0px 0px 10px #fff;"> Категория: {{ category_name }}</span>
                                </v-flex>
                                
                                <v-flex>
                                    <span class="title" style="text-shadow: 1px 1px 10px #000, 0px 0px 10px #fff;"> Цена: {{ price }} <v-icon small color="#fff">fa-ruble-sign</v-icon></span>
                                </v-flex>
                                <v-flex>
                                    <span class="subheading" style="text-shadow: 1px 1px 10px #000, 0px 0px 10px #fff;"> Масса: {{ mass }} гр</span>
                                </v-flex>
                                <br>
                                <v-flex >
                                    <p class="body-1" style="text-shadow: 1px 1px 10px #000, 0px 0px 10px #fff;"> 
                                        {{ description }}
                                    </p>
                                </v-flex>
                            </v-layout>

                            
                        </v-flex>
                        <v-flex xs4 md3 flexbox>
                            <v-layout column justify-end>
                                <v-flex> 
                                <add-category-dialog 
                                rest_url="http://127.0.0.1:8000/add_category/"
                                dialog_title="Изменить категорию"
                                rest_method="PATCH"
                                :new="false"
                                :id="id"
                                :canteen_id="canteen_id"
                                v-on:on_delete_category="delete_handler($event)"
                                v-on:on_update_category="update_handler($event)"
                                >
                                </add-category-dialog>
                                </v-flex>
                                <br>                                
                                <v-flex>
                                    <span class="subheading" style="text-shadow: 1px 1px 10px #000, 0px 0px 10px #fff;"> Ккал: {{ calories }} </span>
                                </v-flex>
                                <br>
                                <v-flex>
                                    <span class="subheading" style="text-shadow: 1px 1px 10px #000, 0px 0px 10px #fff;"> Жиры: {{ fats }} </span>
                                </v-flex>
                                <v-flex>
                                    <span class="subheading" style="text-shadow: 1px 1px 10px #000, 0px 0px 10px #fff;"> Белки: {{ proteins }} </span>
                                </v-flex>
                                <v-flex>
                                    <span class="subheading" style="text-shadow: 1px 1px 10px #000, 0px 0px 10px #fff;"> Углев.: {{ carbohydrates }} </span>
                                </v-flex>
                                
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-img>


        </v-card>
    </v-flex>
    `,

})



var app = new Vue({
    el: "#app",
    template: `
    <v-container id="app-container">
             <div class="display-3">Столовая 1</div>
            <hr>
            <div class="display-2">Категории:


                    <add-category-dialog
                    rest_url="http://127.0.0.1:8000/add_category/"
                    dialog_title="Добавить категорию"
                    rest_method="POST"
                    :new="true"
                    :canteen_id="canteen_id"
                    v-on:on_new_category="add_new_category($event)"
                    >
                    </add-category-dialog>

            </div>







            </v-flex>
            <br>
            <v-layout row wrap justify-start>


                <category-block
                    v-for="category in categories"
                    :name="category.name"
                    :image_url="'/media/' + category.image"
                    :id="category.id"
                    :canteen_id="canteen_id"
                    :delete_handler="delete_category"
                    :update_handler="update_category"
                >

                </category-block>
                

                






            </v-layout>
            <br> 

            
             <hr>
            <div class="display-2">Блюда:</div>
            <br>
            <v-layout row wrap justify-start>
                <product-block
                    v-for="dish in dishes"
                    :name="dish.name"
                    :image_url="dish.image"
                    :category_name="dish.category_name"
                    :price="dish.price"
                    :mass="dish.mass"
                    :description="dish.description"
                    :calories="dish.calories"
                    :proteins="dish.proteins"
                    :fats="dish.fats"
                    :carbohydrates="dish.carbohydrates"
                >

                </product-block>
                <!--
                <product-block
                    name="Борщ"
                    image_url="/media/1_5sXeEEP.jpg"
                ></product-block>

                <product-block
                    name="Борщ"
                    image_url="/media/1_5sXeEEP.jpg"
                ></product-block>

                <product-block
                    name="Борщ"
                    image_url="/media/1_5sXeEEP.jpg"
                ></product-block>

                <product-block
                    name="Борщ"
                    image_url="/media/1_5sXeEEP.jpg"
                ></product-block>

                <product-block
                    name="Борщ"
                    image_url="/media/1_5sXeEEP.jpg"
                ></product-block>-->
                






            </v-layout> 
            <!-- <v-data-table :headers="headers" :items="desserts" class="elevation-1"></v-data-table> -->
        </v-container>

    `,
    data: {
        // is_add_new_category_dialog: false,
        base_url: "http://127.0.0.1:8000",
        categories: [
        ],
        dishes: [

        ],
        canteen_id: 1,


    },
    methods: {
        get_categories_from_server:  function(){
            send_data = JSON.stringify({
                "canteen_id": this.canteen_id.toString()
            })
            url = this.base_url + "/get_categories/"
            server_data = "123";
             fetch(url,
            {
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                mode: "cors",
                method: "POST",
                body: send_data,
            })
            .then(function(res){ 
                // alert(res.status)
                // console.log(res);
                return res.json();
            } )
            .then(
                function (json){
                    server_data = json.categories;
                    
                    app.categories = server_data;
                    
                    console.log(app.categories) 
                    return json;
                }
                
            ).catch(function(res){ console.log('ERROR'+res) })
            // console.log(server_data)
            
        },
        get_dishes_from_server:  function(){
            send_data = JSON.stringify({
                "canteen_id": canteen_id.toString()
            })
            url = this.base_url + "/get_all_dishes/"
            server_data = "123";
             fetch(url,
            {
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                mode: "cors",
                method: "POST",
                body: send_data,
            })
            .then(function(res){ 
                // alert(res.status)
                // console.log(res);
                return res.json();
            } )
            .then(
                function (json){
                    server_data = json.dishes;
                    
                    app.dishes = server_data;
                    
                    // console.log(app.categories) 
                    return json;
                }
                
            ).catch(function(res){ console.log('ERROR'+res) })
            // console.log(server_data)
            
        },
        add_new_category: function(data){
            this.categories.push(data)
        },
        delete_category: function(data){
            // alert("DELETE")
            console.log(data)
            var id = data.id;
            for (var i = 0; i < this.categories.length; i++){
                if (this.categories[i].id == id){
                    this.categories.splice(i, 1);
                    break;
                }
            }
        },
        update_category: function (data){
            var id = -1;
            // alert(1)
            for (var i = 0; i < this.categories.length; i++){
                if (this.categories[i].id == data.id){
                    id = i;
                    break;
                }
            }
            if (id < 0){
                alert("ERROR UPDATE")
            }
            else{
                this.categories[id].name = data.name;
                this.categories[id].image = data.image;
                // console.log(data)
                // console.log(this.categories)
                // this.categories[i] = data;
                console.log(this.categories)
            }
        },
        
    },
    computed: {
        
      
    },
})  