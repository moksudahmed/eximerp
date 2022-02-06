/**
 * VwALedger
 *
 * @description :: Server-side logic for managing VwALedger
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
    getStock: async (req, res) => {
        VwStock.find((err, stock) => {
          if (err) {
            return res.serverError({
              success: false,
              message: 'Server Error'
            });
          }
          return res.ok({
            success: true,
            stock: stock
          });
        });
      },

};