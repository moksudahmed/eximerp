/**
 * FactoryController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    getAllFactory: async (req, res) => {
      //console.log("Tetstsrtsts");
      Factory.find((err, factories) => {
          if (err) {
            return res.serverError({
              success: false,
              message: 'Server Error'
            });
          }
          return res.ok({
            success: true,
            factories: factories
          });
        });
      },
      
      create: async function(req,res,next)
      {     console.log(req.allParams());
            var records = req.allParams();
            var factory = records.factory;
            try{
              var factory = await Factory.create({
                factoryName: factory.factoryName,
                contactNo: factory.contactNo,
                emailAddress: factory.emailAddress,
                factoryID: factory.factoryID,
                employeeID: factory.employeeID,
                warehouseID: factory.warehouseID,
                organizationID: factory.organizationID,
                factoryAddress: factory.factoryAddress,                
                }).fetch();
                return res.ok({'factory':factory});
            }
            catch(err)
            {
              console.log(err);
              return res.serverError({'err':err});
            }
      },  

      find: async function(req, res, next) {
        var finn = await Factory.findOne({
          factoryID : req.param('id')
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
          factory: finn
        });
      },
  
    findByOrganization: async function(req, res, next) {
        var finn = await Factory.find({
          organizationID : req.param('id')
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
          factory: finn
        });
      },
  
     
};

