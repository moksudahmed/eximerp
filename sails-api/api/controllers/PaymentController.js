/**
 * Payment
 *
 * @description :: Server-side logic for managing Payment
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
    create: async function(req,res,next)
      { 
          console.log(req.allParams());
          var records = req.allParams();
          var payment = records.payment;
          var transaction = records.transaction;// // attribute name
          var journal = records.journal;
          try{
            var _payment = await Payment.create({
              paymentDate: payment.paymentDate,
              amount: payment.amount,
              paymentType: payment.paymentType,
              status: payment.status,
              clientAccountID: payment.clientAccountID
          }).fetch();
          var tran = await Transaction.create({
            transactionDate: transaction.transactionDate,
            transactionTitle: transaction.transactionTitle,
            userID: transaction.userID,
            branchID: transaction.branchID,
            financialYearID: transaction.financialYearID,
            entryDateTime :transaction.transactionDate,
            paymentID : _payment.paymentID
         }).fetch();
         journal.forEach(element => {
            Journal.create({ 
              transactionID: tran.transactionID,
              amount: element.amount,
              debitCredit: element.debitCredit,
              invoiceNo: element.invoiceNo,
              chartOfAccountID: element.chartOfAccountID,
              subSidiaryAccountID: element.subSidiaryAccountID,
           //   particulars: element.particulars
             }).exec(console.log);
          });
         
        // sails.log('Finn\'s id is:', post);
       //     return res.ok(post,cart,salescontract);
            return res.ok({
              success: true,
              transaction: tran,
             // cart: cart,
             // contract: salesContract
            });
          }
          catch(err)
          {
            console.log(err);
            return res.serverError({'err':err});
          }
    },
    index: function(req, res, next) {
        Payment.find().exec(function(err, list) {
            if (err) return Error('Error');
            return res.view({
                result: list
            });
        });
    },

    show: function(req, res, next) {
        Payment.findOneById(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    edit: function(req, res, next) {
        Payment.findOne(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    update: function(req, res, next) {
        Payment.update(req.param('id'), req.body, function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('payment/show/' + req.param('id'));
        });
    },

    delete: function(req, res, next) {
        Payment.destroy(req.param('id'), function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('/payment');
        });
    },

};