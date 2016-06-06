module.exports = function(app) {
    var MongoDB = app.dataSources.MongoDB;

    MongoDB.automigrate('Customer', function(err) {
       if (err) throw (err);
       var Customer = app.models.Customer;

       Customer.create([
        {username: 'admin', email: 'sm8a76@gmail.com', password: 'abcdef'},
        {username: 'smendoza', email: 'sm8a76@gmail.com', password: 'abcdef'},
        {username: 'jsmith', email: 'sm8a76@gmail.com', password: 'abcdef'}
      ], function(err, users) {
        if (err) return cb(err);
        
        var Role = app.models.Role;
        var RoleMapping = app.models.RoleMapping;

        //create the admin role
        Role.create({
          name: 'admin'
        }, function(err, role) {
          if (err) cb(err);
           //make admin
          role.principals.create({
            principalType: RoleMapping.USER,
            principalId: users[0].id
          }, function(err, principal) {
            if (err) throw (err);
          });
        });
      });
    });
    
    
    MongoDB.automigrate('Supermarket', function(err) {
       if (err) throw (err);
       var Supermarket = app.models.Supermarket;

       Supermarket.create([
        {name: 'HEB Puerta de Hierro'},
        {name: 'Walmart Cumbres'},
        {name: 'Soriana Lincoln'}
      ], function(err, supermarkets) {
        if (err) throw (err);
        console.log('Supermarket created and populated.');
        //console.log(supermarkets);
      });
    });  
    
    MongoDB.automigrate('Grocery', function(err) {
       if (err) throw (err);
       var Grocery = app.models.Grocery;

       Grocery.create([
        {name: 'Leche Entera Santa Clara', description: 'Leche Entera Santa Clara', image: 'images/leche-entera-santaclara.png', unit: 'Litros', madeBy: 'Santa Clara'},
        {name: 'Leche Entera Lala', description: 'Leche Entera Lala', image: 'images/leche-entera-lala.jpeg', unit: 'Litros', madeBy: 'Lala'},           
        {name: 'Leche Deslactosada Santa Clara', description: 'Leche Deslactosada Santa Clara', image: 'images/leche-deslactosada-santaclara.jpg', unit: 'Litros', madeBy: 'Santa Clara'},
        {name: 'Leche Deslactosada Parmalat', description: 'Leche Deslactosada Parmalat', image: 'images/leche-deslactosada-parmalat.jpg', unit: 'Litros', madeBy: 'Parmalat'},
        {name: 'Azucar Mascabado BlackSugar', description: 'Azucar Mascabado BlackSugar', image: 'images/Azucar_mascabado_grande.jpg', unit: 'Kg', madeBy: ''},
        {name: 'Tomates Rojos', description: 'Tomates Rojos', image: 'images/tomates.jpg', unit: 'Kg', madeBy: ''},
        {name: 'Limones', description: 'Limones', image: 'images/limones.jpg', unit: 'Kg', madeBy: ''}
      ], function(err, groceries) {
        if (err) throw (err);
        console.log('Groceries created and populated.');
        //console.log(groceries);
      });
    });        
    
    MongoDB.automigrate('Quote', function(err) {
       if (err) throw (err);
       var Quote = app.models.Quote;
       var Grocery = app.models.Grocery;
       var Supermarket = app.models.Supermarket;
        
        var groceryId, hebId, walmartId, sorianaId;
        
        Supermarket.find({name: 'HEB Puerta de Hierro'}, function(err, supermarket){
            hebId = supermarket.id;
        }); 
        
        Supermarket.find({name: 'Soriana Lincoln'}, function(err, supermarket){
            sorianaId = supermarket.id;
        });         
        
        Supermarket.find({name: 'Walmart Cumbres'}, function(err, supermarket){
            walmartId = supermarket.id;
        });           

      //***** 
        Grocery.find({name: 'Leche Entera Santa Clara'}, function(err, grocery){
            groceryId = grocery.id;
        });        
        
       Quote.create([
        {price: 1550, unit: 'Litro', promo: '', discountIfAny: 0, groceryId: groceryId, superId: hebId},
        {price: 1650, unit: 'Litro', promo: '', discountIfAny: 0, groceryId: groceryId, superId: sorianaId},
        {price: 1750, unit: 'Litro', promo: '', discountIfAny: 0, groceryId: groceryId, superId: walmartId}
      ], function(err, quotes) {
        if (err) throw (err);
        console.log('Quotes 1 created and populated.');
      });
        
        
        //*****
        Grocery.find({name: 'Leche Entera Lala'}, function(err, grocery){
            groceryId = grocery.id;
        });        
        
       Quote.create([
        {price: 1550, unit: 'Litro', promo: '', discountIfAny: 0, groceryId: groceryId, superId: hebId},
        {price: 1450, unit: 'Litro', promo: '', discountIfAny: 0, groceryId: groceryId, superId: sorianaId},
        {price: 1350, unit: 'Litro', promo: '', discountIfAny: 0, groceryId: groceryId, superId: walmartId}
      ], function(err, quotes) {
        if (err) throw (err);
        console.log('Quotes 2 created and populated.');
      });
        
        //*****
        Grocery.find({name: 'Leche Deslactosada Santa Clara'}, function(err, grocery){
            groceryId = grocery.id;
        });        
        
       Quote.create([
        {price: 1750, unit: 'Litro', promo: '', discountIfAny: 0, groceryId: groceryId, superId: hebId},
        {price: 1850, unit: 'Litro', promo: '', discountIfAny: 0, groceryId: groceryId, superId: sorianaId},
        {price: 1950, unit: 'Litro', promo: '', discountIfAny: 0, groceryId: groceryId, superId: walmartId}
      ], function(err, quotes) {
        if (err) throw (err);
        console.log('Quotes 3 created and populated.');
      });   
        
        
        //*****
        Grocery.find({name: 'Leche Deslactosada Parmalat'}, function(err, grocery){
            groceryId = grocery.id;
        });        
        
       Quote.create([
        {price: 1950, unit: 'Litro', promo: '', discountIfAny: 0, groceryId: groceryId, superId: hebId},
        {price: 2050, unit: 'Litro', promo: '', discountIfAny: 0, groceryId: groceryId, superId: sorianaId},
        {price: 1850, unit: 'Litro', promo: '', discountIfAny: 0, groceryId: groceryId, superId: walmartId}
      ], function(err, quotes) {
        if (err) throw (err);
        console.log('Quotes 4 created and populated.');
      });   


        //*****
        Grocery.find({name: 'Limones'}, function(err, grocery){
            groceryId = grocery.id;
        });        
        
       Quote.create([
        {price: 4400, unit: 'Kg', promo: '', discountIfAny: 0, groceryId: groceryId, superId: hebId},
        {price: 3500, unit: 'Kg', promo: '', discountIfAny: 0, groceryId: groceryId, superId: sorianaId},
        {price: 2500, unit: 'Kg', promo: '', discountIfAny: 0, groceryId: groceryId, superId: walmartId}
      ], function(err, quotes) {
        if (err) throw (err);
        console.log('Quotes 5 created and populated.');
      });  

        //*****
        Grocery.find({name: 'Tomates'}, function(err, grocery){
            groceryId = grocery.id;
        });        
        
       Quote.create([
        {price: 900, unit: 'Kg', promo: '', discountIfAny: 0, groceryId: groceryId, superId: hebId},
        {price: 1450, unit: 'Kg', promo: '', discountIfAny: 0, groceryId: groceryId, superId: sorianaId},
        {price: 1250, unit: 'Kg', promo: '', discountIfAny: 0, groceryId: groceryId, superId: walmartId}
      ], function(err, quotes) {
        if (err) throw (err);
        console.log('Quotes 6 created and populated.');
      });    

        //*****
        Grocery.find({name: 'Azucar Mascabado BlackSugar'}, function(err, grocery){
            groceryId = grocery.id;
        });        
        
       Quote.create([
        {price: 2850, unit: 'Kg', promo: '', discountIfAny: 0, groceryId: groceryId, superId: hebId},
        {price: 2550, unit: 'Kg', promo: '', discountIfAny: 0, groceryId: groceryId, superId: sorianaId},
        {price: 2150, unit: 'Kg', promo: '', discountIfAny: 0, groceryId: groceryId, superId: walmartId}
      ], function(err, quotes) {
        if (err) throw (err);
        console.log('Quotes 7 created and populated.');
      });  
        
        
        
    });     
    
    
    MongoDB.automigrate('List', function(err) {
       if (err) throw (err);
       var List = app.models.List;
       var Customer = app.models.Customer;
        
        var customerId;
        
        Customer.find({username: 'jsmith'}, function(err, customer){
            customerId = customer.id;
        });              
        

       List.create([
        {name: 'MyWeeklyList', customerId: customerId},
        {name: 'MyMonthlyList', customerId: customerId},
        {name: 'Other', customerId: customerId}
      ], function(err, lists) {
        if (err) throw (err);
        console.log('Lists created and populated for jsmith.');
      });
    });       

      MongoDB.automigrate('ListItem', function(err) {
       if (err) throw (err);
       var List = app.models.List;
       var ListItem = app.models.ListItem;
       var Grocery = app.models.Grocery;

        var listId,groceryId;
        
        List.find({name: 'MyWeeklyList'}, function(err, list){
            listId = list.id;
        }); 

        Grocery.find({name: 'Leche Entera Santa Clara'}, function(err, grocery){
            groceryId = grocery.id;
        });                           
        

       ListItem.create([
        {listId: listId, groceryId: groceryId, quantity: 3}
      ], function(err, items) {
        if (err) throw (err);
        console.log('List Items 1 created and populated.');
      });


        Grocery.find({name: 'Leche Entera Lala'}, function(err, grocery){
            groceryId = grocery.id;
        });          


       ListItem.create([
        {listId: listId, groceryId: groceryId, quantity: 1}
      ], function(err, items) {
        if (err) throw (err);
        console.log('List Items 2 created and populated.');
      });


        Grocery.find({name: 'Azucar Mascabado BlackSugar'}, function(err, grocery){
            groceryId = grocery.id;
        });          


       ListItem.create([
        {listId: listId, groceryId: groceryId, quantity: 2}
      ], function(err, items) {
        if (err) throw (err);
        console.log('List Items 3 created and populated.');
      });


        Grocery.find({name: 'Limones'}, function(err, grocery){
            groceryId = grocery.id;
        });          


       ListItem.create([
        {listId: listId, groceryId: groceryId, quantity: 2}
      ], function(err, items) {
        if (err) throw (err);
        console.log('List Items 4 created and populated.');
      });

        Grocery.find({name: 'Tomates'}, function(err, grocery){
            groceryId = grocery.id;
        });          


       ListItem.create([
        {listId: listId, groceryId: groceryId, quantity: 1}
      ], function(err, items) {
        if (err) throw (err);
        console.log('List Items 5 created and populated.');
      });       

    });   
    
    
};