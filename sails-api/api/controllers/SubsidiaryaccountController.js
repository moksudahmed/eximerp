/**
 * Subsidiaryaccount
 *
 * @description :: Server-side logic for managing Subsidiaryaccount
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {

    index: function(req, res, next) {
        Subsidiaryaccount.find().exec(function(err, list) {
            if (err) return Error('Error');
            return res.view({
                result: list
            });
        });
    },

    find: async function(req, res, next) {
        var finn = await Subsidiaryaccount.findOne({
            subSidiaryAccountID : req.param('id')
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
          subsidiaryaccount: finn
        });
      },
       
    findByChartOfAccount: async function(req, res, next) {
        var finn = await Subsidiaryaccount.find({
            chartOfAccountID : req.param('id')
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
          subsidiaryaccount: finn
        });
      },
      
      findChartOfAccountID: async function(req, res, next) {
        var order = await Chartofaccount.find({
            chartOfAccountID:req.param('id')
        }).populate('subsidiaryaccounts');
        
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
      findAccount: async function(req, res, next) {
        var order = await Subsidiaryaccount.find({
          sort: [{ accountName: 'ASC'}]
        }).populate('chartOfAccountID');    
        if (!order) {
            return res.serverError({
              success: false,
              message: 'Server Error'
            });
          }
          return res.ok({
            success: true,
            accounts: order
          });    
      },
      getAllAccount: async (req, res) => {
          Subsidiaryaccount.find((err, accounts) => {
            if (err) {
              return res.serverError({
                success: false,
                message: 'Server Error'
              });
            }
            return res.ok({
              success: true,
              accounts: accounts
            });
          });
        },
    
    show: function(req, res, next) {
        Subsidiaryaccount.findOneById(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    edit: function(req, res, next) {
        Subsidiaryaccount.findOne(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    update: function(req, res, next) {
        Subsidiaryaccount.update(req.param('id'), req.body, function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('subsidiaryaccount/show/' + req.param('id'));
        });
    },

    delete: function(req, res, next) {
        Subsidiaryaccount.destroy(req.param('id'), function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('/subsidiaryaccount');
        });
    },

};