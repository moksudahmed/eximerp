/**
 * DepartmentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
  create: async function(req,res,next)
  {     console.log(req.allParams());
        var records = req.allParams();
        var department = records.department;
        try{
          var department = await Department.create({
            organizationID: department.organizationID,
            branchID: department.branchID,
            departmentName: department.departmentName,
            location: department.location,
            emailAddress:department.emailAddress,
            contactNo: department.contactNo,
            }).fetch();
            return res.ok({'department':department});
        }
        catch(err)
        {
           console.log(err);
           return res.serverError({'err':err});
        }
  },  

  getDeapartmentByBranch: async (req, res) => {
    Branch.find().populate('department').exec(console.log);
    var userWithPets = await Branch.findOne(2).populate('department').exec(sails.log);
    return res.ok({
      success: true,
      departments: userWithPets
    });
    },

    getDeapartmentByOrganization: async (req, res) => {
      Organization.find().populate('department').exec(console.log);
      var userWithPets = await Organization.findOne(1).populate('department').exec(sails.log);
      return res.ok({
        success: true,
        departments: userWithPets
      });
      },  
  
   find: async function(req, res, next) {
        var finn = await Department.findOne({
          departmentID : req.param('id')
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
          department: finn
        });
      },
  
    findByOrganization: async function(req, res, next) {
        var finn = await Department.find({
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
          department: finn
        });
      },
  
  
    getAllDepartment: async (req, res) => {
      //console.log("Tetstsrtsts");
      Department.find((err, departments) => {
          if (err) {
            return res.serverError({
              success: false,
              message: 'Server Error'
            });
          }
          return res.ok({
            success: true,
            departments: departments
          });
        });
      },
    
  createDepartment: async (req, res) => {
        let departmentContent = req.body.text;
        let newDepartment = {
          text: departmentContent
        };
        if (!departmentContent) {
          return res.badRequest({
            success: false,
            message: 'Missing content of department'
          });
        } else {
          Department.create(newDepartment).exec((err) => {
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
    
     
};

