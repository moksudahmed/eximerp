/**
 * VwIndividualCustomer
 *
 * @description :: Server-side logic for managing VwIndividualCustomer
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {

    getIndividualCustomer: async (req, res) => {
        VwIndividualCustomer.find((err, customer) => {
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
        VwIndividualCustomer.find().exec(function(err, list) {
            if (err) return Error('Error');
            return res.view({
                result: list
            });
        });
    },

    show: function(req, res, next) {
        VwIndividualCustomer.findOneById(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    edit: function(req, res, next) {
        VwIndividualCustomer.findOne(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    update: function(req, res, next) {
        VwIndividualCustomer.update(req.param('id'), req.body, function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('vwIndividualCustomer/show/' + req.param('id'));
        });
    },

    delete: function(req, res, next) {
        VwIndividualCustomer.destroy(req.param('id'), function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('/vwIndividualCustomer');
        });
    },

};