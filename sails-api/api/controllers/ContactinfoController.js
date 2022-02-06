/**
 * Address
 *
 * @description :: Server-side logic for managing Address
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {

    findCustomerContactIno: async function(req, res, next) {
        console.log(req.param('id'));
        var finn = await Contactinfo.find({
            clientID: req.param('id')
        });
        if (!finn) {
          return res.serverError({
            success: false,
            message: 'Server Error'
          });
        }
        console.log(finn);
        return res.ok({
          success: true,
          contact: finn
        });
      },


  create: function(req, res, next, callback) {
    var params = req.body;

      //create a user
      Contactinfo.create(params, function(err, createdData) {
          if(err){
            return res.badRequest({
                          error: err
                     });
           } else {
             return res.json({
                        data : createdData
             });
           }
      });
    },  

    index: function(req, res, next) {
        Address.find().exec(function(err, list) {
            if (err) return Error('Error');
            return res.view({
                result: list
            });
        });
    },

    show: function(req, res, next) {
        Address.findOneById(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    edit: function(req, res, next) {
        Address.findOne(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    update: function(req, res, next) {
        Address.update(req.param('id'), req.body, function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('address/show/' + req.param('id'));
        });
    },

    delete: function(req, res, next) {
        Address.destroy(req.param('id'), function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('/address');
        });
    },

};