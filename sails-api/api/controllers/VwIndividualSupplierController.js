/**
 * VwIndividualSupplier
 *
 * @description :: Server-side logic for managing VwIndividualSupplier
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
    getIndividualSupplier: async (req, res) => {
        VwIndividualSupplier.find((err, supplier) => {
          if (err) {
            return res.serverError({
              success: false,
              message: 'Server Error'
            });
          }
          return res.ok({
            success: true,
            supplier: supplier
          });
        });
      },
      getLocalIndividualSupplier: async function(req, res, next) {
        var finn = await VwIndividualSupplier.find({
            type: req.param('category')
        });
        if (!finn) {
          return res.serverError({
            success: false,
            message: 'Server Error'
          });
        }
        return res.ok({
          success: true,
          supplier: finn
        });
      },
   
    index: function(req, res, next) {
        VwIndividualSupplier.find().exec(function(err, list) {
            if (err) return Error('Error');
            return res.view({
                result: list
            });
        });
    },

    show: function(req, res, next) {
        VwIndividualSupplier.findOneById(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    edit: function(req, res, next) {
        VwIndividualSupplier.findOne(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    update: function(req, res, next) {
        VwIndividualSupplier.update(req.param('id'), req.body, function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('vwIndividualSupplier/show/' + req.param('id'));
        });
    },

    delete: function(req, res, next) {
        VwIndividualSupplier.destroy(req.param('id'), function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('/vwIndividualSupplier');
        });
    },

};