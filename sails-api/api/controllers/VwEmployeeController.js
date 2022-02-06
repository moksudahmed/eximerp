/**
 * VwAJournal
 *
 * @description :: Server-side logic for managing VwAJournal
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
    getAllEmployee: async (req, res) => {
        VwEmployees.find((err, employee) => {
          if (err) {
            return res.serverError({
              success: false,
              message: 'Server Error'
            });
          }
          return res.ok({
            success: true,
            employees: employee
          });
        });
      },
   

};