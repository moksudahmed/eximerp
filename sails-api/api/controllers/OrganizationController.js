/**
 * OrganizationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const Warehouse = require("../models/Warehouse");

module.exports = {

  setupBusiness: async function(req,res,next)
  {
    var records = req.allParams();
    var client = records.client;
   // var owner = records.owner;
    var branch = records.branch;// // attribute name
    var department = records.department;// // attribute name
    var warehouse = records.warehouse;// // attribute name
  
    var person = records.person;
    var contact = records.address;
    var organization = records.organization;
    console.log(req.allParams());
    try{    
                 var organization = await Organization.create({
                      organizationName: organization.organizationName,
                      address:organization.address,
                      city:organization.city,
                      contactNo:organization.contactNo,
                      emailAddress:organization.emailAddress,
                      logo:organization.logo,
                      country:organization.country,  
                      postalcode:organization.postalcode, 
                      vat:organization.vat,
                      tinNo:organization.tinNo,
                      licenceNo:organization.licenceNo,
                      startedAt:organization.startedAt,
                      closedAt:organization.closedAt,
                    }).fetch();
              if (!branch) { 
                var branch =  await Branch.create({
                      branchAddress :organization.address,// branch.branchAddress,
                      //branchName:branch.branchName,
                      contactNo:organization.contactNo,
                      emailAddress:organization.emailAddress,
                      //employeeID:24,
                      city: organization.city,
                      country:organization.country,
                      organizationID: organization.organizationID
                     }).fetch();
                }
                else{
                  var branch =  await Branch.create({
                    branchAddress :branch.branchAddress,
                    branchName:branch.branchName,
                    contactNo:branch.contactNo,
                    emailAddress:branch.emailAddress,
                    //employeeID:,
                    city: branch.city,
                    country:branch.country,
                    organizationID:organization.organizationID
                   }).fetch();
                }
              if (!department) { 
                var department = await Department.create({
                  organizationID:organization.organizationID,
                  branchID: branch.branchID,
                  //departmentName: department.departmentName,
                  location: organization.address,
                  emailAddress:organization.emailAddress,
                  contactNo:organization.contactNo,
                  }).fetch();
                }
                else{
                var department = await Department.create({
                  organizationID:organization.organizationID,
                  branchID: branch.branchID,
                  departmentName: department.departmentName,
                  location: department.location,
                  emailAddress:department.emailAddress,
                  contactNo: department.contactNo,
                  }).fetch();
                 
                }
                if (warehouse) { 
                  var warehouse = await Warehouse.create({
                    name: warehouse.name,
                    location: warehouse.location,
                    contactNo:organization.contactNo,
                    branchID: branch.branchID,
                    }).fetch();
                   
                  }
          /*  var client = await Client.create({
                    organizationID: client.organizationID,
                  //  subSidiaryAccountID: client.subSidiaryAccountID,
                    date: client.date,
                    clientType:client.clientType,                     
                }).fetch();
            /*var person = await Person.create({
                    title: person.title,
                    firstName: person.firstName,
                    lastName: person.lastName,
                    dateOfBirth:person.dateOfBirth,
                    gender:person.gender,
                    maritalStatus: person.maritalStatus,
                    type: person.type,
                    clientID:client.clientID,
                    fathersName:person.fathersName,
                    mothersName:person.mothersName                   
                }).fetch();*/
              
                
            return res.ok({'person':organization});
        }
        catch(err)
        {
            console.log(err);
            return res.serverError({'err':err});
        }
  },

  
  getOrganization: async (req, res) => {

   Organization.find().populate('branches').exec(console.log);
   var userWithPets = await Organization.findOne(1).populate('branches').exec(console.log);
   /*var usersNamedFinn = await Organization.find({
        where: {organizationName:'Finn'},
        select: ['*']
      });
    sails.log('ALl:', usersNamedFinn.organizationName);
    var usersNamedFinn = await Organization.find({organizationName:'metro'});
    sails.log('Wow, there are %d users named Finn.  Check it out:', usersNamedFinn.length, usersNamedFinn);*/
    /*sails.models.organization
     .find()
     .populate('branches')
     .exec(console.log);
      // sails.log(branches);
       return res.ok();  */   
     },

     
     find: async function(req, res, next) {
      var finn = await Organization.findOne({
        organizationID: req.param('id')
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
        organization: finn
      });
    },

    getAllOrganization: async (req, res) => {
        Organization.find((err, organizations) => {
          if (err) {
            return res.serverError({
              success: false,
              message: 'Server Error'
            });
          }
          return res.ok({
            success: true,
            organizations: organizations
          });
        });
      },
      create33:  async (req, res) => {
        var organization = {
          organizationName: "TEST",
          address: "TEST",
          city: "TEST",
          contactNo: "TEST",
          emailAddress: "TEST",
          logo: "TEST",
          country: "TEST"
      };
      Organization.create(organization).exec(function(err, result){
        Branch.create({
            branchAddress :"TEST",
            branchName:"TEST",
            contactNo:"TEST",
            emailAddress:"masud@gmail.com",
            employeeID:24,
            city: "TEST",
            country: "TEST",
            organizations: result.id
          }).exec(function (e, r){
            Organization.update({id: result.id}, {organizations: result.id}).exec(function(e1, r1){
              return res.json({result: r, error: e});	
            });				
          });
        });
      },
      create2:async function(req, res){
       // sails.log(req.allParams());
       try{
        var organization = {
            organizationName: "TEST",
            address: "TEST",
            city: "TEST",
            contactNo: "TEST",
            emailAddress: "TEST",
            logo: "TEST",
            country: "TEST"
        };
        Organization.create(organization).exec(function(err, result){
          Branch.create({
             branchAddress :"TEST",
              branchName:"TEST",
              contactNo:"TEST",
              emailAddress:"masud@gmail.com",
              employeeID:24,
              city: "TEST",
              country: "TEST",
              organizationID: result.id
          }).exec(function (e, r){
            return res.json({result: r, error: e});	
            //Organization.update({id: result.id}, {organizationID: r.id}).exec(function(e1, r1){              
            //});				
          });
        });
      }
      catch(err)
      {
         console.log(err);
         return res.serverError({'err':err});
      }
      },

      create111: function(req, res){
        try{
        Organization.create({organizationName: "TEST",
        address: "TEST",
        city: "TEST",
        contactNo: "TEST",
        emailAddress: "TEST",
        logo: "TEST",
        country: "TEST"}).exec(function(e,r){
          Branch.create({   
          branchAddress :"TEST",
          branchName:"TEST",
          contactNo:"TEST",
          emailAddress:"masud@gmail.com",
          employeeID:24,
          city: "TEST",
          country: "TEST",
          organizationID: r.id}).exec(function(err, result){
            return res.json({ok: 'success'});
            //Customer.create({Name: 'Juan', store: r.id}).exec(function(err1, res1){              
            //});
          });
          
        }
        );
      }
      catch(err)
      {
         console.log(err);
         return res.serverError({'err':err});
      }
      },
      
      createWithBatches: async function(req,res,next)
      {        
       var reqData = req.allParams();        
        try{
                let organization = await Organization.create({
                  organizationName: reqData[0].organizationName,
                  address: reqData[0].address,
                  city: reqData[0].city,
                  contactNo: reqData[0].contactNo,
                  emailAddress: reqData[0].emailAddress,
                  logo: reqData[0].logo,
                  country: reqData[0].country,              
                })
                .fetch();

                let branch = await Branch.createEach([{
                  branchAddress : reqData[0].branches.branchAddress,
                  branchName : reqData[0].branches.branchName,                 
                  contactNo: reqData[0].branches.contactNo,
                  emailAddress:reqData[0].branches.emailAddress,
                  employeeID:24,
                  city: reqData[0].branches.city,
                  country: reqData[0].branches.country,
                  organizationID: organization.id          
                  }])
                  .fetch();
                return res.ok({'branch':branch});
            }
            catch(err)
            {
               console.log(err);
               return res.serverError({'err':err});
            }
      },

      create: async function(req,res,next)
      {
        
        sails.log(req.allParams());
            try{
                let organization = await Organization.create({
                organizationName : req.param('organizationName'),
                address : req.param('address'),
                city : req.param('city'),
                contactNo : req.param('contactNo'),
                emailAddress : req.param('emailAddress'),
                logo : req.param('logo'),         
                country : req.param('country'),   
                postalcode:req.param('postalcode'),    
                vat:req.param('vat'),    
                tinNo:req.param('tinNo'),    
                licenceNo:req.param('licenceNo'),    
                startedAt:req.param('startedAt'),    
                closedAt:req.param('closedAt'),    
                })
                .fetch();
                return res.ok({'organization':organization});
            }
            catch(err)
            {
               console.log(err);
               return res.serverError({'err':err});
            }
           
      },  
};

