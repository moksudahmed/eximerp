/**
 * VwCorporateSupplier
 *
 * @description :: Server-side logic for managing VwCorporateSupplier
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
     getCorporateSupplier: async (req, res) => {
        VwCorporateSupplier.find((err, supplier) => {
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
      getLocaCorporateSupplier: async function(req, res, next) {
        var finn = await VwCorporateSupplier.find({
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
        VwCorporateSupplier.find().exec(function(err, list) {
            if (err) return Error('Error');
            return res.view({
                result: list
            });
        });
    },

    show: function(req, res, next) {
        VwCorporateSupplier.findOneById(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    edit: function(req, res, next) {
        VwCorporateSupplier.findOne(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    update: function(req, res, next) {
        VwCorporateSupplier.update(req.param('id'), req.body, function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('vwCorporateSupplier/show/' + req.param('id'));
        });
    },

    delete: function(req, res, next) {
        VwCorporateSupplier.destroy(req.param('id'), function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('/vwCorporateSupplier');
        });
    },

};