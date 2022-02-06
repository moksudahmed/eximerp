/**
 * Purchaseorder
 *
 * @description :: Server-side logic for managing Purchaseorder
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
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