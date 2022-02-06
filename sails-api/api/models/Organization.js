/**
 * Organization.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'o_tbl_Organization',
  primaryKey: 'organizationID',

 // autoCreatedAt: false,
 // autoUpdatedAt: false,


  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    id: false,

    organizationID: {
      type: 'number',
      unique: true,
      'autoIncrement': true
    },
    organizationName: {
      'type': 'string',
      'required': true
    },
    address: {
      'type': 'text',
      'required': true
    },
    city: {
      'type': 'text',
      'required': true
    },  
    contactNo: {
      'type': 'text',
      'required': false
    },
    emailAddress: {
      'type': 'text',
      'required': false
    },
    logo: {
      'type': 'text',
      'required': false
    },  
    country: {
      'type': 'text',
      'required': false
    },
    postalcode: {
      'type': 'text',
      'required': false
    },
    vat:{
      'type': 'text',
      'required': false
    },
    tinNo:{
      'type': 'text',
      'required': false
    },
    licenceNo:{
      'type': 'text',
      'required': false
    },
    startedAt:{
      type: 'ref', 
      columnType: 'datetime',
      required: true
    },
    closedAt:{
      type: 'ref', 
      columnType: 'datetime',
      required: false
    },
    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    // Add a reference to Branch
    branch: { 
      collection: 'Branch',
      via: 'organizationID'
    },
    department: { 
      collection: 'Department',
      via: 'organizationID'
    },
    factory: { 
      collection: 'Factory',
      via: 'organizationID'
    }
  },

};
