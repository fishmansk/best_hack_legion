async function get_categories(canteen_id, callback_get_data){
    send_data = JSON.stringify({
        "canteen_id": canteen_id.toString()
    })
    url = this.base_url + "/get_categories/"
     await fetch(url,
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
        return res.json();
    } )
    .then(
        function (json){
            categories = json.categories;
            
            callback_get_data(categories)           
            return json;
        }
        
    ).catch(function(res){ console.log('ERROR'+res) })
}

function get_canteen_dishes(canteen_id, callback_get_data){
    send_data = JSON.stringify({
        "canteen_id": canteen_id.toString()
    })
    url = base_url + "/get_all_dishes/"
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
        return res.json();
    } )
    .then(
        function (json){
            
            dishes = json.dishes;
            
            callback_get_data(dishes)           
            return json;
        }
        
    ).catch(function(res){ console.log('ERROR'+res) })
}


async function get_category_dishes(category_id, callback_get_data){
    send_data = JSON.stringify({
        "category_id": category_id.toString()
    })
    url = base_url + "/get_dishes/"
     await fetch(url,
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
        return res.json();
    } )
    .then(
        function (json){
            
            dishes = json.dishes;
            
            callback_get_data(dishes)           
            return json;
        }
        
    ).catch(function(res){ console.log('ERROR'+res) })
}

function get_canteens(callback_get_data){
    
    url = base_url + "/get_canteens/"
     fetch(url,
    {
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        mode: "cors",
        method: "GET",
    })
    .then(function(res){ 
        return res.json();
    } )
    .then(
        function (json){
            
            canteens = json.canteens;
            
            callback_get_data(canteens)           
            return json;
        }
        
    ).catch(function(res){ console.log('ERROR'+res) })
}



