
/**
 * Employee
 *
 * @description :: Server-side logic for managing Employee
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
    create: async function(req,res,next)
    {
      var records = req.allParams();
      var client = records.client;
     // var owner = records.owner;
      var employee = records.employee;// // attribute name
      var person = records.person;
      var contact = records.address;
      var salary = records.salaryProfile;
      console.log(req.allParams());
      try{      
              var client = await Client.create({
                      organizationID: client.organizationID,
                    //  subSidiaryAccountID: client.subSidiaryAccountID,
                      date: client.date,
                      clientType:client.clientType,                     
                  }).fetch();
              var person = await Person.create({
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
                  }).fetch();
              var employee = await Employee.create({
                      joningDate: employee.joningDate,
                      leavingDate: employee.leavingDate,
                      status:  employee.status,
                      designation: employee.designation,                      
                      branchID: employee.branchID,                      
                      warehouseID:employee.warehouseID,
                      departmentID:employee.departmentID,
                      branchID:employee.branchID,
                      factoryID:employee.factoryID,
                      organizationID:employee.organizationID,
                      personID:person.personID
                  }).fetch();
              var contactinfo = await Contactinfo.create({
                      addressLine1: contact.addressLine1,
                      addressLine2: contact.addressLine2,
                      postcode : contact.postcode,
                      city :contact.city,
                      country :contact.country,
                      clientID: client.clientID,
                      emailAddress : contact.emailAddress,
                      mobileNo1 : contact.mobileNo1,
                      mobileNo2 : contact.mobileNo2,             
                  }).fetch();
                
              var salary = await Salaryprofile.create({
                    overtimeRate: salary.overtimeRate,
                    profileType: salary.profileType,
                    providentFund: salary.providentFund,
                    taxRate :salary.taxRate,
                    hourlyRate :salary.hourlyRate,
                    commissionRate:salary.commissionRate,
                    paymentType :salary.paymentType,
                    employeeID:employee.employeeID,
                }).fetch();
                  
              return res.ok({'person':salary});
          }
          catch(err)
          {
              console.log(err);
              return res.serverError({'err':err});
          }
    },

    getAllEmployee: async (req, res) => {
        Employee.find((err, employee) => {
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
   
    index: function(req, res, next) {
        Employee.find().exec(function(err, list) {
            if (err) return Error('Error');
            return res.view({
                result: list
            });
        });
    },

    show: function(req, res, next) {
        Employee.findOneById(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    edit: function(req, res, next) {
        Employee.findOne(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    update: function(req, res, next) {
        Employee.update(req.param('id'), req.body, function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('employee/show/' + req.param('id'));
        });
    },

    delete: function(req, res, next) {
        Employee.destroy(req.param('id'), function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('/employee');
        });
    },

};