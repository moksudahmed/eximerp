/**
 * Transaction
 *
 * @description :: Server-side logic for managing Transaction
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
    index: function(req, res, next) {
        Transaction.find().exec(function(err, list) {
            if (err) return Error('Error');
            return res.view({
                result: list
            });
        });
    },
    create: async function(req,res,next)
    {        
       // var p1 = req.param("param1");
       var tran = req.allParams();
       var tra = tran.transaction;// // attribute name
       var jor = tran.journal;
     //   console.log(req.allParams());
        try{
            let transaction = await Transaction.create({
                transactionDate: tra[0].transactionDate,
                transactionTitle: tra[0].transactionTitle,
                branchID: tra[0].branchID,
                financialYearID: tra[0].financialYearID,
                entryDateTime: tra[0].entryDateTime,
                userID: tra[0].userID,
                paymentID: tra[0].paymentID,              
              })
            .fetch();
            jor.forEach(element => {
            Journal.create({ 
                amount : element.amount,
                debitCredit : element.debitCredit,
                invoiceNo : element.invoiceNo,
                chartOfAccountID : element.chartOfAccountID,
                subSidiaryAccountID : element.subSidiaryAccountID,
                transactionID : transaction.transactionID,
                particulars : element.particulars }).exec(console.log);
            });
                    
            return res.ok({'transaction':transaction});
            
        }
        catch(err)
        {
           console.log(err);
           return res.serverError({'err':err});
        }
        
    },
    create2: async function(req,res,next)
    {        
       var tran = req.allParams();
       var tra = tran.transaction;// // attribute name
       var jor = tran.journal;

        try{
            let transaction = await Transaction.create({
                transactionDate: tra[0].transactionDate,
                transactionTitle: tra[0].transactionTitle,
                branchID: tra[0].branchID,
                financialYearID: tra[0].financialYearID,
                entryDateTime: tra[0].entryDateTime,
                userID: tra[0].userID,
                paymentID: tra[0].paymentID,              
              })
            .fetch();
            let journal = await Journal.createEach([{
                    amount: jor[0].amount,
                    debitCredit: jor[0].debitCredit,
                    invoiceNo: jor[0].invoiceNo,
                    chartOfAccountID: jor[0].chartOfAccountID,
                    subSidiaryAccountID: jor[0].subSidiaryAccountID,
                    transactionID: transaction.transactionID,
                    particulars: jor[0].particulars
                },
                {
                    amount: jor[1].amount,
                    debitCredit: jor[1].debitCredit,
                    invoiceNo: jor[1].invoiceNo,
                    chartOfAccountID: jor[1].chartOfAccountID,
                    subSidiaryAccountID: jor[1].subSidiaryAccountID,
                    transactionID:transaction.transactionID,
                    particulars: jor[1].particulars
                }])
                .fetch();
            
            return res.ok({'transaction':transaction});
            
        }
        catch(err)
        {
           console.log(err);
           return res.serverError({'err':err});
        }
        
    },
    create1: async function(req,res,next)
    {        
        console.log(req);
       /* try{
            let transaction = await Transaction.create({
                transactionDate: req.param('transactionDate'),
                transactionTitle: req.param('transactionTitle'),
                branchID: req.param('branchID'),
                financialYearID: req.param('financialYearID'),
                entryDateTime: req.param('entryDateTime'),
                userID: req.param('userID'),
                paymentID: req.param('paymentID'),              
              })
            .fetch();
            let journal = await Journal.createEach([{
                amount: reqData[0].journal.amount,
                debitCredit: reqData[0].journal.debitCredit,
                invoiceNo: reqData[0].journal.invoiceNo,
                chartOfAccountID: reqData[0].journal.chartOfAccountID,
                subSidiaryAccountID: reqData[0].journal.subSidiaryAccountID,
                transactionID: transaction.transactionID,
                particulars: reqData[0].journalparticulars,
                }])
                .fetch();
            return res.ok({'transaction':transaction});
            
        }
        catch(err)
        {
           console.log(err);
           return res.serverError({'err':err});
        }*/
    },
    getTransactions: async (req, res) => {
        Transaction.find((err, transaction) => {
          if (err) {
            return res.serverError({
              success: false,
              message: 'Server Error'
            });
          }
          return res.ok({
            success: true,
            transaction: transaction
          });
        });
      },
    show: function(req, res, next) {
        Transaction.findOneById(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    edit: function(req, res, next) {
        Transaction.findOne(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    update: function(req, res, next) {
        Transaction.update(req.param('id'), req.body, function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('transaction/show/' + req.param('id'));
        });
    },

    delete: function(req, res, next) {
        Transaction.destroy(req.param('id'), function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('/transaction');
        });
    },

};