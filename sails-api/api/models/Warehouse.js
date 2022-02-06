/**
 * Warehouse.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'o_tbl_Warehouse',
  primaryKey: 'warehouseID',

 
  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    id: false,
    
    warehouseID: {
      type: 'number',
      unique: true,
      'autoIncrement': true, 
    },
    location: {
      'type': 'text',
      'required': false
    }, 
    contactNo: {
      'type': 'text',
      'required': false
    }, 
    name: {
      'type': 'text',
      'required': false
    },    
    factoryID: {
      'type': 'number',
      'required': true
    },
        
    deliveryID: {
      'type': 'number',
      'required': false
    },
   
    inventoryDate: {
      'type': 'number',
      'required': false
    },      
    branchID: {
      'type': 'number',
      'required': false
    },    
    

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

