/**
 * ChartofaccountController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index: function(req, res, next) {
    Chartofaccount.find().exec(function(err, list) {
          if (err) return Error('Error');
          return res.view({
              result: list
          });
      });
  },

  show: function(req, res, next) {
    Chartofaccount.findOne(req.param('id'), function Founded(err, value) {
        if (err) {
            return next(err);
        }
        res.view({
            element: value
        });
    });
},

  find: async function(req, res, next) {
    var finn = await Chartofaccount.findOne({
      chartOfAccountID: req.param('id')
    });
    if (!finn) {
      return res.serverError({
        success: false,
        message: 'Server Error'
      });
    }
    return res.ok({
      success: true,
      chartofaccount: finn
    });
  },

  findAccountName: async function(req, res, next) {
    var finn = await Chartofaccount.findOne({
      chartOfAccountID: req.param('id')
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
      chartofaccount: finn
    });
  },
  
  findByCategory: async function(req, res, next) {
    var finn = await Chartofaccount.find({
      categoryType: req.param('name')
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
      account: finn
    });
  },
  create: async function(req,res,next)
    {
      console.log(req);
          try{
              let chart = await Chartofaccount.create({
              categoryType : req.param('categoryType'),
              accountName : req.param('accountName'),
              desription : req.param('desription'),
              underCategory : req.param('underCategory'),
         //     natureType : req.param('natureType'),                           
              })
              .fetch();
              return res.ok({'Chartofaccount':chart});
          }
          catch(err)
          {
             console.log(err);
             return res.serverError({'err':err});
          }
    },

  edit: function(req, res, next) {
    Chartofaccount.findOne(req.param('id'), function Founded(err, value) {
          if (err) {
              return next(err);
          }
          res.view({
              element: value
          });
      });
  },

  update: function(req, res, next) {
    console.log(req);
    Chartofaccount.update(req.param('id'), req.body, function Update(err, value) {
          if (err) {
              return next(err);
          }
          return res.ok({'Sucess':req.param('id')});
          //return res.ok("Sucess");//redirect('chartofaccount/show/' + req.param('id'));
      });
  },

  delete: function(req, res, next) {
    
    Chartofaccount.destroy(req.param('id'), function Update(err, value) {
          if (err) {
              return next(err);
          }
          return res.redirect('/chartofaccount');
      });
  },
  
  getChartofaccount: async (req, res) => {
    Chartofaccount.find((err, chartofaccount) => {
      if (err) {
        return res.serverError({
          success: false,
          message: 'Server Error'
        });
      }
      return res.ok({
        success: true,
        chartofaccount: chartofaccount
      });
    });
  },

  findSubSididaryAccount: async function(req, res, next) {
    var order = await Chartofaccount.find().populate('subsidiaryaccounts');
    
    if (!order) {
        return res.serverError({
          success: false,
          message: 'Server Error'
        });
      }
      return res.ok({
        success: true,
        orders: order
      });
    
  },

  
  getAccounts: async (req, res) => {
       Chartofaccount.query('SELECT * from account_balance()', function(err, rawResult) {        
       if (err) { return res.serverError(err); }
       return res.ok({
        success: true,
        accounts: rawResult.rows
      });
      
     
     });
  },

  getDetermineAccount: async (req, res) => {
    try{
     
        // Send it to the database.
        var NAMES_OF_SQL = `SELECT determine_account($1,$2,$3)`;
        var rawResult = await sails.sendNativeQuery(NAMES_OF_SQL, [req.param('account'),req.param('nature'),req.param('payment')]);

        //sails.log(rawResult);
        // (result format depends on the SQL query that was passed in, and the adapter/dialect you're using)

        // Then parse the raw result and do whatever you like with it.

        //  return exits.success();
        return res.ok({
          success: true,
          results: rawResult
        });
          
      }
      catch(err)
      {
        console.log(err);
        return res.serverError({'err':err});
      }
  },

};