/**
 * Branch.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'o_tbl_Branch',
  primaryKey: 'branchID',
  
 
  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    
    id: false,
    branchID: {
      type: 'number',
      unique: true,
      'autoIncrement': true
    },  
    branchAddress: {
      'type': 'string',
      'required': false,
      defaultsTo:''
    },
    branchName: {
      'type': 'string',
      'required':false,
      defaultsTo:"Main"
    },
    contactNo: {
      'type': 'string',
      'required': false,
      defaultsTo:''
    },
    emailAddress: {
      'type': 'string',
      'required': false,
      defaultsTo:''
    },
    employeeID: {
      'type': 'integer',
      'required': false
    },
    organizationID: {
      'type': 'integer',
      'required': true
    },
    city: {
      'type': 'string',
      'required':false,
      defaultsTo:''
    },
    country: {
      'type': 'string',
      'required': false,
      defaultsTo:''
    },
 

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
 // Add a reference to Organization  
  organizationID: { 
      model: 'Organization'
    },
  department: { 
      collection: 'Department',
      via: 'branchID'
    },
  purchaseorders: { 
      collection: 'Purchaseorder',
      via: 'branchID'
    },
  customerorders: { 
      collection: 'Customerorder',
      via: 'branchID'
    },
  },

};

