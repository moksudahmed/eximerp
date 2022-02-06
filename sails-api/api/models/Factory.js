/**
 * Factory.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'o_tbl_Factory',
  primaryKey: 'factoryID',

 
  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    id: false,
    
    factoryID: {
      type: 'number',
      unique: true,
      'autoIncrement': true
    },    
    factoryAddress: {
      'type': 'text',
      'required': true
    },    
    factoryName: {
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
    employeeID: {
      'type': 'integer',
      'required': false
    },
    warehouseID: {
      'type': 'integer',
      'required': false
    },
    
    organizationID: {
      'type': 'integer',
      'required': true
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    organizationID: { 
      model: 'Organization'
    },
  },

};

