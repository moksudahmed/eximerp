/**
 * Item
 *
 * @description :: Server-side logic for managing Item
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
  getItem: async function(req, res, next) {
    var finn = await Item.find({
        sort: [{ name: 'ASC'}]
    }).populate('categoryID');
   
    if (!finn) {
      return res.serverError({
        success: false,
        message: 'Server Error'
      });
    }
    //console.log(finn);
    return res.ok({
      success: true,
      items: finn
    });
  },

    getAllItem: async (req, res) => {
        Item.find((err, item) => {
          if (err) {
            return res.serverError({
              success: false,
              message: 'Server Error'
            });
          }
          
          return res.ok({
            success: true,
            item: item
          });
        });
      },
      findById: async function(req, res, next) {
        var finn = await Item.find({
          itemID: req.param('id')
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
          item: finn
        });
      },

    findByTerm: async function(req, res, next) {
      var finn = await Item.find({
        name: req.param('term')
      });
      if (!finn) {
        return res.serverError({
          success: false,
          message: 'Server Error'
        });
      }
      return res.ok({
        success: true,
        item: finn
      });
    },

    create: async function(req,res,next)
    {        
       // var p1 = req.param("param1");
       var _param = req.allParams();
       var param = _param.item;// // attribute name
       console.log(req.allParams());
       try{
            let item = await Item.create({
                barcode: param.barcode,
                description: param.description,
                discount: param.discount,
                images: param.images,
                itemType: param.itemType,
                maxOrderQuantity: param.maxOrderQuantity,
                name : param.name,
                qrCode: param.qrCode,
                salePrice: param.salePrice,
                unitPrice: param.unitPrice,
                publish: param.publish,
                categoryID: param.categoryID,                
                sku: param.sku              
              })
            .fetch();                    
            return res.ok({'item':item});
            
        }
        catch(err)
        {
           console.log(err);
           return res.serverError({'err':err});
        }
        
    },
  
    index: function(req, res, next) {
        Item.find().exec(function(err, list) {
            if (err) return Error('Error');
            return res.view({
                result: list
            });
        });
    },

    show: function(req, res, next) {
        Item.findOneById(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    edit: function(req, res, next) {
        Item.findOne(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    update: function(req, res, next) {
        Item.update(req.param('id'), req.body, function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('item/show/' + req.param('id'));
        });
    },

    delete: function(req, res, next) {
        Item.destroy(req.param('id'), function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('/item');
        });
    },

};