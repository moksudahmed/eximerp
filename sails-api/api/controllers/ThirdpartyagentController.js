
/**
 * Thirdpartyagent
 *
 * @description :: Server-side logic for managing Thirdpartyagent
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {

    getThirdPartyAgent: async function(req, res, next) {
        var finn = await Client.find({
            clientType : ['insurance', 'cnfagent','foreign-bank']
        }).populate('agent').populate('contactinfo');
       
        if (!finn) {
          return res.serverError({
            success: false,
            message: 'Server Error'
          });
        }
        //console.log(finn);
        return res.ok({
          success: true,
          agents: finn
        });
      },
      
       
    index: function(req, res, next) {
        Thirdpartyagent.find().exec(function(err, list) {
            if (err) return Error('Error');
            return res.view({
                result: list
            });
        });
    },

    show: function(req, res, next) {
        Thirdpartyagent.findOneById(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    edit: function(req, res, next) {
        Thirdpartyagent.findOne(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    update: function(req, res, next) {
        Thirdpartyagent.update(req.param('id'), req.body, function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('cnfagent/show/' + req.param('id'));
        });
    },

    delete: function(req, res, next) {
        Thirdpartyagent.destroy(req.param('id'), function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('/cnfagent');
        });
    },

};