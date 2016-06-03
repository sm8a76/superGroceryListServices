module.exports = function(app) {
    var MongoDB = app.dataSources.MongoDB;

    MongoDB.automigrate('Customer', function(err) {
       if (err) throw (err);
       var Customer = app.models.Customer;

       Customer.create([
        {username: 'admin', email: 'sm8a76@gmail.com', password: 'abcdef'},
        {username: 'smendoza', email: 'sm8a76@gmail.com', password: 'abcdef'}
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
      });
    });    
  
    
    
};