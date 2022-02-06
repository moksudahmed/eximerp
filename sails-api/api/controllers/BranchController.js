/**
 * BranchController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {  
  
    getAllBranch: async (req, res) => {
      //console.log("Tetstsrtsts");
        Branch.find((err, branches) => {
          if (err) {
            return res.serverError({
              success: false,
              message: 'Server Error'
            });
          }
          return res.ok({
            success: true,
            branches: branches
          });
        });
      },
  
    find: async function(req, res, next) {
        var finn = await Branch.findOne({
          branchID : req.param('id')
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
          branch: finn
        });
      },
  
      findByOrganization: async function(req, res, next) {
        var finn = await Branch.find({
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
          branch: finn
        });
      },
  
  findByOrganizationPurchaseOrder: async function(req, res, next) {
   
   /* var finn = await Branch.find({
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
      branch: finn
    });*/
  },

  createBranch: async (req, res) => {        
        let branchContent = req.body.text;
        let newBranch = {
          text: branchContent
        };
        console.log(newBranch);
        if (!branchContent) {
          return res.badRequest({
            success: false,
            message: 'Missing content of branch'
          });
        } else {
          Branch.create(newBranch).exec((err) => {
            if (err) {
              return res.serverError({
                success: false,
                message: 'Server Error'
              });
            }
            return res.ok({
              success: true
            });
          });
        }
      },
    
    create: async function(req,res,next)
    {     console.log(req.allParams());
          var records = req.allParams();
          var branch = records.branch;
          try{
            var branch = await Branch.create({
              branchAddress : branch.branchAddress,
              branchName : branch.branchName,
              contactNo : branch.contactNo,
              emailAddress : branch.emailAddress,
              employeeID : branch.employeeID,
              organizationID : branch.organizationID,
              city : branch.city,
              country : branch.country,
          }).fetch();
              return res.ok({'branch':branch});
          }
          catch(err)
          {
             console.log(err);
             return res.serverError({'err':err});
          }
    },  
    update: function(req, res) {
      console.log('testtest');
      let data = req.body;
      let id = req.param('id');

      let updteBranch = Branch.update({ branchID: id }).set(data).fetch();

      sails.log(updteBranch);

      return res.ok();
  },

 
  getABranch: async (req, res) => {
   /* var finn = await Branch.findOne({
      branchName: 'Dhaka'
    });*/
   /* if (!finn) {
      sails.log('Could not find Finn, sorry.');
    }
    else {
      sails.log('Found "%s"', finn.branchName);
    }*/

     //var total = await Branch.count({branchName:'Sylhet'});
   // sails.log(`There ${total===1?'is':'are'} ${total} user${total===1?'':'s'} named "Flynn".`);
   
    //Branch.query('SELECT "branchName" FROM "o_tbl_Branch" WHERE "branchName" = $1', [ 'Sylhet' ] ,function(err, rawResult) {
//      Branch.query('SELECT o."organizationName", o."organizationID", b."branchName", b.address FROM public."o_tbl_Organization" o, public."o_tbl_Branch" b WHERE o."organizationID" = b."organizationID"', function(err, rawResult) {   
        Branch.query('SELECT * from income_statement()', function(err, rawResult) {        
      if (err) { return res.serverError(err); }
    
      sails.log(rawResult);
      // (result format depends on the SQL query that was passed in, and the adapter you're using)
    
      // Then parse the raw result and do whatever you like with it.
    
      return res.ok();
    
    });
    },
};

