/**
 * PersonController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const Person = require("../models/Person");

module.exports = {
  
  create: function(req, res, next, callback) {
    var params = req.body;

      //create a user
      Person.create(params, function(err, createdData) {
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

    getAllPerson: async (req, res) => {
        Person.find((err, persons) => {
          if (err) {
            return res.serverError({
              success: false,
              message: 'Server Error'
            });
          }
          return res.ok({
            success: true,
            persons: persons
          });
        });
      },
    
};

