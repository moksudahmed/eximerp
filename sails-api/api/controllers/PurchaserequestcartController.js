/**
 * Purchaserequestcart
 *
 * @description :: Server-side logic for managing Purchaserequestcart
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
    getPurchaseRequestCart: async function(req, res, next) {
        var finn = await Purchaserequestcart.find({
            purchaseRequestID: req.param('id')
        });
        if (!finn) {
          return res.serverError({
            success: false,
            message: 'Server Error'
          });
        }
        return res.ok({
          success: true,
          cart: finn
        });
      },
   
    index: function(req, res, next) {
        Purchaserequestcart.find().exec(function(err, list) {
            if (err) return Error('Error');
            return res.view({
                result: list
            });
        });
    },

    show: function(req, res, next) {
        Purchaserequestcart.findOneById(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    edit: function(req, res, next) {
        Purchaserequestcart.findOne(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    update: function(req, res, next) {
        Purchaserequestcart.update(req.param('id'), req.body, function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('purchaserequestcart/show/' + req.param('id'));
        });
    },

    delete: function(req, res, next) {
        Purchaserequestcart.destroy(req.param('id'), function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('/purchaserequestcart');
        });
    },

};