/**
 * VwALedger
 *
 * @description :: Server-side logic for managing VwALedger
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
    getLedger: async (req, res) => {
        VwALedger.find((err, ledger) => {
          if (err) {
            return res.serverError({
              success: false,
              message: 'Server Error'
            });
          }
          return res.ok({
            success: true,
            ledger: ledger
          });
        });
      },

      findByName: async function(req, res, next) {
        var finn = await VwALedger.find({
          accountName: req.param('name')
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
          ledger: finn
        });
      },
       
    index: function(req, res, next) {
        VwALedger.find().exec(function(err, list) {
            if (err) return Error('Error');
            return res.view({
                result: list
            });
        });
    },

    show: function(req, res, next) {
        VwALedger.findOneById(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    edit: function(req, res, next) {
        VwALedger.findOne(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    update: function(req, res, next) {
        VwALedger.update(req.param('id'), req.body, function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('vwALedger/show/' + req.param('id'));
        });
    },

    delete: function(req, res, next) {
        VwALedger.destroy(req.param('id'), function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('/vwALedger');
        });
    },

    
  getIncomeStatement: async (req, res) => {
    /* var finn = await Branch.findOne({
       branchName: 'Dhaka'
     });*/
    /* if (!finn) {
       sails.log('Could not find Finn, sorry.');
     }
     else {
       sails.log('Found "%s"', finn.branchName);
     }*/
 
      //var total = await Branch.count({branchName:'Sylhet'});
    // sails.log(`There ${total===1?'is':'are'} ${total} user${total===1?'':'s'} named "Flynn".`);
    
     //Branch.query('SELECT "branchName" FROM "o_tbl_Branch" WHERE "branchName" = $1', [ 'Sylhet' ] ,function(err, rawResult) {
 //      Branch.query('SELECT o."organizationName", o."organizationID", b."branchName", b.address FROM public."o_tbl_Organization" o, public."o_tbl_Branch" b WHERE o."organizationID" = b."organizationID"', function(err, rawResult) {   
       VwALedger.query('SELECT * from income_statement()', function(err, rawResult) {        
       if (err) { return res.serverError(err); }
       return res.ok({
        success: true,
        income: rawResult.rows
      });
      return res.ok();
     
     });
     },

};