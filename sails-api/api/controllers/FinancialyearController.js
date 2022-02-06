/**
 * Financialyear
 *
 * @description :: Server-side logic for managing Financialyear
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
   
    index: function(req, res, next) {
        Financialyear.find().exec(function(err, list) {
            if (err) return Error('Error');
            return res.view({
                result: list
            });
        });
    },
    show: function(req, res, next) {
        
        Financialyear.findOne(req.param('id')).exec(function(err, data) {

            if (err) return Error('Error');
            return res.view({
                result: data
            });
    
            //return res.view('financialyear', {info: data[0]});
        }); 
        
    },
    getAllFinancialYear: async (req, res) => {
          Financialyear.find((err, fyears) => {
            if (err) {
              return res.serverError({
                success: false,
                message: 'Server Error'
              });
            }
            return res.ok({
              success: true,
              fyears: fyears
            });
          });
        },
    
      find: async function(req, res, next) {
          var finn = await Financialyear.findOne({
            financialYearID : req.param('id')
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
            fyear: finn
          });
        },
      
      create: async function(req,res,next)
        {        
           // var p1 = req.param("param1");
           var fRecord = req.allParams();
           var param = fRecord.financialYear;// // attribute name
           try{
                let fYear = await Financialyear.create({
                   startDate : param.startDate,
                   endDate : param.endDate,   
                   yearName: param.yearName                             
                  })
                .fetch();                    
                return res.ok({'financialYear':fYear});
                
            }
            catch(err)
            {
               console.log(err);
               return res.serverError({'err':err});
            }
            
    },
      
    edit: function(req, res, next) {
        Financialyear.findOne(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    update: function(req, res, next) {
        Financialyear.update(req.param('id'), req.body, function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('financialyear/show/' + req.param('id'));
        });
    },

    delete: function(req, res, next) {
        Financialyear.destroy(req.param('id'), function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('/financialyear');
        });
    },

};