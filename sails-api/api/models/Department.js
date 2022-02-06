/**
 * Department.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'o_tbl_Department',
  primaryKey: 'departmentID',

 
  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    
    id: false,
    departmentID:{
      type: 'number',
      unique: true,
      'autoIncrement': true
    },
    contactNo: {
      'type': 'text',
      'required':false,
      defaultsTo:''
    },
    departmentName: {
      'type': 'text',
      'required': false,
      defaultsTo:'Admin'
    },
    location: {
      'type': 'text',
      'required':false,
      defaultsTo:''
    },
    emailAddress: {
      'type': 'text',
      'required':false,
      defaultsTo:''
    },
    branchID: {
      'type': 'integer',
      'required': true
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
    branchID: { 
      model: 'Branch'
    },
  },

};

