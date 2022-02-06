/**
 * WarehouseController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    getAllWarehouse: async (req, res) => {
      //console.log("Tetstsrtsts");
      Warehouse.find((err, warehouses) => {
          if (err) {
            return res.serverError({
              success: false,
              message: 'Server Error'
            });
          }
          return res.ok({
            success: true,
            warehouses: warehouses
          });
        });
      },
   
      find: async function(req, res, next) {
        var finn = await Warehouse.findOne({
          warehouseID : req.param('id')
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
          warehouse: finn
        });
      },
  
    findByOrganization: async function(req, res, next) {
        var finn = await Warehouse.find({
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
          warehouse: finn
        });
      },
  
      create: async function(req,res,next)
      {            
            var records = req.allParams();
            var warehouse = records.warehouse;
            console.log(warehouse);
            try{
                let warehouse = await Warehouse.create({
                //  warehouseID: warehouse.warehouseID,
                  location : warehouse.location,
                  contactNo :warehouse.contactNo,
                  name : warehouse.name,
                  factoryID : warehouse.factoryID,                
                  deliveryID : warehouse.deliveryID,
                  inventoryDate : warehouse.inventoryDate,                            
                })
                .fetch();
                return res.ok({'warehouse':warehouse});
            }
            catch(err)
            {
               console.log(err);
               return res.serverError({'err':err});
            }
      },   
     
};

