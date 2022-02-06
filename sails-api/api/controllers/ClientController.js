/**
 * Client
 *
 * @description :: Server-side logic for managing Client
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
        create: async function(req,res,next)
        {
          var records = req.allParams();
          var client = records.client;
         // var owner = records.owner;
          var caccount = records.clientAccount;// // attribute name
          var person = records.person;
          var contact = records.address;
          console.log(req.allParams());
          try{      
                  var client = await Client.create({
                          organizationID: client.organizationID,
                        //  subSidiaryAccountID: client.subSidiaryAccountID,
                          date: client.date,
                          clientType: client.clientType,                     
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

    getThirdPartyAgent: async function(req, res, next) {
        var finn = await Client.find({
            clientType:req.param('type')
        }).populate('agent').populate('contactinfo');
       
        if (!finn) {
          return res.serverError({
            success: false,
            message: 'Server Error'
          });
        }
        //console.log(finn);
        return res.ok({
          success: true,
          clients: finn
        });
      },
   
      getOwner: async function(req, res, next) {
        var finn = await Client.find().populate('owner').populate('person');
       
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
      
      getWitness: async (req, res) => {
       
        VwWintness.find((err, witness) => {
          if (err) {
              return res.serverError({
              success: false,
              message: 'Server Error'
            });
          }
          console.log(witness);
          return res.ok({
            success: true,
            witness: witness
          });
        });
      },
      
      find: async function(req, res, next) {
        var finn = await Client.findOne({
          clientID : req.param('id')
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
          clients: finn
        });
      },
      
      calculateBalance: async function(req, res, next) {
        
        var NAMES_OF_SQL = `SELECT get_client_account_balance($1) as balance`; 
        var rawResult = await sails.sendNativeQuery(NAMES_OF_SQL, [req.param('id')]);
 
        sails.log(rawResult);
     
        if (!rawResult) {
          return res.serverError({
            success: false,
            message: 'Server Error'
          });
        }
        //console.log(finn);
        return res.ok({
          success: true,
          balance: rawResult
        });
      },

      create2: function(req, res, next, callback) {
        var params = req.body;

          //create a user
          Client.create(params, function(err, createdData) {
              if(err){
                return res.badRequest({
                              error: err
                         });
               } else {
                 return res.json({
                            data : createdData
                 });
               }
          });
        },  

    index: function(req, res, next) {
        Client.find().exec(function(err, list) {
            if (err) return Error('Error');
            return res.view({
                result: list
            });
        });
    },

    show: function(req, res, next) {
        Client.findOneById(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    edit: function(req, res, next) {
        Client.findOne(req.param('id'), function Founded(err, value) {
            if (err) {
                return next(err);
            }
            res.view({
                element: value
            });
        });
    },

    update: function(req, res, next) {
        Client.update(req.param('id'), req.body, function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('client/show/' + req.param('id'));
        });
    },

    delete: function(req, res, next) {
        Client.destroy(req.param('id'), function Update(err, value) {
            if (err) {
                return next(err);
            }
            return res.redirect('/client');
        });
    },

};