/**
 * Person.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  
  // Name table in database
  tableName: 's_tbl_Person',
  primaryKey: 'personID',

  attributes: {
            id: false,        

            //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
            //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
            //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
            title: {
              'type': 'string',
              'required': true
            },
            firstName: {
              'type': 'string',
              'required': true
            },
            lastName: {
              'type': 'string',
              'required': true
            },
            dateOfBirth:{
              type: 'ref', 
              columnType: 'datetime',
              required: false
            },
            gender: {
               type: 'string',
               required: true
            },  
            maritalStatus: {
              type: 'string',
              required: false
            },
            personID:{
              type: 'number',
              unique: true,
              'autoIncrement': true 
            },
            clientID:{
              type: 'number',
              required: true,
              unique: true,
            },
            fathersName: {
              'type': 'string',
              'required': false
            },
            mothersName: {
              'type': 'string',
              'required': false
            },
            //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
            //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
            //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


            //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
            //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
            //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
            clientID:{
              model:'client',
              unique: true
            },
           
  },

};

