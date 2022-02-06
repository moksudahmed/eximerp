/**
 * Category
 *
 * @description :: Server-side logic for managing Category
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
    
    create: async function(req,res,next)
    {     console.log(req.allParams());
          var records = req.allParams();
          var category = records.category;
          try{
            var category = await Category.create({
                categoryID: category.categoryID,
                categoryName:category.categoryName,
                description: category.description,
                level: category.level, 
                hasSubCategory: category.hasSubCategory                
              }).fetch();
              return res.ok({'category':category});
          }
          catch(err)
          {
            console.log(err);
            return res.serverError({'err':err});
          }
    },  

    getCategory: async (req, res) => {
        //console.log("Tetstsrtsts");
          Category.find((err, category) => {
            if (err) {
              return res.serverError({
                success: false,
                message: 'Server Error'
              });
            }
            return res.ok({
              success: true,
              category: category
            });
          });
        },
      
    index: function(req, res, next) {
        Category.find().exec(function(err, list) {
            if (err) return Error('Error');
            return res.view({
                result: list
            });
        });
    },

    show: function(req, res, next) {
        Category.findOneById(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    edit: function(req, res, next) {
        Category.findOne(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    update: function(req, res, next) {
        Category.update(req.param('id'), req.body, function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('category/show/' + req.param('id'));
        });
    },

    delete: function(req, res, next) {
        Category.destroy(req.param('id'), function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('/category');
        });
    },

};