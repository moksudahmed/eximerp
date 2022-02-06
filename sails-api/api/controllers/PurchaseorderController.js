//const BranchController = require("./BranchController");
//const Branch = require("../models/Branch");

/**
 * Purchaseorder
 *
 * @description :: Server-side logic for managing Purchaseorder
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
    getPurchaseOrder: async (req, res) => {
        Purchaseorder.find((err, order) => {
          if (err) {
            return res.serverError({
              success: false,
              message: 'Server Error'
            });
          }
          return res.ok({
            success: true,
            order: order
          });
        });
      },
      findByTerm: async function(req, res, next) {
        console.log(req.param('id'));
        var finn = await Purchaseorder.find({
          purchaseOrderID: req.param('id')
        });
        if (!finn) {
          return res.serverError({
            success: false,
            message: 'Server Error'
          });
        }
        return res.ok({
          success: true,
          order: finn
        });
      },
      findById: async function(req, res, next) {
        var finn = await Purchaseorder.find({
          purchaseOrderID: req.param('id')
        }).populate('details').populate('contract');
        if (!finn) {
          return res.serverError({
            success: false,
            message: 'Server Error'
          });
        }
        return res.ok({
          success: true,
          order: finn
        });
      },
      
      create: async function(req,res,next)
      { 
          console.log(req.allParams());
          var records = req.allParams();
          var cart = records.orderdetails;
          var request = records.purchaseorder;// // attribute name
          var contract = records.salescontract;
          try{
            var post = await Purchaseorder.create({
              date: request.date,
              orderTotal: request.orderTotal,
              shippingDate: request.shippingDate,
              tax: request.tax,
              vat: request.vat,
              netTotal: request.netTotal,
              localID: request.localID,
              purchaseRequestID: request.purchaseRequestID,
             // qutationID: request.qutationID,
              //salesContractID: 33,
              branchID: request.branchID,
          }).fetch();
          cart.forEach(element => {
            Purchaseorderdetails.create({ 
              itemID: element.itemID,
              quantity: element.quantity,
              weight:    element.weight,
              unitPrice: element.unitPrice,
              purchaseOrderID: post.purchaseOrderID
             }).exec(console.log);
          });
          var salesContract = await Salescontract.create({
            paymentTerms: contract.paymentTerms,
            isImported: contract.isImported,
            bankName: contract.bankName,
            contractNo: contract.contractNo,
            date: contract.date,
            deliveryPeriodFrom: contract.deliveryPeriodFrom,
            deliveryPeriodTo: contract.deliveryPeriodTo,
            iECNo: contract.iECNo,
            route: contract.route,
            determinationOfMeserment:contract.determinationOfMeserment,
            modeOfTransport: contract.modeOfTransport,
            paymentMethod: contract.paymentMethod,
            witnessID:contract.witnessID,
            internationalID: request.localID,
            purchaseOrderID: post.purchaseOrderID
         }).fetch();   
         sails.log('Finn\'s id is:', post);
       //     return res.ok(post,cart,salescontract);
            return res.ok({
              success: true,
              order: post,
              cart: cart,
              contract: salesContract
            });
          }
          catch(err)
          {
            console.log(err);
            return res.serverError({'err':err});
          }
    },
      find: async function(req, res, next) {
        var finn = await Purchaseorder.findOne({
          branchID : req.param('id')
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
          branch: finn
        });
      },
  
    findByOrganization: async function(req, res, next) {
        var order = await Branch.find({
                organizationID : req.param('id')
         })
        .populate('purchaseorders');
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
  

    index: function(req, res, next) {
        Purchaseorder.find().exec(function(err, list) {
            if (err) return Error('Error');
            return res.view({
                result: list
            });
        });
    },

    show: function(req, res, next) {
        Purchaseorder.findOneById(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    edit: function(req, res, next) {
        Purchaseorder.findOne(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    update: function(req, res, next) {
        Purchaseorder.update(req.param('id'), req.body, function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('purchaseorder/show/' + req.param('id'));
        });
    },

    delete: function(req, res, next) {
        Purchaseorder.destroy(req.param('id'), function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('/purchaseorder');
        });
    },

};


