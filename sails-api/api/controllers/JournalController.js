/**
 * Journal
 *
 * @description :: Server-side logic for managing Journal
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
    index: function(req, res, next) {
        Journal.find().exec(function(err, list) {
            if (err) return Error('Error');
            return res.view({
                result: list
            });
        });
    },

    create: async function(req,res,next)
    {        
        try{
            let journal = await Journal.create({
                amount: req.param('amount'),
                debitCredit: req.param('debitCredit'),
                invoiceNo: req.param('invoiceNo'),
                chartOfAccountID: req.param('chartOfAccountID'),
                subSidiaryAccountID: req.param('subSidiaryAccountID'),
                transactionID: req.param('transactionID'),
                particulars: req.param('particulars'),              
              })
            .fetch();
            return res.ok({'journal':journal});
            
        }
        catch(err)
        {
           console.log(err);
           return res.serverError({'err':err});
        }
    },
    show: function(req, res, next) {
        Journal.findOneById(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    edit: function(req, res, next) {
        Journal.findOne(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    update: function(req, res, next) {
        Journal.update(req.param('id'), req.body, function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('journal/show/' + req.param('id'));
        });
    },

    delete: function(req, res, next) {
        Journal.destroy(req.param('id'), function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('/journal');
        });
    },

    getAllJournal: async (req, res) => {
        Journal.find((err, journal) => {
          if (err) {
            return res.serverError({
              success: false,
              message: 'Server Error'
            });
          }
          return res.ok({
            success: true,
            journal: journal
          });
        });
      },
    

};