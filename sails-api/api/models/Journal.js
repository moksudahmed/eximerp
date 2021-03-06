/**
	Generated by sails-inverse-model
	Date:Sat Nov 23 2019 17:44:33 GMT+0600 (Bangladesh Standard Time)
*/

module.exports = {
    tableName: 'a_tbl_Journal',
    primaryKey: 'journalID',


    attributes: {
        id: false,
        journalID:{
            type: 'number',
            unique: true,
            'autoIncrement': true
          },       
        amount: {
            type: "float",
            required: true
        },
        debitCredit: {
            type: 'string',
            required: true
        },
        invoiceNo: {
            type: 'string',
            required: true
        },
        chartOfAccountID: {
            type: 'integer',
            required: false
        },        
        subSidiaryAccountID: {
            type: 'integer',
            required: false
        },
        transactionID: {
            type: 'integer',
            required: false
        },
     /*   particulars: {
            type: 'string',
            required: true
        }*/
    },

       
    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
 // Add a reference to ChartOfAccount 
 transactionID: { 
    model: 'Transaction'
  },
 chartOfAccountID: { 
    model: 'Chartofaccount'
  },
  
};