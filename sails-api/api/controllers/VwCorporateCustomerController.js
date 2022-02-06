/**
 * VwCorporateCustomer
 *
 * @description :: Server-side logic for managing VwCorporateCustomer
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
    getCorporateCustomer: async (req, res) => {
        VwCorporateCustomer.find((err, customer) => {
          if (err) {
            return res.serverError({
              success: false,
              message: 'Server Error'
            });
          }
          return res.ok({
            success: true,
            customer: customer
          });
        });
      },

    index: function(req, res, next) {
        VwCorporateCustomer.find().exec(function(err, list) {
            if (err) return Error('Error');
            return res.view({
                result: list
            });
        });
    },

    show: function(req, res, next) {
        VwCorporateCustomer.findOneById(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    edit: function(req, res, next) {
        VwCorporateCustomer.findOne(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    update: function(req, res, next) {
        VwCorporateCustomer.update(req.param('id'), req.body, function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('vwCorporateCustomer/show/' + req.param('id'));
        });
    },

    delete: function(req, res, next) {
        VwCorporateCustomer.destroy(req.param('id'), function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('/vwCorporateCustomer');
        });
    },

};