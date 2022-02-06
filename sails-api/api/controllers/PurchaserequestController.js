/**
 * Purchaserequest
 *
 * @description :: Server-side logic for managing Purchaserequest
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
    getPurchaseRequest: async (req, res) => {
        Purchaserequest.find((err, result) => {
          if (err) {
            return res.serverError({
              success: false,
              message: 'Server Error'
            });
          }
          return res.ok({
            success: true,
            result: result
          });
        });
      },

    findByStatus: async function(req, res, next) {
        var finn = await Purchaserequest.find({
          status: req.param('status')
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
          purchaserequest: finn
        });
      },
     
    create: async function(req,res,next)
    {    console.log(req.allParams());
          var records = req.allParams();
          var cart = records.cart;
          var request = records.purchaserequest;// // attribute name
          try{
            var post = await Purchaserequest.create({
                departmentID: request.departmentID,
                date: request.date,
                status: request.status,
          }).fetch();
          cart.forEach(element => {
            Purchaserequestcart.create({ 
              itemID : element.itemID,
              name : element.name,
              quantity : element.quantity,
              weight: element.weight,
              unitPrice: element.unitPrice,
              purchaseRequestID : post.purchaseRequestID
             }).exec(console.log);
          });    
              return res.ok({'Purchase Request Cart':post});
          }
          catch(err)
          {
             console.log(err);
             return res.serverError({'err':err});
          }
    },
    index: function(req, res, next) {
        Purchaserequest.find().exec(function(err, list) {
            if (err) return Error('Error');
            return res.view({
                result: list
            });
        });
    },

    show: function(req, res, next) {
        Purchaserequest.findOneById(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    edit: function(req, res, next) {
        Purchaserequest.findOne(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    update: function(req, res, next) {
        Purchaserequest.update(req.param('id'), req.body, function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('purchaserequest/show/' + req.param('id'));
        });
    },

    delete: function(req, res, next) {
        Purchaserequest.destroy(req.param('id'), function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('/purchaserequest');
        });
    },

};