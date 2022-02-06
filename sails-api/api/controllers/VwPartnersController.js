/**
 * VwPartnersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {  
  getPartners: async (req, res) => {
    VwPartners.find((err, customer) => {
      if (err) {
        return res.serverError({
          success: false,
          message: 'Server Error'
        });
      }
      return res.ok({
        success: true,
        partners: customer
      });
    });
  },


  findByOrganization: async (req, res) => {
 
       var NAMES_OF_PETS_SQL = `SELECT * FROM vw_partners WHERE "organizationID"=$1`;

          // Send it to the database.
          var rawResult = await sails.sendNativeQuery(NAMES_OF_PETS_SQL, [ req.param('id') ]);
          sails.log(rawResult);
         
        return res.ok({
          success: true,
          partners: rawResult.rows
        });
    },

};

