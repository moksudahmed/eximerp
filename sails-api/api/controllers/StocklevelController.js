/**
 * Stocklevel
 *
 * @description :: Server-side logic for managing Stocklevel
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
    getStockLevel: async (req, res) => {
        Stocklevel.find((err, stocklevel) => {
          if (err) {
            return res.serverError({
              success: false,
              message: 'Server Error'
            });
          }
          return res.ok({
            success: true,
            stocklevel: stocklevel
          });
        });
      },
      findByItemId: async function(req, res, next) {
        var finn = await Stocklevel.find({
            itemID: req.param('id')
        });
        if (!finn) {
          return res.serverError({
            success: false,
            message: 'Server Error'
          });
        }
        //console.log(finn);
        return res.ok({
          success: true,
          stocklevel: finn
        });
      },
      create: async function(req,res,next)
      {
        console.log(req);
            try{
                let stock = await Stocklevel.create({
                stockTrackingDate : req.param('stockTrackingDate'),
                quantityInStock : req.param('quantityInStock'),
                itemID : req.param('itemID'),
                })
                .fetch();
                return res.ok({'StockLevel':stock});
            }
            catch(err)
            {
              console.log(err);
              return res.serverError({'err':err});
            }
      },

 
      getStocklBalance: async (req, res) => {
            // Build our SQL query template.
            var NAMES_OF_SQL = `SELECT * from calculate_stock_lebel($1)`;
    
            // Send it to the database.
            var rawResult = await sails.sendNativeQuery(NAMES_OF_SQL, [ req.param('id') ]);
    
            sails.log(rawResult);
            // (result format depends on the SQL query that was passed in, and the adapter/dialect you're using)
    
            // Then parse the raw result and do whatever you like with it.
    
          //  return exits.success();
          
        
          return res.ok({
            success: true,
            balance: rawResult.rows
          });
     
      },
      
    
    
    index: function(req, res, next) {
        Stocklevel.find().exec(function(err, list) {
            if (err) return Error('Error');
            return res.view({
                result: list
            });
        });
    },

    show: function(req, res, next) {
        Stocklevel.findOneById(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    edit: function(req, res, next) {
        Stocklevel.findOne(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    update: function(req, res, next) {
        Stocklevel.update(req.param('id'), req.body, function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('stocklevel/show/' + req.param('id'));
        });
    },

    delete: function(req, res, next) {
        Stocklevel.destroy(req.param('id'), function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('/stocklevel');
        });
    },

};