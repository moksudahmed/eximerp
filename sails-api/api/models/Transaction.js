/**
	Generated by sails-inverse-model
	Date:Sat Nov 23 2019 17:44:33 GMT+0600 (Bangladesh Standard Time)
*/

module.exports = {
    tableName: 'a_tbl_Transaction',
    primaryKey: 'transactionID',
  
    
    attributes: {
        id: false,

        transactionID:{
            type: 'number',
            unique: true,
            'autoIncrement': true,
        },
        transactionDate: {
            type: 'ref', 
            columnType: 'datetime',
            required: true
        },
        transactionTitle: {
            type: 'string',
            required: true
        },       
        branchID: {
            type: 'integer',
            required: true
        },
        financialYearID: { 
            type: 'integer',
            required: false
        },
        entryDateTime: {
          type: 'ref',
          columnType: 'datetime',      
        },
        userID: {
            type: 'integer',
            required: false
        },
        paymentID: {
            type: 'integer',
            required: true
        }
    },
    
    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
      branchID: { 
        model: 'Branch'
      },
      financialYearID: { 
        model: 'Financialyear'
      },    
      paymentID: { 
        model: 'Payment'
      },
      
  
};