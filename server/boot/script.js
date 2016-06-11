module.exports = function(app) {
    var MongoDB = app.dataSources.MongoDB;

   MongoDB.automigrate('Role', function(err) {
     if (err) throw (err);
     var Role = app.models.Role;

     //create the admin role
     Role.create({
       name: 'admin'
     }, function(err, originalRole) {
       if (err) throw (err);
        //make admin
        console.log('Admin role created.');

        MongoDB.automigrate('Customer', function(err) {
           if (err) throw (err);
           var Customer = app.models.Customer;

           Customer.create([
            {username: 'admin', email: 'sm8a76@gmail.com', password: 'abcdef'},
            {username: 'smendoza', email: 'sm8a76@gmail.com', password: 'abcdef'},
            {username: 'jsmith', email: 'sm8a76@gmail.com', password: 'abcdef'}
          ], function(err, users) {
            if (err) throw (err);

            var Role = app.models.Role;
            var RoleMapping = app.models.RoleMapping;

            console.log('Admin, smendoza and jsmith users created.');

            Role.find({name: 'Admin'}, function(err, role){
              if (err) throw (err);
               //make admin
              originalRole.principals.create({
                principalType: RoleMapping.USER,
                principalId: users[0].id
              }, function(err, principal) {
                if (err) throw (err);

                console.log('Role principal for admin created.');


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

                      }); // Grocery.create([
                    }); // MongoDB.automigrate('Grocery', function(err) {

                  }); //Supermarket.create([
                });  //MongoDB.automigrate('Supermarket', function(err) {

              }); // role.principals.create({
            }); //Role.find({name: 'Admin'}, function(err, role){

          }); //Customer.create([
        }); //MongoDB.automigrate('Customer', function(err) {



     });  //Role.create({
   }); //MongoDB.automigrate('Role', function(err) {


};
