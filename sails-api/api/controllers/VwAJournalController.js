/**
 * VwAJournal
 *
 * @description :: Server-side logic for managing VwAJournal
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
    getJournal: async (req, res) => {
        VwAJournal.find((err, journal) => {
          if (err) {
            return res.serverError({
              success: false,
              message: 'Server Error'
            });
          }
          return res.ok({
            success: true,
            journal: journal
          });
        });
      },

      findByName: async function(req, res, next) {
        var finn = await VwAJournal.find({
          accountName: req.param('name')
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
          journal: finn
        });
      },
   
    index: function(req, res, next) {
        VwAJournal.find().exec(function(err, list) {
            if (err) return Error('Error');
            return res.view({
                result: list
            });
        });
    },

    show: function(req, res, next) {
        VwAJournal.findOneById(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    edit: function(req, res, next) {
        VwAJournal.findOne(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    update: function(req, res, next) {
        VwAJournal.update(req.param('id'), req.body, function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('vwAJournal/show/' + req.param('id'));
        });
    },

    delete: function(req, res, next) {
        VwAJournal.destroy(req.param('id'), function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('/vwAJournal');
        });
    },

};