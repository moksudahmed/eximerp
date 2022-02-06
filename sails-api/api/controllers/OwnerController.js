/**
 * Owner
 *
 * @description :: Server-side logic for managing Owner
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {

    create: async function(req,res,next)
      {
        var records = req.allParams();
        var client = records.client;
        var owner = records.owner;
        var caccount = records.clientAccount;// // attribute name
        var person = records. person;
        var contact = records.contactinfo;
         console.log(req.allParams());
        try{      
                var client = await Client.create({
                        organizationID: client.organizationID,
                      //  subSidiaryAccountID: client.subSidiaryAccountID,
                        date: client.date,
                        clientType: client.clientType,                     
                    }).fetch();

               /* var owner = await Owner.create({
                    designation: owner.designation,
                    ownerPercentage: owner.ownerpercentage,                    
                    IRCLicenseNo: owner.IRCLicenseNo,
                    TradeLicenseNo : owner.TradeLicenseNo,
                    LicenseExpireDate : owner.LicenseExpireDate,
                    clientID:client.clientID,                        
                                             
                }).fetch();*/

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
                var account = await Clientaccount.create({
                        accountName: caccount.accountName,
                        accountNo: caccount.accountNo,
                        joiningDate: caccount.joiningDate,
                        active:caccount.active,
                        suspended:caccount.suspended,
                        accountCreditLimit:caccount.accountCreditLimit,
                        remarks: caccount.remarks,
                        clientID:client.clientID,
                        organizationID:client.organizationID
                    }).fetch();
                var contactinfo = await Contactinfo.create({
                        addressLine1: contact.addressLine1,
                        addressLine2: contact.addressLine2,
                        postcode : contact.postcode,
                        city :contact.city,
                        country :contact.country,
                        clientID:client.clientID,
                        emailAddress : contact.emailAddress,
                        mobileNo1 : contact.mobileNo1,
                        mobileNo2 : contact.mobileNo2,             
                    }).fetch();
                
                return res.ok({'person':person});
            }
            catch(err)
            {
                console.log(err);
                return res.serverError({'err':err});
            }
      },
      createCorporateOwner: async function(req,res,next)
      {
        var records = req.allParams();
        var client = records.client;
        var owner = records.owner;
        //var account = records.clientAccount;// // attribute name
        var company = records.company;
        var contactinfo = records.contactinfo;
       
        try{      
                var client = await Client.create({
                        organizationID: client.organizationID,
                        subSidiaryAccountID: client.subSidiaryAccountID,
                        date: client.date,
                        clientType: client.clientType,                     
                    }).fetch();

                var owner = await Owner.create({
                    designation: owner.designation,
                    IRCLicenseNo: owner.IRCLicenseNo,
                    TradeLicenseNo : owner.TradeLicenseNo,
                    LicenseExpireDate : owner.LicenseExpireDate,
                    clientID:client.clientID,                        
                                             
                }).fetch();

                var company = await Company.create({
                        companyName: company.companyName,
                        contactPersonName: company.contactPersonName,
                        designation:company.designation,
                        contactNo: company.contactNo,
                        emailAddress: company.emailAddress,
                        website: company.website,
                        clientID:client.clientID                   
                    }).fetch();

                var contactinfo = await Contactinfo.create({
                        addressLine1: contactinfo.addressLine1,
                        addressLine2: contactinfo.addressLine2,
                        postcode : contactinfo.postcode,
                        city :contactinfo.city,
                        country :contactinfo.country,
                        clientID:client.clientID,
                        emailAddress : contactinfo.emailAddress,
                        mobileNo1 : contactinfo.mobileNo1,
                        mobileNo2 : contactinfo.mobileNo2,             
                    }).fetch();
                
                return res.ok({'person':company});
            }
            catch(err)
            {
                console.log(err);
                return res.serverError({'err':err});
            }
      },  
     
      getOwner: async function(req, res, next) {
        var finn = await Owner.find().populate('clientID').populate('owner');
        //.Client.find().populate('person');
        if (!finn) {
          return res.serverError({
            success: false,
            message: 'Server Error'
          });
        }
        //console.log(finn);
        return res.ok({
          success: true,
          owners: finn
        });
      },

      getOwners: async (req, res) => {
            var NAMES_OF_SQL = `SELECT o."ownerID",  p.title,p."firstName", p."lastName" FROM public."o_tbl_Owner" o, public."s_tbl_Client" c, public."s_tbl_Person" p WHERE o."clientID" = c."clientID" AND c."clientID" = p."clientID"`;
    
            // Send it to the database.
            var rawResult = await sails.sendNativeQuery(NAMES_OF_SQL, [ ]);
    
            sails.log(rawResult);
            
          return res.ok({
            success: true,
            owners: rawResult.rows
          });
      },
      
   
     createPartner: async (req, res) => {
        
        var records = req.allParams();
        var p = records.owner;
        console.log(p);
        var NAMES_OF_SQL = `INSERT INTO "o_tbl_JoinOwnerToOrganization"("organizationID", "ownerID", "ownerPercentage", condition)
                             VALUES ($1, $2, $3, $4)`;

        // Send it to the database.
        var rawResult = await sails.sendNativeQuery(NAMES_OF_SQL, [p.organizationID, p.ownerID, p.ownerPercentage, p.condition ]);

        sails.log(rawResult);
        
      return res.ok({
        success: true,
        owners: rawResult.rows
      });
  },     
  getOwners2: async (req, res) => {
        Owner.query('SELECT o."ownerID",  p.title,p."firstName", p."lastName" FROM public."o_tbl_Owner" o, public."s_tbl_Client" c, public."s_tbl_Person" p WHERE o."clientID" = c."clientID" AND c."clientID" = p."clientID"', function(err, rawResult) {        
       if (err) { return res.serverError(err); }
     
       sails.log(rawResult);
       // (result format depends on the SQL query that was passed in, and the adapter you're using)
     
       // Then parse the raw result and do whatever you like with it.
     
       return res.ok();     
     });
     },
 
      
  
    index: function(req, res, next) {
        Owner.find().exec(function(err, list) {
            if (err) return Error('Error');
            return res.view({
                result: list
            });
        });
    },

    show: function(req, res, next) {
        Owner.findOneById(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    edit: function(req, res, next) {
        Owner.findOne(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    update: function(req, res, next) {
        Owner.update(req.param('id'), req.body, function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('owner/show/' + req.param('id'));
        });
    },

    delete: function(req, res, next) {
        Owner.destroy(req.param('id'), function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('/owner');
        });
    },

};