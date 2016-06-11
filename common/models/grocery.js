module.exports = function(Grocery, Quote, Supermarket) {


Grocery.search = function(criteria, callback){
  var results = [];

  Grocery.find({name: criteria}, function(error, groceries){
    if(error) callback(error);

    for(var grocery in groceries){
      var item = {};

      item.name = grocery.name;
      item.description = grocery.name;
      item.unit = grocery.unit;
      item.image = grocery.image;
      item.madeBy = grocery.madeBy;

      Quote.find({groceryId: grocery.id}, function(error, quotes){
        if(error) callback(error);

        var chepeastQuote;
        var initialPrice = -1;
        var cheapestPrice = initialPrice;
        var availableIn = '';
        var cheapestSuper;

        for(var quote in quotes){
          if (chepeastQuote == undefined) {
            chepeastQuote = quote;
          } else {
            if(quote.price < chepeastQuote.price){
              chepeastQuote = quote;
            }
          }

          Supermarket.findOne({id: quote.supermarketId}, function(error, supermarket){
            if(error) callback(error);

            availableIn += supermarket.name + ', ';
          });


        }

        item.available = availableIn;
        item.price = chepeastQuote.price;
        item.bestPriceAt = undefined;
        item.label = undefined;

      });

      results.push(item);

    } // for var i=0; i<groceries.length; i++

  }); // Grocery.find({name: criteria}, function(error, groceries)

  callback(null, results);

};


Grocery.remoteMethod('search', {
  accepts: {arg: 'criteria', type: 'string'},
  returns: {arg: 'results', type: 'array'}
});


};
