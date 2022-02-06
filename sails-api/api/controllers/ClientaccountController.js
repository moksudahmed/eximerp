/**
 * Clientaccount
 *
 * @description :: Server-side logic for managing Clientaccount
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
    getClientAccount: async (req, res) => {
        Clientaccount.find((err, account) => {
          if (err) {
            return res.serverError({
              success: false,
              message: 'Server Error'
            });
          }
          return res.ok({
            success: true,
            account: account
          });
        });
      },
    index: function(req, res, next) {
        Clientaccount.find().exec(function(err, list) {
            if (err) return Error('Error');
            return res.view({
                result: list
            });
        });
    },

    show: function(req, res, next) {
        Clientaccount.findOneById(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    edit: function(req, res, next) {
        Clientaccount.findOne(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    update: function(req, res, next) {
        Clientaccount.update(req.param('id'), req.body, function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('clientaccount/show/' + req.param('id'));
        });
    },

    delete: function(req, res, next) {
        Clientaccount.destroy(req.param('id'), function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('/clientaccount');
        });
    },

};