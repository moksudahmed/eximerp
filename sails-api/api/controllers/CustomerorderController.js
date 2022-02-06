/**
 * Customerorder
 *
 * @description :: Server-side logic for managing Customerorder
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
    getOrder: async (req, res) => {
        Customerorder.find((err, order) => {
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
    
      create: async function(req,res,next)
      {        
         // var p1 = req.param("param1");
         var param = req.allParams();
         var _order = param.customerorder;// // attribute name
         var _orderdetails = param.orderdetails;
         var _payment = param.payment;
         var delivary = param.delivery;
         var billing = param.billingAddress;
         var _info = param.info;
         console.log(req.allParams());
       
          try{
              let order = await Customerorder.create({
                  clientAccountID: _order.clientAccountID,
                  discount: _order.discount,
                  orderDate:_order.orderDate,
                  receiveDate:_order.receiveDate,
                  status: _order.status,
                  orderTotal: _order.orderTotal,
                  netPay: _order.netPay,
                  employeeID: _order.employeeID          
                  
                })
              .fetch();
              _orderdetails.forEach(element => {
              Orderdetails.create({ 
                  discount : element.discount,
                  quantity : element.quantity,
                  unitPrice : element.unitPrice,
                  total: element.total,
                  customerOrderID : order.customerOrderID,
                  itemID :element.itemID }).exec(console.log);
              });              
              let payment = await Payment.create({
                amount: _payment.amount,
                paymentDate: _payment.paymentDate,
                paymentType:_payment.paymentType,
                status:_payment.status,
                clientAccountID: _payment.clientAccountID,
              })
            .fetch();
            let billing = await Billingaddress.create({
              addressLine1: billing.addressLine1,
              contactNo:billing.contactNo,
              customerOrderID:order.customerOrderID
            })
           .fetch();
            let delivary = await Deliveryaddress.create({
                addressLine1: delivary.addressLine1,
                contactNo:delivary.name,
                addressLine2:delivary.addressLine2,
                city:delivary.city,
                postcode:delivary.postcode,
                mobileNo:delivary.mobileNo,
                vehicleNo:delivary.vehicleNo,
                customerOrderID:order.customerOrderID
              })          
            .fetch();
             var cash = 0;
             var credit = 0;
             var type = '';
             var cash = 0;
             var credit = 0;
             // Build our SQL query template.
             if (payment.amount >= order.netPay){                
                type = 'Cash';
                cash = order.netPay;
             }
             else if( payment.amount <= 0 ){
                type = 'Credit';
                credit = order.netPay;
             }
             else{
                 type = 'Cash-Credit';
                 cash = payment.amount;
                 credit = order.netPay - cash; 
             }
            sails.log(type);
             // Send it to the database.
             var NAMES_OF_SQL = `SELECT sales_transaction($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`;
             var rawResult = await sails.sendNativeQuery(NAMES_OF_SQL, [_order.orderDate,'Customer Order', _info.branch,_info.financialYearId,_info.userID,_order.netPay,order.customerOrderID,'Sales',type,cash]);
 
             sails.log(rawResult);
             // (result format depends on the SQL query that was passed in, and the adapter/dialect you're using)
 
             // Then parse the raw result and do whatever you like with it.
 
           //  return exits.success();
           
              return res.ok({'Order':order});
              
          }
          catch(err)
          {
             console.log(err);
             return res.serverError({'err':err});
          }
          
      },
     findByOrderID: async function(req, res, next) {
        var finn = await Customerorder.find({
            customerOrderID: req.param('id')
        }).populate('details');
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
      
      findByOrganization: async function(req, res, next) {
        var order = await Branch.find({
                organizationID : req.param('id')
         })
        .populate('customerorders');
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
        Customerorder.find().exec(function(err, list) {
            if (err) return Error('Error');
            return res.view({
                result: list
            });
        });
    },

    show: function(req, res, next) {
        Customerorder.findOneById(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    edit: function(req, res, next) {
        Customerorder.findOne(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    update: function(req, res, next) {
        Customerorder.update(req.param('id'), req.body, function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('customerorder/show/' + req.param('id'));
        });
    },

    delete: function(req, res, next) {
        Customerorder.destroy(req.param('id'), function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('/customerorder');
        });
    },

};