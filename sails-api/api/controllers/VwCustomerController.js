/**
 * VwALedger
 *
 * @description :: Server-side logic for managing VwALedger
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
    getCustomer: async (req, res) => {
        VwCustomer.find((err, customer) => {
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
    
      findCustomer: async function(req, res, next) {
        var finn = await VwCustomer.find({
          accountName: req.param('term')
        });
        if (!finn) {
          return res.serverError({
            success: false,
            message: 'Server Error'
          });
        }
        return res.ok({
          success: true,
          customer: finn
        });
      },

};